import { contraste, valorDeToken as valorDe } from './utilidades_color'
import { leerCssGlobal } from './leer_css'
import { leerFuentesFrontend } from './leer_fuentes'
import { BOTONES_NATIVOS_PERMITIDOS, COLORES_NOMBRADOS_PERMITIDOS, ICONOS_DECORATIVOS_PERMITIDOS } from './registro_componentes_permitidos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoMarketplace from '../../catalogos/capacidades/redsocial/marketplace.json'

const CSS = await leerCssGlobal()
const FUENTES = await leerFuentesFrontend()
const EN_CODIGO = FUENTES.filter((fuente) => /^\/(componentes|paginas|formularios)\//.test(fuente.ruta) && fuente.ruta.endsWith('.tsx'))
const CLASE_DE_COLOR_NOMBRADO = /(?<![\w-])(?:[a-z0-9-]+:)*(text|bg|border|from|to|via|fill|stroke)-t-([0-9a-f]{6})(?![\w-])/g

function textoDe(sufijo: string): string {
  return FUENTES.find((fuente) => fuente.ruta.endsWith(sufijo))?.texto ?? ''
}

function valorDeToken(nombre: string): string {
  return valorDe(CSS, nombre)
}

function coloresNombradosEnUso(): Map<string, string[]> {
  const usos = new Map<string, string[]>()
  FUENTES.forEach((fuente) => {
    for (const coincidencia of fuente.texto.matchAll(CLASE_DE_COLOR_NOMBRADO)) {
      usos.set(coincidencia[2], [...(usos.get(coincidencia[2]) ?? []), fuente.ruta])
    }
  })
  return usos
}

describe('Prevencion final: colores con nombre hexadecimal', () => {
  it('todo color t-xxxxxx en uso esta clasificado en el registro', () => {
    const sinRegistrar = [...coloresNombradosEnUso().keys()].filter((hex) => !COLORES_NOMBRADOS_PERMITIDOS[hex])
    expect(sinRegistrar).toEqual([])
  })

  it('ningun t-xxxxxx se usa como color de texto', () => {
    const deTexto = FUENTES.filter((fuente) => [...fuente.texto.matchAll(CLASE_DE_COLOR_NOMBRADO)].some((coincidencia) => coincidencia[1] === 'text'))
    expect(deTexto.map((fuente) => fuente.ruta)).toEqual([])
  })

  it('el registro no conserva colores que ya no se usan', () => {
    const usos = coloresNombradosEnUso()
    expect(Object.keys(COLORES_NOMBRADOS_PERMITIDOS).filter((hex) => !usos.has(hex))).toEqual([])
  })

  it('cada entrada del registro lleva clasificacion y motivo', () => {
    Object.values(COLORES_NOMBRADOS_PERMITIDOS).forEach((entrada) => {
      expect(entrada.clasificacion.length).toBeGreaterThan(0)
      expect(entrada.motivo.length).toBeGreaterThan(10)
    })
  })

  it('no hay dos tokens de color con el mismo valor literal: el duplicado debe ser un alias var()', () => {
    const porValor = new Map<string, string[]>()
    for (const coincidencia of CSS.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
      const valor = coincidencia[2].toLowerCase()
      porValor.set(valor, [...(porValor.get(valor) ?? []), coincidencia[1]])
    }
    expect([...porValor.entries()].filter(([, nombres]) => nombres.length > 1)).toEqual([])
  })
})

describe('Prevencion final: contraste de iconos y color sobre fondo oscuro', () => {
  it.each(['superficie', 'fondo', 'fondo-hover-neutro', 'fondo-hover-discreto'])('texto-icono-control alcanza 3:1 sobre %s', (fondo) => {
    expect(contraste(valorDeToken('texto-icono-control'), valorDeToken(fondo))).toBeGreaterThanOrEqual(3)
  })

  it('texto-icono-discreto (2,1:1) solo se usa en los archivos de iconos decorativos registrados', () => {
    const usan = FUENTES.filter((fuente) => fuente.texto.includes('texto-icono-discreto') && fuente.ruta.endsWith('.tsx')).map((fuente) => fuente.ruta)
    expect(usan.filter((ruta) => !ICONOS_DECORATIVOS_PERMITIDOS.includes(ruta))).toEqual([])
    expect(ICONOS_DECORATIVOS_PERMITIDOS.filter((ruta) => !usan.includes(ruta))).toEqual([])
  })

  it('el boton de icono discreto, que es interactivo, usa texto-icono-control', () => {
    const catalogo = textoDe('/catalogos/capacidades/redsocial/compartido.json')
    expect(catalogo).toMatch(/"discreto": "[^"]*text-texto-icono-control/)
    expect(catalogo).not.toMatch(/"discreto": "[^"]*text-texto-icono-discreto/)
  })

  it.each([
    ['texto-sobre-oscuro-acento', 'fondo-anuncio'],
    ['texto-sobre-oscuro', 'fondo-anuncio'],
    ['texto-sobre-oscuro-claro', 'fondo-anuncio'],
    ['texto-sobre-oscuro-peligro', 'fondo-escenario'],
  ])('%s alcanza 4,5:1 sobre %s', (texto, fondo) => {
    expect(contraste(valorDeToken(texto), valorDeToken(fondo))).toBeGreaterThanOrEqual(4.5)
  })

  it('el relleno rojo de SuperficieColor usa la variante -texto para que el texto blanco cumpla AA', () => {
    expect(textoDe('/catalogos/capacidades/redsocial/compartido.json')).toMatch(/"rojo": "bg-rojo-categoria-texto"/)
    expect(contraste('#ffffff', valorDeToken('rojo-categoria-texto'))).toBeGreaterThanOrEqual(4.5)
  })

  it('el contador sobre el chip activo es blanco con texto primario y no una superposicion translucida', () => {
    expect(textoDe('/paginas/amigos/pagina_amigos_solicitudes.tsx')).not.toContain('bg-white/25')
    expect(textoDe('/componentes/grupos/bloques/seccion_invitaciones.tsx')).not.toContain('bg-white/25')
    expect(contraste(valorDeToken('primario'), valorDeToken('superficie'))).toBeGreaterThanOrEqual(4.5)
  })
})

describe('Prevencion final: botones nativos', () => {
  const cantidades = EN_CODIGO.map((fuente) => ({ ruta: fuente.ruta, cantidad: (fuente.texto.match(/<button\b/g) ?? []).length })).filter((entrada) => entrada.cantidad > 0)

  it('un archivo nuevo no puede usar <button> nativo sin registrarlo con clasificacion y motivo', () => {
    expect(cantidades.filter((entrada) => !BOTONES_NATIVOS_PERMITIDOS[entrada.ruta]).map((entrada) => entrada.ruta)).toEqual([])
  })

  it('el numero de botones nativos por archivo no supera el registro ni lo deja inflado', () => {
    const real = new Map(cantidades.map((entrada) => [entrada.ruta, entrada.cantidad]))
    const desajustadas = Object.entries(BOTONES_NATIVOS_PERMITIDOS).filter(([ruta, entrada]) => real.get(ruta) !== entrada.cantidad).map(([ruta]) => ruta)
    expect(desajustadas).toEqual([])
  })

  it('cada excepcion de boton lleva clasificacion y motivo', () => {
    Object.values(BOTONES_NATIVOS_PERMITIDOS).forEach((entrada) => {
      expect(entrada.clasificacion.length).toBe(1)
      expect(entrada.motivo.length).toBeGreaterThan(10)
    })
  })

  it('las acciones estandar ya migradas usan Boton, BotonIcono o BotonPieLista', () => {
    expect(textoDe('/componentes/eventos/bloques/editar_evento.tsx')).toContain('<Boton type="button" variant="enlace"')
    expect(textoDe('/componentes/eventos/bloques/panel_filtro_categoria.tsx')).toContain('variant="enlace" size="enlace"')
    expect(textoDe('/componentes/eventos/bloques/panel_filtro_estado.tsx')).toContain('variant="enlace" size="enlace"')
    expect(textoDe('/componentes/eventos/bloques/seccion_titulo_buscar.tsx')).toContain('size="enlace_accion"')
    expect(textoDe('/componentes/eventos/bloques/bloque_hoy.tsx')).toContain('<BotonIcono icono="flecha-izquierda"')
    ;['colaboradores', 'grupos', 'modulos', 'sistema'].forEach((pagina) => expect(textoDe(`/paginas/actividad/pagina_actividad_${pagina}.tsx`)).toContain('<BotonPieLista>'))
  })
})

describe('Prevencion final: estados vacios sin duplicar', () => {
  const claves = [...Object.keys(catalogoAmigos.mensajes), ...Object.keys(catalogoGrupos.mensajes), ...Object.keys(catalogoMarketplace.mensajes)]

  it.each(claves)('el mensaje vacio %s del catalogo tiene un consumidor real', (clave) => {
    expect(EN_CODIGO.some((fuente) => fuente.texto.includes(`mensajes.${clave}`))).toBe(true)
  })

  it('ningun modulo dibuja su propio mensaje vacio con el patron del MensajeVacio', () => {
    const duplicados = EN_CODIGO.filter((fuente) => /flex flex-col items-center gap-1 text-center/.test(fuente.texto))
    expect(duplicados.map((fuente) => fuente.ruta)).toEqual([])
  })
})

describe('Prevencion final: estado deshabilitado global', () => {
  const GLOBAL = 'disabled:cursor-not-allowed disabled:opacity-40'

  it('Boton y BotonIcono definen una sola vez el estado deshabilitado', () => {
    expect(textoDe('/componentes/compartido/interfaz/boton.tsx')).toContain(GLOBAL)
    expect(textoDe('/componentes/compartido/interfaz/boton_icono.tsx')).toContain(GLOBAL)
  })

  it('ningun componente repite el estado deshabilitado global en una clase local', () => {
    const repetidos = EN_CODIGO.filter((fuente) => !fuente.ruta.includes('/compartido/interfaz/') && fuente.texto.includes(GLOBAL))
    expect(repetidos.map((fuente) => fuente.ruta)).toEqual([])
  })

  it('el selector deshabilitado de MUI se documenta como excepcion y no usa un opacity local', () => {
    expect(textoDe('/componentes/compartido/interfaz/selector.tsx')).not.toContain('disabled:opacity')
  })
})

