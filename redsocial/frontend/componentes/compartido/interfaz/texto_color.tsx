import type { ElementType, ReactNode } from 'react'
import { CLASE_TEXTO } from '../paleta_colores'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function TextoColor({
  variante,
  className = '',
  children,
  as: Tag = 'span',
}: {
  variante: string
  className?: string
  children?: ReactNode
  as?: ElementType
}) {
  return (
    <Tag className={`${CLASE_TEXTO[variante] ?? 'text-gris-categoria'} ${className}`}>
      {children}
    </Tag>
  )
}
