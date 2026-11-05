import type { ConversacionFlotanteInicio, PestanaMensajesFlotantes } from '@/tipos/inicio/contrato_feed_inicio'

export function sumarNoLeidos(conversaciones: readonly ConversacionFlotanteInicio[]) {
  return conversaciones.reduce((suma, conversacion) => suma + conversacion.noLeidos, 0)
}

export function conversacionesDePestana(conversaciones: readonly ConversacionFlotanteInicio[], pestana: PestanaMensajesFlotantes) {
  return pestana === 'no_leidos' ? conversaciones.filter((conversacion) => conversacion.noLeidos > 0) : conversaciones
}
