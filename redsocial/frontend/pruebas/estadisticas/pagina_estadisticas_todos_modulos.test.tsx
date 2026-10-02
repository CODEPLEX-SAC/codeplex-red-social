import { render, screen } from '@testing-library/react'
import { PaginaEstadisticasTodosModulos } from '@/paginas/estadisticas/pagina_estadisticas_todos_modulos'

describe('PaginaEstadisticasTodosModulos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEstadisticasTodosModulos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
