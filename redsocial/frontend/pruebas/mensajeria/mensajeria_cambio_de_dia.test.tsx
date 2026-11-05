import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PaginaMensajesFavoritos } from '@/paginas/mensajeria/pagina_mensajes_favoritos'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { reiniciarMensajeriaDemostracion } from '../../servicios/mensajeria/almacen_mensajeria'
import { restaurarRelojMensajeria, sustituirRelojMensajeria } from '../../servicios/mensajeria/reloj'

const textos = catalogoMensajeria.conversacion
const lista = () => document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement
const panel = () => within(document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement)
const fila = (nombre: string) => within(lista()).getByRole('button', { name: new RegExp(`^${nombre}`) })
const etiquetaFila = (nombre: string) => fila(nombre).querySelector('time')?.textContent
const cabecerasDeDia = () => Array.from(document.querySelectorAll('[data-zona="panel-conversacion"] [data-mensaje] > div:first-child')).map((nodo) => nodo.textContent ?? '').filter((texto) => /\d/.test(texto) && !/:/.test(texto))

function transcurrir(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

function fijarHora(fecha: Date) {
  vi.setSystemTime(fecha)
  sustituirRelojMensajeria(() => new Date())
}

function enviar(texto: string) {
  const campo = panel().getByRole('textbox', { name: textos.mensaje })
  fireEvent.change(campo, { target: { value: texto } })
  fireEvent.keyDown(campo, { key: 'Enter' })
}

beforeEach(() => {
  vi.useFakeTimers()
  reiniciarMensajeriaDemostracion()
})

afterEach(() => {
  vi.useRealTimers()
  restaurarRelojMensajeria()
})

describe('Las fechas de Mensajes se actualizan solas al cambiar el dia', () => {
  it('la etiqueta de la fila pasa de la hora a «Ayer» y luego a «2 días» sin interaccion del usuario', () => {
    fijarHora(new Date(2026, 9, 26, 23, 58, 30))
    render(<PaginaMensajesTodos />)
    fireEvent.click(fila('Luis Rodríguez'))
    enviar('Antes de medianoche')
    expect(etiquetaFila('Luis Rodríguez')).toBe('11:58 PM')

    transcurrir(60 * 1000)
    expect(etiquetaFila('Luis Rodríguez')).toBe('11:58 PM')

    transcurrir(30 * 1000)
    expect(etiquetaFila('Luis Rodríguez')).toBe('Ayer')

    transcurrir(24 * 3600 * 1000)
    expect(etiquetaFila('Luis Rodríguez')).toBe('Lunes')
  })

  it('usa un unico temporizador de un solo disparo hacia la siguiente medianoche y lo limpia al desmontar', () => {
    fijarHora(new Date(2026, 9, 26, 12, 0, 0))
    const { unmount } = render(<PaginaMensajesTodos />)
    expect(vi.getTimerCount()).toBe(1)
    transcurrir(11 * 3600 * 1000 + 59 * 60 * 1000)
    expect(vi.getTimerCount()).toBe(1)
    transcurrir(60 * 1000)
    expect(vi.getTimerCount()).toBe(1)
    const siguiente = vi.getTimerCount()
    transcurrir(23 * 3600 * 1000)
    expect(vi.getTimerCount()).toBe(siguiente)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('no vuelve a programar ni a renderizar mientras no cambie el dia ni venza una edicion', () => {
    fijarHora(new Date(2026, 9, 26, 8, 0, 0))
    render(<PaginaMensajesTodos />)
    const antes = lista().textContent
    transcurrir(6 * 3600 * 1000)
    expect(lista().textContent).toBe(antes)
    expect(vi.getTimerCount()).toBe(1)
  })

  it('el cambio de mes se refleja: el 31 pasa a «Ayer» el dia 1', () => {
    fijarHora(new Date(2026, 9, 31, 23, 59, 0))
    render(<PaginaMensajesTodos />)
    fireEvent.click(fila('Luis Rodríguez'))
    enviar('Fin de mes')
    expect(etiquetaFila('Luis Rodríguez')).toBe('11:59 PM')
    transcurrir(61 * 1000)
    expect(etiquetaFila('Luis Rodríguez')).toBe('Ayer')
  })

  it('el cambio de año actualiza la etiqueta y la cabecera de dia del hilo, que pasa a llevar el año', () => {
    fijarHora(new Date(2026, 11, 31, 23, 59, 0))
    render(<PaginaMensajesTodos />)
    fireEvent.click(fila('Luis Rodríguez'))
    enviar('Fin de año')
    expect(etiquetaFila('Luis Rodríguez')).toBe('11:59 PM')
    expect(cabecerasDeDia()).toContain('Jueves, 31 de diciembre')
    transcurrir(61 * 1000)
    expect(etiquetaFila('Luis Rodríguez')).toBe('Ayer')
    expect(cabecerasDeDia()).toContain('Jueves, 31 de diciembre de 2026')
    expect(cabecerasDeDia()).not.toContain('Jueves, 31 de diciembre')
  })

  it('la fecha calculada de los mensajes no cambia: solo se reetiqueta respecto al nuevo dia', () => {
    fijarHora(new Date(2026, 9, 26, 23, 59, 0))
    render(<PaginaMensajesTodos />)
    fireEvent.click(fila('Luis Rodríguez'))
    const antes = cabecerasDeDia()
    expect(antes).toContain('Martes, 12 de agosto de 2025')
    transcurrir(120 * 1000)
    expect(cabecerasDeDia()).toEqual(antes)
  })

  it('la pagina de Favoritos tambien se actualiza al cambiar el dia', () => {
    fijarHora(new Date(2026, 9, 26, 23, 59, 0))
    render(<PaginaMensajesFavoritos />)
    expect(screen.getAllByText(/12\/08\/2025/).length).toBeGreaterThan(0)
    expect(vi.getTimerCount()).toBe(1)
    transcurrir(61 * 1000)
    expect(screen.getAllByText(/12\/08\/2025/).length).toBeGreaterThan(0)
    expect(vi.getTimerCount()).toBe(1)
  })
})
