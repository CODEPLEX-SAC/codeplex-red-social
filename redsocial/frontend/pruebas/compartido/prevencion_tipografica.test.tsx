import { leerCssGlobal } from './leer_css'
import { leerFuentesFrontend } from './leer_fuentes'
import { detectarDesviacionesTipograficas } from './detectar_desviaciones_tipograficas'
import { COLORES_DE_SUPERFICIE_HEREDADOS, COLORES_TIPOGRAFICOS_HEREDADOS, EXCEPCIONES_TIPOGRAFICAS } from './excepciones_tipograficas'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const CSS = await leerCssGlobal()
const FUENTES = await leerFuentesFrontend()

function literales(texto: string): string[] {
  return [...texto.matchAll(/"([^"\n]{0,600})"|'([^'\n]{0,600})'|`([^`\n]{0,600})`/g)].map((coincidencia) => coincidencia[1] ?? coincidencia[2] ?? coincidencia[3])
}

function clasesDe(fuente: { texto: string }): string[] {
  return literales(fuente.texto).flatMap((literal) => literal.split(/\s+/))
}

function fuenteDe(ruta: string) {
  return FUENTES.find((fuente) => fuente.ruta === ruta)
}

describe('Fase B-final: ningun archivo del proyecto contiene desviaciones tipograficas', () => {
  it('el detector no encuentra nada en las fuentes reales (Empresas incluida)', () => {
    const hallazgos = FUENTES.flatMap((fuente) => detectarDesviacionesTipograficas(fuente.ruta, fuente.texto).map((hallazgo) => `${fuente.ruta}: ${hallazgo}`))
    expect(hallazgos).toEqual([])
  })

  it('toda excepcion declarada sigue siendo necesaria y lleva motivo', () => {
    EXCEPCIONES_TIPOGRAFICAS.forEach((excepcion) => {
      expect(excepcion.motivo.length).toBeGreaterThan(10)
      const fuente = fuenteDe(excepcion.ruta)
      expect(fuente, excepcion.ruta).toBeDefined()
      const presente = excepcion.regla === 'interlineado' ? clasesDe(fuente as { texto: string }).includes(excepcion.clase) : (fuente?.texto ?? '').includes(excepcion.clase)
      expect(presente, `${excepcion.ruta} ${excepcion.clase}`).toBe(true)
    })
  })

  it('los colores de superficie con nombre hexadecimal heredados no crecen ni quedan obsoletos', () => {
    Object.entries(COLORES_DE_SUPERFICIE_HEREDADOS).forEach(([ruta, cantidad]) => {
      const actual = clasesDe(fuenteDe(ruta) ?? { texto: '' }).filter((clase) => /^(?:[a-z0-9-]+:)*(bg|border|from|to|via|fill|stroke)-t-[0-9a-f]{6}$/.test(clase)).length
      expect(actual, ruta).toBe(cantidad)
    })
  })

  it('los colores tipograficos heredados no crecen ni quedan obsoletos', () => {
    Object.entries(COLORES_TIPOGRAFICOS_HEREDADOS).forEach(([ruta, cantidad]) => {
      const actual = clasesDe(fuenteDe(ruta) ?? { texto: '' }).filter((clase) => /^(?:[a-z0-9-]+:)*text-t-[0-9a-f]{6}$/.test(clase)).length
      expect(actual, ruta).toBe(cantidad)
    })
  })
})

describe('Fase B-final: un modulo nuevo no puede introducir desviaciones en silencio', () => {
  const modulo = (clases: string) => `export function Tarjeta() { return <h2 className="${clases}">Titulo</h2> }`
  const nuevo = '/componentes/nuevo/bloques/tarjeta.tsx'

  it.each([
    ['tamano arbitrario', 'text-[17px] text-texto'],
    ['tamano de Tailwind', 'text-xl text-texto'],
    ['peso arbitrario font-bold', 'text-titulo-seccion font-bold'],
    ['peso arbitrario font-semibold', 'text-subtitulo font-semibold'],
    ['peso arbitrario font-extrabold con prefijo', 'text-auxiliar max-600:font-extrabold'],
    ['interlineado arbitrario', 'text-cuerpo leading-[1.7]'],
    ['interlineado numerico', 'text-cuerpo leading-6'],
    ['interlineado de Tailwind', 'text-cuerpo leading-snug'],
    ['familia local', 'text-cuerpo font-mono'],
    ['color tipografico arbitrario', 'text-cuerpo text-[#ff0000]'],
    ['color tipografico con nombre hexadecimal nuevo', 'text-cuerpo text-t-123456'],
    ['fondo con nombre hexadecimal nuevo', 'text-cuerpo bg-t-123456'],
    ['borde con nombre hexadecimal nuevo', 'text-cuerpo border-t-123456'],
    ['rol con su peso repetido', 'text-titulo-banner font-titulo'],
  ])('detecta %s', (_nombre, clases) => {
    expect(detectarDesviacionesTipograficas(nuevo, modulo(clases)).length).toBeGreaterThan(0)
  })

  it('detecta estilo tipografico en JS', () => {
    expect(detectarDesviacionesTipograficas(nuevo, 'const estilo = { fontSize: 17 }').length).toBeGreaterThan(0)
  })

  it.each([
    'text-titulo-seccion text-texto',
    'text-nombre-entidad leading-compacto text-texto',
    'text-cuerpo leading-texto text-texto-suave',
    'text-auxiliar font-control text-texto-suave',
    'text-etiqueta text-gris-texto',
    'text-badge bg-primario-suave text-primario',
    'text-titulo-seccion text-texto max-600:text-titulo-banner',
  ])('acepta un uso correcto: %s', (clases) => {
    expect(detectarDesviacionesTipograficas(nuevo, modulo(clases))).toEqual([])
  })

  it('una excepcion solo se admite si esta declarada para esa ruta y esa clase', () => {
    const excepcion = EXCEPCIONES_TIPOGRAFICAS.find((candidata) => candidata.regla === 'interlineado')
    expect(excepcion).toBeDefined()
    const declarada = detectarDesviacionesTipograficas(excepcion?.ruta ?? '', modulo(`text-cuerpo ${excepcion?.clase}`))
    const otraRuta = detectarDesviacionesTipograficas(nuevo, modulo(`text-cuerpo ${excepcion?.clase}`))
    expect(declarada).toEqual([])
    expect(otraRuta.length).toBeGreaterThan(0)
  })
})

describe('Fase B-final: proteccion global frente a nombres largos y foco de controles de MUI', () => {
  it('las listas en cuadricula son una columna que puede encogerse', () => {
    expect(CSS).toMatch(/ul\.grid,\s*ol\.grid\s*\{\s*grid-template-columns:\s*minmax\(0,\s*1fr\)/)
  })

  it('el enlace de accion nunca se parte en dos lineas', () => {
    expect(CSS).toMatch(/\.text-enlace-accion\s*\{\s*white-space:\s*nowrap/)
  })

  it('las columnas laterales de la estructura de tres columnas pueden encogerse y su cuadricula es de una columna', () => {
    const distribuciones = Object.values(catalogoCompartido.estructura_tres_columnas.distribuciones)
    expect(distribuciones.length).toBeGreaterThan(1)
    distribuciones.forEach((d) => {
      expect(d.publicidad).toMatch(/min-w-0 max-\d+:hidden \[&>\.grid\]:grid-cols-1/)
      expect(d.lateral).toMatch(/min-w-0 max-1250:hidden \[&>\.grid\]:grid-cols-1/)
    })
  })

  it('el anillo de foco cubre pestanas, casillas, radios e interruptores de MUI', () => {
    expect(CSS).toMatch(/\[role="tab"\]:focus-visible/)
    expect(CSS).toMatch(/\.MuiCheckbox-root:has\(> input:focus-visible\)/)
    expect(CSS).toMatch(/\.MuiRadio-root:has\(> input:focus-visible\)/)
    expect(CSS).toMatch(/\.MuiSwitch-root:has\(input:focus-visible\)/)
  })

  it('el color de texto de los controles de MUI sale de los tokens', () => {
    expect(fuenteDe('/componentes/compartido/proveedor_tema_graficos.tsx')?.texto).toContain('text: catalogoCompartido.texto_tema')
  })
})
