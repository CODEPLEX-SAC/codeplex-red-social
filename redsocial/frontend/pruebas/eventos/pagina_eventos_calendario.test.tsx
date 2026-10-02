import { render, screen } from '@testing-library/react'
import { PaginaEventosCalendario } from '@/paginas/eventos/pagina_eventos_calendario'

describe('PaginaEventosCalendario', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEventosCalendario />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
