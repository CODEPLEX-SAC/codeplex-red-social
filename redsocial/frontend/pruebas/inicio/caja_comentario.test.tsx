import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { CajaComentario } from '@/componentes/inicio/bloques/caja_comentario'
import { ModalCrearPublicacion } from '@/componentes/inicio/bloques/modal_crear_publicacion'
import catalogoInicio from '@/catalogos/capacidades/redsocial/inicio.json'

const textos = catalogoInicio.publicacion.comentarios
const modal = catalogoInicio.modal_crear_publicacion

function caja(onEnviar = vi.fn()) {
  render(<CajaComentario marcador={textos.marcador} etiqueta={textos.etiqueta_campo} etiquetaEnviar={textos.publicar} onEnviar={onEnviar} />)
  return onEnviar
}

describe('CajaComentario', () => {
  it('muestra emoji, adjuntar imagen y enviar, y permite insertar un emoji', () => {
    const onEnviar = caja()
    expect(screen.getByRole('button', { name: textos.etiqueta_adjuntar })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: textos.etiqueta_emojis }))
    const emoji = textos.emojis[0]
    fireEvent.click(within(screen.getByRole('list', { name: textos.etiqueta_emojis })).getByRole('button', { name: emoji }))
    fireEvent.click(screen.getByRole('button', { name: textos.publicar }))
    expect(onEnviar).toHaveBeenCalledWith(emoji)
  })

  it('adjunta una imagen y la entrega con el comentario', () => {
    const onEnviar = caja()
    const entrada = screen.getByLabelText(textos.etiqueta_adjuntar, { selector: 'input' }) as HTMLInputElement
    URL.createObjectURL = vi.fn(() => 'blob:prueba')
    URL.revokeObjectURL = vi.fn()
    fireEvent.change(entrada, { target: { files: [new File(['x'], 'a.png', { type: 'image/png' })] } })
    fireEvent.click(screen.getByRole('button', { name: textos.publicar }))
    expect(onEnviar).toHaveBeenCalledWith('', [expect.objectContaining({ url: 'blob:prueba', esVideo: false })])
  })
})

describe('CajaComentario: pegar, video y mencion', () => {
  it('permite pegar una imagen con el portapapeles', () => {
    const onEnviar = caja()
    URL.createObjectURL = vi.fn(() => 'blob:pegado')
    URL.revokeObjectURL = vi.fn()
    const archivo = new File(['x'], 'p.png', { type: 'image/png' })
    fireEvent.paste(screen.getByLabelText(textos.etiqueta_campo), { clipboardData: { files: [archivo] } })
    fireEvent.click(screen.getByRole('button', { name: textos.publicar }))
    expect(onEnviar).toHaveBeenCalledWith('', [expect.objectContaining({ url: 'blob:pegado' })])
  })

  it('ofrece un icono propio para adjuntar video', () => {
    caja()
    expect(screen.getByRole('button', { name: textos.etiqueta_adjuntar_video })).toBeInTheDocument()
  })

  it('muestra marcado el nombre de la persona a la que se responde', () => {
    render(<CajaComentario marcador={textos.marcador} etiqueta={textos.etiqueta_respuesta} etiquetaEnviar={textos.enviar_respuesta} mencion="@Ana García" onEnviar={vi.fn()} />)
    expect(screen.getByText('@Ana García')).toBeInTheDocument()
  })
})

describe('ModalCrearPublicacion en edición', () => {
  it('muestra los medios existentes, permite quitarlos y los entrega al guardar', () => {
    const onPublicar = vi.fn()
    const existente = { id: 'm1', url: 'blob:existente', esVideo: false }
    render(<ModalCrearPublicacion modo="editar" textoInicial="Hola" mediosIniciales={[existente]} onPublicar={onPublicar} onCerrar={vi.fn()} />)
    const dialogo = within(screen.getByRole('dialog'))
    expect(dialogo.getByText(modal.agregar_a_publicacion)).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: modal.medios.quitar.replace(':numero', '1') }))
    fireEvent.click(dialogo.getByRole('button', { name: modal.editar.guardar }))
    expect(onPublicar).toHaveBeenCalledWith(expect.objectContaining({ texto: 'Hola', medios: [] }))
  })
})
