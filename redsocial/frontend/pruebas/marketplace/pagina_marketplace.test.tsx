import { render, screen } from '@testing-library/react'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'

describe('PaginaMarketplace', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaMarketplace />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
