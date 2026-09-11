import type { SelectHTMLAttributes } from 'react'

export type SelectorVariant = 'default' | 'colaboradores' | 'mini'

export interface SelectorProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: SelectorVariant
  label?: string
}
