import type { IconName } from '@/tipos/compartido/contrato_icono'

export type ColorIconoAviso = 'morado' | 'azul' | 'rojo' | 'amarillo'

export interface Aviso {
  id: string
  tipo?: 'icono' | 'avatar'
  icono: IconName
  colorIcono: ColorIconoAviso
  nombreUsuario: string
  accion?: string
  nombreGrupo?: string
  detalle?: string
  tiempo: string
  leida: boolean
  avataresExtra?: number
  conInsigniaIcono?: boolean
  solicitud?: boolean
}

export type PestanaAviso = 'todas' | 'no_leidas' | 'menciones' | 'solicitudes' | 'eventos' | 'sistema'
