import { render, screen } from '@testing-library/react'
import { PaginaNovedadesMenciones } from '@/paginas/avisos/pagina_avisos_menciones'

describe('PaginaNovedadesMenciones', () => {
  it('renderiza sin errores y muestra al menos un titulo', () => {
    render(<PaginaNovedadesMenciones />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})
