import { render, screen } from '@testing-library/react'
import { PaginaNovedades } from '@/paginas/avisos/pagina_avisos'

describe('PaginaNovedades', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaNovedades />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
