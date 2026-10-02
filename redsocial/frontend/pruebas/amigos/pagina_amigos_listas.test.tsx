import { render, screen } from '@testing-library/react'
import { PaginaAmigosListas } from '@/paginas/amigos/pagina_amigos_listas'

describe('PaginaAmigosListas', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaAmigosListas />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
