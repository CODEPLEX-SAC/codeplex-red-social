import { Icono } from '../icono'
import type { GruposRecomendadosPanelProps } from '@/tipos/compartido/grupos_recomendados_panel'

export function GruposRecomendadosPanel({ titulo, grupos }: GruposRecomendadosPanelProps) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-[13px] text-texto">{titulo}</h2>
        <a href="#" className="text-[11px] text-primario no-underline">Ver todos</a>
      </div>
      {grupos.map((g) => (
        <div key={g.nombre} className="flex items-center gap-2.5 py-2">
          <span className="h-[38px] w-[38px] flex-none rounded-[9px] bg-primario-suave" />
          <div className="min-w-0 flex-1">
            <strong className="block truncate text-[11.5px] text-texto">{g.nombre}</strong>
            <span className="mt-0.5 block truncate text-[9.5px] text-texto-suave">{g.miembros}</span>
          </div>
          <button type="button" aria-label="Unirse" className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full border border-borde bg-white text-primario">
            <Icono name="mas" className="h-[13px] w-[13px]" />
          </button>
        </div>
      ))}
    </section>
  )
}
