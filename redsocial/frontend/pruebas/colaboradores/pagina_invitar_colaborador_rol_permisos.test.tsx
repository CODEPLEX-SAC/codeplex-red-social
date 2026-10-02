import { render, screen } from '@testing-library/react'
import { PaginaInvitarColaboradorRolPermisos } from '@/paginas/colaboradores/pagina_invitar_colaborador_rol_permisos'

describe('PaginaInvitarColaboradorRolPermisos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaInvitarColaboradorRolPermisos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
