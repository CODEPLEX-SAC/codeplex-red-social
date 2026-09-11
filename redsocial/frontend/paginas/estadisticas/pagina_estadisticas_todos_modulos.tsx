import type { ReactNode } from 'react'
import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import { Insignia } from '../../componentes/compartido/interfaz/insignia'
import { useCarrusel } from '../../ganchos/compartido/usar_carrusel'
import type { IconName } from '../../tipos/compartido/icono'
import type { Kpi, EstadoRatio } from '@/tipos/estadisticas/pagina_estadisticas_todos_modulos'

const CLASES_ICONO_KPI: Record<Kpi['color'], string> = {
  azul: 'bg-[#dbeafe] text-azul-categoria',
  rojo: 'bg-[#fee2e2] text-[#ef4444]',
  verde: 'bg-[#dcfce7] text-verde-categoria',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  cian: 'bg-[#cffafe] text-[#06b6d4]',
}

const KPIS: Kpi[] = [
  {
    icono: 'documento', color: 'azul', etiqueta: 'Ventas netas', valor: 'S/ 1,250,000',
    variacion: { direccion: 'positiva', texto: '12.5%' },
    sparklinePuntos: '0,22 15,20 30,16 45,18 60,10 75,12 100,4', sparklineColor: '#3b82f6',
  },
  {
    icono: 'flecha-abajo', color: 'rojo', etiqueta: 'Egresos', valor: 'S/ 850,000',
    variacion: { direccion: 'negativa', texto: '8.3%' },
    sparklinePuntos: '0,8 15,14 30,10 45,20 60,16 75,24 100,18', sparklineColor: '#ef4444',
  },
  {
    icono: 'documento', color: 'verde', etiqueta: 'Utilidad neta', valor: 'S/ 400,000',
    variacion: { direccion: 'positiva', texto: '18.7%' },
    sparklinePuntos: '0,24 15,20 30,22 45,14 60,16 75,8 100,6', sparklineColor: '#22c55e',
  },
  {
    icono: 'estadisticas', color: 'morado', etiqueta: 'Margen de utilidad', valor: '32.0%',
    variacion: { direccion: 'positiva', texto: '4.5 pp' },
    sparklinePuntos: '0,18 15,22 30,14 45,16 60,10 75,14 100,8', sparklineColor: '#7c3aed',
  },
  {
    icono: 'actualizar', color: 'cian', etiqueta: 'Flujo de caja', valor: 'S/ 320,000',
    variacion: { direccion: 'positiva', texto: '22.1%' },
    sparklinePuntos: '0,20 15,10 30,16 45,8 60,18 75,6 100,12', sparklineColor: '#06b6d4',
  },
]

const MODULOS_TABS: { etiqueta: string; icono: IconName }[] = [
  { etiqueta: 'Todos los módulos', icono: 'cuadricula' },
  { etiqueta: 'Ventas', icono: 'ventas' },
  { etiqueta: 'Contabilidad', icono: 'moneda' },
  { etiqueta: 'Inventarios', icono: 'caja' },
  { etiqueta: 'Planillas', icono: 'planillas' },
  { etiqueta: 'Proyectos', icono: 'maletin' },
  { etiqueta: 'Compras', icono: 'compras' },
  { etiqueta: 'Tesorería', icono: 'tarjeta-pago' },
]

const COMPOSICION_INGRESOS = {
  conic: 'conic-gradient(#3b82f6 0% 45%, #7c3aed 45% 70%, #22c55e 70% 90%, #f97316 90% 100%)',
  total: 'S/ 1,250,000',
  items: [
    { color: '#3b82f6', etiqueta: 'Construcción', pct: '45%', valor: 'S/ 562,500' },
    { color: '#7c3aed', etiqueta: 'Consultoría', pct: '25%', valor: 'S/ 312,500' },
    { color: '#22c55e', etiqueta: 'Servicios', pct: '20%', valor: 'S/ 250,000' },
    { color: '#f97316', etiqueta: 'Otros', pct: '10%', valor: 'S/ 125,000' },
  ],
}

const GASTOS_CATEGORIA = {
  conic: 'conic-gradient(#3b82f6 0% 35%, #f97316 35% 65%, #22c55e 65% 80%, #7c3aed 80% 90%, #9ca3af 90% 100%)',
  total: 'S/ 850,000',
  items: [
    { color: '#3b82f6', etiqueta: 'Mano de obra', pct: '35%', valor: 'S/ 297,500' },
    { color: '#f97316', etiqueta: 'Materiales', pct: '30%', valor: 'S/ 255,000' },
    { color: '#22c55e', etiqueta: 'Servicios', pct: '15%', valor: 'S/ 127,500' },
    { color: '#7c3aed', etiqueta: 'Administrativos', pct: '10%', valor: 'S/ 85,000' },
    { color: '#9ca3af', etiqueta: 'Otros', pct: '10%', valor: 'S/ 85,000' },
  ],
}

const TOP_CLIENTES = [
  { nombre: 'Inversiones Andinas SAC', ancho: '100%', valor: 'S/ 320,000' },
  { nombre: 'Inmobiliaria Los Álamos', ancho: '66%', valor: 'S/ 210,000' },
  { nombre: 'Constructora Horizonte', ancho: '56%', valor: 'S/ 180,000' },
  { nombre: 'Municipalidad de Surco', ancho: '37%', valor: 'S/ 120,000' },
  { nombre: 'Servicios Generales SRL', ancho: '30%', valor: 'S/ 95,000' },
]

const ESTADO_RESULTADOS: { concepto: string; actual: string; pct: string; variacion: string; tipo: 'positiva' | 'negativa'; fuerte?: boolean }[] = [
  { concepto: 'Ventas netas', actual: 'S/ 1,250,000', pct: '100%', variacion: '↑ 12.5%', tipo: 'positiva' },
  { concepto: 'Costo de ventas', actual: '-S/ 650,000', pct: '-52%', variacion: '↑ 8.2%', tipo: 'positiva' },
  { concepto: 'Utilidad bruta', actual: 'S/ 600,000', pct: '48%', variacion: '↑ 16.9%', tipo: 'positiva', fuerte: true },
  { concepto: 'Gastos operativos', actual: '-S/ 200,000', pct: '-16%', variacion: '↓ 5.1%', tipo: 'negativa' },
  { concepto: 'Utilidad operativa', actual: 'S/ 400,000', pct: '32%', variacion: '↑ 22.3%', tipo: 'positiva', fuerte: true },
  { concepto: 'Impuestos', actual: '-S/ 120,000', pct: '-9.6%', variacion: '↑ 15.4%', tipo: 'positiva' },
  { concepto: 'Utilidad neta', actual: 'S/ 400,000', pct: '32%', variacion: '↑ 18.7%', tipo: 'positiva', fuerte: true },
]

const CLASES_ESTADO_EST: Record<EstadoRatio, { color: string; background: string }> = {
  optimo: { color: '#16a34a', background: '#dcfce7' },
  aceptable: { color: '#a16207', background: '#fef9c3' },
  bajo: { color: '#b45309', background: '#fef3c7' },
  riesgo: { color: '#dc2626', background: '#fee2e2' },
}

const RATIOS_FINANCIEROS: { nombre: string; valor: string; variacion: string; tipo: 'positiva' | 'negativa'; estado: EstadoRatio }[] = [
  { nombre: 'Liquidez corriente', valor: '2.15', variacion: '↑ 0.18', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Prueba ácida', valor: '1.48', variacion: '↑ 0.12', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Endeudamiento', valor: '0.35', variacion: '↓ -0.03', tipo: 'negativa', estado: 'bajo' },
  { nombre: 'ROE', valor: '18.6%', variacion: '↑ 2.3 pp', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'ROA', valor: '11.2%', variacion: '↑ 1.4 pp', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Rotación de inventario', valor: '6.8', variacion: '↑ 0.9', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Periodo de cobranza (días)', valor: '32', variacion: '↓ -4', tipo: 'positiva', estado: 'optimo' },
  { nombre: 'Periodo de pago (días)', valor: '45', variacion: '↑ 3', tipo: 'negativa', estado: 'aceptable' },
]

const PROYECCION_VENTAS: { mes: string; valor: number; tipo: 'real' | 'proyeccion' }[] = [
  { mes: 'Ene', valor: 38, tipo: 'real' },
  { mes: 'Feb', valor: 44, tipo: 'real' },
  { mes: 'Mar', valor: 50, tipo: 'real' },
  { mes: 'Abr', valor: 56, tipo: 'real' },
  { mes: 'May', valor: 62, tipo: 'real' },
  { mes: 'Jun', valor: 100, tipo: 'real' },
  { mes: 'Jul', valor: 68, tipo: 'proyeccion' },
  { mes: 'Ago', valor: 74, tipo: 'proyeccion' },
  { mes: 'Sep', valor: 78, tipo: 'proyeccion' },
  { mes: 'Oct', valor: 82, tipo: 'proyeccion' },
  { mes: 'Nov', valor: 88, tipo: 'proyeccion' },
  { mes: 'Dic', valor: 94, tipo: 'proyeccion' },
]

const RENTABILIDAD_PROYECTO: { nombre: string; margen: string; estado: EstadoRatio }[] = [
  { nombre: 'Edificio Corporativo Alpha', margen: '28.5%', estado: 'optimo' },
  { nombre: 'Puente San Miguel', margen: '24.8%', estado: 'optimo' },
  { nombre: 'Centro Comercial Plaza Norte', margen: '19.3%', estado: 'aceptable' },
  { nombre: 'Residencial Los Parques', margen: '16.1%', estado: 'riesgo' },
  { nombre: 'Carretera Interoceánica', margen: '22.7%', estado: 'optimo' },
]

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
            <h1 className="m-0 text-[22px] font-extrabold text-texto">Estadísticas</h1>
            <p className="m-1 mt-1 mb-0 text-[13px] text-texto-suave">Visualiza el rendimiento de tu empresa con datos en tiempo real.</p>
          </div>
          <div className="flex flex-wrap items-end gap-3.5 max-[480px]:flex-col max-[480px]:items-stretch">
            <Selector variant="default" label="Periodo">
              <option>Junio 2026</option>
              <option>Mayo 2026</option>
              <option>Abril 2026</option>
            </Selector>
            <Selector variant="default" label="Comparar con">
              <option>Mayo 2026</option>
              <option>Abril 2026</option>
              <option>Junio 2025</option>
            </Selector>
            <button
              type="button"
              className="inline-flex h-[38px] flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-primario bg-white px-4 text-[13px] font-semibold text-primario hover:bg-[#f5f3ff] max-[900px]:w-full max-[900px]:justify-center"
            >
              <Icono name="filtro" className="h-[15px] w-[15px]" /> Filtros avanzados
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
                  {kpi.variacion.texto} <em className="ml-0.5 font-medium not-italic text-texto-suave">vs. Mayo 2026</em>
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
              <h2 className="m-0 text-[15px] font-bold text-texto">Evolución de ventas</h2>
              <span className="relative inline-flex">
                <select className="h-[30px] appearance-none rounded-md border border-borde bg-white pl-2.5 pr-[26px] text-xs font-semibold text-texto">
                  <option>Mensual</option>
                  <option>Semanal</option>
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
              <div className="absolute top-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white p-2.5 px-3 text-[11px] leading-relaxed shadow-sombra" style={{ left: '44%' }}>
                <strong className="mb-0.5 block text-[11px] text-texto">Jun 2026</strong>
                <span className="block text-texto-suave">Ventas: S/ 1,250,000</span>
                <span className="block text-texto-suave">Proyección: S/ 1,350,000</span>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {MESES_EJE_X_VENTAS.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5"><i className="h-[3px] w-3.5 flex-none rounded-sm bg-[#3b82f6]" /> Ventas reales</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-0 w-3.5 flex-none border-t-2 border-dashed border-[#3b82f6]" /> Proyección</span>
            </div>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Composición de ingresos</h2>
            </div>
            <div className="relative mx-auto mb-4 grid h-[140px] w-[140px] place-items-center rounded-full" style={{ background: COMPOSICION_INGRESOS.conic }}>
              <div className="absolute inset-[22px] rounded-full bg-white" />
              <span className="relative z-10 flex flex-col items-center text-center">
                <strong className="text-[13px] font-extrabold text-texto">{COMPOSICION_INGRESOS.total}</strong>
                <span className="text-[10px] text-texto-suave">Total</span>
              </span>
            </div>
            <ul className="m-0 grid list-none gap-2 p-0">
              {COMPOSICION_INGRESOS.items.map((it) => (
                <li key={it.etiqueta} className="flex items-center gap-2 text-xs text-texto">
                  <i className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: it.color }} />
                  {it.etiqueta} <b className="ml-auto font-bold">{it.pct}</b> <small className="min-w-[68px] text-right text-texto-suave">{it.valor}</small>
                </li>
              ))}
            </ul>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <div>
                <h2 className="m-0 text-[15px] font-bold text-texto">Top 5 clientes</h2>
                <p className="m-0 text-xs text-texto-suave">Ventas</p>
              </div>
              <a href="#" className="text-xs font-semibold text-primario no-underline">Ver todos</a>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0">
              {TOP_CLIENTES.map((c) => (
                <li key={c.nombre} className="grid grid-cols-[120px_1fr_62px] items-center gap-2.5">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-texto">{c.nombre}</span>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f0eef5]">
                    <span className="block h-full rounded-full bg-primario" style={{ width: c.ancho }} />
                  </div>
                  <span className="whitespace-nowrap text-right text-[11px] font-bold text-texto">{c.valor}</span>
                </li>
              ))}
            </ul>
            <div className="mt-1.5 grid grid-cols-[120px_1fr_62px]">
              <span />
              <div className="flex justify-between text-[10px] text-texto-suave">
                <span>0</span><span>100K</span><span>200K</span><span>300K</span><span>400K</span>
              </div>
              <span />
            </div>
          </article>
        </div>

        <div className="mb-4 grid grid-cols-[1.6fr_1fr_1fr] gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Gastos por categoría</h2>
            </div>
            <div className="relative mx-auto mb-4 grid h-[140px] w-[140px] place-items-center rounded-full" style={{ background: GASTOS_CATEGORIA.conic }}>
              <div className="absolute inset-[22px] rounded-full bg-white" />
              <span className="relative z-10 flex flex-col items-center text-center">
                <strong className="text-[13px] font-extrabold text-texto">{GASTOS_CATEGORIA.total}</strong>
                <span className="text-[10px] text-texto-suave">Total</span>
              </span>
            </div>
            <ul className="m-0 grid list-none gap-2 p-0">
              {GASTOS_CATEGORIA.items.map((it) => (
                <li key={it.etiqueta} className="flex items-center gap-2 text-xs text-texto">
                  <i className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: it.color }} />
                  {it.etiqueta} <b className="ml-auto font-bold">{it.pct}</b> <small className="min-w-[68px] text-right text-texto-suave">{it.valor}</small>
                </li>
              ))}
            </ul>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Estado de resultados</h2>
            </div>
            <TablaEst>
              <thead>
                <tr>
                  <th className={TH}>Concepto</th>
                  <th className={TH}>Actual</th>
                  <th className={TH}>%</th>
                  <th className={TH}>vs. Mayo 2026</th>
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
              <h2 className="m-0 text-[15px] font-bold text-texto">Ratios financieros</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">Ver todos</a>
            </div>
            <TablaEst>
              <thead>
                <tr>
                  <th className={TH}>Ratio</th>
                  <th className={TH}>Valor</th>
                  <th className={TH}>vs. Mayo</th>
                  <th className={TH}>Estado</th>
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
              <h2 className="m-0 text-[15px] font-bold text-texto">Proyección de ventas 2026</h2>
            </div>
            <div className="flex h-[180px] items-end gap-2 pt-2.5">
              {PROYECCION_VENTAS.map((b) => (
                <div key={b.mes} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                  <span
                    className={'w-full max-w-[26px] rounded-t ' + (b.tipo === 'real' ? 'bg-morado-categoria' : 'bg-[#e4defb]')}
                    style={{ height: `${b.valor}%` }}
                  />
                  <small className="text-[10px] text-texto-suave">{b.mes}</small>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5"><i className="h-[3px] w-3.5 flex-none rounded-sm bg-morado-categoria" /> Ventas reales</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 flex-none rounded-full bg-[#e4defb]" /> Proyección</span>
            </div>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Flujo de caja proyectado</h2>
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
              <div className="absolute top-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white p-2.5 px-3 text-[11px] leading-relaxed shadow-sombra" style={{ left: '58%' }}>
                <strong className="mb-0.5 block text-[11px] text-texto">Junio 2026</strong>
                <span className="block text-texto-suave">Flujo proyectado: S/ 320,000</span>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {MESES_EJE_X_FLUJO.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
          </article>

          <article className="min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Rentabilidad por proyecto</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">Ver todos</a>
            </div>
            <TablaEst>
              <thead>
                <tr>
                  <th className={TH}>Proyecto</th>
                  <th className={TH}>Margen</th>
                  <th className={TH}>Estado</th>
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
