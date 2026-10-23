import { fireEvent, render, screen, within } from '@testing-library/react'
import { ProveedorCarritoMarketplace } from '@/paginas/marketplace/proveedor_carrito_marketplace'
import { PaginaEmpresas } from '@/paginas/empresas/pagina_empresas'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import { capacidadDePlan } from '../../componentes/marketplace'
import { limiteAlcanzado, limiteDeEmpresas, modulosActivos } from '../../componentes/empresas/bloques/logica_suscripciones_empresas'
import { calcularResumenEmpresas } from '../../componentes/empresas/bloques/logica_resumen_empresas'
import { EMPRESAS } from '../../servicios/empresas/empresas'
import { PLANES_APLICACIONES, SUSCRIPCIONES_DEMOSTRACION } from '../../rutas/marketplace/rutas_marketplace'
import { renderEmpresas, SUSCRIPCIONES } from './entorno_empresas'
import type { SeleccionPlan } from '@/tipos/marketplace/modelo_planes'

const [CONTABILIDAD, FACTURACION, PLANILLAS] = catalogoEmpresas.modulos
const SEMILLA_BASICA: SeleccionPlan[] = [{ aplicacion: 'conta-plex', tipo: 'independiente', plan: 'basico', periodo: 'mensual' }]

describe('Coherencia Marketplace -> Empresas', { timeout: 30000 }, () => {
  it('la demostracion contrata solo ContaPlex y Facturacion Electronica con planes reales del catalogo', () => {
    expect(SUSCRIPCIONES.map((suscripcion) => suscripcion.aplicacion)).toEqual(['conta-plex', 'facturacion-electronica'])
    SUSCRIPCIONES_DEMOSTRACION.forEach((seleccion) => {
      const tipo = PLANES_APLICACIONES[seleccion.aplicacion].tipos.find((candidato) => candidato.id === seleccion.tipo)
      expect(tipo?.planes.some((plan) => plan.id === seleccion.plan)).toBe(true)
    })
  })

  it('la capacidad se lee de las etiquetas del plan y no se inventa cuando no existe', () => {
    const conta = PLANES_APLICACIONES['conta-plex'].tipos[0].planes.find((plan) => plan.id === 'estandar')
    expect(capacidadDePlan(conta)).toEqual({ empresas: 15, sucursales: null })
    expect(capacidadDePlan(undefined)).toEqual({ empresas: null, sucursales: null })
    expect(SUSCRIPCIONES[1].capacidad).toEqual({ empresas: null, sucursales: 1 })
  })

  it('las diez empresas tienen contabilidad y facturacion activas y planillas e inventario no', () => {
    expect(EMPRESAS).toHaveLength(10)
    EMPRESAS.forEach((empresa) => expect(modulosActivos(empresa, SUSCRIPCIONES).map((modulo) => modulo.clave)).toEqual([CONTABILIDAD.clave, FACTURACION.clave]))
    expect(calcularResumenEmpresas(EMPRESAS, SUSCRIPCIONES).modulos.map((fila) => fila.cantidad)).toEqual([10, 10, 0, 0])
  })

  it('sin suscripciones ningun modulo figura activo', () => {
    expect(calcularResumenEmpresas(EMPRESAS, []).modulos.every((fila) => fila.cantidad === 0)).toBe(true)
  })

  it('el limite de empresas viene de la suscripcion y se alcanza solo cuando el total lo iguala', () => {
    expect(limiteDeEmpresas(SUSCRIPCIONES)?.limite).toBe(15)
    expect(limiteAlcanzado(14, SUSCRIPCIONES)).toBe(false)
    expect(limiteAlcanzado(15, SUSCRIPCIONES)).toBe(true)
    expect(limiteAlcanzado(1000, [])).toBe(false)
  })

  it('el listado muestra Activo con el plan contratado en contabilidad y facturacion y No asignado en el resto', () => {
    renderEmpresas()
    const celdas = within(screen.getAllByRole('row')[1]).getAllByRole('cell')
    const estados = catalogoEmpresas.modulo_estado

    expect(within(celdas[3]).getByText(estados.plan.replace(':plan', SUSCRIPCIONES[0].planNombre))).toBeInTheDocument()
    expect(within(celdas[4]).getByText(estados.plan.replace(':plan', SUSCRIPCIONES[1].planNombre))).toBeInTheDocument()
    expect(within(celdas[5]).getByText(estados.no_asignado)).toBeInTheDocument()
    expect(within(celdas[6]).getByText(estados.no_asignado)).toBeInTheDocument()
  })

  it('Planes asignados en Editar lista solo lo contratado en una tabla y ofrece Mejorar plan solo donde hay un plan superior', () => {
    renderEmpresas()
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', EMPRESAS[0].nombre) }))
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('tab', { name: catalogoEmpresas.detalle_empresa.pestanas.planes }))
    const panel = within(screen.getByRole('tabpanel', { name: catalogoEmpresas.planes_asignados.titulo }))

    expect(panel.getByText(CONTABILIDAD.etiqueta, { selector: 'span' })).toBeInTheDocument()
    expect(panel.getByText(FACTURACION.etiqueta, { selector: 'span' })).toBeInTheDocument()
    expect(panel.getByText(catalogoEmpresas.planes_asignados.edicion.uso_valor.replace('{limite}', '15').replace('{usadas}', String(EMPRESAS.length)))).toBeInTheDocument()
    expect(panel.queryByText(PLANILLAS.etiqueta)).toBeNull()
    expect(panel.queryAllByRole('combobox')).toHaveLength(0)
    expect(panel.getAllByRole('button', { name: new RegExp(catalogoEmpresas.planes_asignados.edicion.mejorar_plan) })).toHaveLength(2)
  })

  it('al alcanzar el limite contratado Nueva empresa informa y remite a Marketplace sin abrir el registro', () => {
    expect(capacidadDePlan(PLANES_APLICACIONES['conta-plex'].tipos[0].planes.find((plan) => plan.id === 'basico')).empresas).toBe(5)
    render(
      <ProveedorCarritoMarketplace suscripcionesIniciales={SEMILLA_BASICA}>
        <PaginaEmpresas />
      </ProveedorCarritoMarketplace>,
    )
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.nueva_empresa }))

    const aviso = within(screen.getByRole('dialog', { name: catalogoEmpresas.limite.titulo }))
    expect(aviso.getByText(catalogoEmpresas.limite.detalle.replace('{plan}', 'Básico').replace('{producto}', 'ContaPlex').replace('{limite}', '5').replace('{usadas}', String(EMPRESAS.length)))).toBeInTheDocument()
    expect(aviso.getByRole('button', { name: catalogoEmpresas.limite.ir_marketplace })).toBeInTheDocument()
    expect(screen.getAllByRole('dialog')).toHaveLength(1)
  })

  it('con capacidad disponible Nueva empresa abre el registro', () => {
    renderEmpresas()
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.nueva_empresa }))
    expect(screen.queryByRole('dialog', { name: catalogoEmpresas.limite.titulo })).toBeNull()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('Marketplace refleja las compras iniciales', () => {
    render(
      <ProveedorCarritoMarketplace suscripcionesIniciales={SUSCRIPCIONES_DEMOSTRACION}>
        <PaginaMarketplace />
      </ProveedorCarritoMarketplace>,
    )
    expect(screen.getAllByText(SUSCRIPCIONES[0].nombre).length).toBeGreaterThan(0)
  })
})
