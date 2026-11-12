import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { ItemEventoLateral } from './item_evento_lateral'
import { PanelCalendarioMini } from './panel_calendario_mini'
import type { EventoLateral } from '@/tipos/eventos/modelo_eventos_calendario'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'

export function SeccionCalendario({
  MES_CALENDARIO_ACTUAL,
  SEMANAS_MINI,
  PROXIMOS_LATERAL,
  LEYENDA_CALENDARIO,
}: {
  MES_CALENDARIO_ACTUAL: string
  SEMANAS_MINI: { numero: string; otroMes?: boolean | undefined; hoy?: boolean | undefined; conPunto?: boolean | undefined; }[][]
  PROXIMOS_LATERAL: EventoLateral[]
  LEYENDA_CALENDARIO: { color: string; nombre: string; }[]
}) {
  return (
    <aside className="grid gap-4">
      <PanelCalendarioMini mes={MES_CALENDARIO_ACTUAL} semanas={SEMANAS_MINI} textoEnlace={catalogoEventos.botones.hoy} />

      <section className="overflow-hidden rounded-xl border border-borde-suave bg-white">
        <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEventos.secciones.proximos}</h2>
          <a href={catalogoEventos.rutas.proximos} className={CLASE_ENLACE_ACCION}>{textosRedSocial.VER_TODOS}</a>
        </div>
        <div className="px-3 pb-2">
          {PROXIMOS_LATERAL.map((ev, i) => (
            <ItemEventoLateral key={ev.nombre} evento={ev} conBorde={i < PROXIMOS_LATERAL.length - 1} />
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-borde-suave bg-white">
        <div className="px-4 pb-2.5 pt-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEventos.secciones.leyenda}</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 pb-3.5 pt-1">
          {LEYENDA_CALENDARIO.map((l) => (
            <span key={l.nombre} className="flex items-center gap-1.5 text-auxiliar text-texto">
              <SuperficieColor as="span" variante={l.color} className="h-2 w-2 flex-none rounded-full" /> {l.nombre}
            </span>
          ))}
        </div>
      </section>
    </aside>
  )
}
