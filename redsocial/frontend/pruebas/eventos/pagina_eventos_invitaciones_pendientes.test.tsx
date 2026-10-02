import { render, screen } from '@testing-library/react'
import { PaginaEventosInvitacionesPendientes } from '@/paginas/eventos/pagina_eventos_invitaciones_pendientes'

describe('PaginaEventosInvitacionesPendientes', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEventosInvitacionesPendientes />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
