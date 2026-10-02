import { Boton, Icono, EstructuraApp, Selector, Insignia, usarCarrusel } from '../../componentes/compartido'
import type { ReactNode } from 'react'
import catalogoEstadisticas from '../../catalogos/capacidades/redsocial/estadisticas.json'
import type { PuntoCategoria } from '@codeplex-sac/graficos'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { EstadoRatio } from '@/tipos/estadisticas/modelo_estadisticas_todos_modulos'
import { KPIS, COMPOSICION_INGRESOS, GASTOS_CATEGORIA, TOP_CLIENTES, ESTADO_RESULTADOS, RATIOS_FINANCIEROS, PROYECCION_VENTAS, RENTABILIDAD_PROYECTO, COMPARATIVO_KPI, ESCALA_TOP_CLIENTES, VENTAS_MENSUALES, FLUJO_CAJA_MENSUAL, CLASES_ICONO_KPI, CLASES_ESTADO_EST, ETIQUETA_ESTADO, TH, TD } from '../../rutas/estadisticas/rutas_estadisticas'
import { BloqueEstadisticasTodosModulos1, SeccionEvolucionVentas2, SeccionGastosCategoria, SeccionProyeccionVentas } from '../../componentes/estadisticas'

const PROYECCION_VENTAS_DATOS: PuntoCategoria[] = PROYECCION_VENTAS.map((b) => ({
  clave: b.mes,
  valor: b.claseAlto,
  color: b.tipo === 'real' ? 'primario' : 'secundario',
}))

const MODULOS_TABS: { etiqueta: string; icono: IconName }[] = catalogoEstadisticas.modulos_tabs as { etiqueta: string; icono: IconName }[]

function EstadoBadge({ estado, children }: { estado: EstadoRatio; children: string }) {
  return (
    <Insignia variant="status" className={CLASES_ESTADO_EST[estado]}>
      {children}
    </Insignia>
  )
}

function TablaEst({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className={'w-full border-collapse text-cuerpo tabla-ultima-fila-sin-borde ' + className}>
        {children}
      </table>
    </div>
  )
}

export function PaginaEstadisticasTodosModulos() {
  const modulos = usarCarrusel()

  return (
    <EstructuraApp paginaActiva="estadisticas">
      <div className="mx-auto max-w-420">
        <div className="mb-5 flex items-start justify-between gap-5 max-900:flex-col max-900:items-stretch">
          <div>
            <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">{catalogoEstadisticas.titulos.todos_modulos}</h1>
            <p className="m-1 mt-1 mb-0 text-subtitulo text-texto-suave">{catalogoEstadisticas.subtitulos.todos_modulos}</p>
          </div>
          <div className="flex flex-wrap items-end gap-3.5 max-480:flex-col max-480:items-stretch">
            <Selector variant="default" label={catalogoEstadisticas.selectores.periodo.etiqueta}>
              {catalogoEstadisticas.selectores.periodo.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <Selector variant="default" label={catalogoEstadisticas.selectores.comparar_con.etiqueta}>
              {catalogoEstadisticas.selectores.comparar_con.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <Boton type="button" variant="contorno" size="md" className="flex-none max-900:w-full max-900:justify-center">
              <Icono name="filtro" className="h-3.75 w-3.75" /> {catalogoEstadisticas.botones.filtros_avanzados}
            </Boton>
          </div>
        </div>

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

        <BloqueEstadisticasTodosModulos1
          KPIS={KPIS}
          CLASES_ICONO_KPI={CLASES_ICONO_KPI}
          COMPARATIVO_KPI={COMPARATIVO_KPI}
        />

        <SeccionEvolucionVentas2
          VENTAS_MENSUALES={VENTAS_MENSUALES}
          COMPOSICION_INGRESOS={COMPOSICION_INGRESOS}
          TOP_CLIENTES={TOP_CLIENTES}
          ESCALA_TOP_CLIENTES={ESCALA_TOP_CLIENTES}
        />

        <SeccionGastosCategoria
          GASTOS_CATEGORIA={GASTOS_CATEGORIA}
          TablaEst={TablaEst}
          TH={TH}
          ESTADO_RESULTADOS={ESTADO_RESULTADOS}
          TD={TD}
          RATIOS_FINANCIEROS={RATIOS_FINANCIEROS}
          EstadoBadge={EstadoBadge}
          ETIQUETA_ESTADO={ETIQUETA_ESTADO}
        />

        <SeccionProyeccionVentas
          PROYECCION_VENTAS_DATOS={PROYECCION_VENTAS_DATOS}
          FLUJO_CAJA_MENSUAL={FLUJO_CAJA_MENSUAL}
          TablaEst={TablaEst}
          TH={TH}
          RENTABILIDAD_PROYECTO={RENTABILIDAD_PROYECTO}
          TD={TD}
          EstadoBadge={EstadoBadge}
          ETIQUETA_ESTADO={ETIQUETA_ESTADO}
        />
      </div>
    </EstructuraApp>
  )
}
