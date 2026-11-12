import { fireEvent, render, screen, within } from '@testing-library/react'
import { FranjaMensajeFijado } from '@/componentes/mensajeria/bloques/franja_mensaje_fijado'
import { resumenDeMensajeFijado } from '@/componentes/mensajeria/bloques/logica_resumen_mensaje_fijado'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import type { Mensaje } from '@/tipos/mensajeria/contrato_mensajes'

const textos = catalogoMensajeria.conversacion
const lista = () => within(document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement)
const filas = () => document.querySelectorAll('[data-fila-conversacion]')
const base: Mensaje = { id: 'm1', autorId: 'a', creadoEn: '2026-10-26T10:00:00' }

describe('Mensajes: buscar mensajes', { timeout: 30000 }, () => {
  it('filtra las conversaciones al escribir, sin distinguir mayúsculas ni tildes, y restaura al borrar', () => {
    render(<PaginaMensajesTodos />)
    const total = filas().length
    const buscador = lista().getByRole('searchbox', { name: catalogoMensajeria.placeholders.buscar_mensajes })
    fireEvent.change(buscador, { target: { value: 'carmen lopez' } })
    expect(filas()).toHaveLength(1)
    expect(lista().getByText(/Carmen López/)).toBeInTheDocument()
    fireEvent.change(buscador, { target: { value: '' } })
    expect(filas()).toHaveLength(total)
  })

  it('sin coincidencias muestra el aviso de resultados vacíos', () => {
    render(<PaginaMensajesTodos />)
    fireEvent.change(lista().getByRole('searchbox'), { target: { value: 'zzzz' } })
    expect(filas()).toHaveLength(0)
    expect(lista().getByText(catalogoMensajeria.acciones_conversacion.sin_resultados_busqueda)).toBeInTheDocument()
  })
})

describe('Mensajes: mensaje fijado', () => {
  it('resume el contenido: texto, imagen con su extensión, documento con su nombre completo y audio', () => {
    expect(resumenDeMensajeFijado({ ...base, contenido: 'Hola' })).toBe('Hola')
    expect(resumenDeMensajeFijado({ ...base, adjunto: { nombre: 'foto.png', peso: '1 KB', tipo: 'imagen' } })).toBe('Imagen (.png)')
    expect(resumenDeMensajeFijado({ ...base, adjunto: { nombre: 'foto.jpg', peso: '1 KB', tipo: 'imagen', extension: 'jpg' } })).toBe('Imagen (.jpg)')
    expect(resumenDeMensajeFijado({ ...base, adjunto: { nombre: 'informe.pdf', peso: '1 KB', tipo: 'documento' } })).toBe('informe.pdf')
    expect(resumenDeMensajeFijado({ ...base, adjunto: { nombre: 'voz', peso: '1 KB', tipo: 'audio' } })).toBe('Audio')
  })

  it('la franja no tiene botón de cerrar y al pulsarla pide ir al mensaje fijado', () => {
    const alIr = vi.fn()
    render(<FranjaMensajeFijado mensaje={{ ...base, contenido: 'Hola' }} onIrAlMensaje={alIr} />)
    expect(screen.queryByRole('button', { name: /ocultar/i })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: textos.ir_al_fijado }))
    expect(alIr).toHaveBeenCalledWith('m1')
  })
})
