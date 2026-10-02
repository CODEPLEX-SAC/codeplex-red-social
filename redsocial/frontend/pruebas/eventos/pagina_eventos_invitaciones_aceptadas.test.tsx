import { render, screen } from '@testing-library/react'
import { PaginaEventosInvitacionesAceptadas } from '@/paginas/eventos/pagina_eventos_invitaciones_aceptadas'

describe('PaginaEventosInvitacionesAceptadas', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaEventosInvitacionesAceptadas />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
