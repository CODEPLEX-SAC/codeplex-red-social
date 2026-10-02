import { render, screen } from '@testing-library/react'
import { PaginaInvitarColaboradorInformacion } from '@/paginas/colaboradores/pagina_invitar_colaborador_informacion'

describe('PaginaInvitarColaboradorInformacion', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaInvitarColaboradorInformacion />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
