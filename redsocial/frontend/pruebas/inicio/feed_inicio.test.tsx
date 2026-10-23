import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import { PaginaPerfilUsuario } from '@/paginas/perfil/pagina_perfil_usuario'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import { PUBLICACION_INICIO } from '../../rutas/inicio/rutas_inicio'
import { NO_LEIDOS } from '../../rutas/mensajeria/rutas_mensajeria'

const modal = catalogoInicio.modal_crear_publicacion
const feed = catalogoInicio.feed
const marcador = catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', 'Pedro')

function abrirCreador(tipo?: string) {
  fireEvent.click(screen.getByRole('button', { name: marcador }))
  const dialogo = within(screen.getByRole('dialog'))
  if (tipo) fireEvent.click(dialogo.getByRole('button', { name: tipo }))
  return dialogo
}

function pestana(etiqueta: string) {
  return screen.getByRole('tab', { name: etiqueta })
}

function tarjetaEstadistica(titulo: string) {
  return within(screen.getByText(titulo).closest('div') as HTMLElement)
}

describe('Estadisticas de actividad', () => {
  it('parten de las publicaciones propias existentes y suman las nuevas', () => {
    render(<PaginaInicio />)
    const [publicaciones, videos, compartidos] = catalogoInicio.estadisticas.tarjetas
    expect(tarjetaEstadistica(publicaciones.titulo).getByText('1')).toBeInTheDocument()

    const dialogo = abrirCreador()
    fireEvent.change(dialogo.getByRole('textbox', { name: modal.etiqueta_editor }), { target: { value: 'Una publicacion' } })
    fireEvent.click(dialogo.getByRole('button', { name: modal.publicar }))

    expect(tarjetaEstadistica(publicaciones.titulo).getByText('2')).toBeInTheDocument()
    expect(tarjetaEstadistica(videos.titulo).getByText('0')).toBeInTheDocument()
    expect(tarjetaEstadistica(compartidos.titulo).getByText('0')).toBeInTheDocument()
  })
})

describe('Pestanas del feed', () => {
  it('Inicio muestra las publicaciones y el resto muestra su estado vacio', () => {
    render(<PaginaInicio />)
    expect(screen.getByText(new RegExp(PUBLICACION_INICIO.texto))).toBeInTheDocument()

    for (const clave of ['videos', 'encuestas', 'preguntas'] as const) {
      const etiqueta = feed.pestanas.find((candidata) => candidata.clave === clave)?.etiqueta ?? ''
      fireEvent.click(pestana(etiqueta))
      expect(screen.getByRole('heading', { name: feed.vacio[clave].titulo })).toBeInTheDocument()
      expect(screen.queryByText(new RegExp(PUBLICACION_INICIO.texto))).toBeNull()
    }
    fireEvent.click(pestana(feed.pestanas[0].etiqueta))
    expect(screen.getByText(new RegExp(PUBLICACION_INICIO.texto))).toBeInTheDocument()
  })

  it('una encuesta publicada aparece solo en Encuestas y permite votar con porcentajes', () => {
    render(<PaginaInicio />)
    const tipoEncuesta = modal.tipos.find((tipo) => tipo.valor === 'encuesta')?.etiqueta ?? ''
    const dialogo = abrirCreador(tipoEncuesta)
    fireEvent.change(dialogo.getByRole('textbox', { name: modal.etiqueta_editor }), { target: { value: 'Que dia hacemos la reunion' } })
    fireEvent.change(dialogo.getByLabelText(modal.encuesta.etiqueta_opcion.replace(':numero', '1')), { target: { value: 'Lunes' } })
    fireEvent.change(dialogo.getByLabelText(modal.encuesta.etiqueta_opcion.replace(':numero', '2')), { target: { value: 'Martes' } })
    fireEvent.click(dialogo.getByRole('button', { name: modal.publicar }))

    fireEvent.click(pestana(feed.pestanas[2].etiqueta))
    const tarjeta = within(screen.getByText('Que dia hacemos la reunion').closest('article') as HTMLElement)
    expect(tarjeta.getByText(catalogoInicio.leyendas.por_tipo.encuesta)).toBeInTheDocument()
    expect(tarjeta.queryByText('100%')).toBeNull()

    fireEvent.click(tarjeta.getByRole('button', { name: 'Lunes' }))
    expect(tarjeta.getByText('100%')).toBeInTheDocument()
    expect(tarjeta.getByText('1 voto')).toBeInTheDocument()
    fireEvent.click(tarjeta.getByRole('button', { name: new RegExp('Martes') }))
    expect(tarjeta.getByText('1 voto')).toBeInTheDocument()
    expect(tarjeta.getByText('0%')).toBeInTheDocument()
  })

  it('una pregunta urgente muestra su prioridad', () => {
    render(<PaginaInicio />)
    const tipoPregunta = modal.tipos.find((tipo) => tipo.valor === 'pregunta')?.etiqueta ?? ''
    const urgente = modal.prioridad.opciones.find((opcion) => opcion.valor === 'urgente')?.etiqueta ?? ''
    const dialogo = abrirCreador(tipoPregunta)
    fireEvent.change(dialogo.getByRole('textbox', { name: modal.etiqueta_editor }), { target: { value: 'Como se declara el IGV' } })
    fireEvent.click(dialogo.getByText(urgente))
    fireEvent.click(dialogo.getByRole('button', { name: modal.publicar }))

    fireEvent.click(pestana(feed.pestanas[3].etiqueta))
    const tarjeta = within(screen.getByText('Como se declara el IGV').closest('article') as HTMLElement)
    expect(tarjeta.getByText(urgente)).toBeInTheDocument()
    expect(tarjeta.getByText(catalogoInicio.leyendas.por_tipo.pregunta)).toBeInTheDocument()
  })
})

describe('Las interacciones conservan su estado', () => {
  const botones = catalogoInicio.botones
  const comentarios = catalogoInicio.publicacion.comentarios

  function ejemplo() {
    return within(screen.getAllByText(new RegExp(PUBLICACION_INICIO.texto)).at(-1)?.closest('article') as HTMLElement)
  }

  it('la reaccion y un comentario nuevo sobreviven al cambiar de pestana y al volver a montar la pagina', () => {
    const { unmount } = render(<PaginaInicio />)
    fireEvent.click(ejemplo().getByRole('button', { name: new RegExp(botones.me_gusta) }))
    fireEvent.click(ejemplo().getByRole('button', { name: new RegExp(botones.comentar) }))
    const seccion = within(ejemplo().getByRole('region', { name: comentarios.etiqueta_seccion }))
    fireEvent.change(seccion.getByLabelText(comentarios.etiqueta_campo), { target: { value: 'Comentario persistente' } })
    fireEvent.click(seccion.getByRole('button', { name: comentarios.publicar }))

    fireEvent.click(pestana(feed.pestanas[1].etiqueta))
    fireEvent.click(pestana(feed.pestanas[0].etiqueta))
    expect(ejemplo().getByRole('button', { name: new RegExp(botones.me_gusta) })).toHaveAttribute('aria-pressed', 'true')

    unmount()
    render(<PaginaInicio />)
    expect(ejemplo().getByRole('button', { name: new RegExp(botones.me_gusta) })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(ejemplo().getByRole('button', { name: new RegExp(botones.comentar) }))
    expect(within(ejemplo().getByRole('region', { name: comentarios.etiqueta_seccion })).getByText('Comentario persistente')).toBeInTheDocument()
  })

  it('una publicacion nueva aparece tambien en el perfil propio', () => {
    const { unmount } = render(<PaginaInicio />)
    const dialogo = abrirCreador()
    fireEvent.change(dialogo.getByRole('textbox', { name: modal.etiqueta_editor }), { target: { value: 'Visible en mi perfil' } })
    fireEvent.click(dialogo.getByRole('button', { name: modal.publicar }))
    unmount()

    window.history.pushState({}, '', '/perfil')
    render(<PaginaPerfilUsuario />)
    expect(screen.getByText('Visible en mi perfil')).toBeInTheDocument()
    window.history.pushState({}, '', '/')
  })
})

describe('Mensajes flotantes', () => {
  const textos = catalogoInicio.mensajes_flotantes

  it('el boton abre la lista de mensajes sin leer con su total y enlaza a la mensajeria', () => {
    render(<PaginaInicio />)
    expect(screen.queryByRole('region', { name: textos.titulo })).toBeNull()
    const boton = screen.getByRole('button', { name: textos.boton })
    expect(within(boton.parentElement as HTMLElement).getByText(String(NO_LEIDOS.reduce((suma, mensaje) => suma + mensaje.badge, 0)))).toBeInTheDocument()

    fireEvent.click(boton)
    const panel = within(screen.getByRole('region', { name: textos.titulo }))
    for (const mensaje of NO_LEIDOS) expect(panel.getByText(mensaje.nombre)).toBeInTheDocument()
    expect(panel.getByRole('link', { name: textos.ver_todos })).toBeInTheDocument()

    fireEvent.click(panel.getByRole('button', { name: textos.cerrar }))
    expect(screen.queryByRole('region', { name: textos.titulo })).toBeNull()
  })
})
