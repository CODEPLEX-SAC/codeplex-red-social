import { render, screen } from '@testing-library/react'
import { PaginaColaboradorPerfil } from '@/paginas/colaboradores/pagina_colaborador_perfil'

describe('PaginaColaboradorPerfil', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaColaboradorPerfil />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
