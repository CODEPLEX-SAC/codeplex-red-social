import { render, screen } from '@testing-library/react'
import { PaginaColaboradores } from '@/paginas/colaboradores/pagina_colaboradores'

describe('PaginaColaboradores', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaColaboradores />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
