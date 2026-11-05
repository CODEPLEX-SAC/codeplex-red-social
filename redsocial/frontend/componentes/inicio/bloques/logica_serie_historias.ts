import type { Historia } from '@/tipos/inicio/modelo_inicio'
import type { HistoriaPublicada } from '@/tipos/inicio/modelo_historia'

export function historiasDeAutor(historias: HistoriaPublicada[], autorId: string): HistoriaPublicada[] {
  return historias.filter((historia) => historia.autorId === autorId)
}

export function autoresConHistorias(historias: HistoriaPublicada[]): string[] {
  return [...new Set(historias.map((historia) => historia.autorId))]
}

export function ordenarHistorias(propias: HistoriaPublicada[], contactos: HistoriaPublicada[], carrusel: Historia[]): HistoriaPublicada[] {
  return [...propias, ...carrusel.flatMap((entrada) => historiasDeAutor(contactos, entrada.autorId ?? entrada.nombre))]
}
