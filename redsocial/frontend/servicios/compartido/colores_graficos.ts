import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'

const COLORES: Record<string, string> = catalogoCompartido.colores_graficos
const CLAVES_CON_COLOR = new Set<string>(catalogoCompartido.claves_color_en_datos)

export function resolverColoresGraficos<T>(valor: T): T {
  if (Array.isArray(valor)) return valor.map(resolverColoresGraficos) as T
  if (valor === null || typeof valor !== 'object') return valor
  const resuelto = Object.entries(valor).map(([clave, v]) => [clave, CLAVES_CON_COLOR.has(clave) && typeof v === 'string' && v in COLORES ? COLORES[v] : resolverColoresGraficos(v)])
  return Object.fromEntries(resuelto) as T
}
