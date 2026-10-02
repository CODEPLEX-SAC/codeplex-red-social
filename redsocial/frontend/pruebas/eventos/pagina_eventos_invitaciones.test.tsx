import { render, screen } from '@testing-library/react'
import { PaginaEventosInvitaciones } from '@/paginas/eventos/pagina_eventos_invitaciones'

describe('PaginaEventosInvitaciones', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEventosInvitaciones />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
