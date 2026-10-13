import { render, screen, within } from '@testing-library/react'
import { PaginaMensajesVideollamadaEnCurso } from '@/paginas/mensajeria/pagina_mensajes_videollamada_en_curso'
import { SeccionReunionesProgramadas } from '@/componentes/mensajeria/bloques/seccion_reuniones_programadas'
import { PARTICIPANTES, REUNIONES_PROGRAMADAS, REUNION_EN_CURSO } from '../../rutas/mensajeria/rutas_mensajeria'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

const PARAMETRO = catalogoMensajeria.parametros_ruta.reunion

function cabeceraDeSala(titulo: string): HTMLElement {
  return screen.getByText(titulo).closest('header') as HTMLElement
}

function listaDeParticipantes(): HTMLElement {
  return screen.getByRole('heading', { level: 2, name: new RegExp(`^${catalogoMensajeria.botones.participantes}`) }).closest('aside') as HTMLElement
}

function abrirSala(id: string | null) {
  window.history.pushState({}, '', id === null ? catalogoMensajeria.rutas.videollamada_en_curso : `${catalogoMensajeria.rutas.videollamada_en_curso}?${PARAMETRO}=${id}`)
  return render(<PaginaMensajesVideollamadaEnCurso />)
}

describe('Unirse conserva la identidad de la reunion seleccionada', () => {
  afterEach(() => window.history.pushState({}, '', '/'))

  it('cada reunion programada tiene un identificador estable y propio', () => {
    const ids = REUNIONES_PROGRAMADAS.map((reunion) => reunion.id)
    expect(new Set(ids).size).toBe(REUNIONES_PROGRAMADAS.length)
    ids.forEach((id) => expect(id).toMatch(/^[a-z-]+$/))
  })

  it('el enlace Unirse de cada tarjeta apunta a la sala con el identificador de esa reunion, tomando ruta y parametro del catalogo', () => {
    render(<SeccionReunionesProgramadas REUNIONES_PROGRAMADAS={REUNIONES_PROGRAMADAS} />)
    const enlaces = screen.getAllByRole('link', { name: catalogoMensajeria.botones.unirse })
    expect(enlaces.map((enlace) => enlace.getAttribute('href'))).toEqual(
      REUNIONES_PROGRAMADAS.map((reunion) => `${catalogoMensajeria.rutas.videollamada_en_curso}?${PARAMETRO}=${reunion.id}`),
    )
  })

  it.each(REUNIONES_PROGRAMADAS.map((reunion) => [reunion.id, reunion] as const))('la sala de %s muestra su titulo y su horario', (id, reunion) => {
    abrirSala(id)
    const cabecera = cabeceraDeSala(reunion.titulo)
    expect(within(cabecera).getByText(reunion.titulo)).toBeInTheDocument()
    expect(within(cabecera).getByText(reunion.hora)).toBeInTheDocument()
  })

  it('dos reuniones distintas no se resuelven como una sola sala fija', () => {
    const [primera, segunda] = REUNIONES_PROGRAMADAS
    const { unmount } = abrirSala(primera.id)
    expect(screen.getByText(primera.titulo)).toBeInTheDocument()
    expect(screen.queryByText(segunda.titulo)).toBeNull()
    unmount()
    abrirSala(segunda.id)
    expect(screen.getByText(segunda.titulo)).toBeInTheDocument()
    expect(screen.queryByText(primera.titulo)).toBeNull()
  })

  it.each(REUNIONES_PROGRAMADAS.map((reunion) => [reunion.id, reunion.totalParticipantes] as const))('la sala de %s lista tantos participantes como declara su reunion (%i), en el mismo orden del modelo', (id, total) => {
    abrirSala(id)
    const lista = listaDeParticipantes()
    const nombres = within(lista).getAllByRole('article').map((fila) => within(fila).getAllByText(/.+/)[0].textContent)
    expect(nombres).toEqual(PARTICIPANTES.slice(0, total).map((participante) => participante.nombre))
    expect(within(lista).getByRole('heading', { level: 2 })).toHaveTextContent(`(${total})`)
  })

  it('un identificador desconocido no abre otra reunion ni la sala por defecto', () => {
    abrirSala('reunion-inexistente')
    expect(screen.queryByText(REUNION_EN_CURSO.titulo)).toBeNull()
    REUNIONES_PROGRAMADAS.forEach((reunion) => expect(screen.queryByText(reunion.titulo)).toBeNull())
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('sin identificador se conserva la sala de la llamada iniciada, con sus 15 participantes y sus controles', () => {
    abrirSala(null)
    expect(screen.getByText(REUNION_EN_CURSO.titulo)).toBeInTheDocument()
    expect(within(listaDeParticipantes()).getAllByRole('article')).toHaveLength(PARTICIPANTES.length)
    expect(screen.getAllByRole('link', { name: new RegExp(catalogoMensajeria.botones.salir_de_la_llamada) }).length).toBeGreaterThan(0)
  })

  it('una reunion programada conserva los mismos controles de la sala', () => {
    abrirSala(REUNIONES_PROGRAMADAS[0].id)
    expect(screen.getAllByRole('link', { name: new RegExp(catalogoMensajeria.botones.salir_de_la_llamada) }).length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: new RegExp(catalogoMensajeria.botones.ver_participantes) })).toBeInTheDocument()
  })
})
