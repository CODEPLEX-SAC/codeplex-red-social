import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { SolicitudRecibida } from '@/tipos/amigos/modelo_amigos_solicitudes'
import datos from './solicitudes.json'

export const RECIBIDAS = datos.recibidas as SolicitudRecibida[]
export const PERSONAS_CONOCER_SOLICITUDES = datos.personasConocerSolicitudes as { nombre: string; comunes: string }[]
export const TUS_LISTAS_SOLICITUDES = datos.tusListasSolicitudes as { icono: IconName; color: string; nombre: string; miembros: string }[]
export const SOLICITUD_ENVIADA_EJEMPLO = datos.solicitudEnviadaEjemplo
export const ACTIVIDAD_RECIENTE_SOLICITUDES = datos.actividadRecienteSolicitudes as { nombre: string; accion: string; tiempo: string }[]
