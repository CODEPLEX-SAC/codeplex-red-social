import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { conversacionesConEtiqueta } from '@/componentes/mensajeria'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'
import { ESTADO_INICIAL_MENSAJERIA as INICIAL } from '../../servicios/mensajeria/mensajes'
import { restaurarRelojMensajeria, sustituirRelojMensajeria } from '../../servicios/mensajeria/reloj'

const textos = catalogoInicio.mensajes_flotantes
const conversacion = catalogoMensajeria.conversacion
const total = () => ALMACEN_MENSAJERIA.leer().conversaciones.reduce((suma, c) => suma + c.noLeidos, 0)
const abrirVentana = () => {
  const boton = screen.getByRole('button', { name: textos.boton })
  fireEvent.click(boton)
  return boton
}
const ventana = () => within(screen.getByRole('region', { name: textos.titulo }))
const filas = () => Array.from(screen.getByRole('region', { name: textos.titulo }).querySelectorAll('li button strong')).map((nodo) => nodo.textContent)
const pestana = (nombre: string) => fireEvent.click(ventana().getByRole('tab', { name: new RegExp(nombre) }))
const hiloAbierto = () => document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement | null
const fila = (nombre: string) => ventana().getByText(nombre, { selector: 'strong' }).closest('button') as HTMLElement
const fila0 = (id: string) => ALMACEN_MENSAJERIA.leer().conversaciones.find((c) => c.id === id)!

const HOY = new Date(2026, 9, 26, 15, 5, 0)

beforeEach(() => {
  sustituirRelojMensajeria(() => HOY)
})

afterEach(() => {
  restaurarRelojMensajeria()
  window.history.replaceState({}, '', '/')
})

describe('Ventana flotante de Mensajes en Inicio', () => {
  it('muestra encabezado, ampliar, cerrar, pestanas, seccion Recientes y una fila por conversacion en el orden de la fuente', () => {
    render(<PaginaInicio />)
    abrirVentana()
    expect(ventana().getByRole('heading', { name: textos.titulo })).toBeInTheDocument()
    expect(ventana().getByRole('button', { name: textos.ampliar })).toBeInTheDocument()
    expect(ventana().getByRole('button', { name: textos.cerrar })).toBeInTheDocument()
    expect(ventana().getByRole('tab', { name: textos.pestanas.todos })).toHaveAttribute('aria-selected', 'true')
    expect(ventana().getByRole('tab', { name: new RegExp(textos.pestanas.no_leidos) })).toBeInTheDocument()
    expect(ventana().getByText(textos.recientes)).toBeInTheDocument()
    expect(filas()).toEqual(INICIAL.conversaciones.map((c) => c.nombre))
  })

  it('cada fila muestra avatar, nombre, extracto, hora y contador solo cuando hay mensajes sin leer', () => {
    render(<PaginaInicio />)
    abrirVentana()
    for (const c of conversacionesConEtiqueta(INICIAL.conversaciones, INICIAL, HOY)) {
      const el = within(fila(c.nombre))
      expect(el.getByText(c.extracto)).toBeInTheDocument()
      expect(el.getByText(c.etiquetaTiempo)).toBeInTheDocument()
      if (c.noLeidos > 0) expect(el.getByText(String(c.noLeidos))).toBeInTheDocument()
      expect(fila(c.nombre).querySelectorAll('[data-estado="conectado"]').length).toBe(c.enLinea && !c.esGrupo ? 1 : 0)
    }
  })

  it('las pestanas Todos y No leidos filtran datos reales del almacen', () => {
    render(<PaginaInicio />)
    abrirVentana()
    pestana(textos.pestanas.no_leidos)
    expect(filas()).toEqual(INICIAL.conversaciones.filter((c) => c.noLeidos > 0).map((c) => c.nombre))
    pestana(textos.pestanas.todos)
    expect(filas()).toHaveLength(INICIAL.conversaciones.length)
    pestana(textos.pestanas.no_leidos)
    fireEvent.click(fila('Diego Mendoza'))
    fireEvent.click(ventana().getByRole('button', { name: conversacion.volver_a_la_lista }))
    expect(filas()).not.toContain('Diego Mendoza')
    expect(filas()).toHaveLength(INICIAL.conversaciones.filter((c) => c.noLeidos > 0).length - 1)
  })

  it('una pestana sin resultados muestra su mensaje vacio', () => {
    render(<PaginaInicio />)
    ALMACEN_MENSAJERIA.modificar((estado) => ({ ...estado, conversaciones: estado.conversaciones.map((c) => ({ ...c, noLeidos: 0 })) }))
    abrirVentana()
    pestana(textos.pestanas.no_leidos)
    expect(ventana().getByText(textos.vacio_no_leidos)).toBeInTheDocument()
  })

  it('seleccionar una fila abre su hilo dentro de la ventana, la marca como leida y permite volver a la lista', () => {
    render(<PaginaInicio />)
    const boton = abrirVentana()
    const antes = total()
    expect(fila0('conversacion-001').noLeidos).toBe(2)
    fireEvent.click(fila('María Fernández'))
    const hilo = hiloAbierto() as HTMLElement
    expect(screen.getByRole('region', { name: textos.titulo }).contains(hilo)).toBe(true)
    expect(Array.from(hilo.querySelectorAll('[data-mensaje]')).map((n) => n.getAttribute('data-mensaje'))).toEqual(INICIAL.hilos['conversacion-001'].map((m) => m.id))
    expect(within(hilo).getByText('María Fernández')).toBeInTheDocument()
    expect(fila0('conversacion-001').noLeidos).toBe(0)
    expect(within(boton.parentElement as HTMLElement).getByText(String(antes - 2))).toBeInTheDocument()

    fireEvent.click(within(hilo).getByRole('button', { name: conversacion.volver_a_la_lista }))
    expect(hiloAbierto()).toBeNull()
    expect(filas()).toHaveLength(INICIAL.conversaciones.length)
  })

  it('lo enviado desde la ventana es el mismo estado que ve la pagina de Mensajes y no reordena las conversaciones', () => {
    const { unmount } = render(<PaginaInicio />)
    abrirVentana()
    const orden = filas()
    fireEvent.click(fila('Carmen López'))
    const campo = within(hiloAbierto() as HTMLElement).getByRole('textbox', { name: conversacion.mensaje })
    fireEvent.change(campo, { target: { value: 'Enviado desde Inicio' } })
    fireEvent.keyDown(campo, { key: 'Enter' })
    fireEvent.click(within(hiloAbierto() as HTMLElement).getByRole('button', { name: conversacion.volver_a_la_lista }))
    expect(filas()).toEqual(orden)
    expect(within(fila('Carmen López')).getByText('Tú: Enviado desde Inicio')).toBeInTheDocument()
    unmount()
    render(<PaginaMensajesTodos />)
    const listaMensajes = document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement
    expect(within(within(listaMensajes).getByRole('button', { name: /^Carmen López/ })).getByText('Tú: Enviado desde Inicio')).toBeInTheDocument()
  })

  it('ampliar lleva a la pagina completa: a la lista sin hilo y a la conversacion abierta con hilo', () => {
    render(<PaginaInicio />)
    abrirVentana()
    fireEvent.click(ventana().getByRole('button', { name: textos.ampliar }))
    expect(window.location.pathname + window.location.search).toBe(catalogoMensajeria.rutas.todos)
  })

  it('ampliar con un hilo abierto conserva la conversacion en la URL', () => {
    render(<PaginaInicio />)
    abrirVentana()
    fireEvent.click(fila('Carmen López'))
    fireEvent.click(ventana().getByRole('button', { name: textos.ampliar }))
    expect(window.location.pathname + window.location.search).toBe(`${catalogoMensajeria.rutas.todos}?${catalogoMensajeria.parametros_ruta.conversacion}=conversacion-004`)
  })

  it('cerrar la ventana descarta el hilo abierto y al reabrir vuelve la lista', () => {
    render(<PaginaInicio />)
    abrirVentana()
    fireEvent.click(fila('Luis Rodríguez'))
    expect(hiloAbierto()).not.toBeNull()
    fireEvent.click(ventana().getByRole('button', { name: textos.cerrar }))
    expect(screen.queryByRole('region', { name: textos.titulo })).toBeNull()
    abrirVentana()
    expect(hiloAbierto()).toBeNull()
    expect(filas()).toHaveLength(INICIAL.conversaciones.length)
  })

  it('las filas son botones accesibles por teclado y la lista usa el id estable de la conversacion', () => {
    render(<PaginaInicio />)
    abrirVentana()
    for (const c of INICIAL.conversaciones) expect(fila(c.nombre).tagName).toBe('BUTTON')
  })
})
