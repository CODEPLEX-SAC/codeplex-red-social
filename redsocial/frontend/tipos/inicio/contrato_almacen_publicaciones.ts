import type { MedioLocalPublicacion } from './contrato_crear_publicacion'
import type { ComentarioPublicacion, MencionComentario } from './contrato_interacciones_publicacion'
import type { ClaveReaccion } from './contrato_reacciones'
import type { AutorSesion, ElementoFeed, OrigenCompartido } from './modelo_inicio'

export interface DatosPublicacionCompartida {
  autor: AutorSesion
  origen: OrigenCompartido
  comentario: string
  tiempo: string
}

export interface DatosComentarioNuevo {
  id: string
  autor: AutorSesion
  texto: string
  tiempo: string
  medios?: MedioLocalPublicacion[]
  mencion?: MencionComentario
}

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
