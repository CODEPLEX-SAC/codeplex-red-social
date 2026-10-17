import { fireEvent, render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import { COMPRAS, DESTACADOS, PLANES_APLICACIONES, POPULARES } from '@/rutas/marketplace/rutas_marketplace'

vi.setConfig({ testTimeout: 30000 })

const NOMBRE_FACTURACION = 'Facturación Electrónica'
const ARCHIVOS_SVG = import.meta.glob('../../../recursos/iconos/regalo.svg', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

function agregarAlCarrito(indice: number) {
  fireEvent.click(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })[indice])
  const planes = screen.getByRole('dialog', { name: catalogoMarketplace.planes.titulo })
  fireEvent.click(within(planes).getAllByRole('button', { name: catalogoMarketplace.planes.elegir })[0])
  fireEvent.click(within(planes).getByRole('button', { name: new RegExp(catalogoMarketplace.planes.continuar) }))
  return screen.getByRole('dialog', { name: catalogoMarketplace.carrito.titulo })
}

describe('Facturación Electrónica con CodeplexIconoRecibo', () => {
  it('el catalogo central resuelve la clave recibo al glifo receipt, el de CodeplexIconoRecibo', () => {
    expect((catalogoCompartido.iconos_libreria as Record<string, string>).recibo).toBe('receipt')
    expect(catalogoCompartido.nombres_iconos).toContain('recibo')
  })

  it('todas las apariciones de la aplicacion usan la misma clave aprobada', () => {
    const apariciones = [...DESTACADOS, ...COMPRAS, ...POPULARES].filter((a) => a.nombre === NOMBRE_FACTURACION).map((a) => a.icono)
    expect(apariciones).toHaveLength(3)
    expect(new Set([...apariciones, PLANES_APLICACIONES['facturacion-electronica'].icono])).toEqual(new Set(['recibo']))
  })

  it('la tarjeta destacada pinta el glifo receipt y no el de description', () => {
    render(<PaginaMarketplace />)
    const tarjeta = screen.getAllByRole('heading', { level: 3, name: NOMBRE_FACTURACION })[0].closest('article') as HTMLElement
    const glifos = Array.from(tarjeta.querySelectorAll('.material-symbols-rounded')).map((g) => g.textContent)
    expect(glifos).toContain('receipt')
    expect(glifos).not.toContain('description')
  })

  it('otros iconos de documento no cambian: la clave documento sigue resolviendo a description', () => {
    expect((catalogoCompartido.iconos_libreria as Record<string, string>).documento).toBe('description')
  })
})

describe('Icono de regalo como SVG propio', () => {
  it('existe el recurso regalo.svg, esta registrado por nombre y ya no es el glifo generico redeem', () => {
    const [contenido] = Object.values(ARCHIVOS_SVG)
    expect(contenido).toContain('viewBox="0 0 24 24"')
    expect(contenido).toContain('stroke="currentColor"')
    expect(catalogoCompartido.nombres_iconos).toContain('regalo')
    expect(Object.keys(catalogoCompartido.iconos_libreria)).not.toContain('regalo')
    expect(Object.values(catalogoCompartido.iconos_libreria)).not.toContain('redeem')
  })

  it('el resumen del carrito dibuja el SVG propio y ningun glifo redeem', () => {
    render(<PaginaMarketplace />)
    const carro = agregarAlCarrito(0)
    const promocion = within(carro).getByText(catalogoMarketplace.carrito.primer_mes_titulo).closest('div')?.parentElement as HTMLElement
    expect(promocion.querySelector('svg.icono')).not.toBeNull()
    expect(carro.textContent).not.toContain('redeem')
  })
})
