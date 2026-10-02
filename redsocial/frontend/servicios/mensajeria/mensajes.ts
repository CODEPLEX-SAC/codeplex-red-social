import type { Conversacion, ConversacionActiva } from '../../tipos/mensajeria/contrato_mensajes'
import datos from './mensajes.json'

export const CONVERSACIONES = datos.conversaciones as readonly Conversacion[]
export const CONVERSACION_ACTIVA = datos.conversacionActiva as ConversacionActiva
