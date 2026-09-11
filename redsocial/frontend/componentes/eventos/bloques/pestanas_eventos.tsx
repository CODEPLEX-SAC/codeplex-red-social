import { useRef } from 'react'
import { usarMemoriaScrollPestanas } from '../../../ganchos/compartido/usar_memoria_scroll_pestanas'
import type { PestanaEvento, InsigniaInvitaciones } from '@/tipos/eventos/pestanas_eventos'

const TABS = [
  { etiqueta: 'Para ti', archivo: '23-08-eventos-01-para-ti-web.html' },
  { etiqueta: 'Próximos', archivo: '24-08-eventos-02-proximos-web.html' },
  { etiqueta: 'Populares', archivo: '25-08-eventos-03-populares-web.html' },
  { etiqueta: 'Mis eventos', archivo: '26-08-eventos-04-mis-eventos-web.html' },
  { etiqueta: 'Invitaciones', archivo: '27-08-eventos-05-invitaciones-web.html' },
  { etiqueta: 'Calendario', archivo: '28-08-eventos-06-calendario-web.html' },
] as const

export function PestanasEventos({ activa, insigniaInvitaciones }: { activa: PestanaEvento; insigniaInvitaciones: InsigniaInvitaciones }) {
  const pistaRef = useRef<HTMLDivElement>(null)
  const activaRef = useRef<HTMLAnchorElement | null>(null)
  const { alDesplazarManualmente } = usarMemoriaScrollPestanas(pistaRef, activaRef, activa)

  return (
    <div
      ref={pistaRef}
      onScroll={alDesplazarManualmente}
      className="relative mb-4 overflow-x-auto border-b-2 border-borde [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex items-center gap-0" role="tablist">
        {TABS.map((p) => (
          <a
            key={p.archivo}
            ref={(elemento) => {
              if (p.archivo === activa) activaRef.current = elemento
            }}
            href={p.archivo}
            role="tab"
            aria-selected={p.archivo === activa}
            className={
              'inline-flex h-[38px] flex-none items-center gap-1.5 whitespace-nowrap border-b-2 px-4 text-[13px] no-underline ' +
              (p.archivo === activa
                ? 'border-primario font-semibold text-primario'
                : 'border-transparent font-medium text-texto-suave hover:text-texto')
            }
          >
            {p.etiqueta}
            {p.archivo === '27-08-eventos-05-invitaciones-web.html' && (
              insigniaInvitaciones.estilo === 'pill' ? (
                <span className="inline-grid h-[18px] min-w-[18px] place-items-center rounded-full bg-primario px-[5px] text-[10px] font-bold text-white">
                  {insigniaInvitaciones.valor}
                </span>
              ) : (
                <span>{insigniaInvitaciones.valor}</span>
              )
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
