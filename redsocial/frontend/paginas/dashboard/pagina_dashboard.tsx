import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { Boton } from '../../componentes/compartido/interfaz/boton'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import { Insignia } from '../../componentes/compartido/interfaz/insignia'
import { SuperficieColor } from '../../componentes/compartido/interfaz/superficie_color'
import { MedidaDinamica } from '../../componentes/compartido/interfaz/medida_dinamica'
import catalogoDashboard from '../../catalogos/capacidades/redsocial/dashboard.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { SESION_ACTUAL } from '../../datos/compartido/sesion_actual'
import type { Kpi, Modulo } from '@/tipos/dashboard/pagina_dashboard'
import {
  KPIS,
  RATIOS,
  MODULOS,
  RANKING,
  BARRAS_PROYECCION,
  DONA_SEGMENTOS,
  RESUMEN_DASHBOARD,
  MESES_EJE_X_VENTAS,
  MESES_EJE_X_FLUJO,
  VENTAS_TOTAL_CHART,
  TOOLTIP_PROYECCION_VENTAS,
  TOOLTIP_FLUJO_CAJA,
} from '../../datos/dashboard/dashboard'

const CLASES_ICONO_KPI: Record<Kpi['color'], string> = {
  azul: 'bg-[#dbeafe] text-azul-categoria',
  rojo: 'bg-[#fee2e2] text-[#ef4444]',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  cian: 'bg-[#cffafe] text-[#06b6d4]',
}

const CLASES_ESTADO_DASH = {
  optimo: 'bg-[#dcfce7] text-[#16a34a]',
  aceptable: 'bg-[#fef9c3] text-[#a16207]',
  bajo: 'bg-[#fef3c7] text-[#b45309]',
  riesgo: 'bg-[#fee2e2] text-[#dc2626]',
}

const CLASES_ICONO_MODULO: Record<Modulo['color'], string> = {
  verde: 'bg-[#dcfce7] text-verde-categoria',
  azul: 'bg-[#dbeafe] text-azul-categoria',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  cian: 'bg-[#cffafe] text-[#06b6d4]',
}

const ETIQUETA_RATIO: Record<keyof typeof CLASES_ESTADO_DASH, string> = {
  optimo: 'Óptimo',
  aceptable: 'Aceptable',
  bajo: 'Bajo',
  riesgo: 'Riesgo',
}

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
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-5 max-[900px]:flex-col max-[900px]:items-stretch">
          <div>
            <h1 className="m-0 text-[22px] font-extrabold text-texto">
              ¡Buenos días, {SESION_ACTUAL.usuario.split(' ')[0]}! <span className="text-[20px]">👋</span>
            </h1>
            <p className="m-0 mt-1 text-[13px] text-texto-suave">Aquí tienes el resumen de tu empresa al {RESUMEN_DASHBOARD.fecha}.</p>
          </div>
          <div className="flex flex-wrap items-end gap-3.5 max-[900px]:items-stretch max-[900px]:justify-stretch">
            <Selector variant="default" label={catalogoDashboard.selectores.periodo_actual.etiqueta}>
              {catalogoDashboard.selectores.periodo_actual.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <Boton variant="primario" size="md" className="max-[900px]:w-full max-[900px]:justify-center">
              <Icono name="ajustes-sistema" className="w-4 h-4" /> {catalogoDashboard.botones.personalizar_dashboard}
            </Boton>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-5 gap-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {KPIS.map((kpi) => (
            <article key={kpi.etiqueta} className="min-w-0 rounded-xl border border-gris-borde bg-white p-md">
              <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-texto-suave">
                <span className={`grid h-[30px] w-[30px] flex-none place-items-center rounded-lg ${CLASES_ICONO_KPI[kpi.color]}`}>
                  <Icono name={kpi.icono} className="w-[15px] h-[15px]" />
                </span>
                <span>{kpi.etiqueta}</span>
              </div>
              <strong className="mb-1.5 block text-xl font-extrabold text-texto">{kpi.valor}</strong>
              <div className="mb-2">
                <small
                  className={
                    'inline-flex items-center gap-[3px] text-[11px] font-bold ' +
                    (kpi.variacion.direccion === 'positiva' ? 'text-positivo-kpi' : 'text-negativo-kpi')
                  }
                >
                  <Icono name={kpi.variacion.direccion === 'positiva' ? 'flecha-arriba' : 'flecha-abajo'} className="w-[11px] h-[11px]" />
                  {kpi.variacion.texto} <em className="ml-0.5 font-medium not-italic text-texto-suave">{RESUMEN_DASHBOARD.comparativo}</em>
                </small>
              </div>
              <svg viewBox="0 0 100 26" preserveAspectRatio="none" className="block h-[30px] w-full">
                <polyline points={kpi.sparklinePuntos} fill="none" stroke={kpi.sparklineColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                {kpi.sparklinePuntos.split(' ').map((p) => {
                  const [cx, cy] = p.split(',')
                  return <circle key={p} cx={cx} cy={cy} r="2.2" fill={kpi.sparklineColor} />
                })}
              </svg>
            </article>
          ))}
        </div>

        <div className="mb-5 grid grid-cols-[1.6fr_1fr_1fr] items-stretch gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="relative min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra max-[1250px]:col-span-2 max-[900px]:col-span-1">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoDashboard.secciones.evolucion_ventas}</h2>
              <div className="flex items-center gap-2">
                <Selector variant="mini">
                  {catalogoDashboard.selectores.mensual_semanal.opciones.map((o) => <option key={o}>{o}</option>)}
                </Selector>
                <button type="button" className="h-7 w-7 rounded-md border-0 bg-transparent text-base text-texto-suave hover:bg-[#f5f3ff]">⋮</button>
              </div>
            </div>
            <div className="relative">
              <svg viewBox="0 0 760 220" preserveAspectRatio="none" className="block h-[200px] w-full overflow-visible">
                <line x1="0" y1="0" x2="760" y2="0" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="55" x2="760" y2="55" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="110" x2="760" y2="110" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="165" x2="760" y2="165" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="219" x2="760" y2="219" stroke="#f0eef5" strokeWidth="1" />
                <path d="M0,219 L0,150 L63,140 L127,125 L190,130 L253,95 L317,60 L380,75 L443,40 L507,55 L570,30 L570,219 Z" fill="rgba(124,58,237,0.08)" />
                <polyline points="0,150 63,140 127,125 190,130 253,95 317,60 380,75 443,40 507,55 570,30" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="570,30 633,20 696,32 760,10" fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
                {['0,150', '63,140', '127,125', '190,130', '253,95', '317,60', '443,40', '507,55', '570,30'].map((p) => {
                  const [cx, cy] = p.split(',')
                  return <circle key={p} cx={cx} cy={cy} r="4" fill="#fff" stroke="#7c3aed" strokeWidth="2.5" />
                })}
                <circle cx="380" cy="75" r="5.5" fill="#7c3aed" />
              </svg>
              <div className="absolute left-1/2 top-[30px] -translate-x-1/2 whitespace-nowrap rounded-lg bg-texto px-3 py-1.5 text-[11px] font-bold text-white">
                {VENTAS_TOTAL_CHART}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {MESES_EJE_X_VENTAS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-[3px] w-3.5 rounded-sm bg-[#7c3aed] not-italic" /> {catalogoDashboard.leyendas.ventas}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-0 w-3.5 border-t-2 border-dashed border-[#7c3aed] not-italic" /> {catalogoDashboard.leyendas.proyeccion}
              </span>
            </div>
          </article>

          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoDashboard.secciones.composicion_ingresos}</h2>
            </div>
            <div className="relative mx-auto mb-4 grid h-[130px] w-[130px] place-items-center rounded-full bg-[conic-gradient(#3b82f6_0%_45%,#7c3aed_45%_70%,#22c55e_70%_90%,#eab308_90%_100%)]">
              <div className="absolute inset-5 rounded-full bg-white" />
              <span className="relative z-[1] flex flex-col items-center text-center">
                <strong className="text-xs font-extrabold text-texto">{VENTAS_TOTAL_CHART}</strong>
                <span className="text-[10px] text-texto-suave">{catalogoDashboard.leyendas.total}</span>
              </span>
            </div>
            <ul className="m-0 grid list-none gap-2 p-0">
              {DONA_SEGMENTOS.map((s) => (
                <li key={s.etiqueta} className="flex items-center gap-2 text-xs text-texto">
                  <SuperficieColor as="i" variante={s.color} className="h-2.5 w-2.5 flex-none rounded-full not-italic" />
                  {s.etiqueta} <b className="ml-auto font-bold">{s.porcentaje}</b>
                  <small className="min-w-[68px] text-right text-texto-suave">{s.monto}</small>
                </li>
              ))}
            </ul>
          </article>

          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoDashboard.secciones.ratios_financieros}</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">{textosRedSocial.VER_TODOS}</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap py-0 pb-2 pr-2 text-left text-[9.5px] text-texto-suave">{catalogoDashboard.tabla.ratio}</th>
                    <th className="whitespace-nowrap py-0 pb-2 pr-2 text-left text-[9.5px] text-texto-suave">{catalogoDashboard.tabla.valor}</th>
                    <th className="whitespace-nowrap py-0 pb-2 pr-2 text-left text-[9.5px] text-texto-suave">{catalogoDashboard.tabla.estado}</th>
                  </tr>
                </thead>
                <tbody>
                  {RATIOS.map((r) => (
                    <tr key={r.nombre}>
                      <td className="py-[7px] pr-2 text-texto">{r.nombre}</td>
                      <td className="py-[7px] pr-2 text-texto">{r.valor}</td>
                      <td className="py-[7px] pr-2">
                        <EstadoBadge estado={r.estado}>{ETIQUETA_RATIO[r.estado]}</EstadoBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        <div className="mb-3.5">
          <h2 className="m-0 text-base font-bold text-texto">{catalogoDashboard.secciones.resumen_por_modulo}</h2>
        </div>
        <div className="mb-5 grid grid-cols-5 gap-4 max-[1250px]:grid-cols-3 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {MODULOS.map((m) => (
            <article key={m.nombre} className="flex min-w-0 flex-col gap-2.5 rounded-xl border border-gris-borde bg-white p-4">
              <div className="flex items-center gap-2.5">
                <span className={`grid h-9 w-9 flex-none place-items-center rounded-[10px] ${CLASES_ICONO_MODULO[m.color]}`}>
                  <Icono name={m.icono} className="w-[17px] h-[17px]" />
                </span>
                <strong className="text-[13px] font-bold text-texto">{m.nombre}</strong>
              </div>
              {m.filas.map((f) => (
                <div key={f.etiqueta} className="flex items-center justify-between text-xs text-texto-suave">
                  <span>{f.etiqueta}</span>
                  {f.badge ? <EstadoBadge estado={f.badge.estado}>{f.badge.texto}</EstadoBadge> : <b className="font-bold text-texto">{f.valor}</b>}
                </div>
              ))}
              <a href="#" className="mt-0.5 text-xs font-semibold text-primario no-underline">{catalogoDashboard.botones.ver_detalles}</a>
            </article>
          ))}
        </div>

        <div className="mb-5 grid grid-cols-3 items-stretch gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoDashboard.secciones.top_productos}</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">{catalogoDashboard.botones.ver_reporte}</a>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0">
              {RANKING.map((p) => (
                <li key={p.nombre} className="grid grid-cols-[140px_1fr_44px_76px] items-center gap-2.5 max-[900px]:grid-cols-[110px_1fr_40px_66px]">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-texto">{p.nombre}</span>
                  <div className="h-2 overflow-hidden rounded bg-[#f0eef5]">
                    <MedidaDinamica as="span" ancho={p.ancho} className="block h-full rounded bg-primario" />
                  </div>
                  <span className="text-right text-[11px] text-texto-suave">{p.cantidad}</span>
                  <span className="whitespace-nowrap text-right text-[11px] font-bold text-texto">{p.valor}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoDashboard.secciones.proyeccion_ventas}</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">{catalogoDashboard.botones.ver_detalle}</a>
            </div>
            <div className="relative">
              <div className="flex h-[170px] items-end gap-2.5 pt-2.5">
                {BARRAS_PROYECCION.map((b) => (
                  <div key={b.mes} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <MedidaDinamica
                      as="span"
                      alto={b.claseAlto}
                      className={'block w-full max-w-[34px] rounded-t ' + (b.tipo === 'real' ? 'bg-[#7c3aed]' : 'bg-[#e4defb]')}
                    />
                    <small className="text-[10px] text-texto-suave">{b.mes}</small>
                  </div>
                ))}
              </div>
              <div className="absolute top-[22px] left-[62%] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-borde bg-white px-3 py-2 text-[11px] shadow-sombra">
                <strong className="mb-0.5 block text-[11px] text-texto">{TOOLTIP_PROYECCION_VENTAS.mes}</strong>
                <span className="block text-texto-suave">{TOOLTIP_PROYECCION_VENTAS.texto}</span>
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-[3px] w-3.5 rounded-sm bg-[#7c3aed] not-italic" /> {catalogoDashboard.leyendas.ventas_reales}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-2.5 w-2.5 rounded-full bg-[#e4defb] not-italic" /> {catalogoDashboard.leyendas.proyeccion}
              </span>
            </div>
          </article>

          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoDashboard.secciones.flujo_caja}</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">{catalogoDashboard.botones.ver_detalle}</a>
            </div>
            <div className="relative">
              <svg viewBox="0 0 340 170" preserveAspectRatio="none" className="block h-[200px] w-full overflow-visible">
                <line x1="0" y1="0" x2="340" y2="0" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="42" x2="340" y2="42" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="85" x2="340" y2="85" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="127" x2="340" y2="127" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="169" x2="340" y2="169" stroke="#f0eef5" strokeWidth="1" />
                <path d="M0,110 L34,90 L68,100 L102,70 L136,80 L170,55 L204,60 L238,40 L272,48 L306,30 L340,35 L340,169 L0,169 Z" fill="rgba(34,197,94,0.1)" />
                <polyline points="0,110 34,90 68,100 102,70 136,80 170,55 204,60 238,40 272,48 306,30 340,35" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="272" cy="48" r="5" fill="#fff" stroke="#22c55e" strokeWidth="3" />
              </svg>
              <div className="absolute left-[80%] top-[30px] -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white px-3 py-1.5 text-[11px] shadow-sombra">
                <strong className="mb-0.5 block text-[11px] font-bold text-texto">{TOOLTIP_FLUJO_CAJA.mes}</strong>
                <span className="block text-texto-suave">{TOOLTIP_FLUJO_CAJA.texto}</span>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {MESES_EJE_X_FLUJO.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </EstructuraApp>
  )
}
