import type { GrupoHistorias, HistoriaPublicada } from '@/tipos/inicio/modelo_historia'

export function siguienteHistoria(grupos: GrupoHistorias[], grupo: number, segmento: number): HistoriaPublicada | null {
  if (grupos[grupo].historias.length > segmento + 1) return grupos[grupo].historias[segmento + 1]
  return grupos.length > grupo + 1 ? grupos[grupo + 1].historias[0] : null
}

export function anteriorHistoria(grupos: GrupoHistorias[], grupo: number, segmento: number): HistoriaPublicada | null {
  if (segmento > 0) return grupos[grupo].historias[segmento - 1]
  if (grupo === 0) return null
  const previo = grupos[grupo - 1].historias
  return previo[previo.length - 1]
}
