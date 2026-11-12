import { render, screen } from '@testing-library/react'
import { PaginaNovedadesSolicitudes } from '@/paginas/avisos/pagina_avisos_solicitudes'

describe('PaginaNovedadesSolicitudes', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaNovedadesSolicitudes />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
