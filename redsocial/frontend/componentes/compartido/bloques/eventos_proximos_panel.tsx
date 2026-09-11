import type { EventosProximosPanelProps } from '@/tipos/compartido/eventos_proximos_panel'

export function EventosProximosPanel({ eventos }: EventosProximosPanelProps) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-[13px] text-texto">Eventos próximos</h2>
        <a href="#" className="text-[11px] text-primario no-underline">Ver todos</a>
      </div>
      {eventos.map((e) => (
        <article key={e.titulo} className="grid grid-cols-[52px_1fr] gap-3.5 border-b border-[#f0eef5] py-2.5">
          <div className="grid h-[52px] w-[52px] place-content-center place-items-center rounded-lg bg-primario-suave text-primario">
            <strong className="text-lg">{e.dia}</strong>
            <span className="text-[8px] font-extrabold">{e.mes}</span>
          </div>
          <div>
            <h3 className="m-0 text-[13px] text-texto">{e.titulo}</h3>
            <p className="m-0 mt-1 text-[10px] text-texto-suave">{e.detalle}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
