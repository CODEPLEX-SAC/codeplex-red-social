import { beforeEach } from 'vitest'
import { sembrarTarjetas } from '../marketplace/ayudas_pago'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { ProveedorCarritoMarketplace } from '@/paginas/marketplace/proveedor_carrito_marketplace'
import { PaginaEmpresas } from '@/paginas/empresas/pagina_empresas'
import { renderEmpresas } from './entorno_empresas'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import { EMPRESAS } from '../../servicios/empresas/empresas'
import type { SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

const textos = catalogoEmpresas.planes_asignados
const edicion = textos.edicion
const mejora = textos.mejora
const resumen = mejora.resumen
const textosEdicion = catalogoEmpresas.edicion_empresa
const pago = catalogoMarketplace.pago
const [contabilidad, facturacion, planillas] = catalogoEmpresas.modulos
const SEMILLA_BASICA: SeleccionPlan[] = [{ aplicacion: 'conta-plex', tipo: 'independiente', plan: 'basico', periodo: 'mensual' }]
const SEMILLA_TOPE: SeleccionPlan[] = [{ aplicacion: 'conta-plex', tipo: 'independiente', plan: 'gold', periodo: 'mensual' }]

function montar(semilla?: SeleccionPlan[]) {
  if (!semilla) return renderEmpresas()
  return render(
    <ProveedorCarritoMarketplace suscripcionesIniciales={semilla}>
      <PaginaEmpresas />
    </ProveedorCarritoMarketplace>,
  )
}

function abrirPlanes() {
  fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', EMPRESAS[0].nombre) }))
  const dialogo = within(screen.getByRole('dialog', { name: textosEdicion.titulo }))
  fireEvent.click(dialogo.getByRole('tab', { name: new RegExp(catalogoEmpresas.detalle_empresa.pestanas.planes) }))
  return dialogo
}

function fila(dialogo: ReturnType<typeof abrirPlanes>, etiqueta: string) {
  return within(dialogo.getByText(etiqueta, { selector: 'span' }).closest('tr') as HTMLElement)
}

function abrirMejora(dialogo: ReturnType<typeof abrirPlanes>, modulo = contabilidad, aplicativo = 'ContaPlex') {
  fireEvent.click(dialogo.getByRole('button', { name: edicion.etiqueta_mejorar.replace(':modulo', modulo.etiqueta) }))
  return within(screen.getByRole('dialog', { name: mejora.titulo.replace(':aplicativo', aplicativo) }))
}

function elegir(modal: ReturnType<typeof abrirMejora>, plan: string) {
  fireEvent.click(modal.getByRole('button', { name: mejora.etiqueta_elegir.replace(':plan', plan) }))
}

describe('Planes asignados dentro de Editar empresa: tabla', { timeout: 30000 }, () => {
  it('muestra cuatro columnas y ya no incluye Plan vigente', () => {
    montar()
    const dialogo = abrirPlanes()
    Object.values(edicion.columnas).forEach((columna) => expect(dialogo.getByRole('columnheader', { name: columna })).toBeInTheDocument())
    expect(dialogo.getAllByRole('columnheader')).toHaveLength(4)
    expect(dialogo.queryByRole('columnheader', { name: /Plan vigente/ })).toBeNull()
    expect(dialogo.queryByText(textos.plan.replace(':plan', 'Estándar'))).toBeNull()
    expect(dialogo.getAllByRole('row')).toHaveLength(3)
    expect(dialogo.queryByText(planillas.etiqueta, { selector: 'span' })).toBeNull()
    expect(dialogo.queryAllByRole('combobox')).toHaveLength(0)
  })

  it('el recurso limitante depende del aplicativo: empresas en ContaPlex y sucursales en Facturacion', () => {
    montar()
    const dialogo = abrirPlanes()
    const conta = fila(dialogo, contabilidad.etiqueta)
    expect(conta.getByText(contabilidad.descripcion)).toBeInTheDocument()
    expect(conta.getByText(edicion.recursos.empresas)).toBeInTheDocument()
    expect(conta.getByText(edicion.uso_valor.replace('{usadas}', String(EMPRESAS.length)).replace('{limite}', '15'))).toBeInTheDocument()
    expect(conta.getByText(edicion.uso_porcentaje.replace('{porcentaje}', String(Math.round((EMPRESAS.length / 15) * 100))))).toBeInTheDocument()
    expect(conta.getByRole('progressbar', { name: edicion.etiqueta_uso.replace(':modulo', contabilidad.etiqueta) })).toBeInTheDocument()

    const factura = fila(dialogo, facturacion.etiqueta)
    expect(factura.getByText(edicion.recursos.sucursales)).toBeInTheDocument()
    expect(factura.getByText('1')).toBeInTheDocument()
    expect(factura.getByText(edicion.uso_no_determinado)).toBeInTheDocument()
    expect(factura.queryByRole('progressbar')).toBeNull()
  })

  it('no hay acciones de ver, editar ni eliminar por aplicativo', () => {
    montar()
    const dialogo = abrirPlanes()
    const botones = fila(dialogo, contabilidad.etiqueta).getAllByRole('button').map((boton) => boton.getAttribute('aria-label'))
    expect(botones).toEqual([edicion.etiqueta_mejorar.replace(':modulo', contabilidad.etiqueta)])
  })

  it('el interruptor cambia a Inactivo, Guardar lo conserva y Cancelar lo descarta', () => {
    montar()
    let dialogo = abrirPlanes()
    const interruptor = fila(dialogo, facturacion.etiqueta).getByRole('switch')
    fireEvent.click(interruptor)
    expect(interruptor).not.toBeChecked()
    expect(fila(dialogo, facturacion.etiqueta).getByText(edicion.inactivo)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: textosEdicion.guardar }))
    dialogo = abrirPlanes()
    expect(fila(dialogo, facturacion.etiqueta).getByRole('switch')).not.toBeChecked()
    expect(fila(dialogo, contabilidad.etiqueta).getByRole('switch')).toBeChecked()
    fireEvent.click(fila(dialogo, contabilidad.etiqueta).getByRole('switch'))
    fireEvent.click(dialogo.getByRole('button', { name: textosEdicion.cancelar }))
    expect(fila(abrirPlanes(), contabilidad.etiqueta).getByRole('switch')).toBeChecked()
  })
})

describe('Aviso de limite de capacidad', { timeout: 30000 }, () => {
  it('no aparece mientras haya capacidad disponible', () => {
    montar()
    expect(abrirPlanes().queryByText(edicion.aviso.titulo)).toBeNull()
  })

  it('aparece una sola vez, con datos reales del plan, cuando se alcanza el limite', () => {
    montar(SEMILLA_BASICA)
    const dialogo = abrirPlanes()
    const descripcion = edicion.aviso.descripcion.replace('{usadas}', String(EMPRESAS.length)).replace('{limite}', '5').replace('{aplicativo}', 'ContaPlex')
    expect(dialogo.getAllByText(edicion.aviso.titulo)).toHaveLength(1)
    expect(dialogo.getByText(descripcion)).toBeInTheDocument()
    expect(dialogo.getAllByRole('button', { name: new RegExp(edicion.mejorar_plan) })).toHaveLength(1)
  })

  it('no aparece si el aplicativo esta desactivado en la empresa', () => {
    montar(SEMILLA_BASICA)
    const dialogo = abrirPlanes()
    fireEvent.click(fila(dialogo, contabilidad.etiqueta).getByRole('switch'))
    expect(dialogo.queryByText(edicion.aviso.titulo)).toBeNull()
  })

  it('no ofrece mejora ni aviso en el plan mas alto del catalogo', () => {
    montar(SEMILLA_TOPE)
    const dialogo = abrirPlanes()
    expect(dialogo.queryByText(edicion.aviso.titulo)).toBeNull()
    expect(dialogo.queryByRole('button', { name: edicion.etiqueta_mejorar.replace(':modulo', contabilidad.etiqueta) })).toBeNull()
  })
})

describe('Flujo de mejora de plan', { timeout: 30000 }, () => {
  beforeEach(() => {
    sembrarTarjetas()
  })

  it('abre el modal del aplicativo correcto sin salir de Empresas y marca el plan actual', () => {
    montar()
    const dialogo = abrirPlanes()
    const modal = abrirMejora(dialogo)
    expect(window.location.pathname).not.toMatch(/marketplace/)
    expect(modal.getByText(mejora.motivo_general.replace(':aplicativo', 'ContaPlex'))).toBeInTheDocument()
    const actual = within(modal.getByRole('list', { name: mejora.plan_actual_titulo }))
    expect(actual.getByText(textos.plan.replace(':plan', 'Estándar'))).toBeInTheDocument()
    expect(actual.getByText(mejora.insignia_actual)).toBeInTheDocument()
    expect(actual.getByText('15 empresas')).toBeInTheDocument()
    expect(actual.queryByRole('button')).toBeNull()
  })

  it('lista solo planes superiores y bloquea los que no aumentan la capacidad', () => {
    montar()
    const modal = abrirMejora(abrirPlanes())
    const lista = within(modal.getByRole('list', { name: mejora.lista_etiqueta.replace(':aplicativo', 'ContaPlex') }))
    expect(lista.getAllByRole('listitem')).toHaveLength(4)
    expect(lista.queryByText(textos.plan.replace(':plan', 'Gratis'))).toBeNull()
    expect(lista.queryByText(textos.plan.replace(':plan', 'Básico'))).toBeNull()
    expect(lista.getByText('25 empresas')).toBeInTheDocument()
    expect(lista.getByText('10 más que tu plan actual')).toBeInTheDocument()
    expect(modal.getByRole('button', { name: mejora.etiqueta_elegir.replace(':plan', 'Premium 1') })).toBeEnabled()
  })

  it('en Facturacion usa sucursales como recurso y no inventa empresas', () => {
    montar()
    const modal = abrirMejora(abrirPlanes(), facturacion, 'Facturación Electrónica')
    expect(modal.queryByText(/empresas/)).toBeNull()
    expect(modal.getAllByText(/sucursal/).length).toBeGreaterThan(0)
  })

  it('el resumen compara plan, capacidad y precio, permite volver y cancelar', () => {
    montar()
    const dialogo = abrirPlanes()
    let modal = abrirMejora(dialogo)
    elegir(modal, 'Premium 1')
    const tabla = within(modal.getByRole('table', { name: resumen.etiqueta }))
    expect(tabla.getByText(textos.plan.replace(':plan', 'Estándar'))).toBeInTheDocument()
    expect(tabla.getByText(textos.plan.replace(':plan', 'Premium 1'))).toBeInTheDocument()
    expect(tabla.getByText('15 empresas')).toBeInTheDocument()
    expect(tabla.getByText('25 empresas')).toBeInTheDocument()
    expect(tabla.getByText('S/100/mes')).toBeInTheDocument()
    expect(tabla.getByText('S/150/mes')).toBeInTheDocument()
    expect(modal.getByText(resumen.cobro_ahora_valor)).toBeInTheDocument()
    expect(modal.getByText(resumen.demostrativo)).toBeInTheDocument()

    fireEvent.click(modal.getByRole('button', { name: resumen.volver }))
    expect(modal.getByRole('list', { name: mejora.plan_actual_titulo })).toBeInTheDocument()
    elegir(modal, 'Premium 1')
    fireEvent.click(modal.getByRole('button', { name: resumen.cancelar }))
    expect(screen.queryByRole('dialog', { name: mejora.titulo.replace(':aplicativo', 'ContaPlex') })).toBeNull()
    expect(screen.getByRole('dialog', { name: textosEdicion.titulo })).toBeInTheDocument()
    modal = abrirMejora(dialogo)
    expect(modal.getByRole('list', { name: mejora.plan_actual_titulo })).toBeInTheDocument()
  })

  it('no cambia la suscripcion hasta confirmar el pago y luego refleja la nueva capacidad', () => {
    montar()
    const dialogo = abrirPlanes()
    const modal = abrirMejora(dialogo)
    elegir(modal, 'Premium 1')
    fireEvent.click(modal.getByRole('button', { name: resumen.continuar }))

    const pantalla = within(screen.getByRole('dialog', { name: pago.titulo }))
    expect(fila(dialogo, contabilidad.etiqueta).getByText(edicion.uso_valor.replace('{usadas}', String(EMPRESAS.length)).replace('{limite}', '15'))).toBeInTheDocument()
    fireEvent.click(pantalla.getByRole('checkbox', { name: new RegExp(pago.paso4.acepto.slice(0, 20)) }))
    fireEvent.click(pantalla.getByRole('button', { name: pago.mejora.activar }))
    fireEvent.click(pantalla.getByText(pago.mejora.exito.volver, { selector: 'button' }))

    expect(screen.getByRole('dialog', { name: textosEdicion.titulo })).toBeInTheDocument()
    expect(fila(dialogo, contabilidad.etiqueta).getByText(edicion.uso_valor.replace('{usadas}', String(EMPRESAS.length)).replace('{limite}', '25'))).toBeInTheDocument()
    expect(fila(dialogo, contabilidad.etiqueta).getByRole('switch')).toBeChecked()
  })

  it('el teclado puede abrir el modal y Escape lo cierra devolviendo el foco', () => {
    montar()
    const dialogo = abrirPlanes()
    const boton = dialogo.getByRole('button', { name: edicion.etiqueta_mejorar.replace(':modulo', contabilidad.etiqueta) })
    boton.focus()
    fireEvent.click(boton)
    const modal = screen.getByRole('dialog', { name: mejora.titulo.replace(':aplicativo', 'ContaPlex') })
    expect(modal).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog', { name: mejora.titulo.replace(':aplicativo', 'ContaPlex') })).toBeNull()
    expect(screen.getByRole('dialog', { name: textosEdicion.titulo })).toBeInTheDocument()
  })
})
