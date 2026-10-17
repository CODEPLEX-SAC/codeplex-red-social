import { render } from '@testing-library/react'
import { leerCssGlobal } from '../compartido/leer_css'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import { BotonIcono } from '../../componentes/compartido/interfaz/boton_icono'
import { clasesSinTamano, tamanoDeClases, tamanosResponsivosDeClases } from '../../componentes/compartido/fuente_iconos'

const CSS = await leerCssGlobal()
const SECCIONES_DE_BOTON = ['boton_base', 'boton_icono_base', 'boton_medio', 'boton_variantes', 'boton_activo', 'boton_tamanos', 'boton_icono_variantes', 'selector_label']
const AJENAS_A_TOKENS = new Set(['white', 'black', 'transparent', 'current', 'inherit'])

function clasesDeCatalogo(valor: unknown): string[] {
  if (typeof valor === 'string') return valor.split(/\s+/).filter(Boolean)
  if (valor && typeof valor === 'object') return Object.values(valor).flatMap(clasesDeCatalogo)
  return []
}

const clasesDeBotones = SECCIONES_DE_BOTON.flatMap((seccion) => clasesDeCatalogo((catalogoCompartido as Record<string, unknown>)[seccion]))

function tokenDefinido(nombre: string) {
  return CSS.includes(`--color-${nombre}:`) || CSS.includes(`--text-${nombre}:`)
}

describe('Catalogo compartido: sin clases muertas ni colores con nombre hexadecimal en botones', () => {
  it('no declara las clases inexistentes text-3.25, text-2.75 ni text-xs', () => {
    const texto = JSON.stringify(catalogoCompartido)
    expect(texto).not.toMatch(/\btext-3\.25\b/)
    expect(texto).not.toMatch(/\btext-2\.75\b/)
    expect(texto).not.toMatch(/\btext-xs\b/)
  })

  it('el boton md usa text-boton y las etiquetas del selector usan tokens del sistema (etiqueta de campo global 12 px en ambas variantes)', () => {
    expect(catalogoCompartido.boton_medio).toContain('text-boton')
    expect(catalogoCompartido.boton_tamanos_medios).toEqual(['md', 'cta'])
    expect(catalogoCompartido.selector_label.colaboradores).toContain('text-etiqueta')
    expect(catalogoCompartido.selector_label.default).toContain('text-etiqueta')
  })

  it('las secciones de boton no usan tokens con nombre hexadecimal (t-xxxxxx)', () => {
    expect(clasesDeBotones.filter((clase) => /(^|:)(text|bg|border)-t-[0-9a-f]{6}\b/.test(clase))).toEqual([])
  })

  it('cada color y tamano de texto declarado en esas secciones existe como token en index.css', () => {
    const sinToken = clasesDeBotones
      .map((clase) => clase.split(':').pop() as string)
      .map((clase) => clase.match(/^(?:text|bg|border)-([a-z][a-z0-9-]*)(?:\/\d+)?$/)?.[1])
      .filter((nombre): nombre is string => Boolean(nombre) && !AJENAS_A_TOKENS.has(nombre as string))
      .filter((nombre) => !tokenDefinido(nombre))
    expect(sinToken).toEqual([])
  })

  it('index.css formaliza los pesos tipograficos por funcion', () => {
    expect(CSS).toMatch(/--font-weight-etiqueta:\s*500/)
    expect(CSS).toMatch(/--font-weight-control:\s*600/)
    expect(CSS).toMatch(/--font-weight-titulo:\s*700/)
    expect(CSS).toMatch(/--font-weight-pagina:\s*800/)
  })
})

describe('Iconos: las variantes responsive del catalogo se aplican al glifo', () => {
  it('tamanoDeClases conserva el tamano base e ignora las variantes con prefijo', () => {
    expect(tamanoDeClases('w-4.5 h-4.5 max-600:h-4 max-600:w-4')).toBe('1.125rem')
  })

  it('tamanosResponsivosDeClases traduce max-600:h-4 a la misma media query que usa Tailwind', () => {
    expect(tamanosResponsivosDeClases('w-4.5 h-4.5 max-600:h-4 max-600:w-4')).toEqual({ '@media (width < 600px)': { fontSize: '1rem' } })
    expect(tamanosResponsivosDeClases('h-4 w-4')).toEqual({})
  })

  it('clasesSinTamano retira tambien las variantes de tamano para que no queden clases sin efecto', () => {
    expect(clasesSinTamano('w-4.5 h-4.5 max-600:h-4 max-600:w-4 text-primario')).toBe('text-primario')
  })

  it('BotonIcono emite la regla responsive del glifo con el tamano reducido', () => {
    render(<BotonIcono icono="ver" aria-label="ver" />)
    const reglas = Array.from(document.querySelectorAll('style')).map((estilo) => estilo.textContent).join('\n')
    expect(reglas).toMatch(/@media \(width < 600px\)\s*\{[^}]*font-size:\s*1rem/)
  })
})
