import { Icono } from '../icono'
import type { BotonIconoVariant, BotonIconoSize, BotonIconoProps } from '@/tipos/compartido/boton_icono'

const CLASES_VARIANTE: Record<BotonIconoVariant, string> = {
  default: 'bg-transparent text-[#6d6a7c] hover:bg-[#f2f1f6]',
  primario: 'bg-primario text-white hover:bg-primario-oscuro',
}

const CLASES_TAMANO: Record<BotonIconoSize, { boton: string; icono: string }> = {
  default: { boton: 'h-8 w-8', icono: 'w-[18px] h-[18px]' },
  sm: { boton: 'h-6 w-6', icono: 'w-[14px] h-[14px]' },
}

export function BotonIcono({
  icono,
  variant = 'default',
  size = 'default',
  className,
  ...rest
}: BotonIconoProps) {
  const tamano = CLASES_TAMANO[size]
  const clases = [
    'relative inline-grid place-items-center rounded-[7px] border-0 p-0',
    tamano.boton,
    CLASES_VARIANTE[variant],
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
