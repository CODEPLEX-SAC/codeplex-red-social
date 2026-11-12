import { act, fireEvent, render, screen } from '@testing-library/react'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import { DESTACADOS } from '@/rutas/marketplace/rutas_marketplace'
import type { FuenteBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { Destacado } from '@/tipos/marketplace/modelo_marketplace'

const sustituta = vi.hoisted(() => ({ fuente: vi.fn<FuenteBusqueda<Destacado>>() }))

vi.mock('@/rutas/marketplace/rutas_marketplace', async (importarOriginal) => {
  const original = await importarOriginal<typeof import('@/rutas/marketplace/rutas_marketplace')>()
  return { ...original, BUSQUEDA_DESTACADOS_MARKETPLACE: { fuente: sustituta.fuente, modo: 'remota' } }
})

const textos = catalogoCompartido.busqueda
const RETARDO = textos.retardo_remoto_ms
const botonesDePlanes = () => screen.queryAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })
const escribir = (texto: string) => fireEvent.change(screen.getByRole('searchbox', { name: catalogoMarketplace.placeholders.buscar }), { target: { value: texto } })

function diferida<T>() {
  let resolver: (valor: T) => void = () => undefined
  const promesa = new Promise<T>((alResolver) => {
    resolver = alResolver
  })
  return { promesa, resolver }
}

describe('MKT-01: la página admite una fuente asíncrona sin cambiar la interfaz', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
    sustituta.fuente.mockReset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('muestra la carga, presenta el resultado de la fuente y espera el retardo antes de consultar', async () => {
    const respuesta = diferida<ResultadoBusquedaLista<Destacado>>()
    sustituta.fuente.mockImplementation(() => respuesta.promesa)
    render(<PaginaMarketplace />)
    expect(sustituta.fuente).toHaveBeenCalledWith('', undefined)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    await act(async () => respuesta.resolver({ elementos: DESTACADOS.slice(0, 2), total: 2 }))
    expect(screen.queryByRole('progressbar')).toBeNull()
    expect(botonesDePlanes()).toHaveLength(2)

    sustituta.fuente.mockClear()
    escribir('conta')
    act(() => vi.advanceTimersByTime(RETARDO - 1))
    expect(sustituta.fuente).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(sustituta.fuente).toHaveBeenCalledWith('conta', undefined)
  })

  it('un error de la fuente muestra el mensaje común de error', async () => {
    sustituta.fuente.mockImplementation((consulta) => (consulta === '' ? Promise.resolve({ elementos: DESTACADOS, total: DESTACADOS.length }) : Promise.reject({ codigo: 'no_disponible' })))
    render(<PaginaMarketplace />)
    await act(async () => vi.advanceTimersByTime(RETARDO))
    escribir('conta')
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
  })
})
