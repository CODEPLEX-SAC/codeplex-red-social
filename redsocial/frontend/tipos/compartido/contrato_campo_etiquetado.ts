import type { ReactNode } from 'react'

export type VarianteCampoEtiquetado = 'normal' | 'compacta'
export type TonoCampoEtiquetado = 'normal' | 'suave'

export interface CampoEtiquetadoProps {
  etiqueta: string
  requerido?: boolean
  className?: string
  children: ReactNode
  variante?: VarianteCampoEtiquetado
  tono?: TonoCampoEtiquetado
  ayuda?: string
  envolver?: boolean
  para?: string
}
