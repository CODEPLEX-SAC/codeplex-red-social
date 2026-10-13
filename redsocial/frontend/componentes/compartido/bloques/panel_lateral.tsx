import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PanelLateralProps } from '@/tipos/compartido/contrato_panel_lateral'

export function PanelLateral({ titulo, enlace = textosRedSocial.VER_TODOS, ruta, children }: PanelLateralProps) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-banner text-texto">{titulo}</h2>
        <a href={ruta ?? '#'} className="text-enlace-accion text-primario no-underline">{enlace}</a>
      </div>
      {children}
    </section>
  )
}
