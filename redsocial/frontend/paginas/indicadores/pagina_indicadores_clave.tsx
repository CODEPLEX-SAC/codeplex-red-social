import { Boton, Icono, EstructuraApp, Insignia, usarCarrusel } from '../../componentes/compartido'
import catalogoIndicadores from '../../catalogos/capacidades/redsocial/indicadores.json'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { EstadoInd, FilaTabla } from '@/tipos/indicadores/modelo_indicadores_clave'
import { KPIS, RENTABILIDAD, LIQUIDEZ, GESTION, UTILIDAD_NETA_COMBO, VENTAS_PROYECCION_MENSUAL, COSTOS, MODULOS_IND, COMPARATIVO_KPI, CLASES_ICONO_KPI, CLASES_ESTADO_IND, ETIQUETA_ESTADO_IND, CLASES_ICONO_MODULO, TH, TD } from '../../rutas/indicadores/rutas_indicadores'
import { SeccionClave, BloqueIndicadoresClave1, SeccionEvolucionUtilidadNeta, BloqueIndicadoresClave2 } from '../../componentes/indicadores'

const MODULOS_TABS: { etiqueta: string; icono: IconName }[] = catalogoIndicadores.modulos_tabs as { etiqueta: string; icono: IconName }[]

function EstadoIndBadge({ estado }: { estado: EstadoInd }) {
  return <Insignia variant="status" className={CLASES_ESTADO_IND[estado]}>{ETIQUETA_ESTADO_IND[estado]}</Insignia>
}

function TablaIndicador({ filas }: { filas: FilaTabla[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-cuerpo tabla-ultima-fila-sin-borde">
        <thead>
          <tr>
            <th className={TH}>{catalogoIndicadores.tabla.indicador}</th>
            <th className={TH}>{catalogoIndicadores.tabla.valor}</th>
            <th className={TH}>{catalogoIndicadores.tabla.estado}</th>
            <th className={TH}>{catalogoIndicadores.tabla.variacion}</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.indicador}>
              <td className={TD}>{f.indicador}</td>
              <td className={TD}>{f.valor}</td>
              <td className={TD}><EstadoIndBadge estado={f.estado} /></td>
              <td className={TD + ' font-semibold ' + (f.tipo === 'positiva' ? 'text-positivo-kpi' : 'text-negativo-kpi')}>{f.variacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PaginaIndicadoresClave() {
  const modulos = usarCarrusel()

  return (
    <EstructuraApp paginaActiva="indicadores">
      <div className="mx-auto max-w-420">
        <SeccionClave />

        <div
          ref={modulos.pistaRef}
          className="mb-5 flex gap-2 overflow-x-auto scrollbar-oculto"
        >
          {MODULOS_TABS.map((m, i) => (
            <Boton key={m.etiqueta} type="button" variant="filtro" size="md" activo={i === 0}>
              <Icono name={m.icono} className="h-3.75 w-3.75" /> {m.etiqueta}
            </Boton>
          ))}
        </div>

        <BloqueIndicadoresClave1
          KPIS={KPIS}
          CLASES_ICONO_KPI={CLASES_ICONO_KPI}
          COMPARATIVO_KPI={COMPARATIVO_KPI}
        />

        <div className="mb-5 grid grid-cols-3 gap-4 max-1250:grid-cols-2 max-900:grid-cols-1">
          <article className="relative min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5">
            <div className="mb-3.5 flex items-center justify-between border-b border-t-f0eef5 pb-3.5">
              <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoIndicadores.secciones.rentabilidad}</h2>
              <a href="#" className="whitespace-nowrap text-enlace-accion font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_todos}</a>
            </div>
            <TablaIndicador filas={RENTABILIDAD} />
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5">
            <div className="mb-3.5 flex items-center justify-between border-b border-t-f0eef5 pb-3.5">
              <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoIndicadores.secciones.liquidez}</h2>
              <a href="#" className="whitespace-nowrap text-enlace-accion font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_todos}</a>
            </div>
            <TablaIndicador filas={LIQUIDEZ} />
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white py-4.5 px-5 max-1250:col-span-2 max-900:col-span-1">
            <div className="mb-3.5 flex items-center justify-between border-b border-t-f0eef5 pb-3.5">
              <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoIndicadores.secciones.gestion}</h2>
              <a href="#" className="whitespace-nowrap text-enlace-accion font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_todos}</a>
            </div>
            <TablaIndicador filas={GESTION} />
          </article>
        </div>

        <SeccionEvolucionUtilidadNeta
          UTILIDAD_NETA_COMBO={UTILIDAD_NETA_COMBO}
          VENTAS_PROYECCION_MENSUAL={VENTAS_PROYECCION_MENSUAL}
          COSTOS={COSTOS}
        />

        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoIndicadores.secciones.indicadores_por_modulo}</h2>
          <a href="#" className="text-enlace-accion font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_todos_los_indicadores}</a>
        </div>
        <BloqueIndicadoresClave2
          MODULOS_IND={MODULOS_IND}
          CLASES_ICONO_MODULO={CLASES_ICONO_MODULO}
          EstadoIndBadge={EstadoIndBadge}
        />
      </div>
    </EstructuraApp>
  )
}
