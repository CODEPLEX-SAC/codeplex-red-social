import { render, screen } from '@testing-library/react'
import { PaginaEventosInvitacionesRechazadas } from '@/paginas/eventos/pagina_eventos_invitaciones_rechazadas'

describe('PaginaEventosInvitacionesRechazadas', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEventosInvitacionesRechazadas />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
