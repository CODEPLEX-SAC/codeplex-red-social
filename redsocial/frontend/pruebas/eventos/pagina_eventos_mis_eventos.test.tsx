import { render, screen } from '@testing-library/react'
import { PaginaEventosMisEventos } from '@/paginas/eventos/pagina_eventos_mis_eventos'

describe('PaginaEventosMisEventos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEventosMisEventos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
