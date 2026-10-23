import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaActividadModulos } from '@/paginas/actividad/pagina_actividad_modulos'
import { PaginaActividadSistema } from '@/paginas/actividad/pagina_actividad_sistema'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'

function elegir(nombre: string, opcion: string) {
  fireEvent.mouseDown(screen.getByRole('combobox', { name: nombre }))
  fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: opcion }))
}

describe('Actividad: los filtros de cabecera son Selector funcionales', () => {
  it('Modulos filtra la lista por modulo', () => {
    render(<PaginaActividadModulos />)
    const antes = screen.getAllByRole('article').length
    elegir(catalogoActividad.botones.modulos_filtro, 'Ventas')
    expect(screen.getAllByRole('article').length).toBeLessThan(antes)
    elegir(catalogoActividad.botones.modulos_filtro, catalogoActividad.botones.modulos_todos)
    expect(screen.getAllByRole('article').length).toBe(antes)
  })

  it('Sistema filtra la lista por estado', () => {
    render(<PaginaActividadSistema />)
    const antes = screen.getAllByRole('article').length
    elegir(catalogoActividad.botones.sistema_filtro, catalogoActividad.estados_sistema.error)
    expect(screen.getAllByRole('article').length).toBeLessThan(antes)
  })
})

describe('Actividad: los selectores de cabecera se operan con teclado', () => {
  it('abre con ArrowDown, elige con Enter y cierra con Escape', () => {
    render(<PaginaActividadModulos />)
    const antes = screen.getAllByRole('article').length
    const selector = screen.getByRole('combobox', { name: catalogoActividad.botones.modulos_filtro })
    selector.focus()
    fireEvent.keyDown(selector, { key: 'ArrowDown' })
    const opciones = within(screen.getByRole('listbox')).getAllByRole('option')
    opciones[1].focus()
    fireEvent.keyDown(opciones[1], { key: 'Enter' })
    expect(screen.getAllByRole('article').length).toBeLessThan(antes)
    fireEvent.keyDown(selector, { key: 'ArrowDown' })
    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' })
  })
})
