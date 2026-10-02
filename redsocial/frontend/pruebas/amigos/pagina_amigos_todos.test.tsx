import { render, screen } from '@testing-library/react'
import { PaginaAmigosTodos } from '@/paginas/amigos/pagina_amigos_todos'

describe('PaginaAmigosTodos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaAmigosTodos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
