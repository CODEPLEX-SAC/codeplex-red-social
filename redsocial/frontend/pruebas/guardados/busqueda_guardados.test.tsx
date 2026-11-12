import { act, fireEvent, render, screen } from '@testing-library/react'
import { PaginaGuardados } from '@/paginas/guardados/pagina_guardados'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoGuardados from '@/catalogos/capacidades/redsocial/guardados.json'
import { BUSQUEDA_GRUPOS_GUARDADOS, GRUPOS_GUARDADOS } from '@/rutas/guardados/rutas_guardados'
import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { GrupoGuardado } from '@/tipos/guardados/modelo_guardados'

const sustituta = vi.hoisted(() => ({ fuente: vi.fn<FuenteBusqueda<GrupoGuardado>>(), remoto: false }))

vi.mock('@/rutas/guardados/rutas_guardados', async (importarOriginal) => {
  const original = await importarOriginal<typeof import('@/rutas/guardados/rutas_guardados')>()
  return {
    ...original,
    BUSQUEDA_GRUPOS_GUARDADOS: {
      get fuente() {
        return sustituta.remoto ? sustituta.fuente : original.BUSQUEDA_GRUPOS_GUARDADOS.fuente
      },
      get modo() {
        return sustituta.remoto ? 'remota' : original.BUSQUEDA_GRUPOS_GUARDADOS.modo
      },
    },
  }
})

const textos = catalogoCompartido.busqueda
const RETARDO = textos.retardo_remoto_ms
const buscador = () => screen.getByPlaceholderText(catalogoGuardados.placeholders.buscar_guardados)
const escribir = (texto: string) => fireEvent.change(buscador(), { target: { value: texto } })
const tarjetas = () => screen.queryAllByRole('heading', { level: 2 }).filter((titulo) => GRUPOS_GUARDADOS.some((grupo) => grupo.nombre === titulo.textContent))

describe('GRD-01: guardados busca por el nombre del grupo guardado', { timeout: 30000 }, () => {
  beforeEach(() => {
    sustituta.remoto = false
  })

  it('la configuración por defecto es local', () => {
    expect(BUSQUEDA_GRUPOS_GUARDADOS.modo).toBe('local')
  })

  it('busca por nombre sin distinguir tildes y no por otros campos', () => {
    render(<PaginaGuardados />)
    const total = tarjetas().length
    escribir(GRUPOS_GUARDADOS[0].nombre.toUpperCase())
    expect(tarjetas().length).toBeGreaterThan(0)
    expect(tarjetas().length).toBeLessThanOrEqual(total)
    escribir('zzzz')
    expect(screen.getByText(textos.sin_resultados)).toBeInTheDocument()
    escribir('')
    expect(tarjetas()).toHaveLength(total)
  })

  it('el orden es un control independiente que no altera la consulta', () => {
    render(<PaginaGuardados />)
    const antes = tarjetas().map((t) => t.textContent)
    fireEvent.mouseDown(screen.getByRole('combobox', { name: catalogoGuardados.botones.mas_recientes }))
    fireEvent.click(screen.getByRole('option', { name: catalogoGuardados.botones.mas_antiguas }))
    expect(tarjetas().map((t) => t.textContent)).toEqual([...antes].reverse())
  })
})

describe('GRD-01: fuente asíncrona sin cambiar la interfaz', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
    sustituta.remoto = true
    sustituta.fuente.mockReset()
  })

  afterEach(() => {
    vi.useRealTimers()
    sustituta.remoto = false
  })

  it('consulta con retardo y muestra el error común si la fuente falla', async () => {
    sustituta.fuente.mockImplementation((consulta) => (consulta === '' ? Promise.resolve({ elementos: GRUPOS_GUARDADOS, total: GRUPOS_GUARDADOS.length }) : Promise.reject({ codigo: 'no_disponible' })))
    render(<PaginaGuardados />)
    await act(async () => vi.advanceTimersByTime(RETARDO))
    expect(tarjetas()).toHaveLength(GRUPOS_GUARDADOS.length)
    escribir('ana')
    act(() => vi.advanceTimersByTime(RETARDO - 1))
    expect(sustituta.fuente).not.toHaveBeenCalledWith('ana', undefined)
    await act(async () => vi.advanceTimersByTime(1))
    expect(screen.getByRole('alert')).toHaveTextContent(textos.error)
  })
})
