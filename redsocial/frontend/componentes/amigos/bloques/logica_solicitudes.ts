import { contieneTexto } from '../../compartido/interfaz/fuente_busqueda_local'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { FiltrosSolicitudes, ItemSolicitud } from '@/tipos/amigos/contrato_solicitudes'
import type { CategoriaSolicitud, SolicitudEnviada, SolicitudRecibida } from '@/tipos/amigos/modelo_amigos_solicitudes'

const mensajes = catalogoAmigos.mensajes
const botones = catalogoAmigos.botones

export const CATEGORIAS = Object.keys(catalogoAmigos.pestanas_solicitudes) as CategoriaSolicitud[]
export const [CATEGORIA_RECIBIDAS, CATEGORIA_ENVIADAS] = CATEGORIAS
export const ETIQUETAS = catalogoAmigos.pestanas_solicitudes as Record<CategoriaSolicitud, string>
export const LIMITE_VISIBLES = catalogoAmigos.limite_solicitudes_visibles

const VACIOS_POR_CATEGORIA = [mensajes.sin_solicitudes, mensajes.sin_enviadas]
const TONOS_CONTEO = catalogoAmigos.tonos_conteo_chip as Record<string, 'blanco' | 'neutro'>

export const mensajeVacio = (categoria: CategoriaSolicitud, hayFuente: boolean) => (hayFuente ? mensajes.sin_resultados_solicitudes : VACIOS_POR_CATEGORIA[CATEGORIAS.indexOf(categoria)])
export function textoDelPie(expandida: boolean) {
  if (expandida) return botones.ver_menos_solicitudes_recibidas
  return botones.ver_mas_solicitudes_recibidas
}
export const tonoDelConteo = (activo: boolean) => TONOS_CONTEO[String(activo)]

export function armarItemsSolicitudes(recibidas: readonly SolicitudRecibida[], enviadas: readonly SolicitudEnviada[]): readonly ItemSolicitud[] {
  return [...recibidas.map((solicitud): ItemSolicitud => ({ categoria: 'recibidas', solicitud })), ...enviadas.map((solicitud): ItemSolicitud => ({ categoria: 'enviadas', solicitud }))]
}

export function coincideSolicitud(item: ItemSolicitud, consulta: string): boolean {
  return contieneTexto(item.solicitud.nombre, consulta)
}

export function admiteSolicitud(item: ItemSolicitud, { categoria }: FiltrosSolicitudes): boolean {
  return item.categoria === categoria
}
