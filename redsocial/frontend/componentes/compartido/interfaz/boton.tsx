import type { BotonVariant, BotonSize, BotonProps } from '@/tipos/compartido/contrato_boton'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const mapaVariante: Record<BotonVariant, string> = catalogoCompartido.boton_variantes
const mapaActivo: Partial<Record<BotonVariant, string>> = catalogoCompartido.boton_activo
const mapaTamano: Record<BotonSize, string> = catalogoCompartido.boton_tamanos

export function Boton({ variant, size = 'default', activo, className, children, ...rest }: BotonProps) {
  const clases = [
    'inline-flex items-center justify-center gap-sm whitespace-nowrap border no-underline',
    mapaTamano[size],
    variant ? (activo && mapaActivo[variant]) || mapaVariante[variant] : 'border-transparent',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={clases} {...rest}>
      {children}
    </button>
  )
}
