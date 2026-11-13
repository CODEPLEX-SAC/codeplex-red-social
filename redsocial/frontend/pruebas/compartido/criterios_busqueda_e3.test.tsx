import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaAmigosTodos } from '@/paginas/amigos/pagina_amigos_todos'
import { PaginaEventosParaTi } from '@/paginas/eventos/pagina_eventos_para_ti'
import { PaginaGuardados } from '@/paginas/guardados/pagina_guardados'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import catalogoGuardados from '../../catalogos/capacidades/redsocial/guardados.json'

vi.mock('@codeplex-sac/mapas', () => ({
  CodeplexMapa: ({ marcadores }: { marcadores: { id: string; titulo: string }[] }) => (
    <ul aria-label="marcadores del mapa">
      {marcadores.map((marcador) => (
        <li key={marcador.id}>{marcador.titulo}</li>
      ))}
    </ul>
  ),
}))

const escribir = (campo: HTMLElement, texto: string) => fireEvent.change(campo, { target: { value: texto } })
const destacado = () => screen.queryByRole('heading', { level: 3, name: /Codeplex Live|Feria de Emprendimiento|Innovación Tecnológica|Maratón/ })

describe('AMI-02: Tus amigos', { timeout: 30000 }, () => {
  it('filtra los amigos por nombre sin distinguir tildes, junto al selector de estado, y anuncia solo el nombre', () => {
    render(<PaginaAmigosTodos />)
    const seccion = screen.getByRole('heading', { name: catalogoAmigos.secciones.tus_amigos }).parentElement as HTMLElement
    const filas = () => within(seccion).queryAllByRole('button', { name: catalogoAmigos.botones.mensaje })
    const total = filas().length
    expect(catalogoAmigos.placeholders.buscar_amigos).toBe('Buscar amigo por nombre...')
    const buscador = screen.getByPlaceholderText(catalogoAmigos.placeholders.buscar_amigos)

    escribir(buscador, 'perez')
    expect(filas()).toHaveLength(1)
    expect(within(seccion).getByText('Roberto Pérez')).toBeInTheDocument()

    escribir(buscador, 'en línea')
    expect(filas()).toHaveLength(0)

    escribir(buscador, '')
    expect(filas()).toHaveLength(total)
  })
})

describe('GRD-01: grupos guardados', { timeout: 30000 }, () => {
  it('filtra por el nombre del grupo guardado sin distinguir tildes y mayúsculas', () => {
    render(<PaginaGuardados />)
    expect(catalogoGuardados.placeholders.buscar_guardados).toBe('Buscar en Guardados...')
    const buscador = screen.getByPlaceholderText(catalogoGuardados.placeholders.buscar_guardados)
    expect(buscador).toHaveAccessibleName(catalogoGuardados.campos.buscar_guardados)

    escribir(buscador, 'DISENO')
    expect(screen.getAllByText('Diseño UX/UI LATAM').length).toBeGreaterThan(0)
    expect(screen.queryByText('Desarrollo Web')).toBeNull()

    escribir(buscador, 'zzz')
    expect(screen.queryByText('Diseño UX/UI LATAM')).toBeNull()
  })
})

describe('EVT-04 y EVT-05: búsqueda en «Para ti»', { timeout: 30000 }, () => {
  it('«Buscar eventos» filtra los destacados por nombre sin tildes y no altera «Próximos»', () => {
    render(<PaginaEventosParaTi />)
    expect(catalogoEventos.placeholders.buscar_eventos).toBe('Buscar eventos...')
    const buscador = screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_eventos)
    expect(screen.getAllByText('Codeplex Tech Summit').length).toBeGreaterThan(0)

    escribir(buscador, 'maraton')
    expect(destacado()).toHaveTextContent('Maratón Codeplex 10K')
    expect(screen.queryByRole('heading', { level: 3, name: 'Concierto Codeplex Live 2026' })).toBeNull()
    expect(screen.getAllByText('Codeplex Tech Summit').length).toBeGreaterThan(0)

    escribir(buscador, 'arena')
    expect(destacado()).toBeNull()
  })

  it('el campo de ubicación filtra por ciudad o lugar del evento, es independiente del nombre y se combina con él', () => {
    render(<PaginaEventosParaTi />)
    expect(catalogoEventos.placeholders.ubicacion).toBe('Buscar ciudad o lugar...')
    const evento = screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_eventos)
    const lugar = screen.getByPlaceholderText(catalogoEventos.placeholders.ubicacion)

    escribir(lugar, 'ARENA')
    expect(destacado()).toHaveTextContent('Concierto Codeplex Live 2026')

    escribir(lugar, 'universidad')
    expect(destacado()).toHaveTextContent('Congreso de Innovación Tecnológica')

    escribir(evento, 'maraton')
    expect(destacado()).toBeNull()

    escribir(lugar, 'playas')
    expect(destacado()).toHaveTextContent('Maratón Codeplex 10K')

    escribir(evento, '')
    escribir(lugar, 'maraton')
    expect(destacado()).toBeNull()
  })
})

describe('EVT-02 y EVT-03: panel de ubicación', { timeout: 30000 }, () => {
  const abrirPanel = () => {
    render(<PaginaEventosParaTi />)
    fireEvent.click(screen.getByRole('button', { name: new RegExp(catalogoEventos.filtros.ubicacion) }))
  }

  it('el buscador de la lista filtra las ciudades por nombre sin tildes y conserva la selección', () => {
    abrirPanel()
    expect(catalogoEventos.placeholders.buscar_ubicacion).toBe('Buscar ciudad...')
    const buscador = screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_ubicacion)
    expect(screen.getAllByRole('radio').length).toBeGreaterThan(1)

    escribir(buscador, 'AREQUIPA')
    expect(screen.getAllByRole('radio')).toHaveLength(1)
    expect(screen.getByRole('radio', { name: 'Arequipa' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('radio', { name: 'Arequipa' }))
    expect(screen.getByRole('radio', { name: 'Arequipa' })).toBeChecked()

    escribir(buscador, 'zzz')
    expect(screen.queryAllByRole('radio')).toHaveLength(0)
  })

  it('«Lugar en el mapa» filtra los marcadores por nombre del lugar sin tildes', () => {
    abrirPanel()
    expect(catalogoEventos.placeholders.buscar_lugar_mapa).toBe('Buscar lugar en el mapa...')
    const buscador = screen.getByPlaceholderText(catalogoEventos.placeholders.buscar_lugar_mapa)
    const marcadores = () => within(screen.getByRole('list', { name: 'marcadores del mapa' })).queryAllByRole('listitem').map((marcador) => marcador.textContent)
    expect(marcadores().length).toBeGreaterThan(1)

    escribir(buscador, 'ARENA')
    expect(marcadores()).toEqual(['Arena 1'])

    escribir(buscador, 'universidad de lima')
    expect(marcadores()).toEqual(['Universidad de Lima'])

    escribir(buscador, '')
    expect(marcadores().length).toBeGreaterThan(1)
  })
})
