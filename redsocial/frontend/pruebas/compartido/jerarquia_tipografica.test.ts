import { leerCssGlobal } from './leer_css'
import { leerFuentesFrontend } from './leer_fuentes'

const CSS = await leerCssGlobal()
const FUENTES = await leerFuentesFrontend()
const PANTALLAS = FUENTES.filter((fuente) => /^\/(componentes|paginas|formularios)\//.test(fuente.ruta) && fuente.ruta.endsWith('.tsx'))
const CATALOGOS = FUENTES.filter((fuente) => /^\/catalogos\/capacidades\/redsocial\/[a-z_]+\.json$/.test(fuente.ruta))

const ESCALA: Record<string, [string, string, string]> = {
  'titulo-pagina': ['2rem', '1.75rem', '1.5rem'],
  'titulo-seccion': ['1.25rem', '1.125rem', '1rem'],
  'titulo-detalle': ['1.25rem', '1.125rem', '1rem'],
  'titulo-banner': ['1rem', '0.9375rem', '0.875rem'],
  'nombre-entidad': ['1rem', '0.9375rem', '0.875rem'],
  'valor-destacado': ['1.25rem', '1.125rem', '1.125rem'],
  cuerpo: ['1rem', '0.9375rem', '0.875rem'],
  subtitulo: ['0.875rem', '0.875rem', '0.875rem'],
  'titulo-subseccion': ['0.875rem', '0.875rem', '0.875rem'],
}

const H1_SIN_TITULO_DE_PAGINA = [
  { ruta: '/paginas/inicio/pagina_inicio.tsx', motivo: 'h1 solo para lectores de pantalla (sr-only): la pagina de inicio no dibuja titulo, la estructura semantica lo exige' },
  { ruta: '/paginas/acceso/pagina_acceso.tsx', motivo: 'h1 solo para lectores de pantalla (sr-only); no se dibuja' },
]

function bloquesDeEscala(): string[] {
  const escritorio = CSS.match(/--text-titulo-pagina:\s*[^;]+;[\s\S]*?(?=--text-mes-evento:)/)?.[0] ?? String()
  const tablet = CSS.match(/@media \(width < 1024px\) \{\s*:root \{[\s\S]*?\n  \}/)?.[0] ?? String()
  const movil = CSS.match(/@media \(width < 768px\) \{\s*:root \{[\s\S]*?\n  \}/)?.[0] ?? String()
  return [escritorio, tablet, movil]
}

describe('Jerarquia tipografica: escala acordada por viewport', () => {
  const bloques = bloquesDeEscala()

  it.each(Object.entries(ESCALA))('el rol %s mide lo acordado en escritorio, tablet y movil', (rol, tamanos) => {
    tamanos.forEach((tamano, indice) => {
      expect(bloques[indice]).toContain(`--text-${rol}: ${tamano};`)
    })
  })

  it('el titulo de seccion mantiene 20 px en escritorio, 18 px en tablet y 16 px en movil', () => {
    expect(bloques.map((bloque) => bloque.match(/--text-titulo-seccion:\s*([\d.]+)rem/)?.[1])).toEqual(['1.25', '1.125', '1'])
  })

  it('los .MuiAvatar-root y .MuiBadge-badge heredan la familia oficial y no la de Roboto de MUI', () => {
    expect(CSS).toMatch(/\.MuiAvatar-root,\s*\.MuiBadge-badge\s*\{\s*font-family:\s*var\(--fuente-base\)\s*!important;\s*\}/)
  })
})

describe('Jerarquia tipografica: cada elemento usa el rol de su funcion', () => {
  it('toda pagina con h1 visible usa titulo-pagina salvo las excepciones documentadas', () => {
    const sinRol = PANTALLAS.filter((fuente) => [...fuente.texto.matchAll(/<h1\b[^>]*className="([^"]*)"/g)].some((coincidencia) => !coincidencia[1].includes('text-titulo-pagina')))
    const permitidas = H1_SIN_TITULO_DE_PAGINA.map((excepcion) => excepcion.ruta)
    expect(sinRol.map((fuente) => fuente.ruta).filter((ruta) => !permitidas.includes(ruta))).toEqual([])
  })

  it('cada excepcion de h1 sigue existiendo y declara su motivo', () => {
    H1_SIN_TITULO_DE_PAGINA.forEach((excepcion) => {
      expect(excepcion.motivo.length).toBeGreaterThan(20)
      const fuente = PANTALLAS.find((candidata) => candidata.ruta === excepcion.ruta)
      expect(fuente, excepcion.ruta).toBeDefined()
      expect([...(fuente?.texto ?? String()).matchAll(/<h1\b[^>]*className="([^"]*)"/g)].some((coincidencia) => !coincidencia[1].includes('text-titulo-pagina'))).toBe(true)
    })
  })

  it('ningun h2, h3 ni h4 usa titulo-pagina (reservado al h1 de la pagina)', () => {
    const usos = PANTALLAS.flatMap((fuente) => [...fuente.texto.matchAll(/<h[234]\b[^>]*className="([^"]*)"/g)].filter((coincidencia) => coincidencia[1].includes('text-titulo-pagina')).map(() => fuente.ruta))
    expect(usos).toEqual([])
  })

  it('las cifras de los catalogos (clave valor) usan valor-destacado y no un rol de titulo', () => {
    const usos = CATALOGOS.flatMap((fuente) => [...fuente.texto.matchAll(/"valor"\s*:\s*"([^"]*)"/g)].filter((coincidencia) => /text-titulo-(pagina|seccion|banner)/.test(coincidencia[1])).map((coincidencia) => `${fuente.ruta}: ${coincidencia[1]}`))
    expect(usos).toEqual([])
  })

  it('un enlace con nombre-entidad no envuelve el nombre en strong (el navegador lo subiria a 900)', () => {
    const usos = PANTALLAS.filter((fuente) => /text-nombre-entidad[^"]*">\s*<strong>/.test(fuente.texto) && !/seccion_gastos_categoria/.test(fuente.ruta))
    expect(usos.map((fuente) => fuente.ruta)).toEqual([])
  })

  it('ningun titulo de seccion se declara con el rol de otro nivel en la misma etiqueta (titulo-seccion con titulo-banner)', () => {
    const mezclas = PANTALLAS.flatMap((fuente) => [...fuente.texto.matchAll(/className="([^"]*)"/g)].filter((coincidencia) => /text-titulo-seccion/.test(coincidencia[1]) && /text-(titulo-banner|nombre-entidad|titulo-pagina|valor-destacado)/.test(coincidencia[1])).map(() => fuente.ruta))
    expect(mezclas).toEqual([])
  })

  it('ningun small con clase literal queda sin rol de tamano (el navegador lo reduce al 80 % y daria 9,6 px)', () => {
    const sinRol = PANTALLAS.flatMap((fuente) => [...fuente.texto.matchAll(/<small[^>]*className=(?:"([^"]*)"|\{'([^']*)')/g)].filter((coincidencia) => !/(^|\s)text-[a-z-]+/.test(coincidencia[1] ?? coincidencia[2])).map(() => fuente.ruta))
    expect(sinRol).toEqual([])
  })

  it('la seccion de reportes recientes usa el mismo rol que la seccion de plantillas (misma jerarquia en la pagina)', () => {
    const recientes = PANTALLAS.find((fuente) => fuente.ruta === '/componentes/reportes/bloques/seccion_reportes_recientes.tsx')
    const plantillas = PANTALLAS.find((fuente) => fuente.ruta === '/componentes/reportes/bloques/seccion_plantillas_de_reportes.tsx')
    expect(recientes?.texto).toMatch(/<h2 className="[^"]*text-titulo-seccion/)
    expect(plantillas?.texto).toMatch(/<h2 className="[^"]*text-titulo-seccion/)
  })
})

describe('Jerarquia tipografica: casos resueltos por regla', () => {
  const fuenteDe = (ruta: string) => PANTALLAS.find((fuente) => fuente.ruta === ruta)?.texto ?? String()

  it('el h1 del perfil propio y el del colaborador usan titulo-pagina (el h1 de pagina es siempre titulo-pagina)', () => {
    expect(fuenteDe('/componentes/perfil/bloques/cabecera_perfil.tsx')).toMatch(/<h1 className="[^"]*text-titulo-pagina/)
    const catalogoColaboradores = JSON.parse(FUENTES.find((fuente) => fuente.ruta === '/catalogos/capacidades/redsocial/colaboradores.json')?.texto ?? '{}')
    expect(fuenteDe('/paginas/colaboradores/pagina_colaborador_perfil.tsx')).toMatch(/<h1 className=\{clases\.perfil_nombre\}/)
    expect(catalogoColaboradores.clases.detalle.perfil_nombre).toContain('text-titulo-pagina')
  })

  it('el nombre del evento destacado es un titulo destacado (cuerpo-grande 18/700) en la tarjeta y en los resultados del filtro de fecha', () => {
    expect(fuenteDe('/componentes/eventos/bloques/seccion_destacados2.tsx')).toMatch(/<h3 className="[^"]*text-cuerpo-grande[^"]*">\{destacado\.nombre\}/)
    expect(fuenteDe('/componentes/eventos/bloques/resultados_filtro_fecha.tsx')).toMatch(/<h4 className="[^"]*text-cuerpo-grande[^"]*">\{destacado\.nombre\}/)
  })

  it('el titular de la portada de Marketplace es un h2 de seccion (titulo-seccion), igual que sus secciones hermanas', () => {
    expect(fuenteDe('/componentes/marketplace/bloques/seccion_titulo_pre2.tsx')).toMatch(/<h2 className="[^"]*text-titulo-seccion/)
    expect(fuenteDe('/componentes/marketplace/bloques/seccion_destacados3.tsx')).toMatch(/<h2 className="[^"]*text-titulo-seccion/)
  })
})

describe('Jerarquia tipografica: detalle del evento', () => {
  const detalle = PANTALLAS.find((fuente) => fuente.ruta === '/componentes/eventos/bloques/seccion_descripcion2.tsx')?.texto ?? String()

  it('el titulo de la ventana de detalle usa el rol titulo-detalle (20/700) y no titulo-pagina', () => {
    expect(detalle).toMatch(/<h2 className="[^"]*text-titulo-detalle[^"]*">\{evento\.nombre\}/)
    expect(detalle).not.toContain('text-titulo-pagina')
  })

  it('Descripcion y Agenda son encabezados compactos del detalle con titulo-banner (16/700), el mismo en los dos', () => {
    const encabezados = [...detalle.matchAll(/<h3 className="([^"]*)">\{textos\.(descripcion|agenda)\}<\/h3>/g)]
    expect(encabezados.map((coincidencia) => coincidencia[2])).toEqual(['descripcion', 'agenda'])
    encabezados.forEach((coincidencia) => expect(coincidencia[1]).toMatch(/(^|\s)text-titulo-banner(\s|$)/))
  })

  it('Organizador es una etiqueta secundaria (titulo-subseccion 14/600, h3) sobre el nombre de la entidad (nombre-entidad 16/700)', () => {
    expect(detalle).toMatch(/<h3 className="[^"]*text-titulo-subseccion[^"]*">\{textos\.organizador\}<\/h3>/)
    expect(detalle).toMatch(/<p className="[^"]*text-nombre-entidad[^"]*">\{detalle\.organizador\.nombre\}<\/p>/)
    expect(detalle).not.toMatch(/<h3 className="[^"]*text-titulo-seccion/)
  })

  it('titulo-detalle se define una sola vez en index.css con la escala 20/18/16 px y peso 700, y se documenta su funcion', () => {
    expect(CSS.match(/--text-titulo-detalle:/g)?.length).toBe(3)
    expect(CSS).toContain('--text-titulo-detalle--font-weight: 700;')
    expect(CSS).toMatch(/titulo-detalle 700 \(t/)
  })

  it('ningun otro archivo usa titulo-detalle: es exclusivo del titulo de la ventana de detalle', () => {
    const usos = PANTALLAS.filter((fuente) => fuente.texto.includes('text-titulo-detalle')).map((fuente) => fuente.ruta)
    expect(usos).toEqual(['/componentes/eventos/bloques/seccion_descripcion2.tsx'])
  })
})
