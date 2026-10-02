import { render, screen } from '@testing-library/react'
import { PaginaEstadisticasModulo } from '@/paginas/estadisticas/pagina_estadisticas_modulo'

describe('PaginaEstadisticasModulo', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEstadisticasModulo modulo="ventas" />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
