import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'

const textos = catalogoMensajeria.acciones_conversacion
const MARIA = 'conversacion-001'
const GRUPO = 'conversacion-003'
const fila = (id: string) => document.querySelector(`[data-fila-conversacion="${id}"]`) as HTMLElement
const botonMenu = (id: string) => fila(id).querySelector('[data-boton-menu]') as HTMLElement
const panel = () => document.querySelector('[data-zona="panel-conversacion"]')
const abrirMenu = (id: string) => fireEvent.click(botonMenu(id))
const itemsDelMenu = () => screen.queryAllByRole('menuitem').map((item) => item.textContent ?? '')
const pulsarItem = (etiqueta: string) => fireEvent.click(screen.getByRole('menuitem', { name: new RegExp(etiqueta) }))
const conversaciones = () => ALMACEN_MENSAJERIA.leer().conversaciones

describe('Fila de conversación: acciones del menú', () => {
  it('ver perfil navega al perfil de la persona sin abrir el chat', () => {
    const clic = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      destinos.push(this.getAttribute('href') ?? '')
    })
    const destinos: string[] = []
    render(<PaginaMensajesTodos />)
    abrirMenu(MARIA)
    pulsarItem(textos.elementos.ver_perfil.etiqueta)
    clic.mockRestore()
    expect(destinos).toHaveLength(1)
    expect(destinos[0]).toContain('maria-fernandez')
    expect(panel()).toBeNull()
  })

  it('marcar como leído deja el contador en cero y el menú pasa a ofrecer marcar como no leído', () => {
    render(<PaginaMensajesTodos />)
    expect(fila(MARIA)).toHaveTextContent('2 mensajes sin leer')
    abrirMenu(MARIA)
    pulsarItem(textos.elementos.marcar_leido.etiqueta)
    expect(fila(MARIA)).not.toHaveTextContent('mensajes sin leer')
    abrirMenu(MARIA)
    expect(itemsDelMenu().join('|')).toContain(textos.elementos.marcar_no_leido.etiqueta)
    pulsarItem(textos.elementos.marcar_no_leido.etiqueta)
    expect(fila(MARIA)).toHaveTextContent(textos.aria_marcada_no_leida)
    expect(panel()).toBeNull()
  })

  it('silenciar muestra el icono de silencio y el menú ofrece activar notificaciones', () => {
    render(<PaginaMensajesTodos />)
    abrirMenu(MARIA)
    pulsarItem(textos.elementos.silenciar.etiqueta)
    abrirMenu(MARIA)
    expect(itemsDelMenu().join('|')).toContain(textos.elementos.activar_notificaciones.etiqueta)
  })

  it('eliminar chat pide confirmación; cancelar no cambia nada y confirmar quita la fila', () => {
    render(<PaginaMensajesTodos />)
    const total = conversaciones().length
    abrirMenu(MARIA)
    pulsarItem(textos.elementos.eliminar_chat.etiqueta)
    const dialogo = within(screen.getByRole('dialog'))
    expect(dialogo.getByText(textos.modal_eliminar_chat.texto.replace(':nombre', 'María Fernández'))).toBeInTheDocument()
    fireEvent.click(dialogo.getByRole('button', { name: textos.modal_eliminar_chat.cancelar }))
    expect(conversaciones()).toHaveLength(total)
    abrirMenu(MARIA)
    pulsarItem(textos.elementos.eliminar_chat.etiqueta)
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: textos.modal_eliminar_chat.confirmar }))
    expect(conversaciones()).toHaveLength(total - 1)
    expect(fila(MARIA)).toBeNull()
  })

  it('abandonar grupo pide confirmación y al confirmar quita el grupo', () => {
    render(<PaginaMensajesTodos />)
    abrirMenu(GRUPO)
    pulsarItem(textos.elementos.abandonar_grupo.etiqueta)
    expect(screen.getByRole('dialog')).toHaveTextContent(textos.modal_abandonar_grupo.titulo)
    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: textos.modal_abandonar_grupo.confirmar }))
    expect(fila(GRUPO)).toBeNull()
  })

  it('el clic derecho abre el mismo menú sin abrir el chat', () => {
    render(<PaginaMensajesTodos />)
    fireEvent.contextMenu(fila(MARIA))
    expect(itemsDelMenu().length).toBeGreaterThan(0)
    expect(panel()).toBeNull()
  })

  it('en táctil solo la fila tocada lleva el estado que revela los tres puntos', () => {
    render(<PaginaMensajesTodos />)
    expect(Array.from(document.querySelectorAll('[data-fila-conversacion][data-tactil="true"]'))).toHaveLength(0)
    fireEvent.pointerDown(fila(MARIA), { pointerType: 'touch' })
    expect(Array.from(document.querySelectorAll('[data-fila-conversacion][data-tactil="true"]')).map((f) => f.getAttribute('data-fila-conversacion'))).toEqual([MARIA])
  })
})
