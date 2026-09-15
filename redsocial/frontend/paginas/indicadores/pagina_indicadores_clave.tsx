import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoIndicadores from '../../catalogos/capacidades/redsocial/indicadores.json'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import { Insignia } from '../../componentes/compartido/interfaz/insignia'
import { DonaProgreso } from '../../componentes/compartido/interfaz/dona_progreso'
import { MedidaDinamica } from '../../componentes/compartido/interfaz/medida_dinamica'
import { usarCarrusel } from '../../componentes/compartido/usar_carrusel'
import type { IconName } from '../../tipos/compartido/icono'
import type { Kpi, EstadoInd, FilaTabla, TarjetaModulo } from '@/tipos/indicadores/pagina_indicadores_clave'
import {
  KPIS,
  RENTABILIDAD,
  LIQUIDEZ,
  GESTION,
  BARRAS_COMBO,
  COSTOS,
  MODULOS_IND,
  COMPARATIVO_KPI,
  MESES_EJE_X_INDICADORES,
  TOOLTIP_UTILIDAD_NETA,
  TOOLTIP_VENTAS_PROYECCION,
} from '../../datos/indicadores/indicadores'

const CLASES_ICONO_KPI: Record<Kpi['color'], string> = {
  verde: 'bg-[#dcfce7] text-verde-categoria',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
}

const MODULOS_TABS: { etiqueta: string; icono: IconName }[] = catalogoIndicadores.modulos_tabs as { etiqueta: string; icono: IconName }[]

const CLASES_ESTADO_IND: Record<EstadoInd, string> = {
  optimo: 'bg-[#dcfce7] text-[#16a34a]',
  regular: 'bg-[#fef9c3] text-[#a16207]',
  bajo: 'bg-[#fee2e2] text-[#dc2626]',
}

const ETIQUETA_ESTADO_IND: Record<EstadoInd, string> = {
  optimo: catalogoIndicadores.estados.optimo,
  regular: catalogoIndicadores.estados.regular,
  bajo: catalogoIndicadores.estados.bajo,
}

function EstadoIndBadge({ estado }: { estado: EstadoInd }) {
  return <Insignia variant="status" className={CLASES_ESTADO_IND[estado]}>{ETIQUETA_ESTADO_IND[estado]}</Insignia>
}

const TH = 'whitespace-nowrap border-b border-[#f0eef5] py-0 pb-2 pr-1.5 pl-0 text-left text-[9.5px] font-semibold uppercase text-texto-suave'
const TD = 'whitespace-nowrap border-b border-[#f7f6fa] py-1.75 pr-1.5 pl-0 text-texto'

function TablaIndicador({ filas }: { filas: FilaTabla[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[11.5px] [&_tbody_tr:last-child_td]:border-b-0">
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

const CLASES_ICONO_MODULO: Record<TarjetaModulo['color'], string> = {
  verde: 'bg-[#dcfce7] text-verde-categoria',
  azul: 'bg-[#dbeafe] text-azul-categoria',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  rojo: 'bg-[#fee2e2] text-[#ef4444]',
}

export function PaginaIndicadoresClave() {
  const modulos = usarCarrusel()

  return (
    <EstructuraApp paginaActiva="indicadores">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-5 flex items-start justify-between gap-5 max-[900px]:flex-col max-[900px]:items-stretch">
          <div>
            <h1 className="m-0 flex items-center gap-2 text-[22px] font-extrabold text-texto">
              {catalogoIndicadores.titulos.clave} <Icono name="informacion" className="h-4 w-4 text-texto-suave" />
            </h1>
            <p className="m-0 mt-1 text-[13px] text-texto-suave">{catalogoIndicadores.subtitulos.clave}</p>
          </div>
          <div className="flex flex-wrap items-end gap-3.5 max-[480px]:flex-col max-[480px]:items-stretch">
            <Selector variant="default" label={catalogoIndicadores.selectores.periodo.etiqueta}>
              {catalogoIndicadores.selectores.periodo.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <Selector variant="default" label={catalogoIndicadores.selectores.comparar_con.etiqueta}>
              {catalogoIndicadores.selectores.comparar_con.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <button
              type="button"
              className="inline-flex h-[38px] flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-primario bg-white px-4 text-[13px] font-semibold text-primario hover:bg-[#f5f3ff] max-[900px]:w-full max-[900px]:justify-center"
            >
              <Icono name="filtro" className="h-[15px] w-[15px]" /> {catalogoIndicadores.botones.filtros_avanzados}
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
              <strong className="mb-1.5 block text-xl font-extrabold text-texto">{kpi.valor}</strong>
              <small
                className={
                  'mb-2 inline-flex items-center gap-[3px] whitespace-nowrap text-[11px] font-bold ' +
                  (kpi.variacion.direccion === 'positiva' ? 'text-positivo-kpi' : 'text-negativo-kpi')
                }
              >
                <Icono name={kpi.variacion.direccion === 'positiva' ? 'flecha-arriba' : 'flecha-abajo'} className="h-[11px] w-[11px]" />
                {kpi.variacion.texto} <em className="ml-0.5 font-medium not-italic text-texto-suave">{COMPARATIVO_KPI}</em>
              </small>
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

        <div className="mb-5 grid grid-cols-3 gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoIndicadores.secciones.rentabilidad}</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_todos}</a>
            </div>
            <TablaIndicador filas={RENTABILIDAD} />
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoIndicadores.secciones.liquidez}</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_todos}</a>
            </div>
            <TablaIndicador filas={LIQUIDEZ} />
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px] max-[1250px]:col-span-2 max-[900px]:col-span-1">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoIndicadores.secciones.gestion}</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_todos}</a>
            </div>
            <TablaIndicador filas={GESTION} />
          </article>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoIndicadores.secciones.evolucion_utilidad_neta}</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_detalle}</a>
            </div>
            <div className="relative h-[160px]">
              <div className="flex h-[140px] items-end gap-2">
                {BARRAS_COMBO.map((b) => (
                  <MedidaDinamica
                    key={b.mes}
                    as="div"
                    alto={b.claseAlto}
                    className={
                      'relative flex flex-1 items-end justify-center rounded-t-[3px] ' +
                      (b.claseAlto === null ? 'h-full bg-transparent' : b.activa ? 'bg-[#22c55e]' : 'bg-[#86efac]')
                    }
                  >
                    <small className="absolute -bottom-5 whitespace-nowrap text-[10px] text-texto-suave">{b.mes}</small>
                  </MedidaDinamica>
                ))}
              </div>
              <svg viewBox="0 0 480 140" preserveAspectRatio="none" className="pointer-events-none absolute left-0 top-0 h-[140px] w-full overflow-visible">
                <polyline points="0,90 44,80 88,70 132,60 176,50 220,20" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="220" cy="20" r="4.5" fill="#7c3aed" />
              </svg>
              <div className="absolute left-[46%] top-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white p-2.5 px-3 text-[11px] leading-relaxed shadow-sombra">
                <strong className="mb-0.5 block text-[11px] text-texto">{TOOLTIP_UTILIDAD_NETA.mes}</strong>
                <span className="block text-texto-suave">{TOOLTIP_UTILIDAD_NETA.utilidad}</span>
                <span className="block text-texto-suave">{TOOLTIP_UTILIDAD_NETA.margen}</span>
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5"><i className="h-[3px] w-3.5 flex-none rounded-sm bg-[#22c55e]" /> {catalogoIndicadores.leyendas.utilidad_neta}</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 flex-none rounded-full bg-morado-categoria" /> {catalogoIndicadores.leyendas.margen_neto}</span>
            </div>
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoIndicadores.secciones.ventas_vs_proyeccion}</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_detalle}</a>
            </div>
            <div className="relative">
              <svg viewBox="0 0 480 200" preserveAspectRatio="none" className="block h-[200px] w-full overflow-visible">
                <line x1="0" y1="0" x2="480" y2="0" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="50" x2="480" y2="50" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="100" x2="480" y2="100" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="150" x2="480" y2="150" stroke="#f0eef5" strokeWidth="1" />
                <line x1="0" y1="199" x2="480" y2="199" stroke="#f0eef5" strokeWidth="1" />
                <path d="M0,199 L0,150 L40,140 L80,125 L120,130 L160,95 L200,60 L200,199 Z" fill="rgba(124,58,237,0.08)" />
                <polyline points="0,150 40,140 80,125 120,130 160,95 200,60" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="200,60 240,75 280,40 320,55 360,30 400,45 440,10" fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" />
                <circle cx="200" cy="60" r="5" fill="#7c3aed" />
              </svg>
              <div className="absolute left-[42%] top-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white p-2.5 px-3 text-[11px] leading-relaxed shadow-sombra">
                <strong className="mb-0.5 block text-[11px] text-texto">{TOOLTIP_VENTAS_PROYECCION.mes}</strong>
                <span className="block text-texto-suave">{TOOLTIP_VENTAS_PROYECCION.ventas}</span>
                <span className="block text-texto-suave">{TOOLTIP_VENTAS_PROYECCION.proyeccion}</span>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {MESES_EJE_X_INDICADORES.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5"><i className="h-[3px] w-3.5 flex-none rounded-sm bg-morado-categoria" /> {catalogoIndicadores.leyendas.ventas_reales}</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-0 w-3.5 flex-none border-t-2 border-dashed border-morado-categoria" /> {catalogoIndicadores.leyendas.proyeccion}</span>
            </div>
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px] max-[1250px]:col-span-2 max-[900px]:col-span-1">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoIndicadores.secciones.estructura_costos}</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_detalle}</a>
            </div>
            <div className="relative mx-auto mb-4 grid h-[130px] w-[130px] place-items-center rounded-full">
              <DonaProgreso
                segmentos={COSTOS.items.map((it) => ({ color: it.color, porcentaje: Number(it.pct.replace('%', '')) }))}
                tamano={130}
                grosor={16}
                className="absolute inset-0"
              />
              <div className="absolute inset-5 rounded-full bg-white" />
              <span className="relative z-10 flex flex-col items-center text-center">
                <strong className="text-xs font-extrabold text-texto">{COSTOS.total}</strong>
                <span className="text-[10px] text-texto-suave">{catalogoIndicadores.leyendas.total_de_costos}</span>
              </span>
            </div>
            <ul className="m-0 grid list-none gap-2 p-0">
              {COSTOS.items.map((it) => (
                <li key={it.etiqueta} className="flex items-center gap-2 text-xs text-texto">
                  <svg width="10" height="10" viewBox="0 0 10 10" className="flex-none"><circle cx="5" cy="5" r="5" fill={it.color} /></svg>
                  {it.etiqueta} <b className="ml-auto font-bold">{it.pct}</b> <small className="min-w-[68px] text-right text-texto-suave">{it.valor}</small>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-base font-bold text-texto">{catalogoIndicadores.secciones.indicadores_por_modulo}</h2>
          <a href="#" className="text-xs font-semibold text-primario no-underline">{catalogoIndicadores.botones.ver_todos_los_indicadores}</a>
        </div>
        <div className="grid grid-cols-6 gap-4 max-[1400px]:grid-cols-3 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {MODULOS_IND.map((m) => (
            <article key={m.nombre} className="min-w-0 rounded-xl border border-borde bg-white p-4">
              <div className="mb-2.5 flex items-center gap-2">
                <span className={`grid h-[30px] w-[30px] flex-none place-items-center rounded-lg ${CLASES_ICONO_MODULO[m.color]}`}>
                  <Icono name={m.icono} className="h-3.5 w-3.5" />
                </span>
                <strong className="text-[12.5px] font-bold text-texto">{m.nombre}</strong>
              </div>
              <span className="mb-0.5 block text-[11px] text-texto-suave">{m.etiquetaDato}</span>
              <strong className="mb-2 block text-base font-extrabold text-texto">{m.valor}</strong>
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <small className="font-semibold text-positivo-kpi">{m.variacion}</small>
                <EstadoIndBadge estado={m.estado} />
              </div>
              <svg viewBox="0 0 100 22" preserveAspectRatio="none" className="block h-[22px] w-full">
                <polyline points={m.sparklinePuntos} fill="none" stroke={m.sparklineColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </article>
          ))}
        </div>
      </div>
    </EstructuraApp>
  )
}
