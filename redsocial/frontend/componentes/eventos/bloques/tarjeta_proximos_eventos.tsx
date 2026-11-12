import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'
import { ItemEventoLateral } from './item_evento_lateral'
import type { TarjetaProximosEventosProps } from '@/tipos/eventos/contrato_tarjetas_laterales_eventos'

export function TarjetaProximosEventos({ proximos }: TarjetaProximosEventosProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-borde-suave bg-white">
      <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5">
        <h2 className="m-0 text-titulo-banner">{catalogoEventos.secciones.proximos_de_tus_eventos}</h2>
        <a href={catalogoEventos.rutas.proximos} className={CLASE_ENLACE_ACCION}>{textosRedSocial.VER_TODOS}</a>
      </div>
      <div className="px-3 pb-2">
        {proximos.map((ev, i) => (
          <ItemEventoLateral key={ev.nombre} evento={ev} conBorde={i < proximos.length - 1} />
        ))}
      </div>
    </section>
  )
}
