import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComposicionMensaje } from '@/componentes/mensajeria/bloques/composicion_mensaje'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'

const textos = catalogoMensajeria.conversacion

function montar(onEnviar = vi.fn()) {
  render(<ComposicionMensaje onEnviar={onEnviar} />)
  const campo = screen.getByRole('textbox', { name: textos.mensaje }) as HTMLTextAreaElement
  return { onEnviar, campo }
}

describe('Composicion de mensaje', () => {
  it('sin texto muestra emoji, microfono e imagen y no el boton de enviar', () => {
    montar()
    expect(screen.getByPlaceholderText(catalogoMensajeria.placeholders.escribe_un_mensaje)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: textos.emojis })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: textos.grabar_audio })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: textos.adjuntar_archivo })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: textosRedSocial.ENVIAR })).toBeNull()
    expect(screen.queryByRole('button', { name: 'GIF' })).toBeNull()
  })

  it('al escribir aparece enviar y se ocultan microfono e imagen', () => {
    const { campo } = montar()
    fireEvent.change(campo, { target: { value: 'Hola' } })
    expect(screen.getByRole('button', { name: textosRedSocial.ENVIAR })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: textos.grabar_audio })).toBeNull()
    expect(screen.queryByRole('button', { name: textos.adjuntar_archivo })).toBeNull()
    fireEvent.change(campo, { target: { value: '   ' } })
    expect(screen.getByRole('button', { name: textos.grabar_audio })).toBeInTheDocument()
  })

  it('Enter envia el texto recortado y limpia el campo', () => {
    const { onEnviar, campo } = montar()
    fireEvent.change(campo, { target: { value: '  Hola equipo  ' } })
    fireEvent.keyDown(campo, { key: 'Enter' })
    expect(onEnviar).toHaveBeenCalledTimes(1)
    expect(onEnviar).toHaveBeenCalledWith('Hola equipo')
    expect(campo.value).toBe('')
  })

  it('el boton enviar envia una sola vez', () => {
    const { onEnviar, campo } = montar()
    fireEvent.change(campo, { target: { value: 'Hola' } })
    fireEvent.click(screen.getByRole('button', { name: textosRedSocial.ENVIAR }))
    expect(onEnviar).toHaveBeenCalledTimes(1)
    expect(onEnviar).toHaveBeenCalledWith('Hola')
    expect(campo.value).toBe('')
  })

  it('el campo es multilinea: un textarea que conserva los saltos de linea', () => {
    const { campo } = montar()
    expect(campo.tagName).toBe('TEXTAREA')
    fireEvent.change(campo, { target: { value: 'Linea 1\nLinea 2' } })
    expect(campo.value).toBe('Linea 1\nLinea 2')
  })

  it('Mayus+Enter no envia y deja que el navegador inserte el salto de linea sin perder el contenido', () => {
    const { onEnviar, campo } = montar()
    fireEvent.change(campo, { target: { value: 'Hola' } })
    const sinCancelar = fireEvent.keyDown(campo, { key: 'Enter', shiftKey: true })
    expect(sinCancelar).toBe(true)
    expect(onEnviar).not.toHaveBeenCalled()
    expect(campo.value).toBe('Hola')
    fireEvent.change(campo, { target: { value: 'Hola\nmundo' } })
    expect(campo.value).toBe('Hola\nmundo')
  })

  it('Enter envia el mensaje multilinea completo, sin recortar los saltos internos, y limpia el campo', () => {
    const { onEnviar, campo } = montar()
    fireEvent.change(campo, { target: { value: '\n Primera\n\nTercera \n' } })
    const cancelado = !fireEvent.keyDown(campo, { key: 'Enter' })
    expect(cancelado).toBe(true)
    expect(onEnviar).toHaveBeenCalledTimes(1)
    expect(onEnviar).toHaveBeenCalledWith('Primera\n\nTercera')
    expect(campo.value).toBe('')
  })

  it('un mensaje de solo espacios o saltos de linea no se envia y el contenido se conserva', () => {
    const { onEnviar, campo } = montar()
    fireEvent.change(campo, { target: { value: ' \n\n  \n' } })
    fireEvent.keyDown(campo, { key: 'Enter' })
    fireEvent.submit(campo.closest('form') as HTMLFormElement)
    expect(onEnviar).not.toHaveBeenCalled()
    expect(campo.value).toBe(' \n\n  \n')
    expect(screen.queryByRole('button', { name: textosRedSocial.ENVIAR })).toBeNull()
  })

  it('no duplica el envio: Enter seguido del boton envia una sola vez', () => {
    const { onEnviar, campo } = montar()
    fireEvent.change(campo, { target: { value: 'Una vez' } })
    fireEvent.keyDown(campo, { key: 'Enter' })
    expect(screen.queryByRole('button', { name: textosRedSocial.ENVIAR })).toBeNull()
    fireEvent.submit(campo.closest('form') as HTMLFormElement)
    expect(onEnviar).toHaveBeenCalledTimes(1)
  })

  it('si el envio es rechazado, el contenido se conserva para poder reintentar', () => {
    const rechazar = vi.fn(() => false)
    const { campo } = montar(rechazar)
    fireEvent.change(campo, { target: { value: 'No se pierde\nnada' } })
    fireEvent.keyDown(campo, { key: 'Enter' })
    expect(rechazar).toHaveBeenCalledTimes(1)
    expect(campo.value).toBe('No se pierde\nnada')
  })

  it('Enter durante la composicion de un metodo de entrada (IME) no envia', () => {
    const { onEnviar, campo } = montar()
    fireEvent.change(campo, { target: { value: 'にほん' } })
    fireEvent.keyDown(campo, { key: 'Enter', isComposing: true })
    expect(onEnviar).not.toHaveBeenCalled()
    expect(campo.value).toBe('にほん')
  })

  it('un mensaje vacio o solo con espacios no se envia', () => {
    const { onEnviar, campo } = montar()
    fireEvent.keyDown(campo, { key: 'Enter' })
    fireEvent.change(campo, { target: { value: '    ' } })
    fireEvent.keyDown(campo, { key: 'Enter' })
    fireEvent.submit(campo.closest('form') as HTMLFormElement)
    expect(onEnviar).not.toHaveBeenCalled()
  })

  it('emoji, microfono y adjuntar siguen sin acciones propias: pulsarlos no envia nada', () => {
    const { onEnviar } = montar()
    fireEvent.click(screen.getByRole('button', { name: textos.emojis }))
    fireEvent.click(screen.getByRole('button', { name: textos.grabar_audio }))
    fireEvent.click(screen.getByRole('button', { name: textos.adjuntar_archivo }))
    expect(onEnviar).not.toHaveBeenCalled()
  })
})
