import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaMensajesVideollamadaEnCurso } from '@/paginas/mensajeria/pagina_mensajes_videollamada_en_curso'
import { PaginaMensajesVideollamadaIniciar } from '@/paginas/mensajeria/pagina_mensajes_videollamada_iniciar'
import { PaginaMensajesVideollamadas } from '@/paginas/mensajeria/pagina_mensajes_videollamadas'
import { rutaDeVideollamadaA } from '@/componentes/mensajeria/bloques/logica_videollamadas'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { CONTACTOS_FRECUENTES, HISTORIAL, LLAMADAS_RECIENTES, REUNIONES_PROGRAMADAS } from '../../servicios/mensajeria/videollamadas'

const botones = catalogoMensajeria.botones
const filtros = catalogoMensajeria.filtros
const limites = catalogoMensajeria.limites_listas
const llamar = () => screen.getAllByRole('button', { name: /^Videollamar a / })
const reunionesDelPanel = () => screen.getAllByRole('article').filter((fila) => within(fila).queryByRole('link', { name: botones.unirse }))

describe('Videollamadas: listas completas, filtros y reuniones', { timeout: 30000 }, () => {
  it('el historial de Pedro tiene 20 llamadas, 6 reuniones y claves únicas', () => {
    expect(LLAMADAS_RECIENTES).toHaveLength(20)
    expect(REUNIONES_PROGRAMADAS).toHaveLength(6)
    expect(new Set(LLAMADAS_RECIENTES.map((llamada) => llamada.id)).size).toBe(20)
    expect(new Set(HISTORIAL.map((entrada) => entrada.id)).size).toBe(HISTORIAL.length)
  })

  it('«Ver más llamadas» despliega las 20 llamadas y «Ver menos» vuelve al resumen', () => {
    render(<PaginaMensajesVideollamadas />)
    const antes = llamar().length
    expect(antes).toBe(limites.llamadas)
    fireEvent.click(screen.getByRole('button', { name: botones.ver_mas_llamadas }))
    expect(llamar().length - antes).toBe(20 - limites.llamadas)
    fireEvent.click(screen.getByRole('button', { name: botones.ver_menos_llamadas }))
    expect(llamar()).toHaveLength(antes)
  })

  it('los chips filtran contactos y grupos, y la búsqueda filtra por nombre', () => {
    render(<PaginaMensajesVideollamadas />)
    fireEvent.click(screen.getByRole('button', { name: filtros.grupos, pressed: false }))
    const gruposTotales = LLAMADAS_RECIENTES.filter((llamada) => llamada.esGrupo).length
    expect(llamar()).toHaveLength(gruposTotales)
    expect(screen.queryByRole('button', { name: botones.ver_mas_llamadas })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: filtros.contactos, pressed: false }))
    expect(llamar()).toHaveLength(limites.llamadas)
    fireEvent.click(screen.getByRole('button', { name: filtros.recientes, pressed: false }))
    fireEvent.change(screen.getByRole('searchbox', { name: catalogoMensajeria.placeholders.buscar_videollamadas }), { target: { value: 'zzzz' } })
    expect(screen.getByText(catalogoMensajeria.leyendas.sin_llamadas)).toBeInTheDocument()
  })

  it('el menú ⋮ abre «Reuniones programadas» dentro del contenedor y permite volver', () => {
    render(<PaginaMensajesVideollamadas />)
    fireEvent.click(screen.getByRole('button', { name: botones.menu_videollamadas }))
    fireEvent.click(screen.getByRole('menuitem', { name: new RegExp(filtros.reuniones_programadas) }))
    expect(screen.getByRole('button', { name: botones.volver_a_llamadas })).toBeInTheDocument()
    expect(screen.queryByRole('searchbox', { name: catalogoMensajeria.placeholders.buscar_videollamadas })).toBeNull()
    expect(reunionesDelPanel().length).toBeGreaterThanOrEqual(REUNIONES_PROGRAMADAS.length)
    fireEvent.click(screen.getByRole('button', { name: botones.volver_a_llamadas }))
    expect(screen.getByRole('searchbox', { name: catalogoMensajeria.placeholders.buscar_videollamadas })).toBeInTheDocument()
  })

  it('«Ver todo el historial» y «Ver todas las reuniones» despliegan el contenido completo', () => {
    render(<PaginaMensajesVideollamadas />)
    const entradas = () => screen.getAllByText(/^Videollamada (con|grupal)/).length
    expect(entradas()).toBe(limites.historial)
    fireEvent.click(screen.getByRole('button', { name: botones.ver_todo_el_historial }))
    expect(entradas()).toBe(HISTORIAL.length)
    fireEvent.click(screen.getByRole('button', { name: botones.ver_menos_historial }))
    expect(entradas()).toBe(limites.historial)

    expect(reunionesDelPanel()).toHaveLength(limites.reuniones)
    fireEvent.click(screen.getByRole('button', { name: botones.ver_todas_las_reuniones }))
    expect(reunionesDelPanel()).toHaveLength(REUNIONES_PROGRAMADAS.length)
  })

  it('videollamar desde recientes y desde contactos frecuentes lleva a iniciar la videollamada con ese contacto', () => {
    const destinos: (string | null)[] = []
    const clic = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      destinos.push(this.getAttribute('href'))
    })
    render(<PaginaMensajesVideollamadas />)
    fireEvent.click(screen.getByRole('button', { name: botones.videollamar_a.replace(':nombre', 'María Fernández') }))
    expect(destinos).toEqual([rutaDeVideollamadaA('María Fernández')])
    clic.mockRestore()
    const enlaces = screen.getAllByRole('link', { name: botones.videollamar })
    expect(enlaces.map((enlace) => enlace.getAttribute('href'))).toEqual(CONTACTOS_FRECUENTES.map((contacto) => rutaDeVideollamadaA(contacto.nombre)))
    expect(rutaDeVideollamadaA('María Fernández')).toBe(`${catalogoMensajeria.rutas.videollamada_iniciar}?${catalogoMensajeria.parametros_ruta.contacto}=${encodeURIComponent('María Fernández')}`)
  })

  it('«Ver todos» en contactos frecuentes muestra todos sin desplazamiento y «Ver menos» vuelve al carrusel', () => {
    render(<PaginaMensajesVideollamadas />)
    const pista = () => screen.getAllByRole('link', { name: botones.videollamar })[0].closest('article')?.parentElement as HTMLElement
    expect(pista()).toHaveClass('overflow-x-auto')
    fireEvent.click(screen.getByRole('button', { name: botones.ver_todos }))
    expect(pista()).toHaveClass('flex-wrap')
    expect(pista()).not.toHaveClass('overflow-x-auto')
    fireEvent.click(screen.getByRole('button', { name: botones.ver_menos_contactos }))
    expect(pista()).toHaveClass('overflow-x-auto')
  })

  describe('con un contacto seleccionado', () => {
    afterEach(() => window.history.pushState({}, '', '/'))

    it('la pantalla de iniciar muestra a ese contacto como participante y su subtítulo', () => {
      window.history.pushState({}, '', rutaDeVideollamadaA('Carmen López'))
      render(<PaginaMensajesVideollamadaIniciar />)
      expect(screen.getByText(catalogoMensajeria.subtitulos.videollamada_con.replace(':nombre', 'Carmen López'))).toBeInTheDocument()
      expect(screen.getAllByText('Carmen López')).toHaveLength(1)
      const enlace = new URL(screen.getByRole('link', { name: botones.iniciar_videollamada }).getAttribute('href') ?? String(), window.location.origin)
      expect(enlace.pathname).toBe(catalogoMensajeria.rutas.videollamada_en_curso)
      expect(enlace.searchParams.get(catalogoMensajeria.parametros_ruta.contacto)).toBe('Carmen López')
    })

    it('la sala en curso es una llamada directa que inicia con Pedro solo, a la espera del contacto', () => {
      window.history.pushState({}, '', `${catalogoMensajeria.rutas.videollamada_en_curso}?${catalogoMensajeria.parametros_ruta.contacto}=${encodeURIComponent('María Fernández')}`)
      render(<PaginaMensajesVideollamadaEnCurso />)
      expect(screen.getByText('Videollamada con María Fernández')).toBeInTheDocument()
      expect(screen.queryByText(/Estás solo en la reunión/)).toBeNull()
      expect(screen.queryAllByRole('article')).toHaveLength(0)
    })
  })

  it('el historial reciente no tiene menú de tres puntos y los nombres de contactos frecuentes se truncan en una línea', () => {
    render(<PaginaMensajesVideollamadas />)
    expect(screen.queryAllByRole('button', { name: botones.mas_opciones })).toHaveLength(0)
    const nombre = screen.getAllByRole('link', { name: botones.videollamar })[0].closest('article')?.querySelector('span[tabindex="0"]')
    expect(nombre).toHaveClass('truncate', 'text-nombre-fila')
    expect(nombre?.textContent).toBe(CONTACTOS_FRECUENTES[0].nombre)
  })
})
