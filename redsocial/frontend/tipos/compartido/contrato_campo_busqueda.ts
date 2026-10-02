import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface CampoBusquedaProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icono?: IconName
  accion?: ReactNode
}

export type CampoBusquedaCambio = ChangeEvent<HTMLInputElement>
