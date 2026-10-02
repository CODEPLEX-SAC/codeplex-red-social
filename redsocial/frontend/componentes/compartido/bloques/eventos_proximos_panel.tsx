import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { EventosProximosPanelProps } from '@/tipos/compartido/contrato_eventos_proximos'

export function EventosProximosPanel({ eventos }: EventosProximosPanelProps) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{textosRedSocial.EVENTOS_PROXIMOS}</h2>
        <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
      </div>
      {eventos.map((e) => (
        <article key={e.titulo} className="grid grid-cols-52-1fr gap-3.5 border-b border-t-f0eef5 py-2.5">
          <div className="grid h-13 w-13 place-content-center place-items-center rounded-lg bg-primario-suave text-primario">
            <strong className="text-dia-evento">{e.dia}</strong>
            <span className="text-mes-evento font-extrabold">{e.mes}</span>
          </div>
          <div>
            <h3 className="m-0 text-nombre-entidad text-texto">{e.titulo}</h3>
            <p className="m-0 mt-1 text-auxiliar text-texto-suave">{e.detalle}</p>
          </div>
        </article>
      ))}
    </section>
  )
}
