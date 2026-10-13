import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import { Sparkline } from '../../compartido/interfaz/sparkline'
import { Icono } from '../../compartido/icono'
import type { Kpi } from '@/tipos/dashboard/modelo_dashboard'

export function BloqueDashboard1({
  KPIS,
  CLASES_ICONO_KPI,
  RESUMEN_DASHBOARD,
}: {
  KPIS: Kpi[]
  CLASES_ICONO_KPI: Record<'azul' | 'rojo' | 'morado' | 'cian', string>
  RESUMEN_DASHBOARD: { fecha: string; comparativo: string; }
}) {
  return (
    <div className="mb-5 grid grid-cols-5 gap-4 max-1250:grid-cols-3 max-900:grid-cols-2 max-480:grid-cols-1">
      {KPIS.map((kpi) => (
        <article key={kpi.etiqueta} className="min-w-0 rounded-xl border border-gris-borde bg-white p-md">
          <div className="mb-2.5 flex items-center gap-2 text-titulo-subseccion text-texto-suave">
            <span className={`grid h-7.5 w-7.5 flex-none place-items-center rounded-lg ${CLASES_ICONO_KPI[kpi.color]}`}>
              <Icono name={kpi.icono} className="w-4 h-4" />
            </span>
            <span>{kpi.etiqueta}</span>
          </div>
          <strong className="mb-1.5 block text-valor-destacado text-texto">{kpi.valor}</strong>
          <div className="mb-2">
            <small
              className={
                'inline-flex flex-wrap items-center gap-0.75 text-conteo ' +
                catalogoCompartido.variacion_kpi[kpi.variacion.direccion].clase
              }
            >
              <Icono name={catalogoCompartido.variacion_kpi[kpi.variacion.direccion].icono as IconName} className="w-3 h-3" />
              {kpi.variacion.texto} <em className="ml-0.5 font-etiqueta not-italic text-texto-suave">{RESUMEN_DASHBOARD.comparativo}</em>
            </small>
          </div>
          <Sparkline puntos={kpi.sparklinePuntos} color={kpi.sparklineColor} alto={26} grosor={2.2} conPuntos className="block h-7.5 w-full" />
        </article>
      ))}
    </div>
  )
}
