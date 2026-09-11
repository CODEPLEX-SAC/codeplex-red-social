import { Icono } from '../icono'
import type { SelectorVariant, SelectorProps } from '@/tipos/compartido/selector'

const CLASES_SELECT: Record<SelectorVariant, string> = {
  default:
    'h-[38px] rounded-lg border border-gris-borde bg-white pl-3 pr-[30px] text-[13px] font-semibold text-texto min-w-[150px] max-[900px]:w-full max-[900px]:min-w-0',
  colaboradores:
    'w-full rounded-lg border border-[#d1d5db] bg-white py-2 pl-3 pr-8 text-[0.85rem] font-medium text-gris-oscuro-texto cursor-pointer',
  mini: 'h-[30px] rounded-md border border-gris-borde bg-white pl-[10px] pr-[26px] text-xs font-semibold text-texto',
}

const CLASES_ENVOLTORIO: Record<SelectorVariant, string> = {
  default: 'relative inline-flex max-[900px]:flex-1',
  colaboradores: 'relative flex w-full',
  mini: 'relative inline-flex',
}

const CLASES_LABEL: Record<Exclude<SelectorVariant, 'mini'>, string> = {
  default: 'text-[11px] font-semibold text-texto-suave max-[900px]:flex-1',
  colaboradores: 'text-xs font-medium text-gris-texto-secundario',
}

export function Selector({ variant = 'default', label, className, children, ...rest }: SelectorProps) {
  const select = (
    <div className={CLASES_ENVOLTORIO[variant]}>
      <select
        className={`appearance-none ${CLASES_SELECT[variant]} ${className ?? ''}`}
        {...rest}
      >
        {children}
      </select>
      <Icono
        name="flecha-abajo"
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-texto-suave"
      />
    </div>
  )

  if (variant === 'mini' || !label) {
    return select
  }

  return (
    <label className={`flex flex-col gap-1 ${CLASES_LABEL[variant]}`}>
      {label}
      {select}
    </label>
  )
}
