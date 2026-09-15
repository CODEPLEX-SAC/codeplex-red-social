import type { ElementType, ReactNode } from 'react'
import { useEstiloDinamico } from '../usar_estilo_dinamico'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function TextoColor({
  color,
  className = '',
  children,
  as: Tag = 'span',
}: {
  color: string
  className?: string
  children?: ReactNode
  as?: ElementType
}) {
  const ref = useEstiloDinamico<HTMLElement>({ color })
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
