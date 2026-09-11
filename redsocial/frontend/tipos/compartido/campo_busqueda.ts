import type { InputHTMLAttributes } from 'react'
import type { IconName } from '@/tipos/compartido/icono'

export interface CampoBusquedaProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icono?: IconName
}
