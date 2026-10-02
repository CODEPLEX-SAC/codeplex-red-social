import { Icono } from '../icono'
import type { BotonIconoVariant, BotonIconoSize, BotonIconoProps } from '@/tipos/compartido/contrato_boton_icono'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const mapaVariante: Record<BotonIconoVariant, string> = catalogoCompartido.boton_icono_variantes
const mapaTamano: Record<BotonIconoSize, { boton: string; icono: string }> = catalogoCompartido.boton_icono_tamanos

export function BotonIcono({
  icono,
  variant = 'default',
  size = 'default',
  className,
  ...rest
}: BotonIconoProps) {
  const tamano = mapaTamano[size]
  const clases = [
    'inline-grid place-items-center p-0',
    tamano.boton,
    mapaVariante[variant],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={clases} {...rest}>
      <Icono name={icono} className={tamano.icono} />
    </button>
  )
}
