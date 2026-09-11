import type { IconName } from '../compartido/icono'

export interface FilaActividadGrupoProps {
  nombre: string
  accion: string
  grupo: string
  tiempo: string
  icono?: IconName
  colorIcono?: 'morado' | 'rosa' | 'azul' | 'naranja' | 'verde' | 'violeta'
}
