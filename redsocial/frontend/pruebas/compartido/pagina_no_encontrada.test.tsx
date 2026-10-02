import { render, screen } from '@testing-library/react'
import { PaginaNoEncontrada } from '@/paginas/compartido/pagina_no_encontrada'

describe('PaginaNoEncontrada', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaNoEncontrada />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
