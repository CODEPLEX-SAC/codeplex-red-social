import { useRef } from 'react'
import { useCarrusel } from '../../../servicios/compartido/usar_carrusel'
import { usarMemoriaScrollPestanas } from '../../../servicios/compartido/usar_memoria_scroll_pestanas'
import type { PestanaActividad } from '@/tipos/actividad/pestanas_actividad'

const TABS = [
  { etiqueta: 'Todas', href: '02-02-actividad-01-todas-web.html' },
  { etiqueta: 'Publicaciones', href: '03-02-actividad-02-publicaciones.html' },
  { etiqueta: 'Menciones', href: '04-02-actividad-03-menciones.html' },
  { etiqueta: 'Colaboradores', href: '05-02-actividad-04-colaboradores.html' },
  { etiqueta: 'Grupos', href: '06-02-actividad-05-grupos.html' },
  { etiqueta: 'Módulos', href: '07-02-actividad-06-modulos.html' },
  { etiqueta: 'Sistema', href: '08-02-actividad-07-sistema.html' },
] as const

export function PestanasActividad({ activa }: { activa: PestanaActividad }) {
  const carrusel = useCarrusel()
  const activaRef = useRef<HTMLAnchorElement | null>(null)
  const { alDesplazarManualmente } = usarMemoriaScrollPestanas(carrusel.pistaRef, activaRef, activa)

  return (
    <div
      ref={carrusel.pistaRef}
      onScroll={alDesplazarManualmente}
      className="mb-4.5 flex flex-wrap gap-2 max-[900px]:gap-1 max-[600px]:flex-nowrap max-[600px]:overflow-x-auto max-[600px]:p-0.5 max-[600px]:pb-1 max-[600px]:[-ms-overflow-style:none] max-[600px]:[scrollbar-width:none] max-[600px]:[&::-webkit-scrollbar]:hidden"
    >
      {TABS.map((t) => (
        <a
          key={t.href}
          ref={(elemento) => {
            if (t.href === activa) activaRef.current = elemento
          }}
          href={`../paginas/${t.href}`}
          role="tab"
          aria-selected={t.href === activa}
          className={
            'inline-flex h-8 flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border px-3.5 text-xs font-medium no-underline transition-colors max-[900px]:h-7 max-[900px]:px-2.5 max-[900px]:text-[11px] ' +
            (t.href === activa
              ? 'border-primario bg-primario text-white'
              : 'border-borde bg-white text-texto-suave hover:bg-[#f7f6fa]')
          }
        >
          {t.etiqueta}
        </a>
      ))}
    </div>
  )
}
