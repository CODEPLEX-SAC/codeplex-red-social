import { render, screen } from '@testing-library/react'
import { PaginaInvitarColaboradorVigencia } from '@/paginas/colaboradores/pagina_invitar_colaborador_vigencia'

describe('PaginaInvitarColaboradorVigencia', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaInvitarColaboradorVigencia />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
