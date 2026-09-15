import type { ElementType, ReactNode } from 'react'
import { useEstiloDinamico } from '../usar_estilo_dinamico'
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
  ancho?: string
  alto?: string
  color?: string
  className?: string
  as?: ElementType
  children?: ReactNode
}) {
  const ref = useEstiloDinamico<HTMLElement>({ width: ancho, height: alto, background: color })
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
