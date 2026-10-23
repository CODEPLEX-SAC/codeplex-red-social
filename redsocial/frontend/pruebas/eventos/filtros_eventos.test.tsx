import { fireEvent, render, screen } from '@testing-library/react'
import { PaginaEventosProximos } from '@/paginas/eventos/pagina_eventos_proximos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'

describe('Filtros de Eventos: Fecha, Categoria y Ubicacion', () => {
  it('los tres disparadores son Boton filtro con aria-expanded y aria-controls coherentes', () => {
    render(<PaginaEventosProximos />)
    const ids = catalogoEventos.ids_filtros
    for (const [nombre, id] of [[catalogoEventos.filtros.fecha, ids.fecha], [catalogoEventos.filtros.categoria, ids.categoria], [catalogoEventos.filtros.ubicacion, ids.ubicacion]]) {
      const disparador = screen.getByRole('button', { name: new RegExp(nombre) })
      expect(disparador.getAttribute('aria-expanded')).toBe('false')
      fireEvent.click(disparador)
      expect(disparador.getAttribute('aria-expanded')).toBe('true')
      expect(disparador.getAttribute('aria-controls')).toBe(id)
      expect(document.getElementById(id)).not.toBeNull()
      fireEvent.keyDown(document, { key: 'Escape' })
      expect(document.getElementById(id)).toBeNull()
    }
  })

  it('la seleccion de Categoria llega al disparador y filtra los eventos', () => {
    render(<PaginaEventosProximos />)
    const antes = screen.getAllByRole('article').length
    fireEvent.click(screen.getByRole('button', { name: new RegExp(catalogoEventos.filtros.categoria) }))
    const casilla = screen.getAllByRole('checkbox')[0]
    fireEvent.click(casilla)
    expect(screen.getByRole('button', { name: new RegExp(catalogoEventos.filtros.categoria + catalogoEventos.filtros.separador_conteo + '1') })).not.toBeNull()
    expect(screen.getAllByRole('checkbox')[0]).toHaveProperty('checked', true)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getAllByRole('article').length).toBeLessThanOrEqual(antes)
  })
})
