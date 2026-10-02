export type FiltroInvitacion = 'todas' | 'pendientes' | 'aceptadas' | 'rechazadas'

export interface PestanasFiltroInvitacionesProps {
  activa: FiltroInvitacion
  conteos: Record<FiltroInvitacion, number>
}
