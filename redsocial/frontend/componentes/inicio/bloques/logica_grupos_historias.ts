import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { EstadoSegmentoHistoria, GrupoHistorias, HistoriaPublicada } from '@/tipos/inicio/modelo_historia'

export const MAXIMO_SEGMENTOS = catalogoInicio.historias.maximo_segmentos

export function agruparPorAutor(serie: HistoriaPublicada[]): GrupoHistorias[] {
  const grupos: GrupoHistorias[] = []
  for (const historia of serie) {
    const existente = grupos.find((grupo) => grupo.autorId === historia.autorId)
    if (existente) existente.historias.push(historia)
    else grupos.push({ id: historia.autorId, autorId: historia.autorId, nombre: historia.nombre, historias: [historia] })
  }
  return grupos
}

export function ubicacionDe(grupos: GrupoHistorias[], historia: HistoriaPublicada | null): { grupo: number; segmento: number } {
  if (!historia) return { grupo: -1, segmento: -1 }
  const grupo = grupos.findIndex((candidato) => candidato.autorId === historia.autorId)
  const segmento = grupo === -1 ? -1 : grupos[grupo].historias.findIndex((candidata) => candidata.id === historia.id)
  return { grupo, segmento }
}

function estadoDeSegmento(orden: number, segmento: number): EstadoSegmentoHistoria {
  if (orden === segmento) return 'actual'
  return segmento > orden ? 'visto' : 'pendiente'
}

export function estadosDeSegmentos(total: number, segmento: number): EstadoSegmentoHistoria[] {
  return Array.from({ length: total }, (_, orden) => estadoDeSegmento(orden, segmento))
}

export function limiteSegmentosAlcanzado(propias: HistoriaPublicada[]): boolean {
  return propias.length >= MAXIMO_SEGMENTOS
}

export function textoLimiteSegmentos(plantilla: string): string {
  return plantilla.replace(':maximo', String(MAXIMO_SEGMENTOS))
}
