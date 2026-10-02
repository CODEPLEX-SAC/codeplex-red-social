import { render, screen } from '@testing-library/react'
import { PaginaInicio } from '@/paginas/inicio/pagina_inicio'

describe('PaginaInicio', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaInicio />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
