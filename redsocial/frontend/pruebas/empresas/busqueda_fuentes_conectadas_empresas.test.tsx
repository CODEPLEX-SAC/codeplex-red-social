import { act, fireEvent, screen, within } from '@testing-library/react'
import { renderEmpresas } from './entorno_empresas'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEmpresas from '../../catalogos/capacidades/redsocial/empresas.json'
import { armarUsuarios, TODOS_LOS_ESTADOS, TODOS_LOS_ROLES } from '@/componentes/empresas/bloques/logica_usuarios_empresa'
import { TODOS_LOS_TIPOS } from '@/componentes/empresas/bloques/logica_historial_empresa'
import { EMPRESAS } from '../../servicios/empresas/empresas'
import { HISTORIAL_BASE_EMPRESA } from '../../servicios/empresas/historial_empresa'
import { USUARIOS_BASE_EMPRESA } from '../../servicios/empresas/usuarios_empresa'
import type { FuentesBusquedaEmpresas } from '@/tipos/empresas/contrato_fuentes_busqueda_empresas'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { FiltrosBusquedaEmpresas } from '@/tipos/empresas/contrato_listado_empresas'
import type { FiltrosBusquedaHistorialEmpresa } from '@/tipos/empresas/contrato_historial_empresa'
import type { FiltrosBusquedaUsuariosEmpresa } from '@/tipos/empresas/contrato_usuarios_empresa'
import type { Empresa } from '@/tipos/empresas/modelo_empresas'
import type { RegistroHistorialBase } from '@/tipos/empresas/modelo_historial_empresa'
import type { UsuarioEmpresa } from '@/tipos/empresas/modelo_usuarios_empresa'

const sustitutas = vi.hoisted(() => ({
  empresas: vi.fn<FuenteBusqueda<Empresa, FiltrosBusquedaEmpresas>>(),
  usuarios: vi.fn<FuenteBusqueda<UsuarioEmpresa, FiltrosBusquedaUsuariosEmpresa>>(),
  historial: vi.fn<FuenteBusqueda<RegistroHistorialBase, FiltrosBusquedaHistorialEmpresa>>(),
}))

vi.mock('@/rutas/empresas/rutas_empresas', async (importarOriginal) => {
  const original = await importarOriginal<typeof import('@/rutas/empresas/rutas_empresas')>()
  const fuentes: FuentesBusquedaEmpresas = {
    empresas: (consulta, limite, filtros) => sustitutas.empresas(consulta, limite, filtros),
    usuarios: (consulta, limite, filtros) => sustitutas.usuarios(consulta, limite, filtros),
    historial: (consulta, limite, filtros) => sustitutas.historial(consulta, limite, filtros),
  }
  return { ...original, FUENTES_BUSQUEDA_EMPRESAS: fuentes }
})

const RETARDO = catalogoCompartido.busqueda.retardo_remoto_ms
const empresa = EMPRESAS[0]
const usuarios = armarUsuarios(empresa, USUARIOS_BASE_EMPRESA)
const registros = HISTORIAL_BASE_EMPRESA.slice(0, empresa.usuarios * catalogoEmpresas.historial_empresa.registros_por_usuario)
const textosDetalle = catalogoEmpresas.detalle_empresa
const dialogoDetalle = () => within(screen.getByRole('dialog', { name: textosDetalle.titulo }))
const dialogoEdicion = () => within(screen.getByRole('dialog', { name: catalogoEmpresas.edicion_empresa.titulo }))
const asentar = () => act(async () => vi.advanceTimersByTime(RETARDO))

describe('Empresas: las fuentes de la capa de rutas llegan hasta cada buscador', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
    sustitutas.empresas.mockReset().mockImplementation(() => Promise.resolve({ elementos: EMPRESAS, total: EMPRESAS.length }))
    sustitutas.usuarios.mockReset().mockImplementation(() => Promise.resolve({ elementos: usuarios, total: usuarios.length }))
    sustitutas.historial.mockReset().mockImplementation(() => Promise.resolve({ elementos: registros, total: registros.length }))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('el listado de empresas consulta la fuente de rutas con los filtros independientes', async () => {
    renderEmpresas()
    expect(sustitutas.empresas).toHaveBeenCalled()
    expect(sustitutas.empresas.mock.calls[0][0]).toBe('')
    expect(sustitutas.empresas.mock.calls[0][2]).toMatchObject({ estado: catalogoEmpresas.selectores.estado.opciones[0] })
    await asentar()
    expect(screen.getAllByRole('row').slice(1)).toHaveLength(catalogoEmpresas.paginacion.tamano)

    sustitutas.empresas.mockClear()
    fireEvent.change(screen.getByPlaceholderText(catalogoEmpresas.placeholders.buscar_empresa), { target: { value: 'norte' } })
    await asentar()
    expect(sustitutas.empresas.mock.calls.at(-1)?.[0]).toBe('norte')
  })

  it('la pestaña Usuarios del detalle consulta la fuente de rutas', async () => {
    renderEmpresas()
    await asentar()
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', empresa.nombre) }))
    fireEvent.click(dialogoDetalle().getByRole('tab', { name: textosDetalle.pestanas.usuarios }))
    expect(sustitutas.usuarios).toHaveBeenCalledWith('', undefined, { rol: TODOS_LOS_ROLES, estado: TODOS_LOS_ESTADOS })
    await asentar()
    expect(dialogoDetalle().getAllByRole('row').slice(1).length).toBeGreaterThan(0)
  })

  it('la pestaña Historial del detalle consulta la fuente de rutas', async () => {
    renderEmpresas()
    await asentar()
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.ver_detalle.replace(':nombre', empresa.nombre) }))
    fireEvent.click(dialogoDetalle().getByRole('tab', { name: textosDetalle.pestanas.historial }))
    expect(sustitutas.historial).toHaveBeenCalledWith('', undefined, { desde: null, hasta: null, tipo: TODOS_LOS_TIPOS })
    await asentar()
    expect(dialogoDetalle().getAllByRole('row').slice(1).length).toBeGreaterThan(0)
  })

  it('el modal de edición también usa la fuente de rutas en la pestaña Usuarios', async () => {
    renderEmpresas()
    await asentar()
    fireEvent.click(screen.getByRole('button', { name: catalogoEmpresas.botones.editar.replace(':nombre', empresa.nombre) }))
    fireEvent.click(dialogoEdicion().getByRole('tab', { name: textosDetalle.pestanas.usuarios }))
    expect(sustitutas.usuarios).toHaveBeenCalledWith('', undefined, { rol: TODOS_LOS_ROLES, estado: TODOS_LOS_ESTADOS })
  })
})
