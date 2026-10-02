import { render, screen } from '@testing-library/react'
import { PaginaAvisosEventos } from '@/paginas/avisos/pagina_avisos_eventos'

describe('PaginaAvisosEventos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaAvisosEventos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
