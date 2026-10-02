import { render, screen } from '@testing-library/react'
import { PaginaGruposDescubrir } from '@/paginas/grupos/pagina_grupos_descubrir'

describe('PaginaGruposDescubrir', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaGruposDescubrir />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
