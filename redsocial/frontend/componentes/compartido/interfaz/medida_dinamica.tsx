import type { ElementType, ReactNode } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function MedidaDinamica({
  ancho,
  alto,
  color,
  className = '',
  as: Tag = 'span',
  children,
}: {
  ancho?: string | null
  alto?: string | null
  color?: string
  className?: string
  as?: ElementType
  children?: ReactNode
}) {
  return (
    <Tag className={[ancho, alto, color, className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
