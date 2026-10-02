import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { Sparkline } from '../../compartido/interfaz/sparkline'
import { Icono } from '../../compartido/icono'
import type { TarjetaModulo, EstadoInd } from '@/tipos/indicadores/modelo_indicadores_clave'

export function BloqueIndicadoresClave2({
  MODULOS_IND,
  CLASES_ICONO_MODULO,
  EstadoIndBadge,
}: {
  MODULOS_IND: TarjetaModulo[]
  CLASES_ICONO_MODULO: Record<'verde' | 'morado' | 'naranja' | 'azul' | 'rojo', string>
  EstadoIndBadge: ({ estado }: { estado: EstadoInd; }) => React.JSX.Element
}) {
  return (
    <div className="grid grid-cols-6 gap-4 max-1400:grid-cols-3 max-900:grid-cols-2 max-480:grid-cols-1">
      {MODULOS_IND.map((m) => (
        <article key={m.nombre} className="min-w-0 rounded-xl border border-borde bg-white p-4">
          <div className="mb-2.5 flex items-center gap-2">
            <span className={`grid h-7.5 w-7.5 flex-none place-items-center rounded-lg ${CLASES_ICONO_MODULO[m.color]}`}>
              <Icono name={m.icono} className="h-3.5 w-3.5" />
            </span>
            <strong className="text-nombre-entidad font-bold text-texto">{m.nombre}</strong>
          </div>
          <span className="mb-0.5 block text-auxiliar text-texto-suave">{m.etiquetaDato}</span>
          <strong className="mb-2 block text-valor-destacado font-extrabold text-texto">{m.valor}</strong>
          <div className="mb-2 flex items-center justify-between text-auxiliar">
            <small className={'font-semibold ' + catalogoCompartido.variacion_kpi.positiva.clase}>{m.variacion}</small>
            <EstadoIndBadge estado={m.estado} />
          </div>
          <Sparkline puntos={m.sparklinePuntos} color={m.sparklineColor} alto={22} grosor={2} className="block h-5.5 w-full" />
        </article>
      ))}
    </div>
  )
}
