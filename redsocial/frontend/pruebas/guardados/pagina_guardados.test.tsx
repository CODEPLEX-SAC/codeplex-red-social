import { render, screen } from '@testing-library/react'
import { PaginaGuardados } from '@/paginas/guardados/pagina_guardados'

describe('PaginaGuardados', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaGuardados />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
