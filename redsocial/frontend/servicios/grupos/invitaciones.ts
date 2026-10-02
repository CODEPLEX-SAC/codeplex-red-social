import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { ColorGrupo, InvitacionPendiente, InvitacionAceptada } from '@/tipos/grupos/modelo_grupos_invitaciones'
import datos from './invitaciones.json'

export const PENDIENTES = datos.pendientes as InvitacionPendiente[]
export const ACEPTADAS = datos.aceptadas as InvitacionAceptada[]
export const RESUMEN_INVITACIONES = datos.resumenInvitaciones as { icono: IconName; color: 'morado' | 'verde' | 'rojo' | 'gris'; etiqueta: string; valor: number }[]
export const CONTEO_PESTANAS_INVITACIONES_GRUPO = datos.conteoPestanasInvitacionesGrupo
export const ACTIVIDAD_INVITACIONES = datos.actividadInvitaciones as { nombre: string; accion: string; grupo: string; tiempo: string; icono: IconName; color: ColorGrupo }[]
