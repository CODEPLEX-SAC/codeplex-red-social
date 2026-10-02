import { render, screen } from '@testing-library/react'
import { PaginaGruposMisGrupos } from '@/paginas/grupos/pagina_grupos_mis_grupos'

describe('PaginaGruposMisGrupos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaGruposMisGrupos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
