import { render, screen } from '@testing-library/react'
import { PaginaAmigosSugerencias } from '@/paginas/amigos/pagina_amigos_sugerencias'

describe('PaginaAmigosSugerencias', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaAmigosSugerencias />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
