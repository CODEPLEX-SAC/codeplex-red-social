import { render, screen } from '@testing-library/react'
import { PaginaAvisosMenciones } from '@/paginas/avisos/pagina_avisos_menciones'

describe('PaginaAvisosMenciones', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaAvisosMenciones />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
