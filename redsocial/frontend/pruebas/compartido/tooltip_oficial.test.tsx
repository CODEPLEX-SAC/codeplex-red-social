import { act, fireEvent, render, screen } from '@testing-library/react'
import { TextoTruncable } from '../../componentes/compartido/interfaz/texto_truncable'
import { AyudaContextual } from '../../componentes/compartido/interfaz/ayuda_contextual'
import { leerFuentesFrontend } from './leer_fuentes'

const ENVOLTORIOS = [
  '/componentes/compartido/interfaz/texto_truncable.tsx',
  '/componentes/compartido/interfaz/ayuda_contextual.tsx',
  '/componentes/compartido/interfaz/selector_buscable.tsx',
]
const NOMBRE = 'Constructora del Norte SAC'

async function fuentes() {
  return (await leerFuentesFrontend()).filter((f) => f.ruta.endsWith('.tsx') || f.ruta.endsWith('.ts'))
}

describe('Tooltip oficial de CodePlex', () => {
  it('los tres envoltorios delegan en CodeplexTooltip de @codeplex-sac/feedback', async () => {
    const todas = await fuentes()
    for (const ruta of ENVOLTORIOS) {
      const texto = todas.find((f) => f.ruta === ruta)?.texto ?? ''
      expect(texto).toContain("import { CodeplexTooltip } from '@codeplex-sac/feedback'")
      expect(texto).not.toContain('@mui/material/Tooltip')
    }
  })

  it('ningún componente del proyecto usa el Tooltip de MUI directamente', async () => {
    const directos = (await fuentes()).filter((f) => /from '@mui\/material\/Tooltip'|\bTooltip\b[^;\n]*from '@mui\/material'/.test(f.texto)).map((f) => f.ruta)
    expect(directos).toEqual([])
  })

  it('los gráficos de la biblioteca conservan el tema con el estilo de su tooltip', async () => {
    const conGraficos = (await fuentes()).filter((f) => f.ruta.includes('/componentes/') && f.texto.includes('<CodeplexGrafico'))
    expect(conGraficos.length).toBeGreaterThan(0)
    for (const fuente of conGraficos) expect(fuente.texto, fuente.ruta).not.toMatch(/<ProveedorTemaGraficos>\s*(<CodeplexCaja[^>]*>\s*)?<CodeplexGrafico/)
  })

  it('el tooltip de un texto truncado usa el diseño de la biblioteca: flecha, 13 px, sombra y sin el radio del tema propio', async () => {
    render(<TextoTruncable texto={NOMBRE} />)
    const texto = screen.getByText(NOMBRE)
    Object.defineProperty(texto, 'scrollWidth', { configurable: true, value: 300 })
    Object.defineProperty(texto, 'clientWidth', { configurable: true, value: 100 })
    await act(async () => { fireEvent.mouseOver(texto) })

    const tooltip = await screen.findByRole('tooltip')
    const caja = tooltip.querySelector('.MuiTooltip-tooltip') as HTMLElement
    const estilo = getComputedStyle(caja)
    expect(tooltip.querySelector('.MuiTooltip-arrow')).not.toBeNull()
    expect(estilo.fontSize).toBe('13px')
    expect(estilo.maxWidth).toBe('250px')
    expect(estilo.padding).toBe('8px 12px')
    expect(estilo.boxShadow).not.toBe('')
    expect(estilo.borderRadius).not.toBe('10px')
  })

  it('la ayuda contextual muestra el mismo tooltip oficial al enfocarse con teclado', async () => {
    render(<AyudaContextual texto="Alcance del permiso" etiqueta="Ayuda" />)
    fireEvent.keyDown(document.body, { key: 'Tab' })
    screen.getByRole('button', { name: 'Ayuda' }).focus()
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toHaveTextContent('Alcance del permiso')
    expect(tooltip.querySelector('.MuiTooltip-arrow')).not.toBeNull()
  })
})
