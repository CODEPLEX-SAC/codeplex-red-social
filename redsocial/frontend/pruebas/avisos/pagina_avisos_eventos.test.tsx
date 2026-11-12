import { render, screen } from '@testing-library/react'
import { PaginaNovedadesEventos } from '@/paginas/avisos/pagina_avisos_eventos'

describe('PaginaNovedadesEventos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaNovedadesEventos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
