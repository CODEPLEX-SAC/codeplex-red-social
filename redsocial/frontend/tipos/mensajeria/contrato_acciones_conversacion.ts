export type TipoConversacion = 'individual' | 'grupal'
export type EstadoNotificaciones = 'activas' | 'silenciadas'
export type EstadoHistorias = 'ninguna' | 'nueva' | 'vista'
export type OrigenActividad = 'mensaje' | 'historia'

export type AccionConversacionId =
  | 'marcar_leido'
  | 'marcar_no_leido'
  | 'marcar_favorito'
  | 'quitar_favorito'
  | 'silenciar'
  | 'activar_notificaciones'
  | 'ver_perfil'
  | 'eliminar_chat'
  | 'abandonar_grupo'

export interface IdentificadoresConversacion {
  conversationId: string
  participantId: string | null
  groupId: string | null
}

export interface AccionConversacion {
  actionId: AccionConversacionId
  conversationId: string
  peligro: boolean
  confirmacion: boolean
  ruta?: string
}

export interface HistoriasDeParticipante {
  participantId: string
  storyIds: readonly string[]
  estado: EstadoHistorias
}

export interface HistoriasPorParticipante {
  cantidad: Readonly<Record<string, number>>
}

export interface AccionesConversacion {
  onMarcarLeido: (conversacionId: string) => void
  onMarcarNoLeido: (conversacionId: string) => void
  onAlternarSilencio: (conversacionId: string) => void
  onAlternarFavorita: (conversacionId: string) => void
  onEliminar: (conversacionId: string) => void
  onAbandonar: (conversacionId: string) => void
}
