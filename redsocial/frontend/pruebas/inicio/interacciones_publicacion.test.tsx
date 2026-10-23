import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import { PUBLICACION_INICIO } from '../../rutas/inicio/rutas_inicio'

const modal = catalogoInicio.modal_crear_publicacion
const publicacion = catalogoInicio.publicacion
const botones = catalogoInicio.botones
const marcador = catalogoInicio.placeholders.que_estas_pensando.replace(':nombre', 'Pedro')

function publicar(texto: string) {
  fireEvent.click(screen.getByRole('button', { name: marcador }))
  const dialogo = within(screen.getByRole('dialog'))
  fireEvent.change(dialogo.getByRole('textbox', { name: modal.etiqueta_editor }), { target: { value: texto } })
  fireEvent.click(dialogo.getByRole('button', { name: modal.publicar }))
}

function tarjeta(texto: string) {
  return within(screen.getByText(texto).closest('article') as HTMLElement)
}

function ejemplo() {
  return within(screen.getAllByText(new RegExp(PUBLICACION_INICIO.texto)).at(-1)?.closest('article') as HTMLElement)
}

function abrirMenu(texto: string) {
  fireEvent.click(tarjeta(texto).getByRole('button', { name: botones.mas_opciones }))
}

function pulsarOpcion(nombre: string) {
  fireEvent.click(within(screen.getByRole('menu')).getByRole('menuitem', { name: nombre }))
}

describe('Propiedad de la publicacion', () => {
  it('muestra el menu en la publicacion propia y no en las ajenas', () => {
    render(<PaginaInicio />)
    publicar('Mi publicacion')
    expect(tarjeta('Mi publicacion').getByRole('button', { name: botones.mas_opciones })).toBeInTheDocument()
    expect(ejemplo().queryByRole('button', { name: botones.mas_opciones })).toBeNull()
    expect(within(screen.getByText(catalogoInicio.leyendas.compartio_una_publicacion).closest('article') as HTMLElement).queryByRole('button', { name: botones.mas_opciones })).toBeNull()
  })
})

describe('Editar publicacion', () => {
  it('abre con el texto actual, guarda y actualiza la tarjeta', () => {
    render(<PaginaInicio />)
    publicar('Texto original')
    abrirMenu('Texto original')
    pulsarOpcion(publicacion.menu[0].etiqueta)

    const dialogo = within(screen.getByRole('dialog', { name: modal.editar.titulo }))
    const editor = dialogo.getByRole('textbox', { name: modal.etiqueta_editor })
    expect(editor).toHaveValue('Texto original')
    expect(dialogo.queryByRole('group', { name: modal.etiqueta_tipos })).toBeNull()

    fireEvent.change(editor, { target: { value: '' } })
    expect(dialogo.getByRole('button', { name: modal.editar.guardar })).toBeDisabled()
    fireEvent.change(editor, { target: { value: 'Texto editado' } })
    fireEvent.click(dialogo.getByRole('button', { name: modal.editar.guardar }))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByText('Texto editado')).toBeInTheDocument()
    expect(screen.queryByText('Texto original')).toBeNull()
  })
})

describe('Eliminar publicacion', () => {
  it('cancelar conserva la publicacion y confirmar la elimina', () => {
    render(<PaginaInicio />)
    publicar('Publicacion a eliminar')
    abrirMenu('Publicacion a eliminar')
    pulsarOpcion(publicacion.menu[1].etiqueta)

    let dialogo = within(screen.getByRole('dialog', { name: publicacion.eliminar.titulo }))
    expect(dialogo.getByText(publicacion.eliminar.mensaje)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: publicacion.eliminar.cancelar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByText('Publicacion a eliminar')).toBeInTheDocument()

    abrirMenu('Publicacion a eliminar')
    pulsarOpcion(publicacion.menu[1].etiqueta)
    dialogo = within(screen.getByRole('dialog', { name: publicacion.eliminar.titulo }))
    fireEvent.click(dialogo.getByRole('button', { name: publicacion.eliminar.confirmar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.queryByText('Publicacion a eliminar')).toBeNull()
  })
})

describe('Me gusta', () => {
  it('alterna el estado y el contador de cada publicacion de forma independiente', () => {
    render(<PaginaInicio />)
    publicar('Primera')
    publicar('Segunda')
    const primera = tarjeta('Primera')
    const segunda = tarjeta('Segunda')
    const meGusta = primera.getByRole('button', { name: new RegExp(botones.me_gusta) })

    expect(meGusta).toHaveAttribute('aria-pressed', 'false')
    expect(primera.getByText('0 reacciones')).toBeInTheDocument()
    fireEvent.click(meGusta)
    expect(meGusta).toHaveAttribute('aria-pressed', 'true')
    expect(primera.getByText('1 reacción')).toBeInTheDocument()
    expect(segunda.getByText('0 reacciones')).toBeInTheDocument()
    fireEvent.click(meGusta)
    expect(meGusta).toHaveAttribute('aria-pressed', 'false')
    expect(primera.getByText('0 reacciones')).toBeInTheDocument()
  })

  it('suma y resta sobre el total de la publicacion de ejemplo', () => {
    render(<PaginaInicio />)
    const total = Object.values(PUBLICACION_INICIO.reaccionesPorTipo).reduce((suma, cantidad) => suma + cantidad, 0)
    fireEvent.click(ejemplo().getByRole('button', { name: new RegExp(botones.me_gusta) }))
    expect(ejemplo().getByText(`${total + 1} ${catalogoInicio.contadores.reaccion_plural}`)).toBeInTheDocument()
    fireEvent.click(ejemplo().getByRole('button', { name: new RegExp(botones.me_gusta) }))
    expect(ejemplo().getByText(`${total} ${catalogoInicio.contadores.reaccion_plural}`)).toBeInTheDocument()
  })
})

describe('Comentar', () => {
  it('abre la seccion, publica un comentario y actualiza el contador', () => {
    render(<PaginaInicio />)
    publicar('Con comentarios')
    const tarj = tarjeta('Con comentarios')
    const comentar = tarj.getByRole('button', { name: new RegExp(botones.comentar) })

    expect(comentar).toHaveAttribute('aria-expanded', 'false')
    expect(tarj.queryByRole('region', { name: publicacion.comentarios.etiqueta_seccion })).toBeNull()
    fireEvent.click(comentar)
    expect(comentar).toHaveAttribute('aria-expanded', 'true')
    const seccion = within(tarj.getByRole('region', { name: publicacion.comentarios.etiqueta_seccion }))
    expect(seccion.getByText(publicacion.comentarios.vacio)).toBeInTheDocument()
    expect(seccion.getByRole('button', { name: publicacion.comentarios.publicar })).toBeDisabled()

    fireEvent.change(seccion.getByLabelText(publicacion.comentarios.etiqueta_campo), { target: { value: 'Muy buen avance' } })
    fireEvent.click(seccion.getByRole('button', { name: publicacion.comentarios.publicar }))

    expect(seccion.getByText('Muy buen avance')).toBeInTheDocument()
    expect(seccion.queryByText(publicacion.comentarios.vacio)).toBeNull()
    expect(tarj.getByText('1 comentario')).toBeInTheDocument()
    expect(seccion.getByLabelText(publicacion.comentarios.etiqueta_campo)).toHaveValue('')

    fireEvent.click(comentar)
    expect(tarj.queryByRole('region', { name: publicacion.comentarios.etiqueta_seccion })).toBeNull()
    expect(tarj.getByText('1 comentario')).toBeInTheDocument()
  })
})

describe('Comentarios de la publicacion de ejemplo', () => {
  const registros = PUBLICACION_INICIO.comentarios.reduce((suma, comentario) => suma + 1 + comentario.respuestas.length, 0)

  it('el contador coincide con los comentarios que se muestran al abrirlos', () => {
    render(<PaginaInicio />)
    expect(ejemplo().getByText(`${registros} ${catalogoInicio.contadores.comentario_plural}`)).toBeInTheDocument()
    fireEvent.click(ejemplo().getByRole('button', { name: new RegExp(botones.comentar) }))

    const seccion = within(ejemplo().getByRole('region', { name: publicacion.comentarios.etiqueta_seccion }))
    for (const comentario of PUBLICACION_INICIO.comentarios) {
      expect(seccion.getByText(comentario.texto)).toBeInTheDocument()
      for (const respuesta of comentario.respuestas) expect(seccion.getByText(respuesta.texto)).toBeInTheDocument()
    }
    expect(seccion.queryByText(publicacion.comentarios.vacio)).toBeNull()
  })
})

describe('Compartir', () => {
  it('una publicacion propia no se puede compartir', () => {
    render(<PaginaInicio />)
    publicar('Mi publicacion')
    expect(tarjeta('Mi publicacion').getByRole('button', { name: new RegExp(botones.compartir) })).toBeDisabled()
  })

  it('compartir una publicacion ajena crea una publicacion compartida en el feed y cuenta el compartido', () => {
    render(<PaginaInicio />)
    fireEvent.click(ejemplo().getByRole('button', { name: new RegExp(botones.compartir) }))

    const dialogo = within(screen.getByRole('dialog', { name: publicacion.compartir.titulo }))
    expect(dialogo.getByText(PUBLICACION_INICIO.texto)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: publicacion.compartir.cerrar }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(ejemplo().queryByText(/compartido/)).toBeNull()

    fireEvent.click(ejemplo().getByRole('button', { name: new RegExp(botones.compartir) }))
    const confirmacion = within(screen.getByRole('dialog'))
    fireEvent.change(confirmacion.getByLabelText(publicacion.compartir.etiqueta_campo), { target: { value: 'Vale la pena verlo' } })
    fireEvent.click(confirmacion.getByRole('button', { name: publicacion.compartir.confirmar }))
    const estado = within(screen.getByRole('status'))
    expect(estado.getByText(publicacion.compartir.exito_titulo)).toBeInTheDocument()
    fireEvent.click(estado.getByRole('button', { name: publicacion.compartir.listo }))
    expect(screen.queryByRole('dialog')).toBeNull()

    expect(ejemplo().getByText(`1 ${catalogoInicio.contadores.compartido_singular}`)).toBeInTheDocument()
    const compartida = within(screen.getByText('Vale la pena verlo').closest('article') as HTMLElement)
    expect(compartida.getByText(catalogoInicio.leyendas.compartio_una_publicacion)).toBeInTheDocument()
    expect(compartida.getByText(catalogoCompartido.sesion_actual.usuario)).toBeInTheDocument()
  })
})
