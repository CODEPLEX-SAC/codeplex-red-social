import { COLORES_DE_SUPERFICIE_HEREDADOS, COLORES_TIPOGRAFICOS_HEREDADOS, EXCEPCIONES_TIPOGRAFICAS } from './excepciones_tipograficas'

const ROLES_CON_PESO = [
  'titulo-pagina', 'titulo-seccion', 'titulo-banner', 'nombre-entidad', 'nombre-fila', 'valor-destacado', 'titulo-subseccion', 'cuerpo-grande',
  'campo-formulario', 'etiqueta', 'boton', 'boton-mini', 'chip', 'enlace-accion', 'encabezado-tabla', 'badge', 'estado', 'conteo',
  'fecha-abreviada', 'dia-evento', 'mes-evento',
]
const INTERLINEADOS_DEL_SISTEMA = ['leading-compacto', 'leading-texto', 'leading-none']
const NOMBRES_DE_ESTILO_JS = ['fontSize', 'fontWeight', 'lineHeight', 'fontFamily']
const CLASE_DE_ROL = new Set(ROLES_CON_PESO.map((rol) => `text-${rol}`))
const REGLAS_DE_CLASE = [
  { patron: /^(text|leading|font|tracking)-\[[^\]]+\]$/, mensaje: 'valor arbitrario' },
  { patron: /^font-(thin|extralight|light|medium|semibold|bold|extrabold|black)$/, mensaje: 'peso arbitrario' },
  { patron: /^text-(xs|sm|base|lg|xl|[2-9]xl)$/, mensaje: 'tamano arbitrario' },
  { patron: /^font-(sans|serif|mono)$/, mensaje: 'familia local' },
  { patron: /^text-\[(#|rgb|hsl)/, mensaje: 'color tipografico arbitrario' },
]

function literales(texto: string): string[] {
  return [...texto.matchAll(/"([^"\n]{0,600})"|'([^'\n]{0,600})'|`([^`\n]{0,600})`/g)].map((coincidencia) => coincidencia[1] ?? coincidencia[2] ?? coincidencia[3])
}

function declarada(ruta: string, regla: string, clase: string): boolean {
  return EXCEPCIONES_TIPOGRAFICAS.some((excepcion) => excepcion.ruta === ruta && excepcion.regla === regla && excepcion.clase === clase)
}

function sinVariante(clase: string): string {
  return clase.split(':').pop() as string
}

function desviacionDeClase(ruta: string, clase: string): string | null {
  const simple = sinVariante(clase)
  const regla = REGLAS_DE_CLASE.find((candidata) => candidata.patron.test(simple))
  if (regla) return `${regla.mensaje}: ${clase}`
  const esInterlineado = simple.startsWith('leading-')
  const permitido = INTERLINEADOS_DEL_SISTEMA.includes(simple) || declarada(ruta, 'interlineado', simple)
  return esInterlineado && !permitido ? `interlineado arbitrario: ${clase}` : null
}

function desviacionesDeEstiloJs(ruta: string, texto: string): string[] {
  return NOMBRES_DE_ESTILO_JS.filter((nombre) => texto.includes(nombre) && !declarada(ruta, 'estilo-js', nombre)).map((nombre) => `estilo tipografico en JS: ${nombre}`)
}

function desviacionesDeColorLocal(ruta: string, clases: string[]): string[] {
  const hexadecimales = clases.filter((clase) => /^(?:[a-z0-9-]+:)*(text|bg|border|from|to|via|fill|stroke)-t-[0-9a-f]{6}$/.test(clase))
  const deTexto = hexadecimales.filter((clase) => /^(?:[a-z0-9-]+:)*text-/.test(clase)).length
  const deSuperficie = hexadecimales.length - deTexto
  const hallazgos: string[] = []
  if (deTexto > (COLORES_TIPOGRAFICOS_HEREDADOS[ruta] ?? 0)) hallazgos.push(`color tipografico local nuevo: ${deTexto} frente a ${COLORES_TIPOGRAFICOS_HEREDADOS[ruta] ?? 0} heredados`)
  if (deSuperficie > (COLORES_DE_SUPERFICIE_HEREDADOS[ruta] ?? 0)) hallazgos.push(`color de superficie con nombre hexadecimal nuevo: ${deSuperficie} frente a ${COLORES_DE_SUPERFICIE_HEREDADOS[ruta] ?? 0} heredados`)
  return hallazgos
}

function desviacionesDePesoRepetido(texto: string): string[] {
  return literales(texto).flatMap((literal) => {
    const palabras = literal.split(/\s+/)
    const roles = palabras.filter((palabra) => CLASE_DE_ROL.has(palabra))
    const pesos = palabras.filter((palabra) => /^font-(etiqueta|control|titulo|pagina)$/.test(palabra))
    return roles.length === 1 && pesos.length > 0 ? [`el rol ${roles[0]} ya define su peso: ${pesos[0]}`] : []
  })
}

export function detectarDesviacionesTipograficas(ruta: string, texto: string): string[] {
  const clases = literales(texto).flatMap((literal) => literal.split(/\s+/))
  const deClase = clases.map((clase) => desviacionDeClase(ruta, clase)).filter((hallazgo): hallazgo is string => hallazgo !== null)
  return [...deClase, ...desviacionesDeEstiloJs(ruta, texto), ...desviacionesDeColorLocal(ruta, clases), ...desviacionesDePesoRepetido(texto)]
}
