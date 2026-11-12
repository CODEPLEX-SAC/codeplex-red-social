import type { IconName } from '@/tipos/compartido/contrato_icono'

export type ColorGrupo = 'rosa' | 'violeta' | 'morado' | 'naranja' | 'azul' | 'verde'

export type ItemInvitacion = { lista: 'pendientes'; invitacion: InvitacionPendiente } | { lista: 'aceptadas'; invitacion: InvitacionAceptada }

export interface InvitacionPendiente {
  nombre: string
  icono: IconName
  color: ColorGrupo
  tipo: string
  masAvatares: string
  invitadoPor: string
  tiempo: string
  expiraTexto: string
  expiraColor: 'verde' | 'naranja'
}

export interface InvitacionAceptada {
  nombre: string
  icono: IconName
  color: ColorGrupo
  tipo: string
  invitadoPor: string
  tiempo: string
  fecha: string
}
