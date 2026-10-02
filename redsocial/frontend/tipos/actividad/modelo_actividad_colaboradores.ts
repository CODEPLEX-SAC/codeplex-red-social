import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface EventoColaborador {
  nombre: string
  icono: IconName
  color: 'verde' | 'azul' | 'rojo'
  accion: string
  destino?: string
  detalle?: string
  tiempo: string
  boton: string
  irAGrupos?: boolean
}
