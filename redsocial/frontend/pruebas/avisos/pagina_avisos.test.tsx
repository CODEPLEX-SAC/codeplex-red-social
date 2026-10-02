import { render, screen } from '@testing-library/react'
import { PaginaAvisos } from '@/paginas/avisos/pagina_avisos'

describe('PaginaAvisos', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaAvisos />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
