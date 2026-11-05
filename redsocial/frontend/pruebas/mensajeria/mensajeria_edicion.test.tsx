import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { sustituirRelojMensajeria } from '../../servicios/mensajeria/reloj'

const textos = catalogoMensajeria.conversacion
const LIMITE = textos.edicion.limite_minutos * 60000
const T0 = new Date(2026, 9, 26, 15, 5, 0)
const lista = () => document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement
const panel = () => within(document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement)
const abrir = (nombre: string) => fireEvent.click(within(lista()).getByRole('button', { name: new RegExp(`^${nombre}`) }))
const idsDelHilo = () => Array.from(document.querySelectorAll('[data-zona="panel-conversacion"] [data-mensaje]')).map((nodo) => nodo.getAttribute('data-mensaje') as string)

function transcurrir(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

function opcionesDe(id: string): string[] {
  const mensaje = document.querySelector(`[data-mensaje="${id}"]`) as HTMLElement
  fireEvent.click(within(mensaje).getByRole('button', { name: textos.opciones_mensaje }))
  const opciones = screen.queryAllByRole('menuitem').map((item) => item.textContent ?? '')
  fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
  transcurrir(1000)
  return opciones
}

const tiene = (id: string) => opcionesDe(id).some((opcion) => opcion.endsWith(textos.acciones.editar))
const editables = () => idsDelHilo().filter(tiene)

function elegir(id: string, accion: string) {
  const mensaje = document.querySelector(`[data-mensaje="${id}"]`) as HTMLElement
  fireEvent.click(within(mensaje).getByRole('button', { name: textos.opciones_mensaje }))
  fireEvent.click(screen.getAllByRole('menuitem').find((item) => item.textContent?.endsWith(accion)) as HTMLElement)
  transcurrir(1000)
}

function enviar(texto: string) {
  const campo = panel().getByRole('textbox', { name: textos.mensaje })
  fireEvent.change(campo, { target: { value: texto } })
  fireEvent.keyDown(campo, { key: 'Enter' })
}

function fijarHora(fecha: Date) {
  vi.setSystemTime(fecha)
  sustituirRelojMensajeria(() => new Date())
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('Mensajeria: edicion de mensajes propios durante 15 minutos', () => {
  it('un mensaje recien enviado se puede editar y los precargados antiguos y ajenos no', () => {
    fijarHora(T0)
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    expect(editables()).toHaveLength(0)
    enviar('Texto original')
    expect(editables()).toHaveLength(1)
  })

  it('al editar muestra el aviso, precarga el texto, guarda el cambio y actualiza el extracto', () => {
    fijarHora(T0)
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    enviar('Texto original')
    elegir(editables()[0], textos.acciones.editar)
    expect(panel().getByText(textos.editando)).toBeInTheDocument()
    const campo = panel().getByRole('textbox', { name: textos.mensaje }) as HTMLInputElement
    expect(campo.value).toBe('Texto original')
    fireEvent.change(campo, { target: { value: 'Texto corregido' } })
    fireEvent.keyDown(campo, { key: 'Enter' })
    expect(panel().getByText('Texto corregido')).toBeInTheDocument()
    expect(panel().queryByText('Texto original')).toBeNull()
    expect(panel().queryByText(textos.editando)).toBeNull()
    expect(within(within(lista()).getByRole('button', { name: /^Luis Rodríguez/ })).getByText('Tú: Texto corregido')).toBeInTheDocument()
  })

  it('cancelar la edicion no cambia el mensaje', () => {
    fijarHora(T0)
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    enviar('Texto original')
    elegir(editables()[0], textos.acciones.editar)
    fireEvent.click(panel().getByRole('button', { name: textos.cancelar_edicion }))
    expect(panel().queryByText(textos.editando)).toBeNull()
    expect(idsDelHilo().some((id) => document.querySelector('[data-mensaje="'+id+'"]')?.textContent?.includes('Texto original'))).toBe(true)
  })

  it('la opcion desaparece exactamente al cumplirse los 15 minutos, sin esperar a un sondeo', () => {
    fijarHora(T0)
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    enviar('Texto original')
    const id = idsDelHilo().at(-1) as string
    expect(tiene(id)).toBe(true)
    transcurrir(LIMITE - 2000)
    expect(tiene(id)).toBe(true)
    expect(tiene(id)).toBe(false)
    transcurrir(60000)
    expect(tiene(id)).toBe(false)
  })

  it('mantiene un unico temporizador (el del proximo cambio del reloj) y ninguno al desmontar', () => {
    fijarHora(T0)
    const { unmount } = render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    transcurrir(1000)
    expect(vi.getTimerCount()).toBe(1)
    enviar('Texto original')
    transcurrir(0)
    expect(vi.getTimerCount()).toBe(1)
    transcurrir(LIMITE)
    expect(vi.getTimerCount()).toBe(1)
    enviar('Otro mensaje')
    expect(vi.getTimerCount()).toBe(1)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('si el plazo vence mientras se edita, el cambio no se aplica', () => {
    fijarHora(T0)
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    enviar('Texto original')
    elegir(editables()[0], textos.acciones.editar)
    sustituirRelojMensajeria(() => new Date(T0.getTime() + LIMITE))
    const campo = panel().getByRole('textbox', { name: textos.mensaje })
    fireEvent.change(campo, { target: { value: 'Demasiado tarde' } })
    fireEvent.keyDown(campo, { key: 'Enter' })
    expect(idsDelHilo().some((id) => document.querySelector(`[data-mensaje="${id}"]`)?.textContent?.includes('Demasiado tarde'))).toBe(false)
    expect(idsDelHilo().some((id) => document.querySelector('[data-mensaje="'+id+'"]')?.textContent?.includes('Texto original'))).toBe(true)
  })

  it('un mensaje propio precargado es editable solo dentro de su propia ventana y los ajenos nunca', () => {
    fijarHora(new Date(2025, 7, 12, 9, 13))
    render(<PaginaMensajesTodos />)
    abrir('María Fernández')
    expect(editables()).toEqual(['mensaje-001-5'])
    transcurrir(713000)
    expect(tiene('mensaje-001-5')).toBe(true)
    expect(tiene('mensaje-001-5')).toBe(false)
  })
})
