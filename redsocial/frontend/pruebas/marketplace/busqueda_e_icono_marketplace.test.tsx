import { fireEvent, render, screen, within } from '@testing-library/react'
import { vi } from 'vitest'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import { filtrarDestacados } from '@/componentes/marketplace'
import { DESTACADOS } from '@/rutas/marketplace/rutas_marketplace'

vi.setConfig({ testTimeout: 30000 })

const textos = catalogoMarketplace.planes
const buscador = () => screen.getByRole('searchbox', { name: catalogoMarketplace.placeholders.buscar })

function escribir(texto: string) {
  fireEvent.change(buscador(), { target: { value: texto } })
}

function titulosDestacados() {
  return screen.queryAllByRole('heading', { level: 3 }).map((h) => h.textContent)
}

describe('Icono del catálogo en el asistente de planes (IC-384)', () => {
  it('la clave documento resuelve al glifo oficial description y archivo-pdf no se usa en Marketplace', () => {
    expect((catalogoCompartido.iconos_libreria as Record<string, string>).documento).toBe('description')
    render(<PaginaMarketplace />)
    fireEvent.click(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })[0])
    const dialogo = screen.getByRole('dialog', { name: textos.titulo })
    fireEvent.click(within(dialogo).getAllByRole('button', { name: textos.asistente.abrir })[0])
    const enlace = within(dialogo).getByRole('button', { name: textos.asistente.catalogo_ver_etiqueta })
    const glifos = Array.from(enlace.parentElement?.querySelectorAll('.material-symbols-rounded') ?? []).map((g) => g.textContent)
    expect(glifos).toContain('description')
    expect(enlace.parentElement?.querySelector('svg.icono')).toBeNull()
  })
})

describe('Buscador de Marketplace', () => {
  it('la lógica ignora mayúsculas y tildes y busca en nombre, categoría, descripción y publicador', () => {
    expect(filtrarDestacados(DESTACADOS, '')).toBe(DESTACADOS)
    expect(filtrarDestacados(DESTACADOS, '   ')).toBe(DESTACADOS)
    const facturacion = filtrarDestacados(DESTACADOS, 'FACTURACION').map((d) => d.nombre)
    expect(facturacion).toContain('Facturación Electrónica')
    expect(facturacion).not.toContain('Gestión-Plex Grifo')
    expect(filtrarDestacados(DESTACADOS, 'logistica').length).toBeGreaterThan(0)
    expect(filtrarDestacados(DESTACADOS, 'zzz-no-existe')).toEqual([])
  })

  it('filtra los destacados al escribir y restablece las seis tarjetas al borrar', () => {
    render(<PaginaMarketplace />)
    expect(titulosDestacados().filter((t) => DESTACADOS.some((d) => d.nombre === t))).toHaveLength(DESTACADOS.length)
    escribir('grifo')
    expect(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })).toHaveLength(1)
    escribir('')
    expect(screen.getAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })).toHaveLength(DESTACADOS.length)
  })

  it('sin coincidencias muestra el mensaje de vacío y ningún botón de planes', () => {
    render(<PaginaMarketplace />)
    escribir('zzz-no-existe')
    expect(screen.getByText(catalogoMarketplace.busqueda.sin_resultados_titulo)).toBeInTheDocument()
    expect(screen.getByText(catalogoMarketplace.busqueda.sin_resultados_detalle)).toBeInTheDocument()
    expect(screen.queryAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })).toHaveLength(0)
  })

  it('el resultado de la búsqueda sigue abriendo los planes de su aplicativo', () => {
    render(<PaginaMarketplace />)
    escribir('restaurante')
    fireEvent.click(screen.getByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) }))
    expect(screen.getByRole('dialog', { name: textos.titulo })).toBeInTheDocument()
  })
})
