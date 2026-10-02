import { render, screen } from '@testing-library/react'
import { PaginaReportes } from '@/paginas/reportes/pagina_reportes'

describe('PaginaReportes', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaReportes />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
