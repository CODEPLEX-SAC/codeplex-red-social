import type { SolicitudEnviada, SolicitudRecibida } from './modelo_amigos_solicitudes'

export interface TarjetaSolicitudRecibidaProps {
  solicitud: SolicitudRecibida
}

export interface TarjetaSolicitudEnviadaProps {
  solicitud: SolicitudEnviada
}

export interface SeccionSolicitudesProps {
  recibidas: readonly SolicitudRecibida[]
  enviadas: readonly SolicitudEnviada[]
}
