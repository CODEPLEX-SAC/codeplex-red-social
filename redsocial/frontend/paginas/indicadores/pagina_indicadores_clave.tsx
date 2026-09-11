import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import { Insignia } from '../../componentes/compartido/interfaz/insignia'
import { useCarrusel } from '../../servicios/compartido/usar_carrusel'
import type { IconName } from '../../tipos/compartido/icono'
import type { Kpi, EstadoInd, FilaTabla, TarjetaModulo } from '@/tipos/indicadores/pagina_indicadores_clave'

const CLASES_ICONO_KPI: Record<Kpi['color'], string> = {
  verde: 'bg-[#dcfce7] text-verde-categoria',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
}

const KPIS: Kpi[] = [
  {
    icono: 'carrito', color: 'verde', etiqueta: 'Ventas Netas', valor: 'S/ 1,250,000',
    variacion: { direccion: 'positiva', texto: '12.5%' },
    sparklinePuntos: '0,20 14,16 28,18 42,10 56,13 70,7 84,10 100,4', sparklineColor: '#22c55e',
  },
  {
    icono: 'documento', color: 'verde', etiqueta: 'Utilidad Neta', valor: 'S/ 400,000',
    variacion: { direccion: 'positiva', texto: '18.7%' },
    sparklinePuntos: '0,18 14,20 28,14 42,16 56,10 70,13 84,7 100,9', sparklineColor: '#06b6d4',
  },
  {
    icono: 'estadisticas', color: 'morado', etiqueta: 'Margen de Utilidad', valor: '32.0%',
    variacion: { direccion: 'positiva', texto: '4.5 pp' },
    sparklinePuntos: '0,16 14,19 28,12 42,14 56,8 70,11 84,6 100,9', sparklineColor: '#7c3aed',
  },
  {
    icono: 'documento', color: 'naranja', etiqueta: 'EBITDA', valor: 'S/ 520,000',
    variacion: { direccion: 'positiva', texto: '15.2%' },
    sparklinePuntos: '0,19 14,15 28,17 42,9 56,12 70,6 84,11 100,5', sparklineColor: '#f97316',
  },
  {
    icono: 'documento', color: 'verde', etiqueta: 'Flujo de Caja', valor: 'S/ 320,000',
    variacion: { direccion: 'positiva', texto: '22.1%' },
    sparklinePuntos: '0,18 14,9 28,15 42,7 56,17 70,5 84,13 100,10', sparklineColor: '#22c55e',
  },
]

const MODULOS_TABS: { etiqueta: string; icono: IconName }[] = [
  { etiqueta: 'Todos los módulos', icono: 'cuadricula' },
  { etiqueta: 'Financieros', icono: 'moneda' },
  { etiqueta: 'Comerciales', icono: 'ventas' },
  { etiqueta: 'Operativos', icono: 'caja' },
  { etiqueta: 'Recursos Humanos', icono: 'planillas' },
  { etiqueta: 'Clientes', icono: 'amigos' },
  { etiqueta: 'Proyectos', icono: 'maletin' },
  { etiqueta: 'Inventarios', icono: 'caja' },
]

const CLASES_ESTADO_IND: Record<EstadoInd, { color: string; background: string }> = {
  optimo: { color: '#16a34a', background: '#dcfce7' },
  regular: { color: '#a16207', background: '#fef9c3' },
  bajo: { color: '#dc2626', background: '#fee2e2' },
}

const ETIQUETA_ESTADO_IND: Record<EstadoInd, string> = {
  optimo: 'Óptimo',
  regular: 'Regular',
  bajo: 'Bajo',
}

function EstadoIndBadge({ estado }: { estado: EstadoInd }) {
  const c = CLASES_ESTADO_IND[estado]
  return <Insignia variant="status" color={c.color} background={c.background}>{ETIQUETA_ESTADO_IND[estado]}</Insignia>
}

const RENTABILIDAD: FilaTabla[] = [
  { indicador: 'ROE (Rentabilidad sobre Patrimonio)', valor: '18.6%', estado: 'optimo', variacion: '↑ 2.3 pp', tipo: 'positiva' },
  { indicador: 'ROA (Rentabilidad sobre Activos)', valor: '11.2%', estado: 'optimo', variacion: '↑ 1.4 pp', tipo: 'positiva' },
  { indicador: 'Margen Bruto', valor: '36.8%', estado: 'optimo', variacion: '↑ 3.1 pp', tipo: 'positiva' },
  { indicador: 'Margen Operativo', valor: '12.4%', estado: 'optimo', variacion: '↑ 1.8 pp', tipo: 'positiva' },
  { indicador: 'Margen Neto', valor: '8.5%', estado: 'optimo', variacion: '↑ 1.2 pp', tipo: 'positiva' },
]

const LIQUIDEZ: FilaTabla[] = [
  { indicador: 'Liquidez Corriente', valor: '2.15', estado: 'optimo', variacion: '↑ 0.18', tipo: 'positiva' },
  { indicador: 'Prueba Ácida', valor: '1.48', estado: 'optimo', variacion: '↑ 0.12', tipo: 'positiva' },
  { indicador: 'Capital de Trabajo', valor: 'S/ 850,000', estado: 'optimo', variacion: '↑ 8.3%', tipo: 'positiva' },
  { indicador: 'Liquidez Inmediata', valor: '0.85', estado: 'regular', variacion: '↓ -0.03', tipo: 'negativa' },
]

const GESTION: FilaTabla[] = [
  { indicador: 'Rotación de Inventario (días)', valor: '6.8', estado: 'optimo', variacion: '↓ 0.6', tipo: 'negativa' },
  { indicador: 'Rotación de Cuentas por Cobrar (días)', valor: '32', estado: 'optimo', variacion: '↑ 3', tipo: 'positiva' },
  { indicador: 'Rotación de Cuentas por Pagar (días)', valor: '28', estado: 'regular', variacion: '↑ 2', tipo: 'positiva' },
  { indicador: 'Ciclo de Conversión de Efectivo (días)', valor: '10', estado: 'optimo', variacion: '↓ 1', tipo: 'negativa' },
]

const TH = 'whitespace-nowrap border-b border-[#f0eef5] py-0 pb-2 pr-1.5 pl-0 text-left text-[9.5px] font-semibold uppercase text-texto-suave'
const TD = 'whitespace-nowrap border-b border-[#f7f6fa] py-1.75 pr-1.5 pl-0 text-texto'

function TablaIndicador({ filas }: { filas: FilaTabla[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[11.5px] [&_tbody_tr:last-child_td]:border-b-0">
        <thead>
          <tr>
            <th className={TH}>Indicador</th>
            <th className={TH}>Valor</th>
            <th className={TH}>Estado</th>
            <th className={TH}>Var.</th>
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

const BARRAS_COMBO: { mes: string; valor: number | null; activa?: boolean }[] = [
  { mes: 'Ene', valor: 60 }, { mes: 'Feb', valor: 66 }, { mes: 'Mar', valor: 70 },
  { mes: 'Abr', valor: 76 }, { mes: 'May', valor: 80 }, { mes: 'Jun', valor: 100, activa: true },
  { mes: 'Jul', valor: null }, { mes: 'Ago', valor: null }, { mes: 'Sep', valor: null },
  { mes: 'Oct', valor: null }, { mes: 'Nov', valor: null }, { mes: 'Dic', valor: null },
]

const MESES_EJE_X = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const COSTOS = {
  conic: 'conic-gradient(#3b82f6 0% 35%, #f97316 35% 65%, #22c55e 65% 80%, #ec4899 80% 90%, #eab308 90% 100%)',
  total: 'S/ 850,000',
  items: [
    { color: '#3b82f6', etiqueta: 'Mano de Obra', pct: '35%', valor: 'S/ 297,500' },
    { color: '#f97316', etiqueta: 'Materiales', pct: '30%', valor: 'S/ 255,000' },
    { color: '#22c55e', etiqueta: 'Servicios', pct: '20%', valor: 'S/ 170,000' },
    { color: '#ec4899', etiqueta: 'Gastos Generales', pct: '10%', valor: 'S/ 85,000' },
    { color: '#eab308', etiqueta: 'Otros', pct: '5%', valor: 'S/ 42,500' },
  ],
}

const CLASES_ICONO_MODULO: Record<TarjetaModulo['color'], string> = {
  verde: 'bg-[#dcfce7] text-verde-categoria',
  azul: 'bg-[#dbeafe] text-azul-categoria',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  rojo: 'bg-[#fee2e2] text-[#ef4444]',
}

const MODULOS_IND: TarjetaModulo[] = [
  { icono: 'planillas', color: 'verde', nombre: 'Planillas', etiquetaDato: 'Costo de Personal', valor: 'S/ 285,000', variacion: '↑ 6.2%', estado: 'optimo', sparklinePuntos: '0,17 20,13 40,15 60,8 80,11 100,4', sparklineColor: '#22c55e' },
  { icono: 'moneda', color: 'morado', nombre: 'Contabilidad', etiquetaDato: 'Resultado del Ejercicio', valor: 'S/ 400,000', variacion: '↑ 18.7%', estado: 'optimo', sparklinePuntos: '0,18 20,14 40,16 60,9 80,12 100,5', sparklineColor: '#7c3aed' },
  { icono: 'caja', color: 'naranja', nombre: 'Inventarios', etiquetaDato: 'Stock Valorizado', valor: 'S/ 2,350,000', variacion: '↑ 7.4%', estado: 'optimo', sparklinePuntos: '0,10 20,15 40,8 60,17 80,11 100,6', sparklineColor: '#f97316' },
  { icono: 'ventas', color: 'azul', nombre: 'Ventas', etiquetaDato: 'Pedidos del Mes', valor: '78', variacion: '↑ 14.8%', estado: 'optimo', sparklinePuntos: '0,16 20,12 40,14 60,7 80,10 100,3', sparklineColor: '#3b82f6' },
  { icono: 'maletin', color: 'morado', nombre: 'Proyectos', etiquetaDato: 'Avance Promedio', valor: '65%', variacion: '↑ 5.2 pp', estado: 'optimo', sparklinePuntos: '0,15 20,17 40,10 60,13 80,7 100,9', sparklineColor: '#7c3aed' },
  { icono: 'compras', color: 'rojo', nombre: 'Compras', etiquetaDato: 'Ahorro por Compras', valor: 'S/ 120,000', variacion: '↑ 9.1%', estado: 'optimo', sparklinePuntos: '0,17 20,11 40,14 60,6 80,10 100,4', sparklineColor: '#ef4444' },
]

export function PaginaIndicadoresClave() {
  const modulos = useCarrusel()

  return (
    <EstructuraApp paginaActiva="indicadores">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-5 flex items-start justify-between gap-5 max-[900px]:flex-col max-[900px]:items-stretch">
          <div>
            <h1 className="m-0 flex items-center gap-2 text-[22px] font-extrabold text-texto">
              Indicadores Clave (KPI) <Icono name="informacion" className="h-4 w-4 text-texto-suave" />
            </h1>
            <p className="m-0 mt-1 text-[13px] text-texto-suave">Monitorea los indicadores más importantes de tu empresa en tiempo real.</p>
          </div>
          <div className="flex flex-wrap items-end gap-3.5 max-[480px]:flex-col max-[480px]:items-stretch">
            <Selector variant="default" label="Periodo">
              <option>Junio 2026</option>
              <option>Mayo 2026</option>
            </Selector>
            <Selector variant="default" label="Comparar con">
              <option>Mayo 2026</option>
              <option>Abril 2026</option>
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
              <strong className="mb-1.5 block text-xl font-extrabold text-texto">{kpi.valor}</strong>
              <small
                className={
                  'mb-2 inline-flex items-center gap-[3px] whitespace-nowrap text-[11px] font-bold ' +
                  (kpi.variacion.direccion === 'positiva' ? 'text-positivo-kpi' : 'text-negativo-kpi')
                }
              >
                <Icono name={kpi.variacion.direccion === 'positiva' ? 'flecha-arriba' : 'flecha-abajo'} className="h-[11px] w-[11px]" />
                {kpi.variacion.texto} <em className="ml-0.5 font-medium not-italic text-texto-suave">vs. Mayo 2026</em>
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
              <h2 className="m-0 text-[15px] font-bold text-texto">Indicadores de Rentabilidad</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">Ver todos</a>
            </div>
            <TablaIndicador filas={RENTABILIDAD} />
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Indicadores de Liquidez</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">Ver todos</a>
            </div>
            <TablaIndicador filas={LIQUIDEZ} />
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px] max-[1250px]:col-span-2 max-[900px]:col-span-1">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Indicadores de Gestión</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">Ver todos</a>
            </div>
            <TablaIndicador filas={GESTION} />
          </article>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Evolución de Utilidad Neta</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">Ver detalle</a>
            </div>
            <div className="relative h-[160px]">
              <div className="flex h-[140px] items-end gap-2">
                {BARRAS_COMBO.map((b) => (
                  <div
                    key={b.mes}
                    className={
                      'relative flex flex-1 items-end justify-center rounded-t-[3px] ' +
                      (b.valor === null ? 'h-full bg-transparent' : b.activa ? 'bg-[#22c55e]' : 'bg-[#86efac]')
                    }
                    style={b.valor !== null ? { height: `${b.valor}%` } : undefined}
                  >
                    <small className="absolute -bottom-5 whitespace-nowrap text-[10px] text-texto-suave">{b.mes}</small>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 480 140" preserveAspectRatio="none" className="pointer-events-none absolute left-0 top-0 h-[140px] w-full overflow-visible">
                <polyline points="0,90 44,80 88,70 132,60 176,50 220,20" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="220" cy="20" r="4.5" fill="#7c3aed" />
              </svg>
              <div className="absolute top-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white p-2.5 px-3 text-[11px] leading-relaxed shadow-sombra" style={{ left: '46%' }}>
                <strong className="mb-0.5 block text-[11px] text-texto">Junio 2026</strong>
                <span className="block text-texto-suave">Utilidad Neta: S/ 400,000</span>
                <span className="block text-texto-suave">Margen Neto: 8.5%</span>
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5"><i className="h-[3px] w-3.5 flex-none rounded-sm bg-[#22c55e]" /> Utilidad Neta (S/)</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 flex-none rounded-full bg-morado-categoria" /> Margen Neto (%)</span>
            </div>
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px]">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Ventas vs. Proyección</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">Ver detalle</a>
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
              <div className="absolute top-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white p-2.5 px-3 text-[11px] leading-relaxed shadow-sombra" style={{ left: '42%' }}>
                <strong className="mb-0.5 block text-[11px] text-texto">Junio 2026</strong>
                <span className="block text-texto-suave">Ventas: S/ 1,250,000</span>
                <span className="block text-texto-suave">Proyección: S/ 1,380,000</span>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {MESES_EJE_X.map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5"><i className="h-[3px] w-3.5 flex-none rounded-sm bg-morado-categoria" /> Ventas Reales</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-0 w-3.5 flex-none border-t-2 border-dashed border-morado-categoria" /> Proyección</span>
            </div>
          </article>

          <article className="relative min-w-0 rounded-xl border border-borde bg-white p-[18px_20px] max-[1250px]:col-span-2 max-[900px]:col-span-1">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Estructura de Costos</h2>
              <a href="#" className="whitespace-nowrap text-xs font-semibold text-primario no-underline">Ver detalle</a>
            </div>
            <div className="relative mx-auto mb-4 grid h-[130px] w-[130px] place-items-center rounded-full" style={{ background: COSTOS.conic }}>
              <div className="absolute inset-5 rounded-full bg-white" />
              <span className="relative z-10 flex flex-col items-center text-center">
                <strong className="text-xs font-extrabold text-texto">{COSTOS.total}</strong>
                <span className="text-[10px] text-texto-suave">Total de Costos</span>
              </span>
            </div>
            <ul className="m-0 grid list-none gap-2 p-0">
              {COSTOS.items.map((it) => (
                <li key={it.etiqueta} className="flex items-center gap-2 text-xs text-texto">
                  <i className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: it.color }} />
                  {it.etiqueta} <b className="ml-auto font-bold">{it.pct}</b> <small className="min-w-[68px] text-right text-texto-suave">{it.valor}</small>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-base font-bold text-texto">Indicadores por Módulo</h2>
          <a href="#" className="text-xs font-semibold text-primario no-underline">Ver todos los indicadores</a>
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
