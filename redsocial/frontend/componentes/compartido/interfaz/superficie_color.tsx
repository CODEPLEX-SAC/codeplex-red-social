import type { ElementType, ReactNode } from 'react'
import { CLASE_SUPERFICIE, CLASE_DEGRADADO } from '../paleta_colores'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

void catalogoCompartido

function claseDeSuperficie(degradado?: string, variante?: string) {
  if (degradado) return CLASE_DEGRADADO[degradado]
  return variante ? CLASE_SUPERFICIE[variante] : undefined
}

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
  const clase = claseDeSuperficie(degradado, variante)
  return (
    <Tag className={`${clase ?? 'bg-gris-categoria'} bg-cover bg-center ${className}`}>
      {children}
    </Tag>
  )
}
