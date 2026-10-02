import type { IconName } from '../compartido/contrato_icono'

export interface FilaActividadGrupoProps {
  nombre: string
  accion: string
  grupo: string
  tiempo: string
  icono?: IconName
  colorIcono?: 'morado' | 'rosa' | 'azul' | 'naranja' | 'verde' | 'violeta'
}
