import { render, screen } from '@testing-library/react'
import { PaginaEventosParaTi } from '@/paginas/eventos/pagina_eventos_para_ti'

describe('PaginaEventosParaTi', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEventosParaTi />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
