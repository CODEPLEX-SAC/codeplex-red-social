import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PanelLateralProps } from '@/tipos/compartido/contrato_panel_lateral'
import { CLASE_ENLACE_ACCION } from '../clases_enlace'

export function PanelLateral({ titulo, enlace = textosRedSocial.VER_TODOS, ruta, children }: PanelLateralProps) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-banner text-texto">{titulo}</h2>
        <a href={ruta ?? '#'} className={CLASE_ENLACE_ACCION}>{enlace}</a>
      </div>
      {children}
    </section>
  )
}
