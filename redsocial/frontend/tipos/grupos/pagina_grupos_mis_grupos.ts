import type { IconName } from '@/tipos/compartido/icono'

export interface GrupoAdmin {
  nombre: string
  icono: IconName
  color: 'morado' | 'naranja'
  tipo: string
  descripcion: string
  masAvatares: string
}

export interface GrupoMis {
  nombre: string
  icono: IconName
  color: 'morado' | 'azul' | 'rosa' | 'verde' | 'amarillo'
  tipo: string
  descripcion: string
  masAvatares: string
}
