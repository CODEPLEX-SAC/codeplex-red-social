import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import { CabeceraTarjetaKpi } from '../../compartido/interfaz/cabecera_tarjeta_kpi'
import { Sparkline } from '../../compartido/interfaz/sparkline'
import { Icono } from '../../compartido/icono'
import type { Kpi } from '@/tipos/indicadores/modelo_indicadores_clave'
import { CLASES_TARJETA } from '../../compartido/clases_tarjeta'

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
    <div className="mb-5 grid grid-cols-5 gap-4 max-1250:grid-cols-3 max-900:grid-cols-2 max-480:grid-cols-1">
      {KPIS.map((kpi) => (
        <article key={kpi.etiqueta} className={CLASES_TARJETA.mosaico}>
          <CabeceraTarjetaKpi etiqueta={kpi.etiqueta} icono={kpi.icono} claseIcono={CLASES_ICONO_KPI[kpi.color]} />
          <strong className="mb-1.5 block text-valor-destacado text-texto">{kpi.valor}</strong>
          <small
            className={
              'mb-2 inline-flex min-w-0 flex-wrap items-center gap-0.75 text-conteo ' +
              catalogoCompartido.variacion_kpi[kpi.variacion.direccion].clase
            }
          >
            <Icono name={catalogoCompartido.variacion_kpi[kpi.variacion.direccion].icono as IconName} className="h-3 w-3" />
            {kpi.variacion.texto} <em className="ml-0.5 font-etiqueta not-italic text-texto-suave">{COMPARATIVO_KPI}</em>
          </small>
          <Sparkline puntos={kpi.sparklinePuntos} color={kpi.sparklineColor} alto={26} grosor={2.2} conPuntos className="block h-7.5 w-full" />
        </article>
      ))}
    </div>
  )
}
