import { render, screen } from '@testing-library/react'
import { PaginaAvisosSolicitudes } from '@/paginas/avisos/pagina_avisos_solicitudes'

describe('PaginaAvisosSolicitudes', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaAvisosSolicitudes />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
