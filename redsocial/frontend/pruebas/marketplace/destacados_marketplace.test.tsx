import { render, screen } from '@testing-library/react'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import { DESTACADOS, CATEGORIAS } from '@/rutas/marketplace/rutas_marketplace'

describe('Destacados de Marketplace', () => {
  it('muestra un boton de planes y un titulo por destacado', () => {
    render(<PaginaMarketplace />)
    expect(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })).toHaveLength(DESTACADOS.length)
    expect(screen.getAllByRole('heading', { level: 3, name: DESTACADOS[0].nombre }).length).toBeGreaterThan(0)
  })

  it('cada destacado trae cuatro caracteristicas ', () => {
    expect(DESTACADOS.map((d) => d.caracteristicas.length)).toEqual(DESTACADOS.map(() => 4))
      })

  it('marca como popular solo el destacado indicado', () => {
    render(<PaginaMarketplace />)
    expect(screen.getAllByText(catalogoMarketplace.leyendas.popular)).toHaveLength(1)
  })

  it('ofrece seis aplicaciones', () => {
    expect(DESTACADOS).toHaveLength(6)
  })

  it('ofrece ocho categorias', () => {
    expect(CATEGORIAS).toHaveLength(8)
  })
})
