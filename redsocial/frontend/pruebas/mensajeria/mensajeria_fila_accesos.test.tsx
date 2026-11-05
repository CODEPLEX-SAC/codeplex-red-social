import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'
import { ALMACEN_HISTORIAS_VISTAS } from '../../rutas/inicio/rutas_inicio'

const textos = catalogoMensajeria.acciones_conversacion
const MARIA = 'conversacion-001'
const GRUPO = 'conversacion-003'
const fila = (id: string) => document.querySelector(`[data-fila-conversacion="${id}"]`) as HTMLElement
const principal = (id: string) => fila(id).querySelector('button[aria-current], button:not([data-boton-menu]):not([data-estado-historia])') as HTMLElement
const panel = () => document.querySelector('[data-zona="panel-conversacion"]')
const conversaciones = () => ALMACEN_MENSAJERIA.leer().conversaciones

describe('Fila de conversación: chat, perfil e historias son accesos distintos', () => {
  it('el avatar con historias abre el visor, no el chat, y no marca mensajes como leídos', () => {
    render(<PaginaMensajesTodos />)
    const aro = fila(MARIA).querySelector('[data-estado-historia]') as HTMLElement
    expect(aro).toHaveAttribute('data-estado-historia', 'nueva')
    expect(aro).toHaveAccessibleName(textos.aria_historias_nuevas.replace(':nombre', 'María Fernández'))
    fireEvent.click(aro)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(panel()).toBeNull()
    expect(conversaciones().find((c) => c.id === MARIA)?.noLeidos).toBe(2)
  })

  it('ver las historias las marca vistas y el aro pasa a vista sin tocar el estado de lectura de mensajes', () => {
    render(<PaginaMensajesTodos />)
    const aro = fila(MARIA).querySelector('[data-estado-historia]') as HTMLElement
    expect(ALMACEN_HISTORIAS_VISTAS.leer().size).toBe(0)
    fireEvent.click(aro)
    expect(ALMACEN_HISTORIAS_VISTAS.leer().size).toBeGreaterThan(0)
    expect(conversaciones().find((c) => c.id === MARIA)?.noLeidos).toBe(2)
  })

  it('abrir el chat no marca las historias como vistas', () => {
    render(<PaginaMensajesTodos />)
    fireEvent.click(principal(MARIA))
    expect(panel()).not.toBeNull()
    expect(ALMACEN_HISTORIAS_VISTAS.leer().size).toBe(0)
    expect(fila(MARIA).querySelector('[data-estado-historia]')).toHaveAttribute('data-estado-historia', 'nueva')
  })

  it('una persona sin historias abre su perfil desde el avatar y el grupo no tiene enlace de perfil ni aro', () => {
    render(<PaginaMensajesTodos />)
    const individuales = conversaciones().filter((c) => !c.esGrupo)
    const sinHistorias = individuales.find((c) => !fila(c.id).querySelector('[data-estado-historia]'))
    expect(sinHistorias).toBeDefined()
    expect(fila((sinHistorias as NonNullable<typeof sinHistorias>).id).querySelector('a')).toHaveAttribute('href', expect.stringContaining((sinHistorias as NonNullable<typeof sinHistorias>).participantes[0]))
    expect(fila(GRUPO).querySelector('a')).toBeNull()
    expect(fila(GRUPO).querySelector('[data-estado-historia]')).toBeNull()
  })

  it('la fila muestra la vista previa de historias con el conteo real y la hora con su fecha completa accesible', () => {
    render(<PaginaMensajesTodos />)
    expect(fila(MARIA)).toHaveTextContent('María Fernández subió 2 historias')
    const hora = fila(MARIA).querySelector('time') as HTMLElement
    expect(hora).toHaveTextContent('12/08/2025')
    expect(hora).toHaveAttribute('dateTime', '2025-08-12T10:05:00')
    expect(hora.getAttribute('aria-label')).toContain('12 de agosto de 2025')
  })
})

describe('Filtros de la lista de conversaciones', () => {
  const chip = (nombre: string) => within(document.querySelector('[data-zona="lista-conversaciones"]') as HTMLElement).getByRole('button', { name: new RegExp(`^${nombre}`) })
  const visibles = () => Array.from(document.querySelectorAll('[data-fila-conversacion]')).map((f) => f.getAttribute('data-fila-conversacion'))

  it('No leídos muestra la suma de mensajes sin leer como número simple y solo los chats sin leer', () => {
    render(<PaginaMensajesTodos />)
    const total = conversaciones().reduce((suma, c) => suma + c.noLeidos, 0)
    expect(chip('No leídos')).toHaveTextContent(String(total))
    expect(chip('No leídos').querySelector('.MuiBadge-root, [class*="rounded-lg"]')).toBeNull()
    fireEvent.click(chip('No leídos'))
    expect(visibles()).toEqual(conversaciones().filter((c) => c.noLeidos > 0).map((c) => c.id))
    expect(chip('No leídos')).toHaveAttribute('aria-pressed', 'true')
  })

  it('Favoritos muestra solo los favoritos y Todos los devuelve', () => {
    render(<PaginaMensajesTodos />)
    fireEvent.click(chip('Favoritos'))
    expect(visibles()).toEqual(conversaciones().filter((c) => c.favorita).map((c) => c.id))
    fireEvent.click(chip('Todos'))
    expect(visibles()).toHaveLength(conversaciones().length)
  })

  it('agregar a favoritos desde el menú hace que el chat aparezca en Favoritos', () => {
    render(<PaginaMensajesTodos />)
    const sinFavorito = conversaciones().find((c) => !c.favorita) as NonNullable<ReturnType<typeof conversaciones>[number]>
    fireEvent.click(fila(sinFavorito.id).querySelector('[data-boton-menu]') as HTMLElement)
    fireEvent.click(screen.getByRole('menuitem', { name: /Agregar a favoritos/ }))
    fireEvent.click(chip('Favoritos'))
    expect(visibles()).toContain(sinFavorito.id)
  })
})
