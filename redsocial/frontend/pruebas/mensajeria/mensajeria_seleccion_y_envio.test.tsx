import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ESTADO_INICIAL_MENSAJERIA as INICIAL } from '../../servicios/mensajeria/mensajes'
import { sustituirRelojMensajeria } from '../../servicios/mensajeria/reloj'

const textos = catalogoMensajeria.conversacion
const lista = () => document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement
const panel = () => document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement | null
const filas = () => Array.from(lista().querySelectorAll('button strong')).map((nombre) => nombre.textContent)
const abrir = (nombre: string) => fireEvent.click(within(lista()).getByRole('button', { name: new RegExp(`^${nombre}`) }))
const marcasDobles = () => ((panel() as HTMLElement).textContent?.match(/done_all/g) ?? []).length
const mensajesDelPanel = () => Array.from((panel() as HTMLElement).querySelectorAll('[data-mensaje]')).map((nodo) => nodo.getAttribute('data-mensaje'))

function escribir(texto: string) {
  const campo = within(panel() as HTMLElement).getByRole('textbox', { name: textos.mensaje })
  fireEvent.change(campo, { target: { value: texto } })
  fireEvent.keyDown(campo, { key: 'Enter' })
  return campo as HTMLInputElement
}

afterEach(() => {
  vi.useRealTimers()
})

describe('Mensajeria: panel vacio y seleccion', () => {
  it('abre sin conversacion seleccionada y muestra el estado vacio, no el hilo de Maria', () => {
    render(<PaginaMensajesTodos />)
    expect(panel()).toBeNull()
    expect(screen.getByText(textos.vacio_titulo)).toBeInTheDocument()
    expect(screen.getByText(textos.vacio_texto)).toBeInTheDocument()
    expect(screen.queryByText(/reporte de avances/)).toBeNull()
  })

  it('cada fila abre su propio hilo y ninguno muestra mensajes de otra conversacion', () => {
    render(<PaginaMensajesTodos />)
    const nombres = INICIAL.conversaciones.map((conversacion) => conversacion.nombre)
    expect(filas()).toEqual(nombres)
    INICIAL.conversaciones.forEach((conversacion) => {
      abrir(conversacion.nombre)
      const esperados = (INICIAL.hilos[conversacion.id] ?? []).map((mensaje) => mensaje.id)
      expect(mensajesDelPanel()).toEqual(esperados)
      expect(within(panel() as HTMLElement).getByText(conversacion.nombre)).toBeInTheDocument()
      expect(screen.queryByText(textos.vacio_titulo)).toBeNull()
    })
  }, 30000)

  it('el boton volver regresa a la lista sin conversacion activa', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    fireEvent.click(within(panel() as HTMLElement).getByRole('button', { name: textos.volver_a_la_lista }))
    expect(panel()).toBeNull()
    expect(screen.getByText(textos.vacio_titulo)).toBeInTheDocument()
  })

  it('en los grupos cada mensaje ajeno muestra a su remitente y los propios no', () => {
    render(<PaginaMensajesTodos />)
    abrir('Equipo de Proyectos')
    const area = within(panel() as HTMLElement)
    ;['Marcos Delgado', 'Sofía Paredes', 'Ana Rivas'].forEach((nombre) => expect(area.getAllByText(nombre).length).toBeGreaterThan(0))
    expect(area.queryByText('Pedro Lozano')).toBeNull()
    abrir('Luis Rodríguez')
    expect(within(panel() as HTMLElement).queryByText('Marcos Delgado')).toBeNull()
  })
})

describe('Mensajeria: envio dentro del prototipo', () => {
  it('Enter anade el mensaje propio al final del hilo abierto, limpia el campo y no toca otros hilos', () => {
    sustituirRelojMensajeria(() => new Date(2026, 9, 26, 15, 5))
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const antes = mensajesDelPanel()
    const campo = escribir('  Recibido, gracias  ')
    expect(campo.value).toBe('')
    const despues = mensajesDelPanel()
    expect(despues).toHaveLength(antes.length + 1)
    expect(despues.slice(0, antes.length)).toEqual(antes)
    expect(within(panel() as HTMLElement).getByText('Recibido, gracias')).toBeInTheDocument()
    abrir('Carmen López')
    expect(within(panel() as HTMLElement).queryByText('Recibido, gracias')).toBeNull()
    expect(mensajesDelPanel()).toEqual(INICIAL.hilos['conversacion-004'].map((mensaje) => mensaje.id))
  })

  it('actualiza extracto y hora de la fila sin cambiar su posicion', () => {
    sustituirRelojMensajeria(() => new Date(2026, 9, 26, 15, 5))
    render(<PaginaMensajesTodos />)
    const orden = filas()
    abrir('Carmen López')
    escribir('Nos vemos')
    expect(filas()).toEqual(orden)
    const fila = within(lista()).getByRole('button', { name: /^Carmen López/ })
    expect(within(fila).getByText('Tú: Nos vemos')).toBeInTheDocument()
    expect(within(fila).getByText('03:05 PM')).toBeInTheDocument()
  })

  it('un mensaje vacio o de espacios no se agrega', () => {
    render(<PaginaMensajesTodos />)
    abrir('Diego Mendoza')
    const antes = mensajesDelPanel()
    escribir('   ')
    expect(mensajesDelPanel()).toEqual(antes)
  })

  it('enviar un mensaje propio no incrementa los no leidos', () => {
    render(<PaginaMensajesTodos />)
    const chip = () => within(lista()).getByRole('button', { name: new RegExp(`^${catalogoMensajeria.titulos_pestanas.no_leidos}`) })
    const noLeidasAntes = chip().textContent
    abrir('Carmen López')
    escribir('Hola')
    expect(chip().textContent).toBe(noLeidasAntes)
    expect(within(within(lista()).getByRole('button', { name: /^Carmen López/ })).queryByText('1')).toBeNull()
  })

  it('abrir una conversacion con no leidos la marca como leida y baja el contador', () => {
    render(<PaginaMensajesTodos />)
    const chip = () => within(lista()).getByRole('button', { name: new RegExp(`^${catalogoMensajeria.titulos_pestanas.no_leidos}`) })
    const total = INICIAL.conversaciones.reduce((suma, conversacion) => suma + conversacion.noLeidos, 0)
    expect(chip()).toHaveTextContent(String(total))
    expect(within(within(lista()).getByRole('button', { name: /^María Fernández/ })).getByText('2')).toBeInTheDocument()
    abrir('María Fernández')
    expect(chip()).toHaveTextContent(String(total - 2))
    expect(within(within(lista()).getByRole('button', { name: /^María Fernández/ })).queryByText('2')).toBeNull()
  })

  it('no genera respuestas automaticas ni indicadores de visto', () => {
    vi.useFakeTimers()
    render(<PaginaMensajesTodos />)
    abrir('María Fernández')
    expect(marcasDobles()).toBe(0)
    escribir('Gracias')
    const total = mensajesDelPanel().length
    act(() => {
      vi.advanceTimersByTime(120000)
    })
    expect(mensajesDelPanel()).toHaveLength(total)
    expect(screen.queryByText(/visto/i)).toBeNull()
    expect(marcasDobles()).toBe(0)
  })

  it('ningun hilo muestra marcas de lectura o entrega, ni siquiera tras enviar', () => {
    render(<PaginaMensajesTodos />)
    INICIAL.conversaciones.forEach((conversacion) => {
      abrir(conversacion.nombre)
      escribir('Prueba')
      expect(marcasDobles()).toBe(0)
    })
  }, 30000)
})

describe('Mensajeria: separador de dia en el hilo', () => {
  const separador = () => Array.from((panel() as HTMLElement).querySelectorAll('[data-mensaje]')).map((nodo) => nodo.firstElementChild?.textContent).filter((texto) => texto && /de \w+/.test(texto) && !/\d{2}:\d{2}/.test(texto))

  it('un mensaje enviado muestra la fecha completa de hoy y los precargados el año', () => {
    sustituirRelojMensajeria(() => new Date(2026, 9, 26, 15, 5))
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    expect(within(panel() as HTMLElement).getByText('Martes, 12 de agosto de 2025')).toBeInTheDocument()
    escribir('Hola')
    expect(within(panel() as HTMLElement).getByText('Lunes, 26 de octubre')).toBeInTheDocument()
    expect(within(panel() as HTMLElement).queryByText('Hoy')).toBeNull()
  })

  it('dos envios el mismo dia generan un solo separador y no se desactualiza al pasar la medianoche', () => {
    sustituirRelojMensajeria(() => new Date(2026, 9, 26, 23, 58))
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    escribir('Uno')
    sustituirRelojMensajeria(() => new Date(2026, 9, 26, 23, 59))
    escribir('Dos')
    expect(within(panel() as HTMLElement).getAllByText('Lunes, 26 de octubre')).toHaveLength(1)
    sustituirRelojMensajeria(() => new Date(2026, 9, 27, 0, 1))
    escribir('Tres')
    expect(within(panel() as HTMLElement).getAllByText('Lunes, 26 de octubre')).toHaveLength(1)
    expect(within(panel() as HTMLElement).getAllByText('Martes, 27 de octubre')).toHaveLength(1)
    expect(separador().length).toBeGreaterThan(0)
  })
})
