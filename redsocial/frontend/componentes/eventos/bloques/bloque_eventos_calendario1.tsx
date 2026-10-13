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
      <div className="grid grid-cols-7 border-b border-gris-borde bg-fondo">
        {DIAS_SEMANA.map((d) => (
          <span key={d} className="py-2.5 text-center text-encabezado-tabla uppercase tracking-wide text-texto-suave">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {CELDAS.map((c, i) => (
          <div
            key={[c.numero, Number(Boolean(c.otroMes))].join('')}
            className={
              'flex min-h-25 max-768:min-h-11 flex-col gap-1 p-1.5 max-768:items-center ' +
              ((i + 1) % 7 !== 0 ? 'border-r border-gris-borde ' : '') +
              (i < CELDAS.length - 7 ? 'border-b border-gris-borde ' : '') +
              (c.otroMes ? 'bg-fondo' : '')
            }
          >
            <button
              type="button"
              disabled={c.otroMes}
              onClick={() => setIndiceDiaSeleccionado(i)}
              className={
                'mb-0.5 flex h-6 w-6 items-center justify-center rounded-full text-cuerpo font-control ' +
                (c.hoy ? 'bg-primario font-titulo text-white' : 'text-texto disabled:opacity-40') +
                (i === indiceDiaSeleccionado && !c.hoy ? ' max-768:ring-2 max-768:ring-primario' : '')
              }
            >
              {c.numero}
            </button>
            {c.evento && (
              <div className={'max-768:hidden rounded px-1.5 py-0.75 text-badge leading-compacto ' + COLOR_EVENTO_CAL[c.evento.color]}>
                <span className="block font-titulo">{c.evento.hora}</span>
                <span className="block truncate font-etiqueta">{c.evento.nombre}</span>
              </div>
            )}
            {c.masTexto && c.evento && (
              <span className={'max-768:hidden mt-0.5 block rounded px-1.5 py-0.75 text-conteo leading-compacto ' + COLOR_EVENTO_CAL[c.evento.color]}>{c.masTexto}</span>
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
