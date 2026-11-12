import { act, render, screen } from '@testing-library/react'
import { PanelFiltroCategoria } from '@/componentes/eventos/bloques/panel_filtro_categoria'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { leerFuentesFrontend } from './leer_fuentes'
import patronesLlamadasDatos from './patrones_llamadas_datos.json'
import type { CategoriaFiltroEvento } from '@/tipos/eventos/contrato_filtro_categoria'
import type { ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'

const FUENTES = await leerFuentesFrontend()

function diferida<T>() {
  let resolver: (valor: T) => void = () => undefined
  let rechazar: (causa: unknown) => void = () => undefined
  const promesa = new Promise<T>((alResolver, alRechazar) => {
    resolver = alResolver
    rechazar = alRechazar
  })
  return { promesa, resolver, rechazar }
}

const LLAMADAS_DE_DATOS = new RegExp(patronesLlamadasDatos.patrones.join('|'))

describe('Sustitución de la fuente Mock por una fuente asíncrona sin cambiar la interfaz', { timeout: 30000 }, () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('el panel de categorías de Eventos admite la misma sustitución con su propia estructura de resultado', async () => {
    const categorias: CategoriaFiltroEvento[] = [
      { icono: 'calendario', color: 'morado', nombre: 'Música', conteo: '3' },
      { icono: 'calendario', color: 'azul', nombre: 'Tecnología', conteo: '5' },
    ]
    const respuesta = diferida<ResultadoBusquedaLista<CategoriaFiltroEvento>>()
    render(<PanelFiltroCategoria categorias={[]} fuente={() => respuesta.promesa} seleccionadas={[]} alCambiarSeleccion={vi.fn()} onCerrar={vi.fn()} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    await act(async () => respuesta.resolver({ elementos: categorias, total: 2 }))
    expect(screen.getByText('Música')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_categorias)).toBeInTheDocument()
  })
})

describe('Separación entre interfaz, lógica y fuentes de datos', () => {
  const INFRAESTRUCTURA = [
    '/componentes/compartido/interfaz/usar_busqueda.ts',
    '/componentes/compartido/interfaz/fuente_busqueda_local.ts',
    '/componentes/compartido/interfaz/mensaje_estado_busqueda.tsx',
    '/tipos/compartido/contrato_busqueda.ts',
  ]

  it('la infraestructura de búsqueda no importa servicios ni rutas y no realiza llamadas HTTP', () => {
    INFRAESTRUCTURA.forEach((ruta) => {
      const texto = FUENTES.find((fuente) => fuente.ruta === ruta)?.texto ?? ''
      expect(texto.length, ruta).toBeGreaterThan(0)
      expect(texto, ruta).not.toMatch(/from '[^']*\/(servicios|rutas|paginas)\//)
      expect(texto, ruta).not.toMatch(LLAMADAS_DE_DATOS)
    })
  })

  it('ningún componente ni contrato de búsqueda importa servicios, y no hay llamadas HTTP fuera de la capa de servicios', () => {
    const interfaz = FUENTES.filter((fuente) => fuente.ruta.startsWith('/componentes/') && /\.tsx?$/.test(fuente.ruta))
    interfaz.forEach((fuente) => expect(fuente.texto, fuente.ruta).not.toMatch(/from '[^']*\/servicios\//))
    const conLlamadas = FUENTES.filter((fuente) => !fuente.ruta.startsWith('/servicios/') && /\.tsx?$/.test(fuente.ruta) && LLAMADAS_DE_DATOS.test(fuente.texto))
    expect(conLlamadas.map((fuente) => fuente.ruta)).toEqual([])
  })
})
