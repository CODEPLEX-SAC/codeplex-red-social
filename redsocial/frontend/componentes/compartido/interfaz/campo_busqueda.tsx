import { Icono } from '../icono'
import type { CampoBusquedaProps } from '@/tipos/compartido/campo_busqueda'

export function CampoBusqueda({ className, icono = 'buscar', ...rest }: CampoBusquedaProps) {
  return (
    <label className={'flex h-[34px] items-center gap-2 rounded-[7px] border border-borde bg-white px-2.5 text-[#9b99a9] ' + (className ?? '')}>
      <Icono name={icono} className="h-4 w-4" />
      <input
        type="search"
        className="w-full min-w-0 border-0 bg-transparent text-texto outline-none placeholder:text-[#aaa8b7]"
        {...rest}
      />
    </label>
  )
}
