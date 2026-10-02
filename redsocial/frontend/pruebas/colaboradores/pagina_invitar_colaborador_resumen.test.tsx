import { render, screen } from '@testing-library/react'
import { PaginaInvitarColaboradorResumen } from '@/paginas/colaboradores/pagina_invitar_colaborador_resumen'

describe('PaginaInvitarColaboradorResumen', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaInvitarColaboradorResumen />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
