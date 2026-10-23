import { beforeEach } from 'vitest'
import { sembrarTarjetas } from '../marketplace/ayudas_pago'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { ProveedorCarritoMarketplace } from '@/paginas/marketplace/proveedor_carrito_marketplace'
import { PaginaEmpresas } from '@/paginas/empresas/pagina_empresas'
import { usarCarritoCompartido } from '@/componentes/marketplace'
import { aplicarMejora } from '@/componentes/marketplace/bloques/logica_carrito_planes'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import { EMPRESAS } from '../../servicios/empresas/empresas'
import { SUSCRIPCIONES_DEMOSTRACION } from '../../rutas/marketplace/rutas_marketplace'
import type { CompraRealizada, ItemCarrito } from '@/tipos/marketplace/modelo_carrito'
import type { SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

const edicion = catalogoEmpresas.planes_asignados.edicion
const mejora = catalogoEmpresas.planes_asignados.mejora
const resumen = mejora.resumen
const textosEdicion = catalogoEmpresas.edicion_empresa
const pago = catalogoMarketplace.pago
const carrito = catalogoMarketplace.carrito
const [contabilidad] = catalogoEmpresas.modulos
const GRIFO: SeleccionPlan = { aplicacion: 'gestionplex-grifo', tipo: 'unico', plan: 'grifo', periodo: 'mensual' }

function Sembrar() {
  const c = usarCarritoCompartido()
  return <button type="button" onClick={() => c.agregar(GRIFO)}>sembrar grifo</button>
}

function montar() {
  return render(
    <ProveedorCarritoMarketplace suscripcionesIniciales={SUSCRIPCIONES_DEMOSTRACION}>
      <Sembrar />
      <PaginaEmpresas />
    </ProveedorCarritoMarketplace>,
  )
}

function sembrarGrifo() {
  fireEvent.click(screen.getByRole('button', { name: 'sembrar grifo' }))
  fireEvent.click(within(screen.getByRole('dialog', { name: carrito.titulo })).getByRole('button', { name: 'Cerrar' }))
}

function irAlPagoDeLaMejora(plan = 'Premium 1') {
  fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', EMPRESAS[0].nombre) }))
  const dialogo = within(screen.getByRole('dialog', { name: textosEdicion.titulo }))
  fireEvent.click(dialogo.getByRole('tab', { name: new RegExp(catalogoEmpresas.detalle_empresa.pestanas.planes) }))
  fireEvent.click(dialogo.getByRole('button', { name: edicion.etiqueta_mejorar.replace(':modulo', contabilidad.etiqueta) }))
  const modal = within(screen.getByRole('dialog', { name: mejora.titulo.replace(':aplicativo', 'ContaPlex') }))
  fireEvent.click(modal.getByRole('button', { name: mejora.etiqueta_elegir.replace(':plan', plan) }))
  fireEvent.click(modal.getByRole('button', { name: resumen.continuar }))
  return { dialogo, pantalla: within(screen.getByRole('dialog', { name: pago.titulo })) }
}

function limite(dialogo: ReturnType<typeof within>) {
  const fila = within(dialogo.getByText(contabilidad.etiqueta, { selector: 'span' }).closest('tr') as HTMLElement)
  return fila.queryByText(edicion.uso_valor.replace('{usadas}', String(EMPRESAS.length)).replace('{limite}', '15')) ? 15 : 25
}

function abrirCarrito() {
  fireEvent.click(screen.getByRole('button', { name: carrito.boton, hidden: true }))
  return within(screen.getByRole('dialog', { name: carrito.titulo }))
}

describe('Cancelación y contratación de una mejora de plan', { timeout: 30000 }, () => {
  beforeEach(() => {
    sembrarTarjetas()
  })

  it('el pago de una mejora no muestra el mes gratis ni «Cobro hoy S/0.00» y se identifica como demostración', () => {
    montar()
    const { pantalla } = irAlPagoDeLaMejora()
    expect(pantalla.queryByText(pago.resumen.prueba_valor)).toBeNull()
    expect(pantalla.queryByText(pago.resumen.cobro_hoy)).toBeNull()
    expect(pantalla.queryByRole('button', { name: pago.resumen.activar })).toBeNull()
    expect(pantalla.getByText(pago.mejora.importe)).toBeInTheDocument()
    expect(pantalla.getByText(pago.mejora.importe_valor)).toBeInTheDocument()
    expect(pantalla.getByText(pago.mejora.demostrativo)).toBeInTheDocument()
    expect(pantalla.getByRole('button', { name: pago.mejora.activar })).toBeDisabled()
    expect(pantalla.queryByText(pago.paso3.titulo)).toBeNull()
  })

  it('cancelar con Escape o con la X vuelve a Editar empresa, sin carrito, sin compra y sin cambiar la capacidad', () => {
    montar()
    const { dialogo } = irAlPagoDeLaMejora()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: pago.titulo })).toBeNull()
    expect(screen.queryByRole('dialog', { name: carrito.titulo })).toBeNull()
    expect(screen.getByRole('dialog', { name: textosEdicion.titulo })).toBeInTheDocument()
    expect(limite(dialogo)).toBe(15)
    expect(abrirCarrito().getByText(carrito.vacio_titulo)).toBeInTheDocument()
  })

  it('al reabrir la mejora tras cancelarla, el pago vuelve a mostrar solo la mejora y se puede confirmar', () => {
    montar()
    const primera = irAlPagoDeLaMejora()
    fireEvent.click(primera.pantalla.getAllByRole('button', { name: 'Cerrar' })[0])
    expect(screen.queryByRole('dialog', { name: pago.titulo })).toBeNull()

    const modal = within(screen.getByRole('dialog', { name: textosEdicion.titulo }))
    fireEvent.click(modal.getByRole('button', { name: edicion.etiqueta_mejorar.replace(':modulo', contabilidad.etiqueta) }))
    const planes = within(screen.getByRole('dialog', { name: mejora.titulo.replace(':aplicativo', 'ContaPlex') }))
    fireEvent.click(planes.getByRole('button', { name: mejora.etiqueta_elegir.replace(':plan', 'Premium 2') }))
    fireEvent.click(planes.getByRole('button', { name: resumen.continuar }))
    const pantalla = within(screen.getByRole('dialog', { name: pago.titulo }))
    expect(pantalla.getAllByText(/ContaPlex/).length).toBeGreaterThan(0)
    expect(pantalla.getByText(/Premium 2/)).toBeInTheDocument()
    expect(pantalla.queryByText(/Premium 1/)).toBeNull()

    fireEvent.click(pantalla.getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
    fireEvent.click(pantalla.getByRole('button', { name: pago.mejora.activar }))
    expect(pantalla.getByText(pago.mejora.exito.titulo)).toBeInTheDocument()
    expect(pantalla.getByText(pago.mejora.exito.detalle)).toBeInTheDocument()
    expect(pantalla.queryByText(pago.exito.primer_cobro)).toBeNull()
    expect(pantalla.queryByText(pago.resumen.cobro_hoy_valor)).toBeNull()
    fireEvent.click(pantalla.getByText(pago.mejora.exito.volver, { selector: 'button' }))
    expect(screen.queryByRole('dialog', { name: pago.titulo })).toBeNull()
    expect(limite(within(screen.getByRole('dialog', { name: textosEdicion.titulo })))).toBe(25)
  })

  it('los productos que ya estaban en el carrito se conservan al cancelar la mejora', () => {
    montar()
    sembrarGrifo()
    const { pantalla } = irAlPagoDeLaMejora()
    expect(pantalla.queryByText(/Grifo/)).toBeNull()
    fireEvent.click(pantalla.getAllByRole('button', { name: 'Cerrar' })[0])

    const cesta = abrirCarrito()
    expect(cesta.getAllByText(/Grifo/).length).toBeGreaterThan(0)
    expect(cesta.queryByText(/ContaPlex/)).toBeNull()
  })

  it('confirmar la mejora no compra ni vacía lo que había en el carrito', () => {
    montar()
    sembrarGrifo()
    const { pantalla } = irAlPagoDeLaMejora()
    fireEvent.click(pantalla.getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
    fireEvent.click(pantalla.getByRole('button', { name: pago.mejora.activar }))
    fireEvent.click(pantalla.getByText(pago.mejora.exito.volver, { selector: 'button' }))

    const cesta = abrirCarrito()
    expect(cesta.getAllByText(/Grifo/).length).toBeGreaterThan(0)
    expect(cesta.queryByText(/ContaPlex/)).toBeNull()
  })

  it('aplicarMejora sustituye el plan y conserva las fechas y los días de la compra anterior', () => {
    const compra = { aplicacion: 'conta-plex', nombre: 'ContaPlex', tipo: 'independiente', plan: 'estandar', planNombre: 'Estándar', periodo: 'mensual', precio: '100', fecha: '01/01/2026', vence: '01/02/2026', dias: 12, incluye: [], lema: '', icono: 'contabilidad-propio', tema: 'azul' } as CompraRealizada
    const otra = { ...compra, aplicacion: 'otra', nombre: 'Otra' } as CompraRealizada
    const item = { ...compra, caracteristicas: [], descripcion: '', plan: 'premium1', planNombre: 'Premium 1', precio: '150' } as unknown as ItemCarrito
    const [mejorada, intacta] = aplicarMejora([compra, otra], item)
    expect(mejorada.plan).toBe('premium1')
    expect(mejorada.precio).toBe('150')
    expect([mejorada.fecha, mejorada.vence, mejorada.dias]).toEqual(['01/01/2026', '01/02/2026', 12])
    expect(intacta).toBe(otra)
  })
})
