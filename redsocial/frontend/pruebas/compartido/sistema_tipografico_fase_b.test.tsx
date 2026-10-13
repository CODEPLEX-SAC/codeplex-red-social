import { render, screen } from '@testing-library/react'
import { leerCssGlobal } from './leer_css'
import { MensajeVacio } from '../../componentes/compartido/interfaz/mensaje_vacio'
import { leerFuentesFrontend } from './leer_fuentes'

const CSS = await leerCssGlobal()
const FUENTES = await leerFuentesFrontend()
const PESOS_DE_ROL: Record<string, number> = {
  'titulo-pagina': 800,
  'titulo-seccion': 700,
  'titulo-banner': 700,
  'nombre-entidad': 700,
  'nombre-fila': 700,
  'valor-destacado': 800,
  'titulo-subseccion': 600,
  'cuerpo-grande': 700,
  'campo-formulario': 600,
  'etiqueta': 500,
  'boton': 600,
  'boton-mini': 600,
  'chip': 500,
  'enlace-accion': 600,
  'encabezado-tabla': 600,
  'badge': 700,
  'estado': 500,
  'conteo': 700,
  'fecha-abreviada': 400,
  'dia-evento': 800,
  'mes-evento': 700,
}
const ROLES_SIN_PESO_PROPIO = ['subtitulo', 'cuerpo', 'auxiliar', 'contador', 'navegacion']
const TODOS_LOS_ROLES = Object.keys(PESOS_DE_ROL).concat(ROLES_SIN_PESO_PROPIO)
const CLASES_DE_ROL = new Set(Object.keys(PESOS_DE_ROL).map((nombre) => `text-${nombre}`))
const INTERLINEADOS_PERMITIDOS = ['leading-compacto', 'leading-texto', 'leading-none']
const INTERLINEADOS_JUSTIFICADOS = [
  { ruta: '/componentes/colaboradores/bloques/bloque_vista_previa_correo.tsx', clase: 'leading-6' },
]
const PANELES_LATERALES = [
  '/componentes/compartido/bloques/panel_lateral.tsx',
  '/componentes/mensajeria/bloques/seccion_participantes.tsx',
  '/componentes/amigos/bloques/panel_lateral_amigos.tsx',
  '/componentes/avisos/bloques/panel_lateral_solicitudes_aviso.tsx',
  '/componentes/avisos/bloques/panel_detalle_aviso.tsx',
  '/componentes/eventos/bloques/panel_calendario_mini.tsx',
  '/componentes/eventos/bloques/seccion_proximos2.tsx',
  '/componentes/eventos/bloques/seccion_calendario13.tsx',
  '/componentes/grupos/bloques/seccion_actividad_reciente_grupos.tsx',
  '/componentes/guardados/bloques/panel_lateral_guardados.tsx',
  '/componentes/marketplace/bloques/seccion_popular_esta_semana.tsx',
  '/componentes/dashboard/bloques/seccion_ratios_financieros.tsx',
  '/componentes/estadisticas/bloques/seccion_top_clientes.tsx',
  '/componentes/indicadores/bloques/seccion_estructura_costos.tsx',
]
const CONSUMIDORES_DE_MENSAJE_VACIO = [
  '/componentes/eventos/bloques/elementos_resultado_filtro.tsx',
  '/componentes/eventos/bloques/sin_eventos_ubicacion.tsx',
  '/componentes/eventos/bloques/seccion_eventos_de_hoy2.tsx',
  '/componentes/inicio/bloques/seccion_comentarios_publicacion.tsx',
  '/paginas/avisos/pagina_avisos_solicitudes.tsx',
]

function literales(texto: string): string[] {
  return [...texto.matchAll(/"([^"\n]{0,600})"|'([^'\n]{0,600})'|`([^`\n]{0,600})`/g)].map((coincidencia) => coincidencia[1] ?? coincidencia[2] ?? coincidencia[3])
}

function clasesDe(fuente: { texto: string }): string[] {
  return literales(fuente.texto).flatMap((literal) => literal.split(/\s+/))
}

function fuenteDe(ruta: string) {
  return FUENTES.find((fuente) => fuente.ruta === ruta)
}

describe('Fase B final: cada rol tipografico define su tamano responsive y su peso en index.css', () => {
  it.each(Object.entries(PESOS_DE_ROL))('text-%s pesa %i por defecto', (rol, peso) => {
    expect(CSS).toMatch(new RegExp(`--text-${rol}--font-weight:\\s*${peso};`))
  })

  it.each(ROLES_SIN_PESO_PROPIO)('el rol %s no fija peso (lo decide la funcion del texto)', (rol) => {
    expect(CSS).not.toMatch(new RegExp(`--text-${rol}--font-weight`))
  })

  it.each(TODOS_LOS_ROLES)('el rol %s define su tamano en Desktop, Tablet y Movil', (rol) => {
    expect(CSS.match(new RegExp(`^\\s*--text-${rol}:`, 'gm'))?.length).toBe(3)
  })

  it('index.css no conserva tamanos fuera de los roles ni el rol etiqueta-estado', () => {
    const tamanos = [...CSS.matchAll(/^\s*--text-([a-z0-9.-]+):/gm)].map((coincidencia) => coincidencia[1]).filter((nombre) => !nombre.includes('--'))
    expect([...new Set(tamanos)].filter((nombre) => !TODOS_LOS_ROLES.includes(nombre))).toEqual([])
  })

  it('la etiqueta de campo hereda el interlineado 1,5 y no define uno propio', () => {
    expect(CSS).not.toMatch(/--text-etiqueta--line-height/)
  })

  it('los tokens de peso con nombre siguen definidos', () => {
    expect(CSS).toMatch(/--font-weight-etiqueta:\s*500/)
    expect(CSS).toMatch(/--font-weight-control:\s*600/)
    expect(CSS).toMatch(/--font-weight-titulo:\s*700/)
    expect(CSS).toMatch(/--font-weight-pagina:\s*800/)
  })
})

describe('Fase B final: sin pesos arbitrarios', () => {
  it('ningun literal usa font-medium, font-semibold, font-bold ni font-extrabold (ni con prefijo)', () => {
    const hallazgos = FUENTES.filter((fuente) => clasesDe(fuente).some((clase) => /^(?:[a-z0-9-]+:)*font-(medium|semibold|bold|extrabold)$/.test(clase))).map((fuente) => fuente.ruta)
    expect(hallazgos).toEqual([])
  })

  it('un rol con peso propio no repite su peso con una clase font-* en el mismo literal', () => {
    const hallazgos: string[] = []
    FUENTES.forEach((fuente) => {
      literales(fuente.texto).forEach((literal) => {
        const palabras = literal.split(/\s+/)
        const roles = palabras.filter((palabra) => CLASES_DE_ROL.has(palabra))
        const pesos = palabras.filter((palabra) => /^font-(etiqueta|control|titulo|pagina|normal)$/.test(palabra))
        if (roles.length === 1 && pesos.length > 0) hallazgos.push(`${fuente.ruta}: ${roles[0]} + ${pesos[0]}`)
      })
    })
    expect(hallazgos).toEqual([])
  })

  it('no se usan utilidades de tamano de Tailwind ni valores arbitrarios', () => {
    const fuera = FUENTES.filter((fuente) => /(^|[^\w-])text-(?:xs|sm|base|lg|xl|[2-9]xl)(?![\w-])|(?:text|leading|font)-\[\d/.test(fuente.texto)).map((fuente) => fuente.ruta)
    expect(fuera).toEqual([])
  })

  it('el estilo tipografico en JS solo vive en el mecanismo de iconos y en el catalogo compartido', () => {
    const permitidos = ['/componentes/compartido/icono.tsx', '/componentes/compartido/fuente_iconos.ts', '/catalogos/capacidades/redsocial/compartido.json', '/catalogos/capacidades/redsocial/empresas.json']
    const con = FUENTES.filter((fuente) => /\b(fontSize|fontWeight|lineHeight|fontFamily)\b/.test(fuente.texto)).map((fuente) => fuente.ruta)
    expect(con.filter((ruta) => !permitidos.includes(ruta))).toEqual([])
  })
})

describe('Fase B final: interlineado con escala global', () => {
  it('solo se usan leading-compacto, leading-texto y leading-none (mas las excepciones justificadas)', () => {
    const hallazgos: string[] = []
    FUENTES.forEach((fuente) => {
      clasesDe(fuente)
        .filter((clase) => /^(?:[a-z0-9-]+:)*leading-[\w.[\]-]+$/.test(clase))
        .map((clase) => clase.split(':').pop() as string)
        .filter((clase) => !INTERLINEADOS_PERMITIDOS.includes(clase))
        .filter((clase) => !INTERLINEADOS_JUSTIFICADOS.some((excepcion) => excepcion.ruta === fuente.ruta && excepcion.clase === clase))
        .forEach((clase) => hallazgos.push(`${fuente.ruta}: ${clase}`))
    })
    expect(hallazgos).toEqual([])
  })

  it('index.css define la escala y ya no conserva los interlineados numericos heredados', () => {
    expect(CSS).toMatch(/--leading-compacto:\s*1\.25/)
    expect(CSS).toMatch(/--leading-texto:\s*1\.45/)
    expect(CSS).not.toMatch(/--leading-1\./)
  })
})

describe('Fase B final: titulos de ventana, panel y tarjeta con el mismo rol', () => {
  it.each(PANELES_LATERALES)('%s usa titulo-banner y no titulo-seccion', (ruta) => {
    const texto = fuenteDe(ruta)?.texto ?? ''
    expect(texto).toContain('text-titulo-banner')
    expect(texto).not.toContain('text-titulo-seccion')
  })

  it.each([
    ['/componentes/eventos/bloques/modal_crear_evento.tsx', /<h2 className="[^"]*text-titulo-banner[^"]*">\{textos\.titulo\}/],
    ['/componentes/colaboradores/bloques/panel_filtros_avanzados.tsx', /<h3 className="[^"]*text-titulo-banner[^"]*">\{textos\.titulo\}/],
  ])('%s', (ruta, patron) => {
    expect(fuenteDe(ruta)?.texto).toMatch(patron)
  })

  it('el catalogo del Modal compartido usa titulo-banner', () => {
    expect(fuenteDe('/catalogos/capacidades/redsocial/compartido.json')?.texto).toMatch(/"clase_titulo": "[^"]*text-titulo-banner/)
  })

  it('los bloques del modal de invitacion usan nombre-entidad como los del modal de edicion', () => {
    expect(fuenteDe('/componentes/colaboradores/bloques/bloque_renovacion.tsx')?.texto).toContain('text-nombre-entidad')
    expect(fuenteDe('/componentes/colaboradores/bloques/bloque_editar_datos_colaborador.tsx')?.texto).toContain('text-nombre-entidad')
  })
})

describe('Fase B final: roles compartidos de badge, estado, conteo, chip, boton mini y mensaje vacio', () => {
  it('ningun archivo usa el antiguo text-etiqueta-estado', () => {
    expect(FUENTES.filter((fuente) => fuente.texto.includes('text-etiqueta-estado')).map((fuente) => fuente.ruta)).toEqual([])
  })

  it('el boton mini y el chip de filtro consumen su rol en el catalogo', () => {
    const catalogo = fuenteDe('/catalogos/capacidades/redsocial/compartido.json')?.texto ?? ''
    expect(catalogo).toMatch(/"mini": "[^"]*text-boton-mini/)
    expect(catalogo).toMatch(/"clases_boton_mini": "[^"]*text-boton-mini/)
    expect(catalogo).toMatch(/"filtro": "[^"]*text-chip/)
  })

  it('la etiqueta del selector es la etiqueta de campo global', () => {
    const catalogo = fuenteDe('/catalogos/capacidades/redsocial/compartido.json')?.texto ?? ''
    expect(catalogo).toMatch(/"selector_label": \{\s*"default": "text-etiqueta/)
  })

  it('el mensaje vacio sale de un solo componente y de un solo bloque del catalogo', () => {
    const catalogo = fuenteDe('/catalogos/capacidades/redsocial/compartido.json')?.texto ?? ''
    expect(catalogo).toMatch(/"mensaje_vacio": \{[^}]*text-nombre-entidad[^}]*text-subtitulo/s)
    CONSUMIDORES_DE_MENSAJE_VACIO.forEach((ruta) => expect(fuenteDe(ruta)?.texto).toContain('<MensajeVacio'))
  })
})

describe('Fase B final: una sola familia tipografica', () => {
  it('index.css declara la familia una sola vez y no hay @font-face', () => {
    expect(CSS.match(/font-family:/g)?.length).toBe(1)
    expect(CSS).not.toMatch(/@font-face/)
  })
})

describe('Fase B final: MensajeVacio produce siempre la misma tipografia', () => {
  it('con titulo: nombre-entidad y subtitulo', () => {
    render(<MensajeVacio titulo="Sin datos" texto="Aun no hay nada" className="mt-5" />)
    expect(screen.getByRole('heading', { name: 'Sin datos' }).className).toContain('text-nombre-entidad')
    expect(screen.getByText('Aun no hay nada').className).toContain('text-subtitulo')
  })

  it('sin titulo: solo el texto en subtitulo', () => {
    render(<MensajeVacio texto="Nada por aqui" />)
    expect(screen.queryByRole('heading')).toBeNull()
    expect(screen.getByText('Nada por aqui').className).toContain('text-subtitulo')
  })
})
