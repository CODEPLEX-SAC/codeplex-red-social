import { normalizarTexto } from '../../compartido/interfaz/buscar_opciones_locales'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { CategoriaSolicitud } from '@/tipos/amigos/modelo_amigos_solicitudes'

const mensajes = catalogoAmigos.mensajes
const botones = catalogoAmigos.botones

export const CATEGORIAS = Object.keys(catalogoAmigos.pestanas_solicitudes) as CategoriaSolicitud[]
export const [CATEGORIA_RECIBIDAS, CATEGORIA_ENVIADAS] = CATEGORIAS
export const ETIQUETAS = catalogoAmigos.pestanas_solicitudes as Record<CategoriaSolicitud, string>
export const SIN_FUENTE: readonly never[] = []

const VACIOS_POR_CATEGORIA = [mensajes.sin_solicitudes, mensajes.sin_enviadas, mensajes.sin_ignoradas]
const PIES_POR_CATEGORIA = [botones.ver_mas_solicitudes_recibidas, botones.ver_todas_solicitudes_enviadas, String()]
const TONOS_CONTEO = catalogoAmigos.tonos_conteo_chip as Record<string, 'blanco' | 'neutro'>

export const mensajeVacio = (categoria: CategoriaSolicitud, hayFuente: boolean) => (hayFuente ? mensajes.sin_resultados_solicitudes : VACIOS_POR_CATEGORIA[CATEGORIAS.indexOf(categoria)])
export const pieDeLista = (categoria: CategoriaSolicitud) => PIES_POR_CATEGORIA[CATEGORIAS.indexOf(categoria)]
export const tonoDelConteo = (activo: boolean) => TONOS_CONTEO[String(activo)]

export function filtrarSolicitudes<T extends { nombre: string; descripcion: string }>(solicitudes: readonly T[], texto: string): T[] {
  const consulta = normalizarTexto(texto)
  return solicitudes.filter((solicitud) => normalizarTexto(`${solicitud.nombre} ${solicitud.descripcion}`).includes(consulta))
}
