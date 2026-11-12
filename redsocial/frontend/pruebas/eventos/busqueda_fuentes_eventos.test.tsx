import { act, fireEvent, render, screen } from '@testing-library/react'
import { PanelFiltroUbicacion } from '@/componentes/eventos/bloques/panel_filtro_ubicacion'
import { PaginaEventosParaTi } from '@/paginas/eventos/pagina_eventos_para_ti'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { CIUDADES_FILTRO_PARA_TI, DESTACADOS, BUSQUEDA_EVENTOS_PARA_TI, MARCADORES_MAPA_PARA_TI } from '../../rutas/eventos/rutas_eventos'
import type { FuenteBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { CiudadFiltroEvento, MarcadorMapaEvento } from '@/tipos/eventos/contrato_filtro_ubicacion'

vi.mock('@codeplex-sac/mapas', () => ({
  CodeplexMapa: ({ marcadores }: { marcadores: { id: string; titulo: string }[] }) => (
    <ul aria-label="marcadores del mapa">
      {marcadores.map((marcador) => (
        <li key={marcador.id}>{marcador.titulo}</li>
      ))}
    </ul>
  ),
}))

const textos = catalogoCompartido.busqueda
const RETARDO = textos.retardo_remoto_ms
const escribir = (campo: HTMLElement, texto: string) => fireEvent.change(campo, { target: { value: texto } })
const buscadorCiudad = () => screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_ubicacion)
const buscadorLugar = () => screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_lugar_mapa)
const marcadoresMostrados = () => screen.getByLabelText('marcadores del mapa').querySelectorAll('li')

function diferida<T>() {
  let resolver: (valor: T) => void = () => undefined
  const promesa = new Promise<T>((alResolver) => {
    resolver = alResolver
  })
  return { promesa, resolver }
}

function sincrona<T, F>(fuente: FuenteBusqueda<T, F>, consulta: string, filtros?: F): ResultadoBusquedaLista<T> {
  const respuesta = fuente(consulta, undefined, filtros)
  if (respuesta instanceof Promise) throw new Error('la fuente local es sincrona')
  return respuesta
}

describe('EVT-04 y EVT-05: una sola fuente con el evento como consulta y la ubicación como filtro', { timeout: 30000 }, () => {
  it('EVT-04 busca solo por el nombre del evento', () => {
    const primero = DESTACADOS[0]
    expect(sincrona(BUSQUEDA_EVENTOS_PARA_TI.fuente, primero.nombre.toUpperCase()).elementos).toContain(primero)
    expect(sincrona(BUSQUEDA_EVENTOS_PARA_TI.fuente, primero.ubicacion).elementos).not.toContain(primero)
    expect(sincrona(BUSQUEDA_EVENTOS_PARA_TI.fuente, '').elementos).toHaveLength(DESTACADOS.length)
  })

  it('EVT-05 busca por ciudad o lugar sin tildes y se combina con el nombre', () => {
    const primero = DESTACADOS[0]
    expect(sincrona(BUSQUEDA_EVENTOS_PARA_TI.fuente, '', { ubicacion: primero.ubicacion.toUpperCase() }).elementos).toContain(primero)
    expect(sincrona(BUSQUEDA_EVENTOS_PARA_TI.fuente, primero.nombre, { ubicacion: primero.ubicacion }).elementos).toContain(primero)
    expect(sincrona(BUSQUEDA_EVENTOS_PARA_TI.fuente, primero.nombre, { ubicacion: 'zzzz' }).elementos).toHaveLength(0)
    expect(sincrona(BUSQUEDA_EVENTOS_PARA_TI.fuente, 'zzzz', { ubicacion: primero.ubicacion }).elementos).toHaveLength(0)
  })

  it('en la página los dos campos conviven y un texto sin coincidencias muestra el aviso común', () => {
    render(<PaginaEventosParaTi />)
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_eventos), 'zzzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_eventos), '')
    escribir(screen.getByPlaceholderText(catalogoEventos.placeholders.ubicacion), 'zzzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
  })
})

describe('EVT-02 y EVT-03: ciudades y lugares con fuente local', { timeout: 30000 }, () => {
  it('EVT-02 busca por ciudad y EVT-03 por lugar, sin tildes', () => {
    render(<PanelFiltroUbicacion ciudades={CIUDADES_FILTRO_PARA_TI} marcadores={MARCADORES_MAPA_PARA_TI} ciudadActual={null} onAplicar={vi.fn()} onCerrar={vi.fn()} />)
    escribir(buscadorCiudad(), CIUDADES_FILTRO_PARA_TI[0].nombre.toUpperCase())
    expect(screen.getAllByRole('radio').length).toBeGreaterThan(0)
    escribir(buscadorCiudad(), 'zzzz')
    expect(screen.queryAllByRole('radio')).toHaveLength(0)
    const lugar = MARCADORES_MAPA_PARA_TI.find((marcador) => marcador.nombreLugar !== undefined)
    if (!lugar?.nombreLugar) throw new Error('el conjunto de datos debe incluir un lugar con nombre')
    escribir(buscadorLugar(), lugar.nombreLugar.toUpperCase())
    expect(marcadoresMostrados().length).toBeGreaterThan(0)
    escribir(buscadorLugar(), 'zzzz')
    expect(marcadoresMostrados()).toHaveLength(0)
  })
})

describe('EVT-02 y EVT-03: fuentes inyectadas', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('EVT-02 espera el retardo, muestra la carga y presenta las ciudades de la fuente', async () => {
    const respuesta = diferida<ResultadoBusquedaLista<CiudadFiltroEvento>>()
    const fuente = vi.fn<FuenteBusqueda<CiudadFiltroEvento>>(() => respuesta.promesa)
    render(<PanelFiltroUbicacion ciudades={CIUDADES_FILTRO_PARA_TI} marcadores={MARCADORES_MAPA_PARA_TI} fuenteCiudades={fuente} ciudadActual={null} onAplicar={vi.fn()} onCerrar={vi.fn()} />)
    expect(fuente).toHaveBeenCalledWith('', undefined)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    await act(async () => respuesta.resolver({ elementos: CIUDADES_FILTRO_PARA_TI, total: CIUDADES_FILTRO_PARA_TI.length }))
    expect(screen.getAllByRole('radio')).toHaveLength(CIUDADES_FILTRO_PARA_TI.length)

    fuente.mockClear()
    escribir(buscadorCiudad(), 'lim')
    act(() => vi.advanceTimersByTime(RETARDO - 1))
    expect(fuente).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(fuente).toHaveBeenCalledWith('lim', undefined)
  })

  it('EVT-03 muestra el error de la fuente de lugares sin confundirlo con la falta de coincidencias', async () => {
    const fuente: FuenteBusqueda<MarcadorMapaEvento> = (consulta) => (consulta === '' ? Promise.resolve({ elementos: MARCADORES_MAPA_PARA_TI, total: MARCADORES_MAPA_PARA_TI.length }) : Promise.reject({ codigo: 'no_disponible' }))
    render(<PanelFiltroUbicacion ciudades={CIUDADES_FILTRO_PARA_TI} marcadores={MARCADORES_MAPA_PARA_TI} fuenteLugares={fuente} ciudadActual={null} onAplicar={vi.fn()} onCerrar={vi.fn()} />)
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir(buscadorLugar(), 'ana')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
  })

  it('EVT-02 descarta una respuesta obsoleta que llega después de la vigente', async () => {
    const lenta = diferida<ResultadoBusquedaLista<CiudadFiltroEvento>>()
    const rapida = diferida<ResultadoBusquedaLista<CiudadFiltroEvento>>()
    const fuente: FuenteBusqueda<CiudadFiltroEvento> = (consulta) => (consulta === '' ? Promise.resolve({ elementos: CIUDADES_FILTRO_PARA_TI, total: CIUDADES_FILTRO_PARA_TI.length }) : consulta === 'a' ? lenta.promesa : rapida.promesa)
    render(<PanelFiltroUbicacion ciudades={CIUDADES_FILTRO_PARA_TI} marcadores={MARCADORES_MAPA_PARA_TI} fuenteCiudades={fuente} ciudadActual={null} onAplicar={vi.fn()} onCerrar={vi.fn()} />)
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir(buscadorCiudad(), 'a')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir(buscadorCiudad(), 'ab')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    await act(async () => rapida.resolver({ elementos: [CIUDADES_FILTRO_PARA_TI[0]], total: 1 }))
    await act(async () => lenta.resolver({ elementos: CIUDADES_FILTRO_PARA_TI, total: CIUDADES_FILTRO_PARA_TI.length }))
    expect(screen.getAllByRole('radio')).toHaveLength(1)
  })
})
