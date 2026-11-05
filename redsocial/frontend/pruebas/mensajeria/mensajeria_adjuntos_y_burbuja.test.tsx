import { fireEvent, render, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { pesoLegible } from '@/componentes/mensajeria'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion
const lista = () => document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement
const panel = () => document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement
const abrir = (nombre: string) => fireEvent.click(within(lista()).getByRole('button', { name: new RegExp(`^${nombre}`) }))

describe('Peso legible de los adjuntos', () => {
  it('usa las unidades del catálogo con una decimal', () => {
    expect(pesoLegible(0)).toBe('0 B')
    expect(pesoLegible(512)).toBe('512 B')
    expect(pesoLegible(2.4 * 1024 * 1024)).toBe('2.4 MB')
    expect(pesoLegible(1536)).toBe('1.5 KB')
  })
})

describe('Conversación: burbujas y adjuntos', () => {
  it('el texto de la burbuja usa el rol de 14 px y no queda alineado a la derecha', () => {
    expect(clases.burbuja).toContain('text-subtitulo')
    expect(clases.burbuja).not.toContain('text-cuerpo')
    expect(clases.burbuja).toContain('text-left')
  })

  it('el menú de opciones no ocupa espacio junto a la burbuja: es absoluto y solo se revela con hover', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const boton = within(panel()).getAllByRole('button', { name: textos.opciones_mensaje })[0]
    expect(boton.className).toContain('opacity-0')
    expect(boton.className).toContain('group-hover:opacity-100')
    expect(boton.parentElement?.className).toContain('absolute')
    expect(boton.closest(`.${clases.cuerpo.split(' ')[0]}`)).not.toBeNull()
  })

  it('la reacción se dibuja con un icono de la librería y no con un emoji', () => {
    render(<PaginaMensajesTodos />)
    abrir('María Fernández')
    const reaccion = panel().querySelector(`.${clases.reaccion_cantidad.split(' ')[0]}`)?.parentElement as HTMLElement
    expect(reaccion).not.toBeNull()
    expect(reaccion.textContent).not.toMatch(/\p{Extended_Pictographic}/u)
    expect(reaccion.textContent).toContain('1')
    expect(reaccion.children.length).toBeGreaterThanOrEqual(2)
  })

  it('el botón de imagen abre el selector de archivos y el archivo elegido se envía como adjunto', () => {
    render(<PaginaMensajesTodos />)
    abrir('Luis Rodríguez')
    const entrada = panel().querySelector('[data-entrada-archivos]') as HTMLInputElement
    let abierto = 0
    entrada.click = () => {
      abierto += 1
    }
    fireEvent.click(within(panel()).getByRole('button', { name: textos.adjuntar_archivo }))
    expect(abierto).toBe(1)
    const archivo = new File([new Uint8Array(2048)], 'informe_final.pdf', { type: 'application/pdf' })
    fireEvent.change(entrada, { target: { files: [archivo] } })
    const hilo = ALMACEN_MENSAJERIA.leer().hilos['conversacion-002']
    expect(hilo[hilo.length - 1].adjunto).toMatchObject({ nombre: 'informe_final.pdf', peso: '2.0 KB', tipo: 'documento' })
    expect(within(panel()).getByText('informe_final.pdf')).toBeInTheDocument()
  })
})
