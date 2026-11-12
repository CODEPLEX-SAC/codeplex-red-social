import type { IconName } from '../compartido/contrato_icono'

export interface ColumnaLateralAmigosProps {
  personas: readonly { nombre: string; comunes: string }[]
  listas: readonly { nombre: string; icono: IconName; color: string; miembros: string }[]
  actividad: readonly { nombre: string; accion: string; tiempo: string }[]
}
