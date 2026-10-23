import type { MedioLocalPublicacion, PrioridadPublicacion, TipoPublicacion } from './contrato_crear_publicacion'
import type { ComentarioPublicacion } from './contrato_interacciones_publicacion'
import type { ReaccionesPorTipo } from './contrato_reacciones'

export interface Historia {
  nombre: string
  crear?: boolean
}

export interface PublicacionInicio {
  id: string
  autorId: string
  nombre: string
  tiempo: string
  publica: boolean
  texto: string
  reaccionesPorTipo: ReaccionesPorTipo
  comentarios: ComentarioPublicacion[]
}

export interface PublicacionCompartidaInicio {
  id: string
  autorId: string
  nombre: string
  tiempoCompartio: string
  publica: boolean
  origenNombre: string
  origenTiempo: string
  texto: string
  comentario?: string
  conMedio: boolean
}

export interface ComentarioUtil {
  id: string
  autor: string
  texto: string
}

export interface OpcionVotable {
  id: string
  texto: string
  votos: number
}

export interface PublicacionTextoInicio {
  id: string
  autorId: string
  nombre: string
  tiempo: string
  texto: string
  tipo: TipoPublicacion
  prioridad?: PrioridadPublicacion
  medios: MedioLocalPublicacion[]
  opciones: OpcionVotable[]
  miVoto: string | null
  reaccionesBase: ReaccionesPorTipo
  comentariosBase: ComentarioPublicacion[]
  enInicio: boolean
  comentarioUtil: ComentarioUtil | null
}

export interface PublicacionCompartidaFeed extends PublicacionCompartidaInicio {
  origenId: string
}

export type ElementoFeed =
  | ({ clase: 'texto' } & PublicacionTextoInicio)
  | ({ clase: 'compartida' } & PublicacionCompartidaFeed)

export type PestanaFeed = 'inicio' | 'videos' | 'encuestas' | 'preguntas'

export interface EstadisticasActividad {
  publicaciones: number
  videos: number
  compartidos: number
}

export interface AutorSesion {
  id: string
  usuario: string
}

export interface OrigenCompartido {
  id: string
  nombre: string
  tiempo: string
  texto: string
}
