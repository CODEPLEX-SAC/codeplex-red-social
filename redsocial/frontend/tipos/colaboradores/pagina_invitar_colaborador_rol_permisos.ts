import type { IconName } from '@/tipos/compartido/icono'

export interface Modulo {
  icono: IconName
  clase: string
  nombre: string
  descripcion: string
  activo?: boolean
}

export type ClavePermiso = 'sin-acceso' | 'ver' | 'crear' | 'editar' | 'eliminar' | 'imprimir' | 'exportar'

export interface FilaPermiso {
  nombre: string
  descripcion: string
  activos: ClavePermiso[]
}
