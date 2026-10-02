import type { IconName } from '@/tipos/compartido/contrato_icono'

export type ColorIconoEventoAviso = 'rojo' | 'morado' | 'azul'
export type GrupoFechaEventoAviso = 'hoy' | 'ayer'
export type AccionEventoAviso = 'invitacion' | 'ver_evento'

export interface EventoAviso {
  id: string
  grupo: GrupoFechaEventoAviso
  avatar: boolean
  forma?: 'circulo' | 'cuadrado'
  icono: IconName
  colorIcono: ColorIconoEventoAviso
  conInsigniaIcono?: boolean
  titulo: string
  detalle: string
  detalleSecundario?: string
  tiempo: string
  accion?: AccionEventoAviso
}
