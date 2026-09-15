import type { ElementType, ReactNode } from 'react'
import { useEstiloDinamico } from '../usar_estilo_dinamico'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function SuperficieColor({
  color,
  className = '',
  children,
  as: Tag = 'div',
}: {
  color: string
  className?: string
  children?: ReactNode
  as?: ElementType
}) {
  const ref = useEstiloDinamico<HTMLElement>({ background: color })
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
