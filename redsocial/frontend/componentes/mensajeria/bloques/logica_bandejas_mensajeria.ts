import { conversacionesConActividad } from './logica_actividad_conversacion'
import { conCambioEn } from './logica_mensajeria'
import type { Conversacion, ConversacionConEtiqueta, EstadoMensajeria } from '@/tipos/mensajeria/contrato_mensajes'

export function marcarConversacionLeida(estado: EstadoMensajeria, conversacionId: string): EstadoMensajeria {
  const conversacion = estado.conversaciones.find((candidata) => candidata.id === conversacionId)
  if (!conversacion || (conversacion.noLeidos === 0 && !conversacion.marcadaNoLeida)) return estado
  return conCambioEn(estado, conversacionId, (actual) => ({ ...actual, noLeidos: 0, marcadaNoLeida: false }))
}

export function alternarConversacionFavorita(estado: EstadoMensajeria, conversacionId: string): EstadoMensajeria {
  return conCambioEn(estado, conversacionId, (actual) => ({ ...actual, favorita: !actual.favorita }))
}

export function conversacionesNoLeidas(estado: EstadoMensajeria): Conversacion[] {
  return estado.conversaciones.filter((conversacion) => conversacion.noLeidos > 0)
}

export function conversacionesFavoritas(estado: EstadoMensajeria): Conversacion[] {
  return estado.conversaciones.filter((conversacion) => conversacion.favorita)
}

export function textoMostrando(plantilla: string, cantidad: number, total: number): string {
  return plantilla.replace(':n', String(cantidad)).replace(':total', String(total))
}

export function conversacionesConEtiqueta(conversaciones: readonly Conversacion[], estado: EstadoMensajeria, ahora: Date, historiasPorParticipante: Readonly<Record<string, number>> = {}): ConversacionConEtiqueta[] {
  return conversacionesConActividad(conversaciones, estado, ahora, historiasPorParticipante)
}
