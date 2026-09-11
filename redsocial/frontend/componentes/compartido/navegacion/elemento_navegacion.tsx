import { Icono } from '../icono'
import type { ElementoNavegacionProps } from '@/tipos/compartido/elemento_navegacion'

export function ElementoNavegacion({ item, activo = false, colapsado = false }: ElementoNavegacionProps) {
  const href = item.archivo ?? '#'
  const tieneInsignia = item.insignia !== undefined

  return (
    <li>
      <a
        href={href}
        title={item.etiqueta}
        className={
          'flex items-center gap-sm rounded-control py-2 text-sm no-underline ' +
          (colapsado ? 'justify-center px-0' : 'px-sm') + ' ' +
          (activo ? 'bg-primario-suave text-primario font-bold' : 'text-texto-suave')
        }
      >
        {colapsado && tieneInsignia ? (
          <span className="relative inline-flex">
            <Icono name={item.icono} />
            <span className="absolute -right-1.5 -top-1.5 rounded-full bg-primario px-1 text-[8px] font-extrabold text-white">
              {item.insignia}
            </span>
          </span>
        ) : (
          <Icono name={item.icono} />
        )}
        {!colapsado && <span>{item.etiqueta}</span>}
        {!colapsado && tieneInsignia && (
          <span className="ml-auto rounded-full bg-primario px-1.5 py-[1px] text-[9px] font-extrabold text-white">
            {item.insignia}
          </span>
        )}
      </a>
    </li>
  )
}
