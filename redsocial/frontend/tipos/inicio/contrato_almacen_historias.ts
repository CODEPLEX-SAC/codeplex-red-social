import type { ClaveReaccion } from './contrato_reacciones'
import type { HistoriaPublicada, RespuestaHistoria } from './modelo_historia'

export interface EstadoHistorias {
  historias: HistoriaPublicada[]
  respuestas: RespuestaHistoria[]
  reacciones: Record<string, ClaveReaccion>
  secuencia: number
}

export interface AlmacenHistorias {
  leer: () => EstadoHistorias
  suscribir: (escucha: () => void) => () => void
  modificar: (cambio: (estado: EstadoHistorias) => EstadoHistorias) => void
}

export type HistoriasVistas = ReadonlySet<string>

export interface AlmacenHistoriasVistas {
  leer: () => HistoriasVistas
  suscribir: (escucha: () => void) => () => void
  modificar: (cambio: (estado: HistoriasVistas) => HistoriasVistas) => void
}
