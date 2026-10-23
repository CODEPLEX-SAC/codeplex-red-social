import type { ElementoFeed, EstadisticasActividad, OpcionVotable, OrigenCompartido, PestanaFeed, ComentarioUtil, PublicacionCompartidaInicio, PublicacionInicio, PublicacionTextoInicio } from './modelo_inicio'
import type { MedioLocalPublicacion, TipoPublicacion } from './contrato_crear_publicacion'
import type { ComentarioPublicacion, InteraccionPublicacion } from './contrato_interacciones_publicacion'
import type { ReaccionesPorTipo } from './contrato_reacciones'

export interface PestanaFeedCatalogo {
  clave: PestanaFeed
  etiqueta: string
}

export interface TextoVacioFeed {
  titulo: string
  texto: string
}

export interface PestanasFeedInicioProps {
  activa: PestanaFeed
  onCambiar: (pestana: PestanaFeed) => void
}

export interface OpcionesUtilidad {
  habilitada: boolean
  comentarioUtil: ComentarioUtil | null
}

export interface AccionesFeedInicio {
  compartidosDe: (id: string) => number
  interaccionesDe: (id: string, reaccionesBase: ReaccionesPorTipo, comentariosBase: ComentarioPublicacion[], util?: OpcionesUtilidad) => InteraccionPublicacion
  onMarcarUtil: (id: string, comentario: ComentarioPublicacion | null) => void
  esPropia: (autorId: string) => boolean
  onEditar: (id: string, texto: string, medios: MedioLocalPublicacion[]) => void
  onEliminar: (id: string) => void
  onCompartir: (origen: OrigenCompartido, comentario: string) => void
  onVotar: (id: string, opcionId: string) => void
}

export interface ElementoFeedInicioProps {
  elemento: ElementoFeed
  acciones: AccionesFeedInicio
}

export interface SeccionFeedInicioProps {
  feed: ElementoFeed[]
  acciones: AccionesFeedInicio
  publicacionDemostracion: PublicacionInicio
  compartidaDemostracion: PublicacionCompartidaInicio
}

export interface EstadisticasActividadInicioProps {
  estadisticas: EstadisticasActividad
}

export interface CuerpoPublicacionProps {
  publicacion: PublicacionTextoInicio
  onVotar: (opcionId: string) => void
}

export interface MediosPublicacionProps {
  medios: MedioLocalPublicacion[]
}

export interface VotacionEncuestaProps {
  opciones: OpcionVotable[]
  miVoto: string | null
  onVotar: (opcionId: string) => void
}

export interface CompositorInicioProps {
  placeholderPublicar: string
  onAbrir: (tipo: TipoPublicacion) => void
}

export interface MensajeFlotanteInicio {
  nombre: string
  preview: string
  hora: string
  badge: number
}

export interface MensajesFlotantesInicioProps {
  mensajes: readonly MensajeFlotanteInicio[]
}
