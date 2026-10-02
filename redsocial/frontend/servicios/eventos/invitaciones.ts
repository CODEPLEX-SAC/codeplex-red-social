import type { Invitacion, EventoLateral } from '@/tipos/eventos/modelo_eventos_invitaciones'
import type { DiaCalendarioMini } from '@/tipos/eventos/modelo_calendario_mini'
import datos from './invitaciones.json'

export const INVITACIONES = datos.invitaciones as Invitacion[]
export const PENDIENTES = INVITACIONES.filter((inv) => inv.estado === 'pendiente')
export const ACEPTADAS = INVITACIONES.filter((inv) => inv.estado === 'aceptada')
export const RECHAZADAS = INVITACIONES.filter((inv) => inv.estado === 'rechazada')
export const CONTEO_PESTANAS_INVITACIONES = {
  todas: INVITACIONES.length,
  pendientes: PENDIENTES.length,
  aceptadas: ACEPTADAS.length,
  rechazadas: RECHAZADAS.length,
}
export const PROXIMOS_LATERAL = datos.proximosLateral as EventoLateral[]
export const MES_CALENDARIO_INVITACIONES = datos.mesCalendarioInvitaciones
export const SEMANAS_CALENDARIO_INVITACIONES = datos.semanasCalendarioInvitaciones as DiaCalendarioMini[][]
export const RESUMEN_INVITACIONES = datos.resumenInvitaciones as { valor: string; etiqueta: string }[]
