import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { DiaSemanaCal, EventoSemanaCal } from '@/tipos/eventos/modelo_eventos_calendario'

const COLUMNAS_SEMANA = 'grid-cols-[80px_repeat(7,minmax(0,1fr))]'
const ROW_START = [
  'row-start-1', 'row-start-2', 'row-start-3', 'row-start-4', 'row-start-5', 'row-start-6', 'row-start-7',
  'row-start-8', 'row-start-9', 'row-start-10', 'row-start-11', 'row-start-12', 'row-start-13', 'row-start-[14]',
]
const ROW_SPAN = ['row-span-1', 'row-span-1', 'row-span-2', 'row-span-3']

export function BloqueTodoElDia({
  DIAS_SEMANA_CAL,
  HORAS_SEMANA,
  EVENTOS_SEMANA,
  COLOR_EVENTO_CAL,
}: {
  DIAS_SEMANA_CAL: DiaSemanaCal[]
  HORAS_SEMANA: string[]
  EVENTOS_SEMANA: EventoSemanaCal[]
  COLOR_EVENTO_CAL: Record<'empresa' | 'negocios' | 'tecnologia' | 'musica' | 'educacion', string>
}) {
  const eventosPorDia = DIAS_SEMANA_CAL.map((_, diaIndex) => EVENTOS_SEMANA.filter((ev) => ev.dia === diaIndex))

  return (
    <div className="mt-4 max-h-130 overflow-auto rounded-xl border border-gris-borde bg-fondo">
      <div className="sticky top-0 z-10 bg-fondo">
        <div className={'grid min-w-175 max-768:min-w-0 border-b border-gris-borde bg-t-f9fafb ' + COLUMNAS_SEMANA}>
          <span />
          {DIAS_SEMANA_CAL.map((d) => (
            <div key={d.abrev} className={'flex flex-col items-center gap-1 border-l border-gris-borde py-2.5 ' + (d.hoy ? 'bg-primario-suave' : '')}>
              <span className="text-encabezado-tabla font-semibold uppercase tracking-wide text-gris-texto-terciario">{d.abrev}</span>
              <span className={'flex h-6 w-6 items-center justify-center rounded-full text-cuerpo font-semibold ' + (d.hoy ? 'bg-primario font-bold text-white' : 'text-gris-texto')}>
                {d.numero}
              </span>
            </div>
          ))}
        </div>

        <div className={'grid min-w-175 max-768:min-w-0 border-b border-gris-borde bg-fondo ' + COLUMNAS_SEMANA}>
          <span className="flex items-center px-2.5 py-2 text-encabezado-tabla leading-snug text-gris-texto-terciario">{catalogoEventos.botones.todo_el_dia}</span>
          {DIAS_SEMANA_CAL.map((d) => (
            <div key={d.abrev} className={'border-l border-gris-borde py-2 ' + (d.hoy ? 'bg-primario-suave' : '')} />
          ))}
        </div>
      </div>

      <div className={'grid min-w-175 max-768:min-w-0 ' + COLUMNAS_SEMANA}>
        <div className="grid grid-rows-[repeat(14,60px)]">
          {HORAS_SEMANA.map((h) => (
            <span key={h} className="block pt-1 px-2.5 text-encabezado-tabla leading-snug text-gris-texto-terciario">{h}</span>
          ))}
        </div>
        {DIAS_SEMANA_CAL.map((d, diaIndex) => (
          <div key={d.abrev} className={'relative grid grid-rows-[repeat(14,60px)] border-l border-gris-borde ' + (d.hoy ? 'bg-primario-suave' : '')}>
            {HORAS_SEMANA.map((hora, i) => (
              <div key={hora} className={ROW_START[i] + ' border-b border-gris-borde'} />
            ))}
            {eventosPorDia[diaIndex].map((ev) => (
              <div
                key={ev.nombre}
                className={ROW_START[ev.filaInicio] + ' ' + ROW_SPAN[ev.filas] + ' m-1 overflow-hidden rounded px-1.5 py-1 text-etiqueta-estado leading-1.3 ' + COLOR_EVENTO_CAL[ev.color]}
              >
                <span className="block font-semibold">{ev.hora}</span>
                <span className="block truncate text-nombre-entidad font-medium">{ev.nombre}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
