import catalogoEstadisticas from '../../../catalogos/capacidades/redsocial/estadisticas.json'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { CodeplexGraficoBarras, CodeplexGraficoLineas } from '@codeplex-sac/graficos'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PuntoCategoria } from '@codeplex-sac/graficos'
import type { EstadoRatio } from '@/tipos/estadisticas/modelo_estadisticas_todos_modulos'

const TABLA_RENTABILIDAD = catalogoEstadisticas.tabla_rentabilidad

export function SeccionProyeccionVentas({
  PROYECCION_VENTAS_DATOS,
  FLUJO_CAJA_MENSUAL,
  TablaEst,
  TH,
  RENTABILIDAD_PROYECTO,
  TD,
  EstadoBadge,
  ETIQUETA_ESTADO,
}: {
  PROYECCION_VENTAS_DATOS: PuntoCategoria[]
  FLUJO_CAJA_MENSUAL: { etiqueta: string; valor: number; }[]
  TablaEst: ({ children, className }: { children: React.ReactNode; className?: string | undefined; }) => React.JSX.Element
  TH: string
  RENTABILIDAD_PROYECTO: { nombre: string; margen: string; estado: EstadoRatio; }[]
  TD: string
  EstadoBadge: ({ estado, children }: { estado: EstadoRatio; children: string; }) => React.JSX.Element
  ETIQUETA_ESTADO: Record<EstadoRatio, string>
}) {
  return (
    <div className="mb-4 grid grid-cols-1.6fr-1fr-1fr gap-4 max-1250:grid-cols-2 max-900:grid-cols-1">
      <article className="min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5">
        <div className="mb-3.5 border-b border-t-f0eef5 pb-3.5">
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.proyeccion_ventas}</h2>
        </div>
        <div className="pt-2.5">
          <ProveedorTemaGraficos>
            <CodeplexGraficoBarras datos={PROYECCION_VENTAS_DATOS} conTooltip mostrarValores alto={160} />
          </ProveedorTemaGraficos>
        </div>
        <div className="mt-3 flex gap-4.5 text-auxiliar text-texto-suave">
          <span className="inline-flex items-center gap-1.5"><i className="h-0.75 w-3.5 flex-none rounded-sm bg-morado-categoria" /> {catalogoEstadisticas.leyendas.ventas_reales}</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 flex-none rounded-full bg-t-e4defb" /> {catalogoEstadisticas.leyendas.proyeccion}</span>
        </div>
      </article>

      <article className="min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5">
        <div className="mb-3.5 border-b border-t-f0eef5 pb-3.5">
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.flujo_caja}</h2>
        </div>
        <div className="relative">
          <ProveedorTemaGraficos>
            <CodeplexGraficoLineas datos={FLUJO_CAJA_MENSUAL} color="exito" gradiente conTooltip conCuadricula alto={170} />
          </ProveedorTemaGraficos>
        </div>
      </article>

      <article className="min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5">
        <div className="mb-3.5 flex items-center justify-between border-b border-t-f0eef5 pb-3.5">
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoEstadisticas.secciones.rentabilidad_proyecto}</h2>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
        </div>
        <TablaEst>
          <thead>
            <tr>
              {TABLA_RENTABILIDAD.map((h) => <th key={h} className={TH}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {RENTABILIDAD_PROYECTO.map((p) => (
              <tr key={p.nombre}>
                <td className={TD}>{p.nombre}</td>
                <td className={TD}>{p.margen}</td>
                <td className={TD}><EstadoBadge estado={p.estado}>{ETIQUETA_ESTADO[p.estado]}</EstadoBadge></td>
              </tr>
            ))}
          </tbody>
        </TablaEst>
      </article>
    </div>
  )
}
