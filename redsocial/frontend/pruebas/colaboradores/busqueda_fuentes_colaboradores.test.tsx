import { act, fireEvent, render, screen } from '@testing-library/react'
import { admiteColaborador, coincideColaborador, interpolarPlantilla } from '@/componentes/colaboradores/bloques/colaboradores_tabla_config'
import { crearFiltrosAvanzadosColaboradores } from '@/componentes/colaboradores/bloques/logica_filtros_avanzados_colaboradores'
import { SeccionListado } from '@/componentes/colaboradores/bloques/seccion_listado'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import { COLABORADORES, FILTROS_ESTADO_COLABORADORES } from '../../rutas/colaboradores/rutas_colaboradores'
import type { FiltrosBusquedaColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import type { FuenteBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const textos = catalogoCompartido.busqueda
const RETARDO = textos.retardo_remoto_ms
const selectores = catalogoColaboradores.selectores
const filasDeDatos = () => screen.getAllByRole('row').slice(1)
const buscador = () => screen.getByPlaceholderText(catalogoColaboradores.placeholders.buscar_colaborador)
const escribir = (texto: string) => fireEvent.change(buscador(), { target: { value: texto } })
const resumen = (desde: number, hasta: number, total: number) => interpolarPlantilla(catalogoColaboradores.paginacion.resumen, { desde, hasta, total })

const SIN_FILTROS: FiltrosBusquedaColaboradores = { estado: null, rol: selectores.rol_perfil.opciones[0], aplicacion: selectores.aplicaciones.opciones[0], avanzados: crearFiltrosAvanzadosColaboradores() }

function diferida<T>() {
  let resolver: (valor: T) => void = () => undefined
  const promesa = new Promise<T>((alResolver) => {
    resolver = alResolver
  })
  return { promesa, resolver }
}

function renderListado(fuente?: FuenteBusqueda<Colaborador, FiltrosBusquedaColaboradores>, colaboradores: Colaborador[] = COLABORADORES) {
  return render(
    <SeccionListado
      datos={{
        COLABORADORES: colaboradores,
        FILTROS_ESTADO_COLABORADORES,
        fuente,
        alVerColaborador: vi.fn(),
        alEditarColaborador: vi.fn(),
        alConfirmarBaja: vi.fn(),
        alReenviar: vi.fn(),
        alInvitarColaborador: vi.fn(),
        alFalloExportar: vi.fn(),
      }}
    />,
  )
}

describe('COL-01: criterio de búsqueda', () => {
  it('coincide por nombre y por correo sin distinguir tildes ni mayúsculas, y nunca por teléfono', () => {
    const colaborador = COLABORADORES[0]
    expect(coincideColaborador(colaborador, colaborador.nombre.toUpperCase())).toBe(true)
    expect(coincideColaborador(colaborador, colaborador.correo.toUpperCase())).toBe(true)
    expect(coincideColaborador(colaborador, colaborador.telefono)).toBe(false)
    expect(coincideColaborador(colaborador, colaborador.rol)).toBe(false)
  })

  it('estado, rol y aplicación son filtros independientes que no forman parte de la consulta', () => {
    const colaborador = COLABORADORES[0]
    expect(admiteColaborador(colaborador, SIN_FILTROS)).toBe(true)
    expect(admiteColaborador(colaborador, { ...SIN_FILTROS, estado: colaborador.estado })).toBe(true)
    const otroEstado = colaborador.estado === 'baja' ? 'activo' : 'baja'
    expect(admiteColaborador(colaborador, { ...SIN_FILTROS, estado: otroEstado })).toBe(false)
    expect(admiteColaborador(colaborador, { ...SIN_FILTROS, rol: colaborador.rol })).toBe(true)
    expect(admiteColaborador(colaborador, { ...SIN_FILTROS, rol: 'Rol inexistente' })).toBe(false)
    expect(admiteColaborador(colaborador, { ...SIN_FILTROS, aplicacion: colaborador.aplicaciones[0].nombre })).toBe(true)
    expect(admiteColaborador(colaborador, { ...SIN_FILTROS, aplicacion: 'Aplicación inexistente' })).toBe(false)
  })
})

describe('COL-01: la tabla conserva presentación y paginación con la búsqueda desacoplada', { timeout: 30000 }, () => {
  it('con la fuente local sigue mostrando la primera página del catálogo y el resumen', () => {
    render(<PaginaColaboradores />)
    expect(filasDeDatos()).toHaveLength(catalogoColaboradores.paginacion.tamano)
    expect(screen.getByText(resumen(1, 6, 6))).toBeInTheDocument()
  })

  it('al buscar la tabla reduce las filas y el resumen, y al borrar vuelve a la primera página', () => {
    render(<PaginaColaboradores />)
    escribir('rosa.jimenez@gmail')
    expect(filasDeDatos()).toHaveLength(1)
    expect(screen.getByText(resumen(1, 1, 1))).toBeInTheDocument()
    escribir('')
    expect(filasDeDatos()).toHaveLength(catalogoColaboradores.paginacion.tamano)
  })
})

describe('COL-01: fuente inyectada sin cambiar la tabla', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('espera el retardo, envía los filtros por separado y muestra la carga y el resultado', async () => {
    const respuesta = diferida<ResultadoBusquedaLista<Colaborador>>()
    const fuente = vi.fn<FuenteBusqueda<Colaborador, FiltrosBusquedaColaboradores>>(() => respuesta.promesa)
    renderListado(fuente, [])
    expect(fuente).toHaveBeenCalledTimes(1)
    expect(fuente.mock.calls[0][0]).toBe('')
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    await act(async () => respuesta.resolver({ elementos: COLABORADORES, total: COLABORADORES.length }))
    expect(screen.queryByRole('progressbar')).toBeNull()
    expect(filasDeDatos()).toHaveLength(catalogoColaboradores.paginacion.tamano)

    fuente.mockClear()
    escribir('rosa')
    act(() => vi.advanceTimersByTime(RETARDO - 1))
    expect(fuente).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(fuente).toHaveBeenCalledTimes(1)
    expect(fuente.mock.calls[0][0]).toBe('rosa')
    expect(fuente.mock.calls[0][2]).toMatchObject({ estado: null, rol: selectores.rol_perfil.opciones[0], aplicacion: selectores.aplicaciones.opciones[0] })
  })

  it('muestra el error de la fuente sin mostrar el aviso de sin coincidencias', async () => {
    const fuente: FuenteBusqueda<Colaborador, FiltrosBusquedaColaboradores> = (consulta) => (consulta === '' ? Promise.resolve({ elementos: COLABORADORES, total: COLABORADORES.length }) : Promise.reject({ codigo: 'no_disponible' }))
    renderListado(fuente, [])
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir('ana')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
  })

  it('descarta la respuesta obsoleta que llega después de la vigente', async () => {
    const lenta = diferida<ResultadoBusquedaLista<Colaborador>>()
    const rapida = diferida<ResultadoBusquedaLista<Colaborador>>()
    const fuente: FuenteBusqueda<Colaborador, FiltrosBusquedaColaboradores> = (consulta) => (consulta === '' ? Promise.resolve({ elementos: COLABORADORES, total: COLABORADORES.length }) : consulta === 'a' ? lenta.promesa : rapida.promesa)
    renderListado(fuente, [])
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir('a')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir('ab')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    await act(async () => rapida.resolver({ elementos: [COLABORADORES[0]], total: 1 }))
    await act(async () => lenta.resolver({ elementos: COLABORADORES, total: COLABORADORES.length }))
    expect(filasDeDatos()).toHaveLength(1)
  })
})
