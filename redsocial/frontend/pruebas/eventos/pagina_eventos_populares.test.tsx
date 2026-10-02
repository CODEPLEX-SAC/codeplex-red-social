import { render, screen } from '@testing-library/react'
import { PaginaEventosPopulares } from '@/paginas/eventos/pagina_eventos_populares'

describe('PaginaEventosPopulares', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEventosPopulares />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
