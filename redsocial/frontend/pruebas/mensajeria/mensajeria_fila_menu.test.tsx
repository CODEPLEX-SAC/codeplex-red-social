import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'

const textos = catalogoMensajeria.acciones_conversacion
const clases = catalogoMensajeria.clases.lista
const MARIA = 'conversacion-001'
const GRUPO = 'conversacion-003'
const fila = (id: string) => document.querySelector(`[data-fila-conversacion="${id}"]`) as HTMLElement
const botonMenu = (id: string) => fila(id).querySelector('[data-boton-menu]') as HTMLElement
const panel = () => document.querySelector('[data-zona="panel-conversacion"]')
const abrirMenu = (id: string) => fireEvent.click(botonMenu(id))
const itemsDelMenu = () => screen.queryAllByRole('menuitem').map((item) => item.textContent ?? '')
const conversaciones = () => ALMACEN_MENSAJERIA.leer().conversaciones

describe('Fila de conversación: menú de tres puntos horizontales', () => {
  it('el botón existe en cada fila, está oculto en reposo por clases y se revela con hover, foco y menú abierto', () => {
    render(<PaginaMensajesTodos />)
    for (const conversacion of conversaciones()) expect(botonMenu(conversacion.id)).toBeInTheDocument()
    const clasesBoton = botonMenu(MARIA).className
    expect(clasesBoton).toContain('opacity-0')
    expect(clasesBoton).toContain(clases.boton_menu)
    expect(clases.boton_menu).toMatch(/group-hover:opacity-100/)
    expect(clases.boton_menu).toMatch(/group-has-\[:focus-visible\]:opacity-100/)
    expect(clases.boton_menu).toMatch(/focus-visible:opacity-100/)
    expect(clases.boton_menu).toMatch(/data-\[abierto=true\]:opacity-100/)
    expect(clases.boton_menu).toMatch(/pointer-coarse:group-data-\[tactil=true\]:opacity-100/)
    expect(clases.boton_menu).toMatch(/pointer-coarse:group-data-\[activa=true\]:opacity-100/)
  })

  it('usa el glifo horizontal oficial por el contenedor de iconos del proyecto, con nombre accesible', () => {
    render(<PaginaMensajesTodos />)
    const boton = botonMenu(MARIA)
    expect(boton).toHaveAccessibleName(textos.aria_menu.replace(':nombre', 'María Fernández'))
    expect(boton).toHaveAttribute('aria-haspopup', 'menu')
    expect(boton).toHaveAttribute('aria-expanded', 'false')
    expect(boton.querySelector('svg:not([data-testid])')).toBeNull()
    expect(boton.textContent).toBe('more_horiz')
  })

  it('abrir el menú no abre el chat y Escape lo cierra', () => {
    render(<PaginaMensajesTodos />)
    abrirMenu(MARIA)
    expect(botonMenu(MARIA)).toHaveAttribute('aria-expanded', 'true')
    expect(itemsDelMenu().length).toBeGreaterThan(0)
    expect(panel()).toBeNull()
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' })
    expect(botonMenu(MARIA)).toHaveAttribute('aria-expanded', 'false')
  })

  it('la individual ofrece las acciones propias y no archivar ni fijar', () => {
    render(<PaginaMensajesTodos />)
    abrirMenu(MARIA)
    const items = itemsDelMenu().join('|')
    for (const accion of ['marcar_leido', 'silenciar', 'ver_perfil', 'eliminar_chat'] as const) expect(items).toContain(textos.elementos[accion].etiqueta)
    expect(items).not.toContain(textos.elementos.abandonar_grupo.etiqueta)
    expect(items).not.toMatch(/archivar|fijar/i)
  })

  it('el grupo ofrece abandonar grupo y no ver perfil', () => {
    render(<PaginaMensajesTodos />)
    abrirMenu(GRUPO)
    const items = itemsDelMenu().join('|')
    expect(items).toContain(textos.elementos.abandonar_grupo.etiqueta)
    expect(items).not.toContain(textos.elementos.ver_perfil.etiqueta)
  })
})
