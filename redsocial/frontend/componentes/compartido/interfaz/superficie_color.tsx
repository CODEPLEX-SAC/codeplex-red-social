import type { ElementType, ReactNode } from 'react'
import { CLASE_SUPERFICIE, CLASE_DEGRADADO } from '../paleta_colores'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

export function SuperficieColor({
  variante,
  degradado,
  className = '',
  children,
  as: Tag = 'div',
}: {
  variante?: string
  degradado?: string
  className?: string
  children?: ReactNode
  as?: ElementType
}) {
  const clase = degradado ? CLASE_DEGRADADO[degradado] : variante ? CLASE_SUPERFICIE[variante] : undefined
  return (
    <Tag className={`${clase ?? 'bg-gris-categoria'} bg-cover bg-center ${className}`}>
      {children}
    </Tag>
  )
}
