import { render, screen } from '@testing-library/react'
import { PaginaAmigosSolicitudes } from '@/paginas/amigos/pagina_amigos_solicitudes'

describe('PaginaAmigosSolicitudes', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaAmigosSolicitudes />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
