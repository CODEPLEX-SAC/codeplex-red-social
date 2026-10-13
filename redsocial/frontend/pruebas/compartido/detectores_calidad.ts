import { BOTONES_NATIVOS_PERMITIDOS, COLORES_NOMBRADOS_PERMITIDOS } from './registro_componentes_permitidos'
import { MODALES_PROPIOS_PERMITIDOS } from './registro_arquitectura'

const CARPETAS_NO_ENTREGABLES = ['node_modules', '.vite', 'dist', '.git', '.cache', '.tmp']
const CASCARON_DE_PANEL = /<section className="rounded-xl border border-borde bg-white p-4">\s*<div className="mb-3\.5 flex items-center justify-between">\s*<h2 className="m-0 text-titulo-banner text-texto">/
const COLOR_NOMBRADO = /(?<![\w-])(?:[a-z0-9-]+:)*(?:text|bg|border|from|to|via|fill|stroke)-t-([0-9a-f]{6})(?![\w-])/g

export function detectarBotonNativoNoRegistrado(ruta: string, texto: string): string[] {
  const cantidad = (texto.match(/<button\b/g) ?? []).length
  const permitido = BOTONES_NATIVOS_PERMITIDOS[ruta]?.cantidad ?? 0
  return cantidad > permitido ? [`${ruta}: ${cantidad} <button> nativos y solo ${permitido} registrados`] : []
}

export function detectarPanelDuplicado(ruta: string, texto: string): string[] {
  return CASCARON_DE_PANEL.test(texto) && !ruta.endsWith('/bloques/panel_lateral.tsx') ? [`${ruta}: reescribe el cascaron de PanelLateral`] : []
}

export function detectarTextoVisibleFueraDeCatalogo(ruta: string, texto: string): string[] {
  const enJsx = [...texto.matchAll(/>\s*([A-Za-zÁÉÍÓÚÑáéíóúñ][^<>{}\n]{2,})\s*</g)].filter((coincidencia) => !/[=;(){}]|\breturn\b|\bconst\b|\w: /.test(coincidencia[1])).map((coincidencia) => `texto en JSX "${coincidencia[1].trim()}"`)
  const enAtributo = [...texto.matchAll(/\b(?:aria-label|title|placeholder|alt)="([A-Za-zÁÉÍÓÚÑáéíóúñ][^"]*)"/g)].map((coincidencia) => `atributo accesible "${coincidencia[1]}"`)
  return [...enJsx, ...enAtributo].map((hallazgo) => `${ruta}: ${hallazgo}`)
}

export function detectarRutaLiteral(ruta: string, texto: string): string[] {
  return /\b(?:href|to)=["']\/[a-z]/.test(texto) ? [`${ruta}: ruta literal en href o to`] : []
}

export function detectarImportDeServicio(ruta: string, texto: string): string[] {
  return ruta.startsWith('/componentes/') && /from ['"][./@]+[^'"]*\/servicios\//.test(texto) ? [`${ruta}: importa un servicio`] : []
}

export function detectarModalPropio(ruta: string, texto: string): string[] {
  const esDialogo = /role="dialog"|aria-modal/.test(texto)
  const permitido = ruta.endsWith('/interfaz/modal.tsx') || MODALES_PROPIOS_PERMITIDOS[ruta] !== undefined
  return esDialogo && !permitido ? [`${ruta}: dialogo propio; usar el Modal compartido o registrar la excepcion`] : []
}

export function detectarColorNombradoNoAutorizado(ruta: string, texto: string): string[] {
  const hallazgos: string[] = []
  for (const coincidencia of texto.matchAll(COLOR_NOMBRADO)) {
    if (!COLORES_NOMBRADOS_PERMITIDOS[coincidencia[1]]) hallazgos.push(`${ruta}: color t-${coincidencia[1]} no autorizado`)
    if (/(?:^|:)text-t-/.test(coincidencia[0])) hallazgos.push(`${ruta}: t-${coincidencia[1]} como color de texto`)
  }
  return hallazgos
}

export function detectarArtefactoEnArbol(rutas: string[]): string[] {
  return rutas
    .filter((ruta) => ruta.split(/[\\/]/).some((segmento) => CARPETAS_NO_ENTREGABLES.includes(segmento)))
    .map((ruta) => `${ruta}: artefacto no entregable dentro de la capacidad`)
}
