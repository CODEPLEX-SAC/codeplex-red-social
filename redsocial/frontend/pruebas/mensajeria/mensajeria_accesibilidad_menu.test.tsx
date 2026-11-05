import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import { reiniciarMensajeriaDemostracion } from '../../servicios/mensajeria/almacen_mensajeria'
import { restaurarRelojMensajeria, sustituirRelojMensajeria } from '../../servicios/mensajeria/reloj'

const textos = catalogoMensajeria.conversacion
const lista = () => document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement
const panelEl = () => document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement
const abrir = (nombre: string) => fireEvent.click(within(lista()).getByRole('button', { name: new RegExp(`^${nombre}`) }))
const idsDelHilo = () => Array.from(panelEl().querySelectorAll('[data-mensaje]')).map((nodo) => nodo.getAttribute('data-mensaje') as string)
const botonOpciones = (id: string) => within(document.querySelector(`[data-mensaje="${id}"]`) as HTMLElement).getByRole('button', { name: textos.opciones_mensaje })

function transcurrir(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2026, 9, 26, 15, 5, 0))
  sustituirRelojMensajeria(() => new Date())
  reiniciarMensajeriaDemostracion()
})

afterEach(() => {
  vi.useRealTimers()
  restaurarRelojMensajeria()
})

describe('Boton de opciones del mensaje: area tactil', () => {
  it('usa el tamano tactil de 44 x 44 px (h-11 w-11) en todas las pantallas, sin reducirlo en las pequenas', () => {
    expect(catalogoCompartido.boton_icono_tamanos.tactil.boton).toBe('h-11 w-11')
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    idsDelHilo().forEach((id) => {
      const clases = botonOpciones(id).className.split(' ')
      expect(clases).toContain('h-11')
      expect(clases).toContain('w-11')
      expect(clases.some((clase) => clase.startsWith('max-600:h-') || clase.startsWith('max-600:w-'))).toBe(false)
    })
  })
})

describe('Boton de opciones del mensaje: teclado y lector de pantalla', () => {
  it('es un boton nativo alcanzable con Tab, con nombre accesible y semantica de menu', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const boton = botonOpciones(idsDelHilo()[0])
    expect(boton.tagName).toBe('BUTTON')
    expect(boton).toHaveAttribute('type', 'button')
    expect(boton).not.toHaveAttribute('tabindex', '-1')
    expect(boton).toHaveAttribute('aria-haspopup', 'menu')
    expect(boton).toHaveAttribute('aria-expanded', 'false')
  })

  it('el orden de Tab recorre un boton de opciones por mensaje en el mismo orden visual del hilo', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const enfocables = Array.from(panelEl().querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex]:not([tabindex="-1"]), textarea, input'))
    const opciones = enfocables.filter((nodo) => nodo.getAttribute('aria-label') === textos.opciones_mensaje)
    expect(opciones.map((nodo) => nodo.closest('[data-mensaje]')?.getAttribute('data-mensaje'))).toEqual(idsDelHilo())
    const campo = within(panelEl()).getByRole('textbox', { name: textos.mensaje })
    expect(enfocables.indexOf(opciones[opciones.length - 1])).toBeLessThan(enfocables.indexOf(campo))
  })

  it('abrir el menu mueve el foco al primer elemento y aria-expanded lo refleja', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const id = idsDelHilo()[0]
    const boton = botonOpciones(id)
    boton.focus()
    fireEvent.click(boton)
    transcurrir(500)
    expect(boton).toHaveAttribute('aria-expanded', 'true')
    const elementos = screen.getAllByRole('menuitem')
    expect(elementos.length).toBeGreaterThan(0)
    expect(document.activeElement).toBe(elementos[0])
  })

  it('las flechas recorren las opciones y Escape cierra el menu devolviendo el foco al boton', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const id = idsDelHilo()[0]
    const boton = botonOpciones(id)
    boton.focus()
    fireEvent.click(boton)
    transcurrir(500)
    const elementos = screen.getAllByRole('menuitem')
    fireEvent.keyDown(elementos[0], { key: 'ArrowDown' })
    expect(document.activeElement).toBe(elementos[1])
    fireEvent.keyDown(elementos[1], { key: 'ArrowUp' })
    expect(document.activeElement).toBe(elementos[0])
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
    transcurrir(1000)
    expect(screen.queryByRole('menu')).toBeNull()
    expect(botonOpciones(id)).toHaveAttribute('aria-expanded', 'false')
    expect(document.activeElement).toBe(botonOpciones(id))
  })

  it('Enter sobre una opcion la ejecuta y cierra el menu; cancelar no cambia nada', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const id = idsDelHilo()[0]
    fireEvent.click(botonOpciones(id))
    transcurrir(500)
    const fijar = screen.getAllByRole('menuitem').find((item) => item.textContent?.endsWith(textos.acciones.fijar)) as HTMLElement
    fireEvent.click(fijar)
    transcurrir(1000)
    expect(screen.queryByRole('menu')).toBeNull()
    fireEvent.click(botonOpciones(id))
    transcurrir(500)
    expect(screen.getAllByRole('menuitem').some((item) => item.textContent?.endsWith(textos.acciones.desfijar))).toBe(true)
  })
})

describe('Boton de opciones del mensaje: puntero tactil', () => {
  it('un toque (pointerdown de tipo touch y clic) abre el menu sin depender del hover', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const id = idsDelHilo()[0]
    const boton = botonOpciones(id)
    fireEvent.pointerDown(boton, { pointerType: 'touch' })
    fireEvent.pointerUp(boton, { pointerType: 'touch' })
    fireEvent.click(boton)
    transcurrir(500)
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
})
