import type { BotonVariant, BotonSize, BotonProps } from '@/tipos/compartido/boton'

const CLASES_VARIANTE: Record<BotonVariant, string> = {
  primario: 'border-transparent bg-primario text-white hover:bg-primario-oscuro',
  secundario: 'border-gris-borde bg-white text-[#5d5a70]',
  oscuro: 'border-transparent bg-[#25203b] text-white',
  peligro: 'border-transparent bg-peligro text-white',
  exito: 'border-transparent bg-exito text-white',
}

const CLASES_TAMANO: Record<BotonSize, string> = {
  mini: 'min-h-[30px] px-[10px] text-xs rounded-[7px]',
  default: 'min-h-[34px] px-[13px] rounded-[7px]',
  md: 'min-h-[38px] px-[18px] rounded-lg text-[13px] font-semibold',
}

export function Boton({ variant, size = 'default', className, children, ...rest }: BotonProps) {
  const clases = [
    'inline-flex items-center justify-center gap-sm whitespace-nowrap border no-underline',
    CLASES_TAMANO[size],
    variant ? CLASES_VARIANTE[variant] : 'border-transparent',
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
