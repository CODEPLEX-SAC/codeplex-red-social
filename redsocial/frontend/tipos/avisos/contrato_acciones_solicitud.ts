export type ClaveAccionSolicitud = 'confirmar' | 'eliminar' | 'aceptar' | 'rechazar' | 'aprobar'

export type ContextoSolicitud = 'solicitud' | 'invitacion'

export interface AccionesSolicitudProps {
  primaria: ClaveAccionSolicitud
  secundaria: ClaveAccionSolicitud
  contexto?: ContextoSolicitud
  compacta?: boolean
}
