import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { CategoriaSolicitud, SolicitudEnviada, SolicitudRecibida } from './modelo_amigos_solicitudes'

export interface TarjetaSolicitudRecibidaProps {
  solicitud: SolicitudRecibida
}

export interface TarjetaSolicitudEnviadaProps {
  solicitud: SolicitudEnviada
}

export type ItemSolicitud = { categoria: 'recibidas'; solicitud: SolicitudRecibida } | { categoria: 'enviadas'; solicitud: SolicitudEnviada }

export interface FiltrosSolicitudes {
  categoria: CategoriaSolicitud
}

export interface SeccionSolicitudesProps {
  recibidas: readonly SolicitudRecibida[]
  enviadas: readonly SolicitudEnviada[]
  fuente?: FuenteBusqueda<ItemSolicitud, FiltrosSolicitudes>
}
