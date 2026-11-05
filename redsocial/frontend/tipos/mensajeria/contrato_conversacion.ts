import type { ControlGrabacionAudio } from '@/tipos/compartido/contrato_audio'
import type { EstadoPresencia } from '@/tipos/compartido/contrato_avatar'
import type { AccionesMensaje, AdjuntoMensaje, Conversacion, PosicionEnGrupo, Mensaje, ParticipanteMensajeria, RespuestaMensaje } from '@/tipos/mensajeria/contrato_mensajes'

export interface PanelConversacionProps {
  conversacion: Conversacion
  mensajes: readonly Mensaje[]
  participantes: readonly ParticipanteMensajeria[]
  usuarioId: string
  ahora: Date
  conversaciones: readonly Conversacion[]
  onEnviar: (texto: string, respuestaA?: RespuestaMensaje) => void
  onAdjuntar?: (adjuntos: readonly AdjuntoMensaje[], respuestaA?: RespuestaMensaje) => void
  onEditar: (mensajeId: string, texto: string) => boolean
  onEliminar: (mensajeId: string) => void
  onReenviar: (mensajeId: string, destinoId: string) => boolean | void
  onFijar: (mensajeId: string) => void
  onVolver: () => void
  oculta: boolean
  compacto?: boolean
}

export interface ComposicionMensajeProps {
  onEnviar: (texto: string) => boolean | void
  onAdjuntar?: (adjuntos: readonly AdjuntoMensaje[]) => void
  textoInicial?: string
  etiquetaEnviar?: string
}

export interface PanelVacioMensajesProps {
  oculta: boolean
}

export interface CitaMensaje {
  autor: string
  resumen: string
}

export interface ControlesAudioComposicionProps {
  grabacion: ControlGrabacionAudio
  onAdjuntar?: (adjuntos: readonly AdjuntoMensaje[]) => void
}

export interface BannerContextoProps {
  titulo: string
  cuerpo: string
  etiquetaCancelar: string
  onCancelar: () => void
}

export interface TarjetaDocumentoProps {
  adjunto: AdjuntoMensaje
}

export interface BotonesAdjuntarProps {
  onAdjuntar?: (adjuntos: readonly AdjuntoMensaje[]) => void
  onAviso?: (avisos: readonly string[]) => void
  onGrabar: () => void
}

export interface AdjuntoMensajeProps {
  adjunto: AdjuntoMensaje
  propio: boolean
}

export interface BurbujaMensajeProps {
  mensaje: Mensaje
  fecha?: string
  propio: boolean
  autor?: ParticipanteMensajeria
  presencia?: EstadoPresencia
  posicion: PosicionEnGrupo
  acciones: AccionesMensaje
  fijado: boolean
  cita?: CitaMensaje
  onResponder: (mensajeId: string) => void
  onEditar: (mensajeId: string) => void
  onReenviar: (mensajeId: string) => void
  onFijar: (mensajeId: string) => void
  onEliminar: (mensajeId: string) => void
}

export interface FranjaMensajeFijadoProps {
  mensaje: Mensaje
  onCerrar: () => void
}

export interface ModalEliminarMensajeProps {
  onConfirmar: () => void
  onCancelar: () => void
}

export interface ModalReenviarMensajeProps {
  destinos: readonly Conversacion[]
  onConfirmar: (destinoIds: readonly string[]) => boolean | void
  onCancelar: () => void
}

export interface SeccionDestinosProps {
  titulo: string
  conversaciones: readonly Conversacion[]
  enviados: readonly string[]
  fallidos: readonly string[]
  onEnviar: (id: string) => void
}

export interface ZonaComposicionProps {
  conversacion: Conversacion
  participantes: readonly ParticipanteMensajeria[]
  usuarioId: string
  editando: { id: string; texto: string } | null
  respondiendo?: Mensaje
  onEnviar: (texto: string) => boolean | void
  onAdjuntar: (adjuntos: readonly AdjuntoMensaje[]) => void
  onCancelarEdicion: () => void
  onCancelarRespuesta: () => void
  etiquetaGuardar: string
}

export interface HiloMensajesProps {
  conversacion: Conversacion
  mensajes: readonly Mensaje[]
  participantes: readonly ParticipanteMensajeria[]
  conversaciones: readonly Conversacion[]
  usuarioId: string
  ahora: Date
  acciones: AccionesHilo
}

export interface AccionesHilo {
  onResponder: (mensajeId: string) => void
  onEditar: (mensajeId: string) => void
  onReenviar: (mensajeId: string) => void
  onFijar: (mensajeId: string) => void
  onEliminar: (mensajeId: string) => void
}

export interface CabeceraConversacionProps {
  conversacion: Conversacion
  compacto: boolean
  onVolver: () => void
}
