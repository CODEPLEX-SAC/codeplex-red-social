import { render, screen } from '@testing-library/react'
import { PaginaAvisosNoLeidas } from '@/paginas/avisos/pagina_avisos_no_leidas'

describe('PaginaAvisosNoLeidas', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaAvisosNoLeidas />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
