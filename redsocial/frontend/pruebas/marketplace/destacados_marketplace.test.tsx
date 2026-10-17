import { fireEvent, render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import { DESTACADOS, CATEGORIAS } from '@/rutas/marketplace/rutas_marketplace'

vi.setConfig({ testTimeout: 30000 })

function textosDeLasTarjetas() {
  const seccion = screen.getByRole('heading', { level: 2, name: catalogoMarketplace.secciones.destacados }).closest('section') as HTMLElement
  return within(seccion).getAllByRole('article').map((tarjeta) => tarjeta.textContent)
}

function agregarAlCarrito(indice: number) {
  fireEvent.click(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })[indice])
  const planes = screen.getByRole('dialog', { name: catalogoMarketplace.planes.titulo })
  fireEvent.click(within(planes).getAllByRole('button', { name: catalogoMarketplace.planes.elegir })[0])
  fireEvent.click(within(planes).getByRole('button', { name: new RegExp(catalogoMarketplace.planes.continuar) }))
  fireEvent.click(within(screen.getByRole('dialog', { name: catalogoMarketplace.carrito.titulo })).getByRole('button', { name: 'Cerrar' }))
}

describe('Destacados de Marketplace', () => {
  it('muestra un boton de planes y un titulo por destacado', () => {
    render(<PaginaMarketplace />)
    expect(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })).toHaveLength(DESTACADOS.length)
    expect(screen.getAllByRole('heading', { level: 3, name: DESTACADOS[0].nombre }).length).toBeGreaterThan(0)
  })

  it('cada destacado trae cuatro caracteristicas ', () => {
    expect(DESTACADOS.map((d) => d.caracteristicas.length)).toEqual(DESTACADOS.map(() => 4))
      })

  it('ningun destacado muestra la etiqueta de popular', () => {
    render(<PaginaMarketplace />)
    expect(screen.queryByText('Popular')).not.toBeInTheDocument()
  })

  it('las seis tarjetas no cambian al agregar aplicaciones al carrito ni muestran la seleccion de un plan', () => {
    render(<PaginaMarketplace />)
    const antes = textosDeLasTarjetas()
    expect(antes).toHaveLength(DESTACADOS.length)
    DESTACADOS.forEach((_, indice) => agregarAlCarrito(indice))
    expect(textosDeLasTarjetas()).toEqual(antes)
    expect(screen.queryByText(/Plan seleccionado/)).toBeNull()
  })

  it('ofrece seis aplicaciones', () => {
    expect(DESTACADOS).toHaveLength(6)
  })

  it('ofrece ocho categorias', () => {
    expect(CATEGORIAS).toHaveLength(8)
  })
})
