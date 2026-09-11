import type { IconName } from '@/tipos/compartido/icono'

export type ColorGrupo = 'rosa' | 'violeta' | 'morado' | 'naranja' | 'azul' | 'verde'

export interface InvitacionPendiente {
  nombre: string
  privado?: boolean
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
