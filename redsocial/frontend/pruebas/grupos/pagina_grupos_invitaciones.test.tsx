import { render, screen } from '@testing-library/react'
import { PaginaGruposInvitaciones } from '@/paginas/grupos/pagina_grupos_invitaciones'

describe('PaginaGruposInvitaciones', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaGruposInvitaciones />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
