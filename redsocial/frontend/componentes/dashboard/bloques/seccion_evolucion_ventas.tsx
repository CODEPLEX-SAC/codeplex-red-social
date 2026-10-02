import catalogoDashboard from '../../../catalogos/capacidades/redsocial/dashboard.json'
import { Selector } from '../../compartido/interfaz/selector'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { CodeplexGraficoLineas } from '@codeplex-sac/graficos'
import { DonaProgreso } from '../../compartido/interfaz/dona_progreso'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { SeccionRatiosFinancieros } from './seccion_ratios_financieros'
import type { CodeplexGraficoColor } from '@codeplex-sac/graficos'

export function SeccionEvolucionVentas({
  VENTAS_MENSUALES,
  DONA_SEGMENTOS,
  COLOR_GRAFICO_NOMBRE,
  VENTAS_TOTAL_CHART,
  RATIOS,
  EstadoBadge,
  ETIQUETA_RATIO,
}: {
  VENTAS_MENSUALES: { etiqueta: string; valor: number; }[]
  DONA_SEGMENTOS: { etiqueta: string; color: string; porcentaje: string; monto: string; }[]
  COLOR_GRAFICO_NOMBRE: Record<string, CodeplexGraficoColor>
  VENTAS_TOTAL_CHART: string
  RATIOS: { nombre: string; valor: string; estado: 'optimo' | 'bajo' | 'aceptable' | 'riesgo'; }[]
  EstadoBadge: ({ estado, children }: { estado: 'optimo' | 'bajo' | 'aceptable' | 'riesgo'; children: string; }) => React.JSX.Element
  ETIQUETA_RATIO: Record<'optimo' | 'bajo' | 'aceptable' | 'riesgo', string>
}) {
  return (
    <div className="mb-5 grid grid-cols-1.6fr-1fr-1fr items-stretch gap-4 max-1250:grid-cols-2 max-900:grid-cols-1">
      <article className="relative min-w-0 rounded-control border border-gris-borde bg-white py-4.5 px-5 shadow-sombra max-1250:col-span-2 max-900:col-span-1">
        <div className="mb-3.5 flex items-center justify-between border-b border-t-f0eef5 pb-3.5">
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoDashboard.secciones.evolucion_ventas}</h2>
          <div className="flex items-center gap-2">
            <Selector variant="mini">
              {catalogoDashboard.selectores.mensual_semanal.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="sutil" size="md" />
          </div>
        </div>
        <div className="relative">
          <ProveedorTemaGraficos>
            <CodeplexGraficoLineas datos={VENTAS_MENSUALES} color="primario" gradiente conTooltip conCuadricula alto={220} />
          </ProveedorTemaGraficos>
        </div>
        <div className="mt-3 flex gap-4.5 text-auxiliar text-texto-suave">
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-0.75 w-3.5 rounded-sm bg-morado-categoria not-italic" /> {catalogoDashboard.leyendas.ventas}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-0 w-3.5 border-t-2 border-dashed border-morado-categoria not-italic" /> {catalogoDashboard.leyendas.proyeccion}
          </span>
        </div>
      </article>

      <article className="min-w-0 rounded-control border border-gris-borde bg-white py-4.5 px-5 shadow-sombra">
        <div className="mb-3.5 border-b border-t-f0eef5 pb-3.5">
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoDashboard.secciones.composicion_ingresos}</h2>
        </div>
        <div className="relative mx-auto mb-4 grid h-32.5 w-32.5 place-items-center rounded-full">
          <DonaProgreso
            segmentos={DONA_SEGMENTOS.map((s) => ({ color: catalogoCompartido.colores_graficos[COLOR_GRAFICO_NOMBRE[s.color]], porcentaje: Number(s.porcentaje.replace('%', '')) }))}
            tamano={130}
            grosor={16}
            className="absolute inset-0"
          />
          <div className="absolute inset-5 rounded-full bg-white" />
          <span className="relative z-1 flex flex-col items-center text-center">
            <strong className="text-valor-destacado font-extrabold text-texto">{VENTAS_TOTAL_CHART}</strong>
            <span className="text-auxiliar text-texto-suave">{catalogoDashboard.leyendas.total}</span>
          </span>
        </div>
        <ul className="m-0 grid list-none gap-2 p-0">
          {DONA_SEGMENTOS.map((s) => (
            <li key={s.etiqueta} className="flex items-center gap-2 text-auxiliar text-texto">
              <SuperficieColor as="i" variante={s.color} className="h-2.5 w-2.5 flex-none rounded-full not-italic" />
              {s.etiqueta} <b className="ml-auto font-bold">{s.porcentaje}</b>
              <small className="min-w-17 text-right text-texto-suave">{s.monto}</small>
            </li>
          ))}
        </ul>
      </article>

      <SeccionRatiosFinancieros
        RATIOS={RATIOS}
        EstadoBadge={EstadoBadge}
        ETIQUETA_RATIO={ETIQUETA_RATIO}
      />
    </div>
  )
}
