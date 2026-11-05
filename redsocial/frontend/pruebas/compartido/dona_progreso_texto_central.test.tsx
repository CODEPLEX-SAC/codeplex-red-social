import { render, screen } from '@testing-library/react'
import { DonaProgreso } from '@/componentes/compartido/interfaz/dona_progreso'
import { compactarImporte } from '@/componentes/compartido/interfaz/importe_compacto'
import catalogoCompartido from '@/catalogos/capacidades/redsocial/compartido.json'
import { leerCssGlobal } from './leer_css'

const SEGMENTOS = [{ color: '#7c3aed', porcentaje: 60 }, { color: '#22c55e', porcentaje: 40 }]
const dona = catalogoCompartido.dona_progreso
const ESCALA_MINIMA = 0.6
const ANCHO_COMPACTO = 60

function simular(natural: number) {
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    const escala = parseFloat(this.style.getPropertyValue(dona.variable_escala))
    const ancho = this.querySelector('[aria-hidden="true"]') ? ANCHO_COMPACTO : natural * (Number.isNaN(escala) ? 1 : Math.max(escala, ESCALA_MINIMA))
    return { width: ancho, height: 20, top: 0, left: 0, right: ancho, bottom: 20, x: 0, y: 0, toJSON: () => ({}) }
  })
}

describe('DonaProgreso: texto central', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sin texto central dibuja solo el anillo', () => {
    const { container } = render(<DonaProgreso segmentos={SEGMENTOS} tamano={42} grosor={10} />)
    expect(container.firstElementChild?.tagName.toLowerCase()).toBe('svg')
    expect(container.querySelector('strong')).toBeNull()
  })

  it('un valor que cabe conserva el rol tipográfico completo', () => {
    simular(60)
    const { container } = render(<DonaProgreso segmentos={SEGMENTOS} tamano={130} grosor={16} valorCentral="S/ 850" etiquetaCentral="Total" />)
    const valor = container.querySelector('strong') as HTMLElement
    expect(valor).toHaveClass('dona-valor')
    expect(valor.style.getPropertyValue(dona.variable_escala)).toBe('')
    expect(valor).not.toHaveAttribute('title')
    expect(container).toHaveTextContent('Total')
  })

  it('un valor más ancho que el hueco fija la escala que lo hace caber', () => {
    simular(118)
    const { container } = render(<DonaProgreso segmentos={SEGMENTOS} tamano={130} grosor={16} valorCentral="S/ 1,250,000" etiquetaCentral="Total" />)
    const disponible = 130 - 2 * 16 - dona.margen_texto
    const valor = container.querySelector('strong') as HTMLElement
    expect(parseFloat(valor.style.getPropertyValue(dona.variable_escala))).toBeCloseTo(disponible / 118, 3)
    expect(valor.style.getPropertyValue(dona.variable_ancho)).toBe(`${disponible}px`)
    expect(valor.querySelector('[aria-hidden="true"]')).toBeNull()
  })

  it('un importe que no cabe ni al mínimo se compacta y conserva el valor completo para lectores y tooltip', () => {
    simular(400)
    const { container } = render(<DonaProgreso segmentos={SEGMENTOS} tamano={130} grosor={16} valorCentral="S/ 125,000,000,000" />)
    const valor = container.querySelector('strong') as HTMLElement
    expect(valor.querySelector('[aria-hidden="true"]')).toHaveTextContent('S/ 125 MM')
    expect(valor.querySelector('.sr-only')).toHaveTextContent('S/ 125,000,000,000')
    expect(valor).toHaveAttribute('title', 'S/ 125,000,000,000')
    expect(screen.getByText('S/ 125,000,000,000')).toBeInTheDocument()
  })

  it('un texto que no se puede compactar queda con puntos suspensivos visibles y el valor completo en el tooltip', () => {
    simular(400)
    const { container } = render(<DonaProgreso segmentos={SEGMENTOS} tamano={130} grosor={16} valorCentral="Sin datos disponibles este mes" />)
    const valor = container.querySelector('strong') as HTMLElement
    expect(valor).toHaveAttribute('title', 'Sin datos disponibles este mes')
    expect(valor).toHaveTextContent('Sin datos disponibles este mes')
    expect(valor.querySelector('[aria-hidden="true"]')).toBeNull()
  })

  it('la regla CSS parte del rol valor-destacado, no baja del rol auxiliar y corta con puntos suspensivos', async () => {
    const css = await leerCssGlobal()
    expect(css).toContain(`.dona-valor { font-size: max(var(--text-auxiliar), calc(var(--text-valor-destacado) * var(${dona.variable_escala}, 1))); max-width: var(${dona.variable_ancho}, none); overflow: hidden; text-overflow: ellipsis; }`)
  })
})

describe('compactarImporte', () => {
  it('abrevia con los umbrales del catálogo y conserva prefijo y sufijo', () => {
    expect(compactarImporte('S/ 125,000,000,000')).toBe('S/ 125 MM')
    expect(compactarImporte('S/ 12,500,000')).toBe('S/ 12.5 M')
    expect(compactarImporte('S/ 1,250,000')).toBe('S/ 1.3 M')
    expect(compactarImporte('S/ 4,500')).toBe('S/ 4.5 K')
    expect(compactarImporte('USD 3,000,000,000,000 aprox.')).toBe('USD 3 B aprox.')
  })

  it('no inventa una abreviatura para lo que no es un importe grande', () => {
    expect(compactarImporte('S/ 850')).toBeNull()
    expect(compactarImporte('12.5%')).toBeNull()
    expect(compactarImporte('Sin datos')).toBeNull()
  })
})
