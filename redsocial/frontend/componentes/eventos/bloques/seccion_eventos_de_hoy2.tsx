import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../compartido/icono'
import type { CeldaCal, EventoResumenDia } from '@/tipos/eventos/modelo_eventos_calendario'

const DIAS_SEMANA = catalogoEventos.dias_semana

export function SeccionEventosDeHoy2({
  indiceDiaSeleccionado,
  diaSeleccionado,
  MES_ABREVIADO_ACTUAL,
  eventosDiaSeleccionado,
  COLOR_EVENTO_DIA,
}: {
  indiceDiaSeleccionado: number
  diaSeleccionado: CeldaCal
  MES_ABREVIADO_ACTUAL: string
  eventosDiaSeleccionado: EventoResumenDia[]
  COLOR_EVENTO_DIA: Record<'empresa' | 'negocios' | 'tecnologia' | 'musica' | 'educacion', string>
}) {
  return (
    <div className="mt-4 hidden rounded-xl border border-gris-borde bg-fondo max-768:block">
      <div className="border-b border-gris-borde px-4 py-3">
        <h2 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoEventos.secciones.eventos_de_hoy}</h2>
        <span className="text-fecha-abreviada text-gris-texto-terciario">{DIAS_SEMANA[indiceDiaSeleccionado % 7]}, {diaSeleccionado.numero} {MES_ABREVIADO_ACTUAL}</span>
      </div>
      <div className="flex flex-col gap-2.5 p-3">
        {eventosDiaSeleccionado.length === 0 && (
          <p className="m-0 py-2 text-center text-auxiliar text-gris-texto-terciario">{catalogoEventos.mensajes.sin_eventos}</p>
        )}
        {eventosDiaSeleccionado.map((ev) => (
          <div key={ev.nombre} className={'rounded-lg px-3.5 py-2.5 ' + COLOR_EVENTO_DIA[ev.color]}>
            <span className="block text-fecha-abreviada font-semibold">{ev.hora}</span>
            <h3 className="m-0 mt-0.5 text-nombre-entidad font-bold text-gris-oscuro-texto">{ev.nombre}</h3>
            <span className="mt-1 flex items-center gap-1 text-auxiliar text-gris-texto-secundario">
              <Icono name={ev.icono} className="h-3.25 w-3.25" /> {ev.detalle}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
