import { PanelLateral } from './panel_lateral'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { EventosProximosPanelProps } from '@/tipos/compartido/contrato_eventos_proximos'

export function EventosProximosPanel({ eventos }: EventosProximosPanelProps) {
  return (
    <PanelLateral titulo={textosRedSocial.EVENTOS_PROXIMOS}>
      {eventos.map((e) => (
        <article key={e.titulo} className="grid grid-cols-52-1fr gap-3.5 border-b border-borde-suave py-2.5">
          <div className="grid h-13 w-13 place-content-center place-items-center rounded-lg bg-primario-suave text-primario">
            <strong className="text-dia-evento">{e.dia}</strong>
            <span className="text-mes-evento">{e.mes}</span>
          </div>
          <div>
            <h3 className="m-0 text-nombre-entidad text-texto">{e.titulo}</h3>
            <p className="m-0 mt-1 text-auxiliar text-texto-suave">{e.detalle}</p>
          </div>
        </article>
      ))}
    </PanelLateral>
  )
}
