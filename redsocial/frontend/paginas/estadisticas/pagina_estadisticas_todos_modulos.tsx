import type { ReactNode } from 'react'
import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoEstadisticas from '../../catalogos/capacidades/redsocial/estadisticas.json'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import { Insignia } from '../../componentes/compartido/interfaz/insignia'
import { SuperficieColor } from '../../componentes/compartido/interfaz/superficie_color'
import { MedidaDinamica } from '../../componentes/compartido/interfaz/medida_dinamica'
import { useCarrusel } from '../../componentes/compartido/usar_carrusel'
import type { IconName } from '../../tipos/compartido/icono'
import mensajesGlobales from '../../mensajes/globales/textos.json'
import type { Kpi, EstadoRatio } from '@/tipos/estadisticas/pagina_estadisticas_todos_modulos'
import {
  KPIS,
  COMPOSICION_INGRESOS,
  GASTOS_CATEGORIA,
  TOP_CLIENTES,
  ESTADO_RESULTADOS,
  RATIOS_FINANCIEROS,
  PROYECCION_VENTAS,
  RENTABILIDAD_PROYECTO,
  COMPARATIVO_KPI,
  TOOLTIP_VENTAS,
  ESCALA_TOP_CLIENTES,
  TOOLTIP_FLUJO_CAJA_TODOS_MODULOS,
} from '../../datos/estadisticas/todos_modulos'

const CLASES_ICONO_KPI: Record<Kpi['color'], string> = {
  azul: 'bg-[#dbeafe] text-azul-categoria',
  rojo: 'bg-[#fee2e2] text-[#ef4444]',
  verde: 'bg-[#dcfce7] text-verde-categoria',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  cian: 'bg-[#cffafe] text-[#06b6d4]',
}

const MODULOS_TABS: { etiqueta: string; icono: IconName }[] = catalogoEstadisticas.modulos_tabs as { etiqueta: string; icono: IconName }[]
const TABLA_ESTADO_RESULTADOS = catalogoEstadisticas.tabla_estado_resultados
const TABLA_RATIOS = catalogoEstadisticas.tabla_ratios
const TABLA_RENTABILIDAD = catalogoEstadisticas.tabla_rentabilidad

const CLASES_ESTADO_EST: Record<EstadoRatio, { color: string; background: string }> = {
  optimo: { color: '#16a34a', background: '#dcfce7' },
  aceptable: { color: '#a16207', background: '#fef9c3' },
  bajo: { color: '#b45309', background: '#fef3c7' },
  riesgo: { color: '#dc2626', background: '#fee2e2' },
}

const MESES_EJE_X_VENTAS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const MESES_EJE_X_FLUJO = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov']

function EstadoBadge({ estado, children }: { estado: EstadoRatio; children: string }) {
  const c = CLASES_ESTADO_EST[estado]
  return (
    <Insignia variant="status" color={c.color} background={c.background}>
      {children}
    </Insignia>
  )
}

const ETIQUETA_ESTADO: Record<EstadoRatio, string> = {
  optimo: 'Óptimo',
  aceptable: 'Aceptable',
  bajo: 'Bajo',
  riesgo: 'En riesgo',
}

function TablaEst({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className={'w-full border-collapse text-[11.5px] [&_tbody_tr:last-child_td]:border-b-0 ' + className}>
        {children}
      </table>
    </div>
  )
}

const TH = 'whitespace-nowrap border-b border-[#f0eef5] py-0 pb-2 pr-1.5 pl-0 text-left text-[9.5px] font-semibold uppercase text-texto-suave'
const TD = 'whitespace-nowrap border-b border-[#f7f6fa] py-1.75 pr-1.5 pl-0 text-texto'

export function PaginaEstadisticasTodosModulos() {
  const modulos = useCarrusel()

  return (
    <EstructuraApp paginaActiva="estadisticas">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-5 flex items-start justify-between gap-5 max-[900px]:flex-col max-[900px]:items-stretch">
          <div>
            <h1 className="m-0 text-[22px] font-extrabold text-texto">{catalogoEstadisticas.titulos.todos_modulos}</h1>
            <p className="m-1 mt-1 mb-0 text-[13px] text-texto-suave">{catalogoEstadisticas.subtitulos.todos_modulos}</p>
          </div>
          <div className="flex flex-wrap items-end gap-3.5 max-[480px]:flex-col max-[480px]:items-stretch">
            <Selector variant="default" label={catalogoEstadisticas.selectores.periodo.etiqueta}>
              {catalogoEstadisticas.selectores.periodo.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <Selector variant="default" label={catalogoEstadisticas.selectores.comparar_con.etiqueta}>
              {catalogoEstadisticas.selectores.comparar_con.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <button
              type="button"
              className="inline-flex h-[38px] flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-primario bg-white px-4 text-[13px] font-semibold text-primario hover:bg-[#f5f3ff] max-[900px]:w-full max-[900px]:justify-center"
            >
              <Icono name="filtro" className="h-[15px] w-[15px]" /> {catalogoEstadisticas.botones.filtros_avanzados}
            </button>
          </div>
        </div>

        <div
          ref={modulos.pistaRef}
          className="mb-5 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {MODULOS_TABS.map((m, i) => (
            <button
              key={m.etiqueta}
              type="button"
              className={
                'inline-flex h-[38px] flex-none items-center gap-[7px] whitespace-nowrap rounded-lg border px-4 text-[13px] font-semibold transition-colors ' +
                (i === 0
                  ? 'border-primario bg-primario text-white'
                  : 'border-borde bg-white text-texto-suave hover:border-primario hover:text-primario')
              }
            >
              <Icono name={m.icono} className="h-[15px] w-[15px]" /> {m.etiqueta}
            </button>
          ))}
        </div>

        <div className="mb-5 grid grid-cols-5 gap-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {KPIS.map((kpi) => (
            <article key={kpi.etiqueta} className="min-w-0 rounded-xl border border-borde bg-white p-4">
              <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-texto-suave">
                <span className={`grid h-[30px] w-[30px] flex-none place-items-center rounded-lg ${CLASES_ICONO_KPI[kpi.color]}`}>
                  <Icono name={kpi.icono} className="h-[15px] w-[15px]" />
                </span>
                <span>{kpi.etiqueta}</span>
              </div>
              <strong className="mb-2 block text-xl font-extrabold text-texto">{kpi.valor}</strong>
              <div className="flex items-center justify-between gap-2.5">
                <small
                  className={
                    'inline-flex items-center gap-[3px] whitespace-nowrap text-[11px] font-bold ' +
                    (kpi.variacion.direccion === 'positiva' ? 'text-positivo-kpi' : 'text-negativo-kpi')
                  }
                >
                  <Icono name={kpi.variacion.direccion === 'positiva' ? 'flecha-arriba' : 'flecha-abajo'} className="h-[11px] w-[11px]" />
                  {kpi.variacion.texto} <em className="ml-0.5 font-medium not-italic text-texto-suave">{COMPARATIVO_KPI}</em>
                </small>
                <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-[22px] w-[60px] flex-none">
                  <polyline points={kpi.sparklinePuntos} fill="none" stroke={kpi.sparklineColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </article>
          ))}
        </div>

        <div className="mb-4 grid grid-cols-[1.6fr_1fr_1fr] gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px] max-[1250px]:col-span-2 max-[900px]:col-span-1">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoEstadisticas.secciones.evolucion_ventas}</h2>
              <span className="relative inline-flex">
                <select aria-label={catalogoEstadisticas.selectores.frecuencia_grafico.etiqueta} defaultValue={catalogoEstadisticas.selectores.frecuencia_grafico.opciones[0]} className="h-[30px] appearance-none rounded-md border border-borde bg-white pl-2.5 pr-[26px] text-xs font-semibold text-texto">
                  {catalogoEstadisticas.selectores.frecuencia_grafico.opciones.map((o) => <option key={o}>{o}</option>)}
                </select>
                <Icono name="flecha-abajo" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-texto-suave" />
              </span>
            </div>
            <div className="relative">
              <svg viewBox="0 0 760 220" preserveAspectRatio="none" className="block h-[200px] w-full overflow-visible">
                <line x1="0" y1="0" x2="760" y2="0" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="55" x2="760" y2="55" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="110" x2="760" y2="110" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="165" x2="760" y2="165" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="219" x2="760" y2="219" stroke="#f0eef5" strokeWidth="1" />
                <path d="M0,219 L0,150 L63,140 L127,125 L190,130 L253,95 L317,60 L380,75 L443,40 L507,55 L570,30 L570,219 Z" fill="rgba(59,130,246,0.08)" />
                <polyline points="0,150 63,140 127,125 190,130 253,95 317,60 380,75 443,40 507,55 570,30" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="570,30 633,20 696,32 760,10" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
                <circle cx="380" cy="75" r="5" fill="#fff" stroke="#3b82f6" strokeWidth="3" />
              </svg>
              <div className="absolute left-[44%] top-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white p-2.5 px-3 text-[11px] leading-relaxed shadow-sombra">
                <strong className="mb-0.5 block text-[11px] text-texto">{TOOLTIP_VENTAS.mes}</strong>
                <span className="block text-texto-suave">{TOOLTIP_VENTAS.ventas}</span>
                <span className="block text-texto-suave">{TOOLTIP_VENTAS.proyeccion}</span>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {MESES_EJE_X_VENTAS.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5"><i className="h-[3px] w-3.5 flex-none rounded-sm bg-[#3b82f6]" /> {catalogoEstadisticas.leyendas.ventas_reales}</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-0 w-3.5 flex-none border-t-2 border-dashed border-[#3b82f6]" /> {catalogoEstadisticas.leyendas.proyeccion}</span>
            </div>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoEstadisticas.secciones.composicion_ingresos}</h2>
            </div>
            <SuperficieColor color={COMPOSICION_INGRESOS.conic} className="relative mx-auto mb-4 grid h-[140px] w-[140px] place-items-center rounded-full">
              <div className="absolute inset-[22px] rounded-full bg-white" />
              <span className="relative z-10 flex flex-col items-center text-center">
                <strong className="text-[13px] font-extrabold text-texto">{COMPOSICION_INGRESOS.total}</strong>
                <span className="text-[10px] text-texto-suave">{catalogoEstadisticas.leyendas.total}</span>
              </span>
            </SuperficieColor>
            <ul className="m-0 grid list-none gap-2 p-0">
              {COMPOSICION_INGRESOS.items.map((it) => (
                <li key={it.etiqueta} className="flex items-center gap-2 text-xs text-texto">
                  <SuperficieColor as="i" color={it.color} className="h-2.5 w-2.5 flex-none rounded-full" />
                  {it.etiqueta} <b className="ml-auto font-bold">{it.pct}</b> <small className="min-w-[68px] text-right text-texto-suave">{it.valor}</small>
                </li>
              ))}
            </ul>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <div>
                <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoEstadisticas.secciones.top_clientes}</h2>
                <p className="m-0 text-xs text-texto-suave">{catalogoEstadisticas.secciones.top_clientes_sub}</p>
              </div>
              <a href="#" className="text-xs font-semibold text-primario no-underline">{mensajesGlobales.VER_TODOS}</a>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0">
              {TOP_CLIENTES.map((c) => (
                <li key={c.nombre} className="grid grid-cols-[120px_1fr_62px] items-center gap-2.5">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-texto">{c.nombre}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f0eef5]">
                    <MedidaDinamica as="span" ancho={c.ancho} className="block h-full rounded-full bg-primario" />
                  </div>
                  <span className="whitespace-nowrap text-right text-[11px] font-bold text-texto">{c.valor}</span>
                </li>
              ))}
            </ul>
            <div className="mt-1.5 grid grid-cols-[120px_1fr_62px]">
              <span />
              <div className="flex justify-between text-[10px] text-texto-suave">
                {ESCALA_TOP_CLIENTES.map((v) => <span key={v}>{v}</span>)}
              </div>
              <span />
            </div>
          </article>
        </div>

        <div className="mb-4 grid grid-cols-[1.6fr_1fr_1fr] gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoEstadisticas.secciones.gastos_categoria}</h2>
            </div>
            <SuperficieColor color={GASTOS_CATEGORIA.conic} className="relative mx-auto mb-4 grid h-[140px] w-[140px] place-items-center rounded-full">
              <div className="absolute inset-[22px] rounded-full bg-white" />
              <span className="relative z-10 flex flex-col items-center text-center">
                <strong className="text-[13px] font-extrabold text-texto">{GASTOS_CATEGORIA.total}</strong>
                <span className="text-[10px] text-texto-suave">{catalogoEstadisticas.leyendas.total}</span>
              </span>
            </SuperficieColor>
            <ul className="m-0 grid list-none gap-2 p-0">
              {GASTOS_CATEGORIA.items.map((it) => (
                <li key={it.etiqueta} className="flex items-center gap-2 text-xs text-texto">
                  <SuperficieColor as="i" color={it.color} className="h-2.5 w-2.5 flex-none rounded-full" />
                  {it.etiqueta} <b className="ml-auto font-bold">{it.pct}</b> <small className="min-w-[68px] text-right text-texto-suave">{it.valor}</small>
                </li>
              ))}
            </ul>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoEstadisticas.secciones.estado_resultados}</h2>
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

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoEstadisticas.secciones.ratios_financieros}</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">{mensajesGlobales.VER_TODOS}</a>
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

        <div className="mb-4 grid grid-cols-[1.6fr_1fr_1fr] gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoEstadisticas.secciones.proyeccion_ventas}</h2>
            </div>
            <div className="flex h-[180px] items-end gap-2 pt-2.5">
              {PROYECCION_VENTAS.map((b) => (
                <div key={b.mes} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                  <MedidaDinamica
                    as="span"
                    alto={`${b.valor}%`}
                    className={'w-full max-w-[26px] rounded-t ' + (b.tipo === 'real' ? 'bg-morado-categoria' : 'bg-[#e4defb]')}
                  />
                  <small className="text-[10px] text-texto-suave">{b.mes}</small>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5"><i className="h-[3px] w-3.5 flex-none rounded-sm bg-morado-categoria" /> {catalogoEstadisticas.leyendas.ventas_reales}</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 flex-none rounded-full bg-[#e4defb]" /> {catalogoEstadisticas.leyendas.proyeccion}</span>
            </div>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoEstadisticas.secciones.flujo_caja}</h2>
            </div>
            <div className="relative">
              <svg viewBox="0 0 340 170" preserveAspectRatio="none" className="block h-[170px] w-full overflow-visible">
                <line x1="0" y1="0" x2="340" y2="0" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="42" x2="340" y2="42" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="85" x2="340" y2="85" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="127" x2="340" y2="127" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="169" x2="340" y2="169" stroke="#f0eef5" strokeWidth="1" />
                <path d="M0,110 L34,90 L68,100 L102,70 L136,80 L170,55 L204,60 L238,40 L272,48 L306,30 L340,35 L340,169 L0,169 Z" fill="rgba(34,197,94,0.08)" />
                <polyline points="0,110 34,90 68,100 102,70 136,80 170,55 204,60 238,40 272,48 306,30 340,35" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="204" cy="60" r="5" fill="#fff" stroke="#22c55e" strokeWidth="3" />
              </svg>
              <div className="absolute left-[58%] top-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white p-2.5 px-3 text-[11px] leading-relaxed shadow-sombra">
                <strong className="mb-0.5 block text-[11px] text-texto">{TOOLTIP_FLUJO_CAJA_TODOS_MODULOS.mes}</strong>
                <span className="block text-texto-suave">{TOOLTIP_FLUJO_CAJA_TODOS_MODULOS.texto}</span>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {MESES_EJE_X_FLUJO.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoEstadisticas.secciones.rentabilidad_proyecto}</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">{mensajesGlobales.VER_TODOS}</a>
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
      </div>
    </EstructuraApp>
  )
}
