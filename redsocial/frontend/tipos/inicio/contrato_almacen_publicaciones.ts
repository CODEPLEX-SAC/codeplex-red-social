import type { ComentarioPublicacion } from './contrato_interacciones_publicacion'
import type { ClaveReaccion } from './contrato_reacciones'
import type { ElementoFeed } from './modelo_inicio'

export interface InteraccionAlmacenada {
  reaccion: ClaveReaccion | null
  comentarios: ComentarioPublicacion[] | null
}

export interface EstadoPublicaciones {
  feed: ElementoFeed[]
  interacciones: Record<string, InteraccionAlmacenada>
  secuencia: number
  nombresVisibles: Record<string, string>
}

export interface AlmacenPublicaciones {
  leer: () => EstadoPublicaciones
  suscribir: (escucha: () => void) => () => void
  modificar: (cambio: (estado: EstadoPublicaciones) => EstadoPublicaciones) => void
}
