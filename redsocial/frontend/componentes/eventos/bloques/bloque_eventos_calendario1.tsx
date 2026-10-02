import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import type { CeldaCal } from '@/tipos/eventos/modelo_eventos_calendario'

const DIAS_SEMANA = catalogoEventos.dias_semana

export function BloqueEventosCalendario1({
  CELDAS,
  setIndiceDiaSeleccionado,
  indiceDiaSeleccionado,
  COLOR_EVENTO_CAL,
}: {
  CELDAS: CeldaCal[]
  setIndiceDiaSeleccionado: (valor: number | ((actual: number) => number)) => void
  indiceDiaSeleccionado: number
  COLOR_EVENTO_CAL: Record<'empresa' | 'negocios' | 'tecnologia' | 'musica' | 'educacion', string>
}) {
  return (
    <div className="mt-4 overflow-x-auto overflow-y-hidden rounded-xl border border-gris-borde bg-fondo">
      <div className="grid min-w-175 max-768:min-w-0 grid-cols-7 border-b border-gris-borde bg-t-f9fafb">
        {DIAS_SEMANA.map((d) => (
          <span key={d} className="py-2.5 text-center text-encabezado-tabla font-semibold uppercase tracking-wide text-gris-texto-terciario">{d}</span>
        ))}
      </div>
      <div className="grid min-w-175 max-768:min-w-0 grid-cols-7">
        {CELDAS.map((c, i) => (
          <div
            key={[c.numero, Number(Boolean(c.otroMes))].join('')}
            className={
              'flex min-h-25 max-768:min-h-11 flex-col gap-1 p-1.5 max-768:items-center ' +
              ((i + 1) % 7 !== 0 ? 'border-r border-gris-borde ' : '') +
              (i < CELDAS.length - 7 ? 'border-b border-gris-borde ' : '') +
              (c.otroMes ? 'bg-t-fafafa' : '')
            }
          >
            <button
              type="button"
              disabled={c.otroMes}
              onClick={() => setIndiceDiaSeleccionado(i)}
              className={
                'mb-0.5 flex h-6 w-6 items-center justify-center rounded-full text-cuerpo font-semibold ' +
                (c.hoy ? 'bg-primario font-bold text-white' : c.otroMes ? 'text-t-d1d5db' : 'text-gris-texto') +
                (i === indiceDiaSeleccionado && !c.hoy ? ' max-768:ring-2 max-768:ring-primario' : '')
              }
            >
              {c.numero}
            </button>
            {c.evento && (
              <div className={'max-768:hidden rounded px-1.5 py-0.75 text-etiqueta-estado leading-1.3 ' + COLOR_EVENTO_CAL[c.evento.color]}>
                <span className="block font-semibold">{c.evento.hora}</span>
                <span className="block truncate font-medium">{c.evento.nombre}</span>
              </div>
            )}
            {c.masTexto && c.evento && (
              <span className={'max-768:hidden mt-0.5 block rounded px-1.5 py-0.75 text-contador font-semibold leading-1.3 ' + COLOR_EVENTO_CAL[c.evento.color]}>{c.masTexto}</span>
            )}
            {c.evento && (
              <SuperficieColor as="span" variante={c.evento.color} className="hidden h-1.5 w-1.5 flex-none rounded-full max-768:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
