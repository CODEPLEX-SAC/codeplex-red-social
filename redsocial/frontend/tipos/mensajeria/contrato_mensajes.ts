import type { EstadoNotificaciones, IdentificadoresConversacion, OrigenActividad, TipoConversacion } from './contrato_acciones_conversacion'

export interface ParticipanteMensajeria {
  id: string
  nombre: string
}

export type TipoAdjunto = 'documento' | 'imagen' | 'audio'

export interface AdjuntoMensaje {
  nombre: string
  peso: string
  tipo?: TipoAdjunto
  formato?: string
  extension?: string
  mime?: string
  bytes?: number
  url?: string
  duracion?: number
  picos?: readonly number[]
}

export interface RespuestaMensaje {
  mensajeId: string
  autorId: string
}

export type ParteMensaje = Pick<Mensaje, 'contenido' | 'adjunto' | 'reenviado' | 'respuestaA'>

export interface Mensaje {
  id: string
  autorId: string
  creadoEn: string
  contenido?: string
  adjunto?: AdjuntoMensaje
  respuestaA?: RespuestaMensaje
  reaccion?: { icono: string; cantidad: number }
  hora?: string
  reenviado?: boolean
}

export interface Conversacion {
  id: string
  nombre: string
  extracto: string
  noLeidos: number
  favorita: boolean
  enLinea: boolean
  participantes: readonly string[]
  esGrupo?: boolean
  imagen?: string
  grupoId?: string
  silenciado?: boolean
  marcadaNoLeida?: boolean
  actividadHistoria?: { publicadaEn: string }
  contexto?: string
  mensajeFijadoId?: string
}

export interface ConversacionConEtiqueta extends Conversacion {
  etiquetaTiempo: string
  etiquetaCompleta: string
  fechaActividad: string | null
  vistaPrevia: string
  origenActividad: OrigenActividad
  tipo: TipoConversacion
  identificadores: IdentificadoresConversacion
  estadoNotificaciones: EstadoNotificaciones
}

export interface EstadoMensajeria {
  participantes: readonly ParticipanteMensajeria[]
  conversaciones: readonly Conversacion[]
  hilos: Readonly<Record<string, readonly Mensaje[]>>
}

export interface AlmacenMensajeria {
  leer: () => EstadoMensajeria
  suscribir: (escucha: () => void) => () => void
  modificar: (cambio: (estado: EstadoMensajeria) => EstadoMensajeria) => void
}

export interface RelojMensajeria {
  ahora: () => Date
}

export interface AccionesMensaje {
  responder: boolean
  editar: boolean
  reenviar: boolean
  fijar: boolean
  eliminar: boolean
}

export type PosicionEnGrupo = 'sola' | 'primera' | 'media' | 'ultima'
