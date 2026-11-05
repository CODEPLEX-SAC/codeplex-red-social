import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { PaginaMensajesFavoritos } from '@/paginas/mensajeria/pagina_mensajes_favoritos'
import { PaginaMensajesNoLeidos } from '@/paginas/mensajeria/pagina_mensajes_no_leidos'
import { PaginaMensajesTodos } from '@/paginas/mensajeria/pagina_mensajes_todos'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA } from '../../rutas/mensajeria/rutas_mensajeria'
import { ESTADO_INICIAL_MENSAJERIA as INICIAL } from '../../servicios/mensajeria/mensajes'

const ruta = catalogoMensajeria.rutas.todos
const parametro = catalogoMensajeria.parametros_ruta.conversacion
const panel = () => document.querySelector('[data-zona="panel-conversacion"]') as HTMLElement | null
const filaDe = (nombre: string) => within(document.querySelector('[data-zona="bandeja-mensajes"]') as HTMLElement).getByText(nombre, { selector: 'strong' }).closest('button') as HTMLElement
const idsDelPanel = () => Array.from((panel() as HTMLElement).querySelectorAll('[data-mensaje]')).map((nodo) => nodo.getAttribute('data-mensaje'))
const buscar = (id: string) => INICIAL.conversaciones.find((conversacion) => conversacion.id === id)!
const actual = (id: string) => ALMACEN_MENSAJERIA.leer().conversaciones.find((conversacion) => conversacion.id === id)

afterEach(() => {
  window.history.replaceState({}, '', '/')
})

function abrirDesdeBandeja(pagina: React.ReactElement, id: string) {
  const { unmount } = render(pagina)
  fireEvent.click(filaDe(buscar(id).nombre))
  unmount()
  expect(window.location.pathname + window.location.search).toBe(`${ruta}?${parametro}=${id}`)
  render(<PaginaMensajesTodos />)
}

describe('Mensajeria: abrir una conversacion desde Favoritos y No leidos', () => {
  it('una fila de No leidos abre su propia conversacion con su hilo, la marca como leida y conserva el favorito', () => {
    abrirDesdeBandeja(<PaginaMensajesNoLeidos />, 'conversacion-003')
    expect(within(panel() as HTMLElement).getByText('Equipo de Proyectos')).toBeInTheDocument()
    expect(idsDelPanel()).toEqual(INICIAL.hilos['conversacion-003'].map((mensaje) => mensaje.id))
    expect(actual('conversacion-003')).toMatchObject({ noLeidos: 0, favorita: true })
  })

  it('una fila de Favoritos abre la conversacion elegida y no toca las demas', () => {
    abrirDesdeBandeja(<PaginaMensajesFavoritos />, 'conversacion-007')
    expect(within(panel() as HTMLElement).getByText('Ana García')).toBeInTheDocument()
    expect(idsDelPanel()).toEqual(INICIAL.hilos['conversacion-007'].map((mensaje) => mensaje.id))
    expect(actual('conversacion-007')).toMatchObject({ noLeidos: 0, favorita: true })
    expect(actual('conversacion-001')?.noLeidos).toBe(buscar('conversacion-001').noLeidos)
  })

  it('el estado temporal se conserva al cambiar de ruta: lo enviado sigue en la fila de la bandeja', () => {
    abrirDesdeBandeja(<PaginaMensajesNoLeidos />, 'conversacion-002')
    const campo = within(panel() as HTMLElement).getByRole('textbox', { name: catalogoMensajeria.conversacion.mensaje })
    fireEvent.change(campo, { target: { value: 'Mensaje de prueba' } })
    fireEvent.keyDown(campo, { key: 'Enter' })
    act(() => window.history.replaceState({}, '', '/'))
    render(<PaginaMensajesFavoritos />)
    expect(screen.getAllByText('Tú: Mensaje de prueba').length).toBeGreaterThan(0)
  })

  it('un parametro con una conversacion inexistente muestra el estado vacio', () => {
    window.history.replaceState({}, '', `${ruta}?${parametro}=conversacion-999`)
    render(<PaginaMensajesTodos />)
    expect(panel()).toBeNull()
    expect(screen.getByText(catalogoMensajeria.conversacion.vacio_titulo)).toBeInTheDocument()
  })
})
