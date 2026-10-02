import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import { Sparkline } from '../../compartido/interfaz/sparkline'
import { Icono } from '../../compartido/icono'
import type { Kpi } from '@/tipos/indicadores/modelo_indicadores_clave'

export function BloqueIndicadoresClave1({
  KPIS,
  CLASES_ICONO_KPI,
  COMPARATIVO_KPI,
}: {
  KPIS: Kpi[]
  CLASES_ICONO_KPI: Record<'verde' | 'morado' | 'naranja', string>
  COMPARATIVO_KPI: string
}) {
  return (
    <div className="mb-5 grid grid-cols-5 gap-4 max-900:grid-cols-2 max-480:grid-cols-1">
      {KPIS.map((kpi) => (
        <article key={kpi.etiqueta} className="min-w-0 rounded-xl border border-borde bg-white p-4">
          <div className="mb-2.5 flex items-center gap-2 text-subtitulo font-semibold text-texto-suave">
            <span className={`grid h-7.5 w-7.5 flex-none place-items-center rounded-lg ${CLASES_ICONO_KPI[kpi.color]}`}>
              <Icono name={kpi.icono} className="h-3.75 w-3.75" />
            </span>
            <span>{kpi.etiqueta}</span>
          </div>
          <strong className="mb-1.5 block text-valor-destacado font-extrabold text-texto">{kpi.valor}</strong>
          <small
            className={
              'mb-2 inline-flex items-center gap-0.75 whitespace-nowrap text-contador font-bold ' +
              catalogoCompartido.variacion_kpi[kpi.variacion.direccion].clase
            }
          >
            <Icono name={catalogoCompartido.variacion_kpi[kpi.variacion.direccion].icono as IconName} className="h-2.75 w-2.75" />
            {kpi.variacion.texto} <em className="ml-0.5 font-medium not-italic text-texto-suave">{COMPARATIVO_KPI}</em>
          </small>
          <Sparkline puntos={kpi.sparklinePuntos} color={kpi.sparklineColor} alto={26} grosor={2.2} conPuntos className="block h-7.5 w-full" />
        </article>
      ))}
    </div>
  )
}
