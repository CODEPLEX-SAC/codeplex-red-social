import type { SelectHTMLAttributes } from 'react'
import type { SelectProps } from '@mui/material/Select'
import type { SxProps, Theme } from '@mui/material/styles'
import type { CodeplexSelectorProps } from '@codeplex-sac/formularios'

export type SelectorVariant = 'default' | 'colaboradores' | 'mini' | 'integrado'

export interface SelectorProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: SelectorVariant
  label?: string
  placeholder?: string
}

export interface SelectorConfiguracionLibreria {
  conEtiqueta: boolean
  tamano: SelectProps['size']
  anchoCompleto: boolean
  sx: SxProps<Theme>
}

export type ManejadorSelectorLibreria = CodeplexSelectorProps['alCambiar']
