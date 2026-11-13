import type { ReactNode } from 'react'
import type { IconName } from '../compartido/contrato_icono'
import type { AccionGestion, ContactoInvitable, InvitacionesLlamada, ParticipanteSala, PresentacionSala, PuertoSala } from './contrato_integracion_llamada'
import type { ReunionEnSala } from './contrato_reunion'
import type { PromesaOperacion } from './modelo_promesas_llamada'

export type PanelSala = 'participantes' | 'chat' | 'detalles'
export type SeccionPersonas = 'manos' | 'colaboradores' | 'invitados'

export type GruposParticipantes = Record<SeccionPersonas, ParticipanteSala[]>

export interface ParametrosSalaLlamada {
  generar: (cantidad: number) => ParticipanteSala[]
  cantidadInicial: number
  duracionInicial: string
  puerto: PuertoSala
  simulable: boolean
  microfonoInicial: boolean
  camaraInicial: boolean
}

export interface VideoFlujoProps {
  flujo: MediaStream
  etiqueta: string
  className: string
  silenciado?: boolean
}

export interface TarjetaParticipanteProps {
  participante: ParticipanteSala
  flujo: MediaStream | null
  reaccion: IconName | null
  compacta?: boolean
}

export interface CuadriculaParticipantesProps {
  participantes: ParticipanteSala[]
  todos: ParticipanteSala[]
  flujoDe: (idParticipante: string) => MediaStream | null
  reaccion: IconName | null
  fijado: ParticipanteSala | null
  pagina: number
  totalPaginas: number
  onPagina: (pagina: number) => void
}

export interface EscenarioPresentacionProps {
  presentacion: PresentacionSala
  presentador: string
  imagen: string | undefined
  onDetener: () => void
}

export interface BarraSuperiorSalaProps {
  reunion: ReunionEnSala
  duracion: string
  total: number
  onParticipantes: () => void
  onSalir: () => void
  onDetalles: () => void
  extra?: ReactNode
}

export interface SelectorDemostracionProps {
  cantidad: number
  opciones: readonly number[]
  onCambiar: (cantidad: number) => void
}

export interface PanelParticipantesSalaProps {
  participantes: ParticipanteSala[]
  contactos: readonly ContactoInvitable[]
  invitaciones: InvitacionesLlamada
  fijadoId: string | null
  onFijar: (id: string) => void
  onGestionar: (accion: AccionGestion, id: string) => PromesaOperacion
  onEscribir?: (nombre: string) => void
  onCerrar: () => void
}

export interface PanelChatSalaProps {
  onCerrar: () => void
}

export interface SalaVideollamadaProps {
  reunion: ReunionEnSala
  puerto: PuertoSala
  generar: (cantidad: number) => ParticipanteSala[]
  contactos: readonly ContactoInvitable[]
  enlaceReunion: string
  imagenPresentacion: string | undefined
  maximoParticipantes: number
  alEscribir?: (nombre: string) => void
  cantidadInicial?: number
  microfonoInicial?: boolean
  camaraInicial?: boolean
}

export interface ListaParticipantesSalaProps {
  participantes: ParticipanteSala[]
  esOrganizador: boolean
  fijadoId: string | null
  onFijar: (id: string) => void
  onGestionar: (accion: AccionGestion, id: string) => PromesaOperacion
  onAviso: (mensaje: string) => void
  onEscribir?: (nombre: string) => void
}

export interface ModalInformarProblemaProps {
  onEnviar: (descripcion: string) => PromesaOperacion
  onCerrar: () => void
}

export interface OpcionesMenuParticipante {
  participante: ParticipanteSala
  esOrganizador: boolean
  fijado: boolean
  alFijar: () => void
  alGestionar: (accion: AccionGestion) => void
}

export interface PaginacionSalaProps {
  pagina: number
  totalPaginas: number
  onPagina: (pagina: number) => void
}

export interface ModalSalirLlamadaProps {
  onAbandonar: () => void
  onFinalizar: () => void
  onCerrar: () => void
}

export interface ModalSalirSolaProps {
  minutos: number
  onAbandonar: () => void
  onPermanecer: () => void
}

export interface TarjetaSolitariaProps {
  participante: ParticipanteSala
  flujo: MediaStream | null
}

export interface ModalDetallesReunionProps {
  reunion: ReunionEnSala
  enlaceReunion: string
  onCerrar: () => void
}

export interface ContenidoDetallesReunionProps {
  reunion: ReunionEnSala
  enlaceReunion: string
}

export interface PanelDetallesSalaProps {
  reunion: ReunionEnSala
  enlaceReunion: string
  onCerrar: () => void
}
