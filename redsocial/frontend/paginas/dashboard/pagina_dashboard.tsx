import { Icono, EstructuraApp, Boton, Selector, Insignia } from '../../componentes/compartido'
import type { PuntoCategoria } from '@codeplex-sac/graficos'
import catalogoDashboard from '../../catalogos/capacidades/redsocial/dashboard.json'
import { SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { KPIS, RATIOS, MODULOS, RANKING, BARRAS_PROYECCION, DONA_SEGMENTOS, RESUMEN_DASHBOARD, VENTAS_MENSUALES, FLUJO_CAJA_MENSUAL, VENTAS_TOTAL_CHART, COLOR_GRAFICO_NOMBRE, CLASES_ICONO_KPI, CLASES_ESTADO_DASH, CLASES_ICONO_MODULO, ETIQUETA_RATIO } from '../../rutas/dashboard/rutas_dashboard'
import { BloqueDashboard1, SeccionEvolucionVentas, SeccionTopProductos } from '../../componentes/dashboard'

const BARRAS_PROYECCION_DATOS: PuntoCategoria[] = BARRAS_PROYECCION.map((b) => ({
  clave: b.mes,
  valor: b.claseAlto,
  color: COLOR_GRAFICO_NOMBRE[b.tipo === 'real' ? 'morado' : 'cian'],
}))

function EstadoBadge({ estado, children }: { estado: keyof typeof CLASES_ESTADO_DASH; children: string }) {
  return (
    <Insignia variant="status" className={CLASES_ESTADO_DASH[estado]}>
      {children}
    </Insignia>
  )
}

export function PaginaDashboard() {
  return (
    <EstructuraApp paginaActiva="dashboard">
      <div className="mx-auto max-w-420">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-5 max-900:flex-col max-900:items-stretch">
          <div>
            <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">
              ¡Buenos días, {SESION_ACTUAL.usuario.split(' ')[0]}! <span className="text-5">👋</span>
            </h1>
            <p className="m-0 mt-1 text-subtitulo text-texto-suave">Aquí tienes el resumen de tu empresa al {RESUMEN_DASHBOARD.fecha}.</p>
          </div>
          <div className="flex flex-wrap items-end gap-3.5 max-900:items-stretch max-900:justify-stretch">
            <Selector variant="default" label={catalogoDashboard.selectores.periodo_actual.etiqueta}>
              {catalogoDashboard.selectores.periodo_actual.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <Boton variant="primario" size="md" className="max-900:w-full max-900:justify-center">
              <Icono name="ajustes-sistema" className="w-4 h-4" /> {catalogoDashboard.botones.personalizar_dashboard}
            </Boton>
          </div>
        </div>

        <BloqueDashboard1
          KPIS={KPIS}
          CLASES_ICONO_KPI={CLASES_ICONO_KPI}
          RESUMEN_DASHBOARD={RESUMEN_DASHBOARD}
        />

        <SeccionEvolucionVentas
          VENTAS_MENSUALES={VENTAS_MENSUALES}
          DONA_SEGMENTOS={DONA_SEGMENTOS}
          COLOR_GRAFICO_NOMBRE={COLOR_GRAFICO_NOMBRE}
          VENTAS_TOTAL_CHART={VENTAS_TOTAL_CHART}
          RATIOS={RATIOS}
          EstadoBadge={EstadoBadge}
          ETIQUETA_RATIO={ETIQUETA_RATIO}
        />

        <div className="mb-3.5">
          <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoDashboard.secciones.resumen_por_modulo}</h2>
        </div>
        <div className="mb-5 grid grid-cols-5 gap-4 max-1250:grid-cols-3 max-900:grid-cols-2 max-480:grid-cols-1">
          {MODULOS.map((m) => (
            <article key={m.nombre} className="flex min-w-0 flex-col gap-2.5 rounded-xl border border-gris-borde bg-white p-4">
              <div className="flex items-center gap-2.5">
                <span className={`grid h-9 w-9 flex-none place-items-center rounded-control ${CLASES_ICONO_MODULO[m.color]}`}>
                  <Icono name={m.icono} className="w-4.25 h-4.25" />
                </span>
                <strong className="text-nombre-entidad font-bold text-texto">{m.nombre}</strong>
              </div>
              {m.filas.map((f) => (
                <div key={f.etiqueta} className="flex items-center justify-between text-auxiliar text-texto-suave">
                  <span>{f.etiqueta}</span>
                  {f.badge ? <EstadoBadge estado={f.badge.estado}>{f.badge.texto}</EstadoBadge> : <b className="font-bold text-texto">{f.valor}</b>}
                </div>
              ))}
              <a href="#" className="mt-0.5 text-enlace-accion font-semibold text-primario no-underline">{catalogoDashboard.botones.ver_detalles}</a>
            </article>
          ))}
        </div>

        <SeccionTopProductos
          RANKING={RANKING}
          BARRAS_PROYECCION_DATOS={BARRAS_PROYECCION_DATOS}
          FLUJO_CAJA_MENSUAL={FLUJO_CAJA_MENSUAL}
        />
      </div>
    </EstructuraApp>
  )
}
