import { render, screen } from '@testing-library/react'
import { PaginaDashboard } from '@/paginas/dashboard/pagina_dashboard'
import catalogoDashboard from '@/catalogos/capacidades/redsocial/dashboard.json'

describe('PaginaDashboard', () => {
  it('renderiza el titulo de composicion de ingresos desde el catalogo', () => {
    render(<PaginaDashboard />)
    expect(screen.getByText(catalogoDashboard.secciones.composicion_ingresos)).toBeInTheDocument()
  })
})
