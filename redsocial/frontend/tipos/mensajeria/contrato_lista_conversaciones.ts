import type { ConversacionConEtiqueta, ParticipanteMensajeria } from '@/tipos/mensajeria/contrato_mensajes'
import type { AccionesConversacion, EstadoHistorias, HistoriasDeParticipante } from '@/tipos/mensajeria/contrato_acciones_conversacion'

export interface HistoriasEnLista {
  porParticipante: Readonly<Record<string, HistoriasDeParticipante>>
  abrir: (participantId: string) => void
}

export interface ListaConversacionesProps {
  conversaciones: readonly ConversacionConEtiqueta[]
  activa: string | null
  onSeleccionar: (id: string) => void
  oculta: boolean
  contadorNoLeidos: number
  acciones: AccionesConversacion
  historias?: HistoriasEnLista
  participantes: readonly ParticipanteMensajeria[]
  onCrearGrupo: (datos: DatosNuevoGrupo) => string
}

export interface DatosNuevoGrupo {
  nombre: string
  descripcion: string
  imagen: string | null
  participantes: readonly string[]
}

export interface ModalCrearGrupoProps {
  participantes: readonly ParticipanteMensajeria[]
  nombresExistentes: readonly string[]
  onCrear: (datos: DatosNuevoGrupo) => void
  onCerrar: () => void
}

export interface FilaConversacionProps {
  conversacion: ConversacionConEtiqueta
  activa: boolean
  tactil: boolean
  estadoHistorias: EstadoHistorias
  acciones: AccionesConversacion
  onSeleccionar: (id: string) => void
  onTocar: (id: string) => void
  onAbrirHistorias: (participantId: string) => void
}

export interface ZonaAvatarConversacionProps {
  conversacion: ConversacionConEtiqueta
  estadoHistorias: EstadoHistorias
  onAbrirHistorias: (participantId: string) => void
}

export interface MetaConversacionProps {
  conversacion: ConversacionConEtiqueta
  marcadaManual: boolean
}

export type FiltroConversaciones = 'todos' | 'no_leidos' | 'favoritos'

export interface ModalConfirmarConversacionProps {
  tipo: 'eliminar_chat' | 'abandonar_grupo'
  nombre: string
  onConfirmar: () => void
  onCancelar: () => void
}
