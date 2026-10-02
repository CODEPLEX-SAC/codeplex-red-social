import { render, screen } from '@testing-library/react'
import { PaginaIndicadoresClave } from '@/paginas/indicadores/pagina_indicadores_clave'

describe('PaginaIndicadoresClave', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaIndicadoresClave />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
