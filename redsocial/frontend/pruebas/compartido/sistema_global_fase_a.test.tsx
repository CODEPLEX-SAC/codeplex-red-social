import { contraste, valorDeToken as valorDe } from './utilidades_color'
import { leerCssGlobal } from './leer_css'
import { leerFuentesFrontend } from './leer_fuentes'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const CSS = await leerCssGlobal()
const FUENTES = await leerFuentesFrontend()
const UMBRAL_AA = 4.5
const MODULOS_FUERA_DE_FASE_A = ['/dashboard/']
const FUENTES_EN_ALCANCE = FUENTES.filter((fuente) => !MODULOS_FUERA_DE_FASE_A.some((modulo) => fuente.ruta.includes(modulo)))

function valorDeToken(nombre: string): string {
  return valorDe(CSS, nombre)
}

function usos(patron: RegExp, fuentes = FUENTES_EN_ALCANCE) {
  return fuentes.filter((fuente) => patron.test(fuente.texto)).map((fuente) => fuente.ruta)
}

describe('Fase A: contraste AA de los tokens de texto', () => {
  it.each(['superficie', 'fondo', 'primario-suave', 'fondo-insignia-neutra', 'fondo-hover-neutro'])('texto-suave cumple 4,5:1 sobre %s', (fondo) => {
    expect(contraste(valorDeToken('texto-suave'), valorDeToken(fondo))).toBeGreaterThanOrEqual(UMBRAL_AA)
  })

  it('la escala de grises de texto es una sola: texto y texto-suave; la escala B se retiro en la Fase C', () => {
    expect(CSS).not.toMatch(/--color-gris-(oscuro-texto|texto|texto-secundario|texto-terciario):/)
    expect(usos(/(^|[^\w-])text-gris-(oscuro-texto|texto|texto-secundario|texto-terciario)(?![\w-])/, FUENTES)).toEqual([])
    expect(contraste(valorDeToken('texto-suave'), valorDeToken('superficie'))).toBeGreaterThanOrEqual(UMBRAL_AA)
    expect(contraste(valorDeToken('texto'), valorDeToken('superficie'))).toBeGreaterThanOrEqual(UMBRAL_AA)
  })

  it.each(['exito-texto', 'peligro-texto', 'positivo-kpi', 'negativo-kpi'])('%s cumple 4,5:1 sobre blanco y con texto blanco encima', (token) => {
    expect(contraste(valorDeToken(token), valorDeToken('superficie'))).toBeGreaterThanOrEqual(UMBRAL_AA)
  })

  it('positivo-kpi y negativo-kpi reutilizan los tokens de estado y no definen un valor propio', () => {
    expect(CSS).toMatch(/--color-positivo-kpi:\s*var\(--color-exito-texto\)/)
    expect(CSS).toMatch(/--color-negativo-kpi:\s*var\(--color-peligro-texto\)/)
  })

  it('los botones de exito y peligro usan los tokens accesibles de estado', () => {
    expect(catalogoCompartido.boton_variantes.peligro).toContain('bg-peligro-texto')
    expect(catalogoCompartido.boton_variantes.exito).toContain('bg-exito-texto')
  })
})

describe('Fase A: colores retirados o inexistentes', () => {
  it('los tokens grises por debajo de 3:1 ya no estan definidos ni se usan como texto', () => {
    expect(CSS).not.toMatch(/--color-t-aaa7b5:/)
    expect(CSS).not.toMatch(/--color-t-9892a6:/)
    expect(usos(/\btext-t-(aaa7b5|9892a6)\b/)).toEqual([])
    expect(usos(/\btext-gris-categoria\b/)).toEqual([])
  })

  it('el texto de estado usa exito-texto y peligro-texto, no los colores de relleno', () => {
    expect(usos(/\btext-(exito|peligro)(?![\w-])/)).toEqual([])
  })

  it.each(['azul', 'naranja', 'verde', 'rosa', 'rojo', 'violeta'])('categoria-texto %s cumple 4,5:1 sobre blanco y sobre las tintas pastel de los badges', (categoria) => {
    const fondos = ['superficie', 'fondo', 'fondo-categoria-morado', 'fondo-categoria-rosa', 'fondo-categoria-verde', 'fondo-categoria-rojo', 'fondo-peligro-suave', 'fondo-categoria-naranja', 'fondo-categoria-azul']
    fondos.forEach((fondo) => {
      expect(contraste(valorDeToken(`${categoria}-categoria-texto`), valorDeToken(fondo))).toBeGreaterThanOrEqual(UMBRAL_AA)
    })
  })

  it('el texto de categoria usa las variantes -texto y no el color de relleno', () => {
    expect(usos(/\btext-(verde|rosa|rojo|azul|naranja|violeta)-categoria(?![\w-])/)).toEqual([])
  })

  it('ningun relleno de exito o peligro lleva texto blanco encima: usan exito-texto y peligro-texto', () => {
    expect(usos(/bg-(?:exito|peligro)(?![\w/-])[^"'`]*text-white|text-white[^"'`]*bg-(?:exito|peligro)(?![\w/-])/)).toEqual([])
  })

  it('todo color con nombre hexadecimal usado en una clase esta definido en index.css', () => {
    const indefinidos = new Set<string>()
    FUENTES.forEach((fuente) => {
      for (const coincidencia of fuente.texto.matchAll(/\b(?:text|bg|border|from|to|via|ring|fill|stroke)-(t-[0-9a-f]{6})\b/g)) {
        if (!CSS.includes(`--color-${coincidencia[1]}:`)) indefinidos.add(`${fuente.ruta} → ${coincidencia[1]}`)
      }
    })
    expect([...indefinidos]).toEqual([])
  })
})

describe('Fase A: clases sin CSS retiradas', () => {
  it.each([['text-2.5'], ['text-5'], ['flex-1-1-240'], ['p-0.88'], ['text-3.25'], ['text-2.75'], ['t-e11d48'], ['t-c7c2d9']])('ninguna fuente usa %s', (clase) => {
    const patron = new RegExp(`(^|[^\\w.-])${clase.replace(/\./g, '\\.')}(?![\\w.-])`)
    expect(usos(patron)).toEqual([])
  })
})

describe('Fase A: foco visible, placeholder y familia tipografica', () => {
  it('index.css define un foco visible global basado en un token', () => {
    expect(CSS).toMatch(/--color-foco:\s*var\(--color-primario\)/)
    expect(CSS).toMatch(/:focus-visible[^{]*\{[^}]*outline:\s*2px solid var\(--color-foco\)/)
  })

  it('el foco global queda despues de la ultima capa para imponerse al outline cero de MUI', () => {
    const regla = CSS.indexOf(':focus-visible:not(')
    expect(regla).toBeGreaterThan(CSS.lastIndexOf('@layer'))
    expect(CSS.slice(CSS.lastIndexOf('@layer'), regla)).toMatch(/\r?\n\}\r?\n/)
  })

  it('el placeholder del tema usa texto-suave sin opacidad reducida', () => {
    expect(catalogoCompartido.placeholder_tema['&::placeholder'].opacity).toBe(1)
    expect(catalogoCompartido.placeholder_tema['&::placeholder'].color).toBe('var(--color-texto-suave)')
    const tema = FUENTES.find((fuente) => fuente.ruta.endsWith('/proveedor_tema_graficos.tsx'))
    expect(tema?.texto).toContain('placeholder_tema')
  })

  it('el color de texto del tema MUI coincide con los tokens texto y texto-suave', () => {
    expect(catalogoCompartido.texto_tema.primary).toBe(valorDeToken('texto'))
    expect(catalogoCompartido.texto_tema.secondary).toBe(valorDeToken('texto-suave'))
  })

  it('los elementos de menu usan el rol cuerpo y el fondo de hover del sistema', () => {
    expect(catalogoCompartido.elemento_menu_tema.fontSize).toBe('var(--text-cuerpo)')
    expect(catalogoCompartido.elemento_menu_tema['&:hover'].backgroundColor).toBe('var(--color-fondo-hover-neutro)')
    expect(CSS).toMatch(/--color-fondo-hover-neutro:/)
  })

  it('el tema de MUI no introduce una segunda familia tipografica', () => {
    const tema = FUENTES.find((fuente) => fuente.ruta.endsWith('/proveedor_tema_graficos.tsx'))
    expect(tema?.texto).not.toMatch(/fontFamily\s*:\s*['"`]/)
    expect(CSS.match(/font-family:/g)?.length).toBe(1)
  })
})
