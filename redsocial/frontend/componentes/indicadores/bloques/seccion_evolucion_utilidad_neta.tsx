import catalogoIndicadores from '../../../catalogos/capacidades/redsocial/indicadores.json'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { CodeplexCaja } from '@codeplex-sac/diseno'
import { CodeplexGraficoBarraLinea, CodeplexGraficoLineas } from '@codeplex-sac/graficos'
import { SeccionEstructuraCostos } from './seccion_estructura_costos'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'
import { CLASES_TARJETA, CLASES_CUERPO_TARJETA } from '../../compartido/clases_tarjeta'

export function SeccionEvolucionUtilidadNeta({
  UTILIDAD_NETA_COMBO,
  VENTAS_PROYECCION_MENSUAL,
  COSTOS,
}: {
  UTILIDAD_NETA_COMBO: { clave: string; barra: number; linea: number; }[]
  VENTAS_PROYECCION_MENSUAL: { etiqueta: string; valor: number; }[]
  COSTOS: { total: string; items: { color: string; etiqueta: string; pct: string; valor: string; }[]; }
}) {
  return (
    <div className="mb-5 grid grid-cols-3 gap-4 max-1400:grid-cols-2 max-1000:grid-cols-1">
      <article className={[CLASES_TARJETA.panel, 'relative'].join(' ')}>
        <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoIndicadores.secciones.evolucion_utilidad_neta}</h2>
          <a href="#" className={[CLASE_ENLACE_ACCION, 'whitespace-nowrap'].join(' ')}>{catalogoIndicadores.botones.ver_detalle}</a>
        </div>
        <div className={CLASES_CUERPO_TARJETA.cuerpo_centrado}>
        <div className="overflow-x-auto">
          <ProveedorTemaGraficos tooltipGraficos>
            <CodeplexCaja variante="bordeado" redondeado={4} relleno={0} sx={{ boxShadow: 1 }} className="min-w-77">
              <CodeplexGraficoBarraLinea datos={UTILIDAD_NETA_COMBO} colorBarra="exito" colorLinea="primario" alto={160} conPapel={false} />
            </CodeplexCaja>
          </ProveedorTemaGraficos>
        </div>
        <div className="mt-3 flex gap-4.5 text-auxiliar text-texto-suave">
          <span className="inline-flex items-center gap-1.5"><i className="h-0.75 w-3.5 flex-none rounded-sm bg-verde-categoria" /> {catalogoIndicadores.leyendas.utilidad_neta}</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 flex-none rounded-full bg-morado-categoria" /> {catalogoIndicadores.leyendas.margen_neto}</span>
        </div>
        </div>
      </article>

      <article className={[CLASES_TARJETA.panel, 'relative'].join(' ')}>
        <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoIndicadores.secciones.ventas_vs_proyeccion}</h2>
          <a href="#" className={[CLASE_ENLACE_ACCION, 'whitespace-nowrap'].join(' ')}>{catalogoIndicadores.botones.ver_detalle}</a>
        </div>
        <div className={CLASES_CUERPO_TARJETA.cuerpo_centrado}>
        <div className="relative">
          <ProveedorTemaGraficos tooltipGraficos>
            <CodeplexGraficoLineas datos={VENTAS_PROYECCION_MENSUAL} color="primario" gradiente conTooltip conCuadricula alto={200} />
          </ProveedorTemaGraficos>
        </div>
        <div className="mt-3 flex gap-4.5 text-auxiliar text-texto-suave">
          <span className="inline-flex items-center gap-1.5"><i className="h-0.75 w-3.5 flex-none rounded-sm bg-morado-categoria" /> {catalogoIndicadores.leyendas.ventas_reales}</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-0 w-3.5 flex-none border-t-2 border-dashed border-morado-categoria" /> {catalogoIndicadores.leyendas.proyeccion}</span>
        </div>
        </div>
      </article>

      <SeccionEstructuraCostos COSTOS={COSTOS} />
    </div>
  )
}
