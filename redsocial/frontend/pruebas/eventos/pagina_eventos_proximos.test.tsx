import { render, screen } from '@testing-library/react'
import { PaginaEventosProximos } from '@/paginas/eventos/pagina_eventos_proximos'

describe('PaginaEventosProximos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEventosProximos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
