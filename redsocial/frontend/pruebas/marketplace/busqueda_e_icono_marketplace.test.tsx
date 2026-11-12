import { fireEvent, render, screen, within } from '@testing-library/react'
import { PaginaMarketplace } from '@/paginas/marketplace/pagina_marketplace'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import catalogoMarketplace from '@/catalogos/capacidades/redsocial/marketplace.json'
import { DESTACADOS, BUSQUEDA_DESTACADOS_MARKETPLACE } from '@/rutas/marketplace/rutas_marketplace'

vi.setConfig({ testTimeout: 30000 })

const textos = catalogoMarketplace.planes
const buscador = () => screen.getByRole('searchbox', { name: catalogoMarketplace.placeholders.buscar })

function filtrarDestacados(termino: string) {
  const respuesta = BUSQUEDA_DESTACADOS_MARKETPLACE.fuente(termino)
  if (respuesta instanceof Promise) throw new Error('la fuente local es sincrona')
  return respuesta.elementos
}

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
  it('la fuente ignora mayúsculas y tildes y busca solo por el nombre de la aplicación o módulo', () => {
    expect(filtrarDestacados('')).toBe(DESTACADOS)
    const facturacion = filtrarDestacados('FACTURACION').map((d) => d.nombre)
    expect(facturacion).toContain('Facturación Electrónica')
    expect(facturacion).not.toContain('Gestión-Plex Grifo')
    expect(filtrarDestacados('logistica')).toEqual([])
    expect(filtrarDestacados('zzz-no-existe')).toEqual([])
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

  it('las pestanas de modulo filtran los destacados segun el modulo de cada aplicativo y se pueden quitar', () => {
    render(<PaginaMarketplace />)
    const planes = () => screen.queryAllByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) })
    for (const modulo of catalogoMarketplace.filtros.pestanas) {
      fireEvent.click(screen.getByRole('button', { name: modulo }))
      const esperados = DESTACADOS.filter((d) => d.modulos.includes(modulo)).length
      expect(planes()).toHaveLength(esperados)
      if (esperados === 0) expect(screen.getByText(catalogoMarketplace.busqueda.sin_modulo_titulo)).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: modulo }))
    }
    expect(planes()).toHaveLength(DESTACADOS.length)
    fireEvent.click(screen.getByRole('button', { name: catalogoMarketplace.filtros.pestanas[0] }))
    expect(screen.getByRole('button', { name: new RegExp(catalogoMarketplace.filtros.todas) })).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(screen.getByRole('button', { name: new RegExp(catalogoMarketplace.filtros.todas) }))
    expect(planes()).toHaveLength(DESTACADOS.length)
  })

  it('el resultado de la búsqueda sigue abriendo los planes de su aplicativo', () => {
    render(<PaginaMarketplace />)
    escribir('contaplex')
    fireEvent.click(screen.getByRole('button', { name: new RegExp(catalogoMarketplace.botones.ver_planes) }))
    expect(screen.getByRole('dialog', { name: textos.titulo })).toBeInTheDocument()
  })
})
