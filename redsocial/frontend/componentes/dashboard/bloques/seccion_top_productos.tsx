import catalogoDashboard from '../../../catalogos/capacidades/redsocial/dashboard.json'
import { MedidaDinamica } from '../../compartido/interfaz/medida_dinamica'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { CodeplexGraficoBarras, CodeplexGraficoLineas } from '@codeplex-sac/graficos'
import type { PuntoCategoria } from '@codeplex-sac/graficos'

export function SeccionTopProductos({
  RANKING,
  BARRAS_PROYECCION_DATOS,
  FLUJO_CAJA_MENSUAL,
}: {
  RANKING: { nombre: string; ancho: string; cantidad: string; valor: string; }[]
  BARRAS_PROYECCION_DATOS: PuntoCategoria[]
  FLUJO_CAJA_MENSUAL: { etiqueta: string; valor: number; }[]
}) {
  return (
    <div className="mb-5 grid grid-cols-3 items-stretch gap-4 max-1400:grid-cols-2 max-900:grid-cols-1">
      <article className="min-w-0 rounded-control border border-gris-borde bg-white py-4.5 px-5 shadow-sombra">
        <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoDashboard.secciones.top_productos}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline">{catalogoDashboard.botones.ver_reporte}</a>
        </div>
        <div className="@container">
          <ul className="m-0 grid list-none grid-cols-minmax0-140-minmax0-1fr-auto-auto items-center gap-x-2.5 gap-y-3 p-0 @max-md:grid-cols-minmax0-1fr-auto-auto">
            {RANKING.map((p) => (
              <li key={p.nombre} className="col-span-full grid grid-cols-subgrid items-center gap-y-1.5">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-nombre-entidad text-texto">{p.nombre}</span>
                <div className="h-2 overflow-hidden rounded bg-borde-suave @max-md:order-last @max-md:col-span-full">
                  <MedidaDinamica as="span" ancho={p.ancho} className="block h-full rounded bg-primario" />
                </div>
                <span className="text-right text-contador text-texto-suave">{p.cantidad}</span>
                <span className="whitespace-nowrap text-right text-valor-destacado text-texto">{p.valor}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <article className="min-w-0 rounded-control border border-gris-borde bg-white py-4.5 px-5 shadow-sombra">
        <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoDashboard.secciones.proyeccion_ventas}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline">{catalogoDashboard.botones.ver_detalle}</a>
        </div>
        <div className="relative">
          <ProveedorTemaGraficos>
            <CodeplexGraficoBarras datos={BARRAS_PROYECCION_DATOS} conTooltip mostrarValores alto={170} />
          </ProveedorTemaGraficos>
        </div>
        <div className="mt-3 flex gap-4.5 text-auxiliar text-texto-suave">
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-0.75 w-3.5 rounded-sm bg-morado-categoria not-italic" /> {catalogoDashboard.leyendas.ventas_reales}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block h-2.5 w-2.5 rounded-full bg-t-e4defb not-italic" /> {catalogoDashboard.leyendas.proyeccion}
          </span>
        </div>
      </article>

      <article className="min-w-0 rounded-control border border-gris-borde bg-white py-4.5 px-5 shadow-sombra">
        <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoDashboard.secciones.flujo_caja}</h2>
          <a href="#" className="text-enlace-accion text-primario no-underline">{catalogoDashboard.botones.ver_detalle}</a>
        </div>
        <div className="relative">
          <ProveedorTemaGraficos>
            <CodeplexGraficoLineas datos={FLUJO_CAJA_MENSUAL} color="exito" gradiente conTooltip conCuadricula alto={170} />
          </ProveedorTemaGraficos>
        </div>
      </article>
    </div>
  )
}
