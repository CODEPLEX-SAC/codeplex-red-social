import catalogoEstadisticas from '../../../catalogos/capacidades/redsocial/estadisticas.json'
import { Selector } from '../../compartido/interfaz/selector'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { CodeplexGraficoLineas } from '@codeplex-sac/graficos'
import { DonaProgreso } from '../../compartido/interfaz/dona_progreso'
import { SeccionTopClientes } from './seccion_top_clientes'
import { CLASES_TARJETA, CLASES_CUERPO_TARJETA } from '../../compartido/clases_tarjeta'

export function SeccionEvolucionVentas2({
  VENTAS_MENSUALES,
  COMPOSICION_INGRESOS,
  TOP_CLIENTES,
  ESCALA_TOP_CLIENTES,
}: {
  VENTAS_MENSUALES: { etiqueta: string; valor: number; }[]
  COMPOSICION_INGRESOS: { total: string; items: { color: string; etiqueta: string; pct: string; valor: string; }[]; }
  TOP_CLIENTES: { nombre: string; ancho: string; valor: string; }[]
  ESCALA_TOP_CLIENTES: string[]
}) {
  return (
    <div className="mb-4 grid grid-cols-3 gap-4 max-1400:grid-cols-2 max-1000:grid-cols-1">
      <article className={[CLASES_TARJETA.panel, 'max-1400:col-span-2 max-1000:col-span-1'].join(' ')}>
        <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEstadisticas.secciones.evolucion_ventas}</h2>
          <Selector variant="mini" aria-label={catalogoEstadisticas.selectores.frecuencia_grafico.etiqueta} defaultValue={catalogoEstadisticas.selectores.frecuencia_grafico.opciones[0]}>
            {catalogoEstadisticas.selectores.frecuencia_grafico.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
        </div>
        <div className="relative">
          <ProveedorTemaGraficos tooltipGraficos>
            <CodeplexGraficoLineas datos={VENTAS_MENSUALES} color="info" gradiente conTooltip conCuadricula alto={220} />
          </ProveedorTemaGraficos>
        </div>
        <div className="mt-3 flex gap-4.5 text-auxiliar text-texto-suave">
          <span className="inline-flex items-center gap-1.5"><i className="h-0.75 w-3.5 flex-none rounded-sm bg-azul-categoria" /> {catalogoEstadisticas.leyendas.ventas_reales}</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-0 w-3.5 flex-none border-t-2 border-dashed border-azul-categoria" /> {catalogoEstadisticas.leyendas.proyeccion}</span>
        </div>
      </article>

      <article className={CLASES_TARJETA.panel}>
        <div className="mb-3.5 border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEstadisticas.secciones.composicion_ingresos}</h2>
        </div>
        <div className={CLASES_CUERPO_TARJETA.cuerpo_centrado}>
        <DonaProgreso
          segmentos={COMPOSICION_INGRESOS.items.map((it) => ({ color: it.color, porcentaje: Number(it.pct.replace('%', '')) }))}
          tamano={140}
          grosor={16}
          valorCentral={COMPOSICION_INGRESOS.total}
          etiquetaCentral={catalogoEstadisticas.leyendas.total}
          className="mx-auto mb-4"
        />
        <ul className="m-0 grid list-none gap-2 p-0">
          {COMPOSICION_INGRESOS.items.map((it) => (
            <li key={it.etiqueta} className="flex items-center gap-2 text-auxiliar text-texto">
              <svg width="10" height="10" viewBox="0 0 10 10" className="flex-none"><circle cx="5" cy="5" r="5" fill={it.color} /></svg>
              {it.etiqueta} <b className="ml-auto font-titulo">{it.pct}</b> <small className="min-w-17 text-right text-auxiliar text-texto-suave">{it.valor}</small>
            </li>
          ))}
        </ul>
        </div>
      </article>

      <SeccionTopClientes TOP_CLIENTES={TOP_CLIENTES} ESCALA_TOP_CLIENTES={ESCALA_TOP_CLIENTES} />
    </div>
  )
}
