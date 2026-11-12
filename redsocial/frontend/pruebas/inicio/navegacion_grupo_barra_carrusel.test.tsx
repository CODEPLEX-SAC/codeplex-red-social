import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaGruposDetalle } from '@/paginas/grupos/pagina_grupos_detalle'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import { PUERTO_GRUPOS, rutaDeGrupo } from '../../rutas/grupos/rutas_grupos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

vi.setConfig({ testTimeout: 40000 })

describe('Barra superior: Amigos y Mensajes navegan', () => {
  it('el icono de Amigos lleva a Amigos y el de Mensajes a Mensajes', () => {
    const destinos: (string | null)[] = []
    const clic = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      destinos.push(this.getAttribute('href'))
    })
    render(<PaginaInicio />)
    const barra = within(screen.getByRole('banner'))
    fireEvent.click(barra.getByRole('button', { name: textosRedSocial.AMIGOS }))
    fireEvent.click(barra.getByRole('button', { name: new RegExp(textosRedSocial.MENSAJES) }))
    expect(destinos).toEqual([catalogoAmigos.rutas.todos, catalogoMensajeria.rutas.todos])
    clic.mockRestore()
  })
})

describe('Inicio: publicacion compartida de un grupo', () => {
  it('el nombre del grupo de origen es un enlace a su pagina', () => {
    render(<PaginaInicio />)
    const enlaces = screen.getAllByRole('link', { name: 'Ingenieros Unidos' })
    expect(enlaces.length).toBeGreaterThan(0)
    for (const enlace of enlaces) expect(enlace).toHaveAttribute('href', rutaDeGrupo('ingenieros-unidos'))
  })
})

describe('Grupo al que no se pertenece', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('se ve como visitante, con Unirme y sin Invitar ni publicador, y al unirse pasa a ser miembro', () => {
    window.history.pushState({}, '', rutaDeGrupo('ingenieros-unidos'))
    render(<PaginaGruposDetalle />)
    expect(screen.getByRole('heading', { level: 1, name: 'Ingenieros Unidos' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: catalogoGrupos.detalle.invitar })).toBeNull()
    expect(screen.queryByRole('button', { name: new RegExp(catalogoGrupos.detalle.membresia.etiqueta) })).toBeNull()
    expect(PUERTO_GRUPOS.tusGrupos().some((grupo) => grupo.nombre === 'Ingenieros Unidos')).toBe(false)
    fireEvent.click(screen.getByRole('button', { name: catalogoGrupos.sugerencias.unirme }))
    expect(PUERTO_GRUPOS.tusGrupos().some((grupo) => grupo.nombre === 'Ingenieros Unidos')).toBe(true)
    expect(screen.getByRole('button', { name: new RegExp(catalogoGrupos.detalle.membresia.etiqueta) })).toBeInTheDocument()
  })
})

describe('Marketplace: carrusel de banners', () => {
  it('muestra el primer banner, avanza con las flechas y con los indicadores, y Destacados ya no tiene Ver todos', () => {
    render(<PaginaMarketplace />)
    const carrusel = within(screen.getByRole('region', { name: catalogoMarketplace.carrusel.etiqueta }))
    const total = carrusel.getAllByRole('button', { name: /Ir al banner/ }).length
    expect(total).toBe(3)
    const alt = (n: number) => catalogoMarketplace.carrusel.imagen.replace(':n', String(n)).replace(':total', String(total))
    expect(carrusel.getByRole('img', { name: alt(1) })).toBeInTheDocument()
    fireEvent.click(carrusel.getByRole('button', { name: catalogoMarketplace.carrusel.siguiente }))
    expect(carrusel.getByRole('img', { name: alt(2) })).toBeInTheDocument()
    fireEvent.click(carrusel.getByRole('button', { name: catalogoMarketplace.carrusel.indicador.replace(':n', '3') }))
    expect(carrusel.getByRole('img', { name: alt(3) })).toBeInTheDocument()
    fireEvent.click(carrusel.getByRole('button', { name: catalogoMarketplace.carrusel.siguiente }))
    expect(carrusel.getByRole('img', { name: alt(1) })).toBeInTheDocument()
    const destacados = screen.getByRole('heading', { level: 2, name: catalogoMarketplace.secciones.destacados }).parentElement as HTMLElement
    expect(within(destacados).queryByRole('link')).toBeNull()
  })
})
