import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'
import { PaginaMensajesFavoritos } from '@/paginas/mensajeria/pagina_mensajes_favoritos'
import { PaginaMensajesNoLeidos } from '@/paginas/mensajeria/pagina_mensajes_no_leidos'
import catalogoInicio from '../../catalogos/capacidades/redsocial/inicio.json'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'
import { ESTADO_INICIAL_MENSAJERIA as INICIAL } from '../../servicios/mensajeria/mensajes'

const botones = catalogoMensajeria.botones
const noLeidasIniciales = INICIAL.conversaciones.filter((conversacion) => conversacion.noLeidos > 0)
const favoritasIniciales = INICIAL.conversaciones.filter((conversacion) => conversacion.favorita)
const enBandeja = () => Array.from(document.querySelectorAll('[data-zona="bandeja-mensajes"] div.relative > button strong')).map((nodo) => nodo.textContent)
const estrella = (nombre: string) => {
  const fila = Array.from(document.querySelectorAll('[data-zona="bandeja-mensajes"] div.relative > button strong')).find((nodo) => nodo.textContent === nombre)?.closest('div.relative') as HTMLElement
  return within(fila).getByRole('button', { name: new RegExp(`${botones.marcar_favorito}|${botones.quitar_favorito}`) })
}

function actualizar(cambio: Parameters<typeof ALMACEN_MENSAJERIA.modificar>[0]) {
  act(() => ALMACEN_MENSAJERIA.modificar(cambio))
}

describe('Mensajeria: no leidos y favoritos desde una unica fuente', () => {
  it('la pagina de no leidos lista exactamente las conversaciones con mensajes sin leer', () => {
    render(<PaginaMensajesNoLeidos />)
    expect(enBandeja()).toEqual(noLeidasIniciales.map((conversacion) => conversacion.nombre))
  })

  it('la pagina de favoritos lista exactamente las conversaciones favoritas', () => {
    render(<PaginaMensajesFavoritos />)
    expect(enBandeja()).toEqual(favoritasIniciales.map((conversacion) => conversacion.nombre))
  })

  it('quitar un favorito desde no leidos no la marca como leida, y vuelve a marcarse', () => {
    const { unmount } = render(<PaginaMensajesNoLeidos />)
    fireEvent.click(estrella('Diego Mendoza'))
    expect(enBandeja()).toContain('Diego Mendoza')
    expect(estrella('Diego Mendoza')).toHaveAttribute('aria-pressed', 'false')
    unmount()
    render(<PaginaMensajesFavoritos />)
    expect(enBandeja()).not.toContain('Diego Mendoza')
  })

  it('marcar como leida no quita la condicion de favorita', () => {
    actualizar((estado) => ({ ...estado, conversaciones: estado.conversaciones.map((c) => (c.id === 'conversacion-002' ? { ...c, noLeidos: 0 } : c)) }))
    const { unmount } = render(<PaginaMensajesNoLeidos />)
    expect(enBandeja()).not.toContain('Luis Rodríguez')
    unmount()
    render(<PaginaMensajesFavoritos />)
    expect(enBandeja()).toContain('Luis Rodríguez')
  })

  it('marcar como favorita una conversacion leida la agrega a favoritos sin volverla no leida', () => {
    actualizar((estado) => ({ ...estado, conversaciones: estado.conversaciones.map((c) => (c.id === 'conversacion-004' ? { ...c, favorita: true } : c)) }))
    const { unmount } = render(<PaginaMensajesFavoritos />)
    expect(enBandeja()).toContain('Carmen López')
    unmount()
    render(<PaginaMensajesNoLeidos />)
    expect(enBandeja()).not.toContain('Carmen López')
  })

  it('el total del boton de Inicio y su lista siguen la misma fuente que la pagina de mensajes', () => {
    render(<PaginaInicio />)
    const total = INICIAL.conversaciones.reduce((suma, conversacion) => suma + conversacion.noLeidos, 0)
    const boton = screen.getByRole('button', { name: catalogoInicio.mensajes_flotantes.boton })
    expect(within(boton.parentElement as HTMLElement).getByText(String(total))).toBeInTheDocument()
    actualizar((estado) => ({ ...estado, conversaciones: estado.conversaciones.map((c) => (c.id === 'conversacion-001' ? { ...c, noLeidos: 0 } : c)) }))
    expect(within(boton.parentElement as HTMLElement).getByText(String(total - 2))).toBeInTheDocument()
    fireEvent.click(boton)
    const region = within(screen.getByRole('region', { name: catalogoInicio.mensajes_flotantes.titulo }))
    fireEvent.click(region.getByRole('tab', { name: new RegExp(catalogoInicio.mensajes_flotantes.pestanas.no_leidos) }))
    expect(region.queryByText('María Fernández')).toBeNull()
    expect(region.getByText('Luis Rodríguez')).toBeInTheDocument()
  })
})
