import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../compartido/icono'
import type { EventoDiaCal } from '@/tipos/eventos/modelo_eventos_calendario'

const COLUMNAS_DIA = 'grid-cols-[80px_1fr]'
const TOP_DIA = [
  'top-0', 'top-7.5', 'top-15', 'top-22.5', 'top-30', 'top-37.5', 'top-45', 'top-52.5', 'top-60', 'top-67.5',
  'top-75', 'top-82.5', 'top-90', 'top-97.5', 'top-105', 'top-112.5', 'top-120', 'top-127.5', 'top-135', 'top-142.5',
  'top-150', 'top-157.5', 'top-165', 'top-172.5', 'top-180', 'top-187.5', 'top-195', 'top-202.5', 'top-210', 'top-217.5',
]
const ALTURA_DIA = ['h-0', 'h-7.5', 'h-15', 'h-22.5']

export function BloqueTodoElDia2({
  HORAS_DIA,
  EVENTOS_DIA,
  COLOR_EVENTO_DIA,
}: {
  HORAS_DIA: string[]
  EVENTOS_DIA: EventoDiaCal[]
  COLOR_EVENTO_DIA: Record<'empresa' | 'negocios' | 'tecnologia' | 'musica' | 'educacion', string>
}) {
  return (
    <div className="mt-4 max-h-130 overflow-auto rounded-xl border border-gris-borde bg-fondo">
      <div className={'sticky top-0 z-10 grid min-w-100 max-768:min-w-0 border-b border-gris-borde bg-fondo ' + COLUMNAS_DIA}>
        <span className="px-2.5 py-2 text-encabezado-tabla leading-snug text-gris-texto-terciario">{catalogoEventos.botones.todo_el_dia}</span>
        <div className="border-l border-gris-borde" />
      </div>

      <div className={'grid min-w-100 max-768:min-w-0 ' + COLUMNAS_DIA}>
        <div>
          {HORAS_DIA.map((h) => (
            <span key={h} className="block h-15 pt-1 px-2.5 text-encabezado-tabla leading-snug text-gris-texto-terciario">{h}</span>
          ))}
        </div>
        <div className="relative border-l border-gris-borde">
          {HORAS_DIA.map((h) => (
            <div key={h} className="h-15 border-b border-gris-borde" />
          ))}
          {EVENTOS_DIA.map((ev) => (
            <div
              key={ev.nombre}
              className={'absolute inset-x-3 ' + TOP_DIA[ev.filaInicio] + ' ' + ALTURA_DIA[ev.filas] + ' overflow-hidden rounded-lg px-3.5 py-2.5 ' + COLOR_EVENTO_DIA[ev.color]}
            >
              {ev.virtual && (
                <Icono name="video" className="absolute right-3 top-2.5 h-4 w-4" />
              )}
              <span className="block text-fecha-abreviada font-semibold">{ev.horaTexto}</span>
              <h4 className="m-0 mt-0.5 text-nombre-entidad font-bold text-gris-oscuro-texto">{ev.nombre}</h4>
              <span className="mt-1 flex items-center gap-1 text-auxiliar text-gris-texto-secundario">
                <Icono name="ubicacion" className="h-3.25 w-3.25" /> {ev.ubicacion}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
