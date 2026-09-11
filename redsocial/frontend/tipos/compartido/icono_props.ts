import type { CSSProperties } from 'react'
import type { IconName } from '@/tipos/compartido/icono'

export interface IconProps {
  name: IconName
  className?: string
  style?: CSSProperties
}
