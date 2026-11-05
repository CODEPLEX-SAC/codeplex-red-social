import catalogoEstadisticas from '../../../catalogos/capacidades/redsocial/estadisticas.json'
import { ProveedorTemaGraficos } from '../../compartido/proveedor_tema_graficos'
import { CodeplexGraficoBarras, CodeplexGraficoLineas } from '@codeplex-sac/graficos'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { PuntoCategoria } from '@codeplex-sac/graficos'
import type { EstadoRatio } from '@/tipos/estadisticas/modelo_estadisticas_todos_modulos'
import { CLASE_ENLACE_ACCION } from '../../compartido/clases_enlace'
import { CLASES_TARJETA, CLASES_CUERPO_TARJETA } from '../../compartido/clases_tarjeta'

const TABLA_RENTABILIDAD = catalogoEstadisticas.tabla_rentabilidad

export function SeccionProyeccionVentas({
  PROYECCION_VENTAS_DATOS,
  FLUJO_CAJA_MENSUAL,
  TablaEst,
  TH,
  RENTABILIDAD_PROYECTO,
  TD,
  TD_NOMBRE,
  EstadoBadge,
  ETIQUETA_ESTADO,
}: {
  PROYECCION_VENTAS_DATOS: PuntoCategoria[]
  FLUJO_CAJA_MENSUAL: { etiqueta: string; valor: number; }[]
  TablaEst: ({ children, className }: { children: React.ReactNode; className?: string | undefined; }) => React.JSX.Element
  TH: string
  RENTABILIDAD_PROYECTO: { nombre: string; margen: string; estado: EstadoRatio; }[]
  TD: string
  TD_NOMBRE: string
  EstadoBadge: ({ estado, children }: { estado: EstadoRatio; children: string; }) => React.JSX.Element
  ETIQUETA_ESTADO: Record<EstadoRatio, string>
}) {
  return (
    <div className="mb-4 grid grid-cols-3 gap-4 max-1400:grid-cols-2 max-1000:grid-cols-1">
      <article className={CLASES_TARJETA.panel}>
        <div className="mb-3.5 border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEstadisticas.secciones.proyeccion_ventas}</h2>
        </div>
        <div className={CLASES_CUERPO_TARJETA.cuerpo_centrado}>
        <div className="pt-2.5">
          <ProveedorTemaGraficos tooltipGraficos>
            <CodeplexGraficoBarras datos={PROYECCION_VENTAS_DATOS} conTooltip mostrarValores alto={264} />
          </ProveedorTemaGraficos>
        </div>
        <div className="mt-3 flex gap-4.5 text-auxiliar text-texto-suave">
          <span className="inline-flex items-center gap-1.5"><i className="h-0.75 w-3.5 flex-none rounded-sm bg-morado-categoria" /> {catalogoEstadisticas.leyendas.ventas_reales}</span>
          <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 flex-none rounded-full bg-t-e4defb" /> {catalogoEstadisticas.leyendas.proyeccion}</span>
        </div>
        </div>
      </article>

      <article className={CLASES_TARJETA.panel}>
        <div className="mb-3.5 border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEstadisticas.secciones.flujo_caja}</h2>
        </div>
        <div className={CLASES_CUERPO_TARJETA.cuerpo_centrado}>
        <div className="relative">
          <ProveedorTemaGraficos tooltipGraficos>
            <CodeplexGraficoLineas datos={FLUJO_CAJA_MENSUAL} color="exito" gradiente conTooltip conCuadricula alto={170} />
          </ProveedorTemaGraficos>
        </div>
        </div>
      </article>

      <article className={CLASES_TARJETA.panel}>
        <div className="mb-3.5 flex items-center justify-between border-b border-borde-suave pb-3.5">
          <h2 className="m-0 text-titulo-banner text-texto">{catalogoEstadisticas.secciones.rentabilidad_proyecto}</h2>
          <a href="#" className={CLASE_ENLACE_ACCION}>{textosRedSocial.VER_TODOS}</a>
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
                <td className={TD_NOMBRE}>{p.nombre}</td>
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
