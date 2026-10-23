import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import { rutaPerfilUsuario } from '../../componentes/compartido/interfaz/ruta_perfil_usuario'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'

const modal = catalogoInicio.modal_crear_publicacion
const reacciones = catalogoInicio.reacciones
const comentarios = catalogoInicio.publicacion.comentarios
const botones = catalogoInicio.botones
const marcador = catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', 'Pedro')
const [MEGUSTA, MEENCANTA, ASOMBROSO] = reacciones.opciones

function publicar(texto: string) {
  fireEvent.click(screen.getByRole('button', { name: marcador }))
  const dialogo = within(screen.getByRole('dialog'))
  fireEvent.change(dialogo.getByRole('textbox', { name: modal.etiqueta_editor }), { target: { value: texto } })
  fireEvent.click(dialogo.getByRole('button', { name: modal.publicar }))
}

function tarjeta(texto: string) {
  return within(screen.getByText(texto).closest('article') as HTMLElement)
}

function botonReaccion(texto: string) {
  return tarjeta(texto).getAllByRole('button', { name: new RegExp(reacciones.opciones.map((opcion) => opcion.etiqueta).join('|')) })[0]
}

function abrirPanel(boton: HTMLElement) {
  fireEvent.keyDown(boton, { key: reacciones.tecla_abrir })
  return within(screen.getByRole('toolbar', { name: reacciones.etiqueta_panel }))
}

function abrirComentarios(texto: string) {
  fireEvent.click(tarjeta(texto).getByRole('button', { name: new RegExp(botones.comentar) }))
  return within(tarjeta(texto).getByRole('region', { name: comentarios.etiqueta_seccion }))
}

function comentar(seccion: ReturnType<typeof within>, texto: string) {
  fireEvent.change(seccion.getByLabelText(comentarios.etiqueta_campo), { target: { value: texto } })
  fireEvent.click(seccion.getByRole('button', { name: comentarios.publicar }))
}

function elegirOpcionMenu(item: ReturnType<typeof within>, etiqueta: string) {
  fireEvent.click(item.getAllByRole('button', { name: comentarios.opciones })[0])
  fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: etiqueta }))
}

describe('Reacciones de la publicacion', () => {
  it('abre el panel con el teclado, ofrece las tres reacciones y se cierra con Escape', () => {
    render(<PaginaInicio />)
    publicar('Con panel')
    const panel = abrirPanel(botonReaccion('Con panel'))
    reacciones.opciones.forEach((opcion) => expect(panel.getByRole('button', { name: opcion.etiqueta })).toBeInTheDocument())
    fireEvent.keyDown(panel.getByRole('button', { name: MEGUSTA.etiqueta }), { key: catalogoCompartido.modal.tecla_cerrar })
    expect(screen.queryByRole('toolbar')).toBeNull()
  })

  it('abre el panel al pasar el raton con retardo y lo cierra al salir', () => {
    vi.useFakeTimers()
    try {
      render(<PaginaInicio />)
      publicar('Con raton')
      const contenedor = botonReaccion('Con raton').parentElement as HTMLElement
      fireEvent.pointerEnter(contenedor, { pointerType: 'mouse' })
      expect(screen.queryByRole('toolbar')).toBeNull()
      act(() => {
        vi.advanceTimersByTime(reacciones.retardo_apertura_ms)
      })
      expect(screen.getByRole('toolbar', { name: reacciones.etiqueta_panel })).toBeInTheDocument()
      fireEvent.pointerLeave(contenedor, { pointerType: 'mouse' })
      act(() => {
        vi.advanceTimersByTime(reacciones.retardo_cierre_ms)
      })
      expect(screen.queryByRole('toolbar')).toBeNull()
    } finally {
      vi.useRealTimers()
    }
  })

  it('elegir una reaccion la aplica, cambia la etiqueta y cuenta una sola reaccion', () => {
    render(<PaginaInicio />)
    publicar('Elegir reaccion')
    const tarj = tarjeta('Elegir reaccion')
    fireEvent.click(abrirPanel(botonReaccion('Elegir reaccion')).getByRole('button', { name: MEENCANTA.etiqueta }))

    const boton = tarj.getByRole('button', { name: MEENCANTA.etiqueta })
    expect(boton).toHaveAttribute('aria-pressed', 'true')
    expect(tarj.getByText('1 reacción')).toBeInTheDocument()
    expect(screen.queryByRole('toolbar')).toBeNull()

    fireEvent.click(abrirPanel(boton).getByRole('button', { name: ASOMBROSO.etiqueta }))
    expect(tarj.getByRole('button', { name: ASOMBROSO.etiqueta })).toHaveAttribute('aria-pressed', 'true')
    expect(tarj.getByText('1 reacción')).toBeInTheDocument()
  })

  it('volver a elegir la reaccion activa o pulsar el boton la retira', () => {
    render(<PaginaInicio />)
    publicar('Retirar reaccion')
    const tarj = tarjeta('Retirar reaccion')
    fireEvent.click(abrirPanel(botonReaccion('Retirar reaccion')).getByRole('button', { name: MEGUSTA.etiqueta }))
    expect(tarj.getByText('1 reacción')).toBeInTheDocument()

    fireEvent.click(abrirPanel(botonReaccion('Retirar reaccion')).getByRole('button', { name: MEGUSTA.etiqueta }))
    expect(tarj.getByText('0 reacciones')).toBeInTheDocument()
    expect(botonReaccion('Retirar reaccion')).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(abrirPanel(botonReaccion('Retirar reaccion')).getByRole('button', { name: ASOMBROSO.etiqueta }))
    fireEvent.click(tarj.getByRole('button', { name: ASOMBROSO.etiqueta }))
    expect(tarj.getByText('0 reacciones')).toBeInTheDocument()
    expect(botonReaccion('Retirar reaccion')).toHaveTextContent(botones.me_gusta)
  })

  it('una pulsacion larga tactil abre el panel sin aplicar la reaccion rapida', () => {
    vi.useFakeTimers()
    try {
      render(<PaginaInicio />)
      publicar('Pulsacion larga')
      const boton = botonReaccion('Pulsacion larga')
      fireEvent.pointerDown(boton, { pointerType: 'touch' })
      act(() => {
        vi.advanceTimersByTime(reacciones.pulsacion_larga_ms)
      })
      expect(screen.getByRole('toolbar', { name: reacciones.etiqueta_panel })).toBeInTheDocument()
      fireEvent.pointerUp(boton, { pointerType: 'touch' })
      fireEvent.click(boton)
      expect(boton).toHaveAttribute('aria-pressed', 'false')
    } finally {
      vi.useRealTimers()
    }
  })
})

describe('Comentarios de la publicacion', () => {
  it('responde a un comentario, anida la respuesta y suma ambas al contador', () => {
    render(<PaginaInicio />)
    publicar('Con respuestas')
    const seccion = abrirComentarios('Con respuestas')
    comentar(seccion, 'Primer comentario')

    fireEvent.click(seccion.getByRole('button', { name: comentarios.responder }))
    fireEvent.change(seccion.getByLabelText(comentarios.etiqueta_respuesta), { target: { value: 'Una respuesta' } })
    fireEvent.click(seccion.getByRole('button', { name: comentarios.enviar_respuesta }))

    const respuestas = within(seccion.getByRole('list', { name: comentarios.etiqueta_respuestas }))
    expect(respuestas.getByText('Una respuesta')).toBeInTheDocument()
    expect(seccion.queryByLabelText(comentarios.etiqueta_respuesta)).toBeNull()
    expect(tarjeta('Con respuestas').getByText('2 comentarios')).toBeInTheDocument()
  })

  it('edita un comentario propio, lo marca como editado y respeta Cancelar', () => {
    render(<PaginaInicio />)
    publicar('Con edicion')
    const seccion = abrirComentarios('Con edicion')
    comentar(seccion, 'Texto original')
    const item = within(seccion.getByText('Texto original').closest('li') as HTMLElement)

    elegirOpcionMenu(item, comentarios.menu[0].etiqueta)
    const campo = item.getByLabelText(comentarios.etiqueta_edicion)
    expect(campo).toHaveValue('Texto original')
    fireEvent.change(campo, { target: { value: 'Otro texto' } })
    fireEvent.click(item.getByRole('button', { name: comentarios.cancelar }))
    expect(seccion.getByText('Texto original')).toBeInTheDocument()

    elegirOpcionMenu(item, comentarios.menu[0].etiqueta)
    fireEvent.change(item.getByLabelText(comentarios.etiqueta_edicion), { target: { value: 'Texto corregido' } })
    fireEvent.click(item.getByRole('button', { name: comentarios.guardar }))
    expect(seccion.getByText('Texto corregido')).toBeInTheDocument()
    expect(seccion.getByText(comentarios.editado)).toBeInTheDocument()
    expect(seccion.queryByText('Texto original')).toBeNull()
  })

  it('elimina un comentario con confirmacion y retira tambien sus respuestas', () => {
    render(<PaginaInicio />)
    publicar('Con eliminacion')
    const seccion = abrirComentarios('Con eliminacion')
    comentar(seccion, 'Comentario a borrar')
    fireEvent.click(seccion.getByRole('button', { name: comentarios.responder }))
    fireEvent.change(seccion.getByLabelText(comentarios.etiqueta_respuesta), { target: { value: 'Respuesta hija' } })
    fireEvent.click(seccion.getByRole('button', { name: comentarios.enviar_respuesta }))
    expect(tarjeta('Con eliminacion').getByText('2 comentarios')).toBeInTheDocument()

    const raiz = within(seccion.getByText('Comentario a borrar').closest('li') as HTMLElement)
    elegirOpcionMenu(raiz, comentarios.menu[1].etiqueta)
    let dialogo = within(screen.getByRole('dialog', { name: comentarios.eliminar.titulo }))
    expect(dialogo.getByText(comentarios.eliminar.mensaje)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: comentarios.eliminar.cancelar }))
    expect(seccion.getByText('Comentario a borrar')).toBeInTheDocument()

    elegirOpcionMenu(raiz, comentarios.menu[1].etiqueta)
    dialogo = within(screen.getByRole('dialog', { name: comentarios.eliminar.titulo }))
    fireEvent.click(dialogo.getByRole('button', { name: comentarios.eliminar.confirmar }))
    expect(seccion.queryByText('Comentario a borrar')).toBeNull()
    expect(seccion.queryByText('Respuesta hija')).toBeNull()
    expect(tarjeta('Con eliminacion').getByText('0 comentarios')).toBeInTheDocument()
  })

  it('reacciona a un comentario de forma independiente de la publicacion', () => {
    render(<PaginaInicio />)
    publicar('Con reaccion')
    const seccion = abrirComentarios('Con reaccion')
    comentar(seccion, 'Comentario con reaccion')
    const item = within(seccion.getByText('Comentario con reaccion').closest('li') as HTMLElement)

    fireEvent.click(item.getByRole('button', { name: botones.me_gusta }))
    expect(item.getByRole('button', { name: botones.me_gusta })).toHaveAttribute('aria-pressed', 'true')
    expect(item.getByText('1')).toBeInTheDocument()
    expect(tarjeta('Con reaccion').getByText('0 reacciones')).toBeInTheDocument()

    fireEvent.click(abrirPanel(item.getByRole('button', { name: botones.me_gusta })).getByRole('button', { name: MEENCANTA.etiqueta }))
    expect(item.getByRole('button', { name: MEENCANTA.etiqueta })).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(item.getByRole('button', { name: MEENCANTA.etiqueta }))
    expect(item.getByRole('button', { name: botones.me_gusta })).toHaveAttribute('aria-pressed', 'false')
    expect(item.queryByText('1')).toBeNull()
  })

  it('el autor del comentario y de la publicacion enlazan a su perfil', () => {
    render(<PaginaInicio />)
    publicar('Con enlaces')
    const seccion = abrirComentarios('Con enlaces')
    comentar(seccion, 'Comentario enlazado')

    const autor = catalogoCompartido.sesion_actual
    const esperado = rutaPerfilUsuario(autor.id)
    seccion.getAllByRole('link').forEach((enlace) => expect(enlace).toHaveAttribute('href', esperado))
    expect(seccion.getByRole('link', { name: autor.usuario })).toBeInTheDocument()
    expect(tarjeta('Con enlaces').getAllByRole('link', { name: new RegExp(autor.usuario) }).length).toBeGreaterThanOrEqual(2)
  })
})
