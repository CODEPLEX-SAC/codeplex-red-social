import catalogoEstadisticas from '../../../catalogos/capacidades/redsocial/estadisticas.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { SeccionGastosCategoria2 } from './seccion_gastos_categoria2'
import type { EstadoRatio } from '@/tipos/estadisticas/modelo_estadisticas_todos_modulos'

const TABLA_ESTADO_RESULTADOS = catalogoEstadisticas.tabla_estado_resultados
const TABLA_RATIOS = catalogoEstadisticas.tabla_ratios

export function SeccionGastosCategoria({
  GASTOS_CATEGORIA,
  TablaEst,
  TH,
  ESTADO_RESULTADOS,
  TD,
  RATIOS_FINANCIEROS,
  EstadoBadge,
  ETIQUETA_ESTADO,
}: {
  GASTOS_CATEGORIA: { total: string; items: { color: string; etiqueta: string; pct: string; valor: string; }[]; }
  TablaEst: ({ children, className }: { children: React.ReactNode; className?: string | undefined; }) => React.JSX.Element
  TH: string
  ESTADO_RESULTADOS: { concepto: string; actual: string; pct: string; variacion: string; tipo: 'positiva' | 'negativa'; fuerte?: boolean | undefined; }[]
  TD: string
  RATIOS_FINANCIEROS: { nombre: string; valor: string; variacion: string; tipo: 'positiva' | 'negativa'; estado: EstadoRatio; }[]
  EstadoBadge: ({ estado, children }: { estado: EstadoRatio; children: string; }) => React.JSX.Element
  ETIQUETA_ESTADO: Record<EstadoRatio, string>
}) {
  return (
    <div className="mb-4 grid grid-cols-1.6fr-1fr-1fr gap-4 max-1250:grid-cols-2 max-900:grid-cols-1">
      <SeccionGastosCategoria2 GASTOS_CATEGORIA={GASTOS_CATEGORIA} />

      <article className="min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5">
        <div className="mb-3.5 border-b border-t-f0eef5 pb-3.5">
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.estado_resultados}</h2>
        </div>
        <TablaEst>
          <thead>
            <tr>
              {TABLA_ESTADO_RESULTADOS.map((h) => <th key={h} className={TH}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {ESTADO_RESULTADOS.map((r) => (
              <tr key={r.concepto}>
                <td className={TD}>{r.fuerte ? <strong>{r.concepto}</strong> : r.concepto}</td>
                <td className={TD}>{r.fuerte ? <strong>{r.actual}</strong> : r.actual}</td>
                <td className={TD}>{r.fuerte ? <strong>{r.pct}</strong> : r.pct}</td>
                <td className={TD + ' font-semibold ' + (r.tipo === 'positiva' ? 'text-positivo-kpi' : 'text-negativo-kpi')}>{r.variacion}</td>
              </tr>
            ))}
          </tbody>
        </TablaEst>
      </article>

      <article className="min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5">
        <div className="mb-3.5 flex items-center justify-between border-b border-t-f0eef5 pb-3.5">
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.ratios_financieros}</h2>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        <TablaEst>
          <thead>
            <tr>
              {TABLA_RATIOS.map((h) => <th key={h} className={TH}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {RATIOS_FINANCIEROS.map((r) => (
              <tr key={r.nombre}>
                <td className={TD}>{r.nombre}</td>
                <td className={TD}>{r.valor}</td>
                <td className={TD + ' font-semibold ' + (r.tipo === 'positiva' ? 'text-positivo-kpi' : 'text-negativo-kpi')}>{r.variacion}</td>
                <td className={TD}><EstadoBadge estado={r.estado}>{ETIQUETA_ESTADO[r.estado]}</EstadoBadge></td>
              </tr>
            ))}
          </tbody>
        </TablaEst>
      </article>
    </div>
  )
}
