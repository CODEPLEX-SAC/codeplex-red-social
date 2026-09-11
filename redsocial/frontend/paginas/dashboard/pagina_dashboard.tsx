import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { Boton } from '../../componentes/compartido/interfaz/boton'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import { Insignia } from '../../componentes/compartido/interfaz/insignia'
import type { Kpi, Modulo } from '@/tipos/dashboard/pagina_dashboard'

const CLASES_ICONO_KPI: Record<Kpi['color'], string> = {
  azul: 'bg-[#dbeafe] text-azul-categoria',
  rojo: 'bg-[#fee2e2] text-[#ef4444]',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  cian: 'bg-[#cffafe] text-[#06b6d4]',
}

const KPIS: Kpi[] = [
  {
    icono: 'documento', color: 'azul', etiqueta: 'Ventas del mes', valor: 'S/ 1,250,000',
    variacion: { direccion: 'positiva', texto: '12.5%' },
    sparklinePuntos: '0,20 14,16 28,18 42,10 56,13 70,7 84,10 100,4', sparklineColor: '#3b82f6',
  },
  {
    icono: 'tarjeta-pago', color: 'rojo', etiqueta: 'Egresos del mes', valor: 'S/ 850,000',
    variacion: { direccion: 'negativa', texto: '8.3%' },
    sparklinePuntos: '0,6 14,12 28,8 42,16 56,12 70,20 84,15 100,18', sparklineColor: '#ef4444',
  },
  {
    icono: 'documento', color: 'azul', etiqueta: 'Utilidad neta', valor: 'S/ 400,000',
    variacion: { direccion: 'positiva', texto: '18.7%' },
    sparklinePuntos: '0,20 14,17 28,19 42,13 56,15 70,9 84,12 100,5', sparklineColor: '#3b82f6',
  },
  {
    icono: 'documento', color: 'morado', etiqueta: 'Margen de utilidad', valor: '32.0%',
    variacion: { direccion: 'positiva', texto: '4.5 pp' },
    sparklinePuntos: '0,16 14,19 28,12 42,14 56,8 70,11 84,6 100,9', sparklineColor: '#7c3aed',
  },
  {
    icono: 'documento', color: 'cian', etiqueta: 'Flujo de caja', valor: 'S/ 320,000',
    variacion: { direccion: 'positiva', texto: '22.1%' },
    sparklinePuntos: '0,18 14,9 28,15 42,7 56,17 70,5 84,13 100,10', sparklineColor: '#06b6d4',
  },
]

const RATIOS = [
  { nombre: 'Liquidez corriente', valor: '2.15', estado: 'optimo' as const },
  { nombre: 'Prueba ácida', valor: '1.48', estado: 'optimo' as const },
  { nombre: 'Endeudamiento', valor: '0.35', estado: 'bajo' as const },
  { nombre: 'ROE', valor: '18.6%', estado: 'optimo' as const },
  { nombre: 'ROA', valor: '11.2%', estado: 'optimo' as const },
  { nombre: 'Rotación de inventario', valor: '6.8', estado: 'optimo' as const },
]

const CLASES_ESTADO_DASH = {
  optimo: { color: '#16a34a', background: '#dcfce7' },
  aceptable: { color: '#a16207', background: '#fef9c3' },
  bajo: { color: '#b45309', background: '#fef3c7' },
  riesgo: { color: '#dc2626', background: '#fee2e2' },
}

const CLASES_ICONO_MODULO: Record<Modulo['color'], string> = {
  verde: 'bg-[#dcfce7] text-verde-categoria',
  azul: 'bg-[#dbeafe] text-azul-categoria',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  cian: 'bg-[#cffafe] text-[#06b6d4]',
}

const MODULOS: Modulo[] = [
  { icono: 'planillas', color: 'verde', nombre: 'Planillas', filas: [{ etiqueta: 'Empleados activos', valor: '120' }, { etiqueta: 'Planilla de junio', valor: 'Generada', badge: { estado: 'optimo', texto: 'Generada' } }] },
  { icono: 'moneda', color: 'azul', nombre: 'Contabilidad', filas: [{ etiqueta: 'Asientos del mes', valor: '152' }, { etiqueta: 'Estados financieros', valor: 'Actualizados' }] },
  { icono: 'caja', color: 'naranja', nombre: 'Inventarios', filas: [{ etiqueta: 'Productos activos', valor: '1,248' }, { etiqueta: 'Stock valorizado', valor: 'S/ 2,350,000' }] },
  { icono: 'maletin', color: 'morado', nombre: 'Proyectos', filas: [{ etiqueta: 'Proyectos en curso', valor: '8' }, { etiqueta: 'Avance promedio', valor: '65%' }] },
  { icono: 'carrito', color: 'cian', nombre: 'Ventas', filas: [{ etiqueta: 'Pedidos del mes', valor: '78' }, { etiqueta: 'Facturación del mes', valor: 'S/ 1,250,000' }] },
]

const RANKING = [
  { nombre: 'Cemento Tipo I (42.5 kg)', ancho: '100%', cantidad: '1,250', valor: 'S/ 125,000' },
  { nombre: 'Acero de Construcción 1/2"', ancho: '78%', cantidad: '980', valor: 'S/ 98,000' },
  { nombre: 'Ladrillo King Kong 18 huecos', ancho: '68%', cantidad: '850', valor: 'S/ 68,000' },
  { nombre: 'Arena Gruesa', ancho: '58%', cantidad: '720', valor: 'S/ 43,000' },
  { nombre: 'Pintura Látex Blanca 4L', ancho: '49%', cantidad: '610', valor: 'S/ 30,500' },
]

const BARRAS_PROYECCION = [
  { mes: 'Jun', valor: '75%', tipo: 'real' as const },
  { mes: 'Jul', valor: '80%', tipo: 'real' as const },
  { mes: 'Ago', valor: '88%', tipo: 'real' as const },
  { mes: 'Sep', valor: '100%', tipo: 'proyeccion' as const },
  { mes: 'Oct', valor: '92%', tipo: 'proyeccion' as const },
  { mes: 'Nov', valor: '96%', tipo: 'proyeccion' as const },
]

const DONA_SEGMENTOS = [
  { etiqueta: 'Construcción', color: '#3b82f6', porcentaje: '45%', monto: 'S/ 562,500' },
  { etiqueta: 'Consultoría', color: '#7c3aed', porcentaje: '25%', monto: 'S/ 312,500' },
  { etiqueta: 'Servicios', color: '#22c55e', porcentaje: '20%', monto: 'S/ 250,000' },
  { etiqueta: 'Otros', color: '#eab308', porcentaje: '10%', monto: 'S/ 125,000' },
]

const ETIQUETA_RATIO: Record<keyof typeof CLASES_ESTADO_DASH, string> = {
  optimo: 'Óptimo',
  aceptable: 'Aceptable',
  bajo: 'Bajo',
  riesgo: 'Riesgo',
}

function EstadoBadge({ estado, children }: { estado: keyof typeof CLASES_ESTADO_DASH; children: string }) {
  const c = CLASES_ESTADO_DASH[estado]
  return (
    <Insignia variant="status" color={c.color} background={c.background}>
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
              ¡Buenos días, Pedro! <span className="text-[20px]">👋</span>
            </h1>
            <p className="m-0 mt-1 text-[13px] text-texto-suave">Aquí tienes el resumen de tu empresa al 15 de junio de 2026.</p>
          </div>
          <div className="flex flex-wrap items-end gap-3.5 max-[900px]:items-stretch max-[900px]:justify-stretch">
            <Selector variant="default" label="Periodo actual">
              <option>Junio 2026</option>
              <option>Mayo 2026</option>
            </Selector>
            <Boton variant="primario" size="md" className="max-[900px]:w-full max-[900px]:justify-center">
              <Icono name="ajustes-sistema" className="w-4 h-4" /> Personalizar dashboard
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
                  {kpi.variacion.texto} <em className="ml-0.5 font-medium not-italic text-texto-suave">vs. Mayo 2026</em>
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
              <h2 className="m-0 text-[15px] font-bold text-texto">Evolución de ventas</h2>
              <div className="flex items-center gap-2">
                <Selector variant="mini">
                  <option>Mensual</option>
                  <option>Semanal</option>
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
              <div className="absolute top-[30px] -translate-x-1/2 whitespace-nowrap rounded-lg bg-texto px-3 py-1.5 text-[11px] font-bold text-white" style={{ left: '50%' }}>
                S/ 1,250,000
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-[3px] w-3.5 rounded-sm bg-[#7c3aed] not-italic" /> Ventas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-0 w-3.5 border-t-2 border-dashed border-[#7c3aed] not-italic" /> Proyección
              </span>
            </div>
          </article>

          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Composición de ingresos</h2>
            </div>
            <div
              className="relative mx-auto mb-4 grid h-[130px] w-[130px] place-items-center rounded-full"
              style={{ background: 'conic-gradient(#3b82f6 0% 45%, #7c3aed 45% 70%, #22c55e 70% 90%, #eab308 90% 100%)' }}
            >
              <div className="absolute inset-5 rounded-full bg-white" />
              <span className="relative z-[1] flex flex-col items-center text-center">
                <strong className="text-xs font-extrabold text-texto">S/ 1,250,000</strong>
                <span className="text-[10px] text-texto-suave">Total</span>
              </span>
            </div>
            <ul className="m-0 grid list-none gap-2 p-0">
              {DONA_SEGMENTOS.map((s) => (
                <li key={s.etiqueta} className="flex items-center gap-2 text-xs text-texto">
                  <i className="h-2.5 w-2.5 flex-none rounded-full not-italic" style={{ background: s.color }} />
                  {s.etiqueta} <b className="ml-auto font-bold">{s.porcentaje}</b>
                  <small className="min-w-[68px] text-right text-texto-suave">{s.monto}</small>
                </li>
              ))}
            </ul>
          </article>

          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Ratios financieros</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">Ver todos</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap py-0 pb-2 pr-2 text-left text-[9.5px] text-texto-suave">Ratio</th>
                    <th className="whitespace-nowrap py-0 pb-2 pr-2 text-left text-[9.5px] text-texto-suave">Valor</th>
                    <th className="whitespace-nowrap py-0 pb-2 pr-2 text-left text-[9.5px] text-texto-suave">Estado</th>
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
          <h2 className="m-0 text-base font-bold text-texto">Resumen por módulo</h2>
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
              <a href="#" className="mt-0.5 text-xs font-semibold text-primario no-underline">Ver detalles</a>
            </article>
          ))}
        </div>

        <div className="mb-5 grid grid-cols-3 items-stretch gap-4 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1">
          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Top 5 productos más vendidos</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">Ver reporte</a>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0">
              {RANKING.map((p) => (
                <li key={p.nombre} className="grid grid-cols-[140px_1fr_44px_76px] items-center gap-2.5 max-[900px]:grid-cols-[110px_1fr_40px_66px]">
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-texto">{p.nombre}</span>
                  <div className="h-2 overflow-hidden rounded bg-[#f0eef5]">
                    <span className="block h-full rounded bg-primario" style={{ width: p.ancho }} />
                  </div>
                  <span className="text-right text-[11px] text-texto-suave">{p.cantidad}</span>
                  <span className="whitespace-nowrap text-right text-[11px] font-bold text-texto">{p.valor}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Proyección de ventas</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">Ver detalle</a>
            </div>
            <div className="relative">
              <div className="flex h-[170px] items-end gap-2.5 pt-2.5">
                {BARRAS_PROYECCION.map((b) => (
                  <div key={b.mes} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                    <span
                      className={'block w-full max-w-[34px] rounded-t ' + (b.tipo === 'real' ? 'bg-[#7c3aed]' : 'bg-[#e4defb]')}
                      style={{ height: b.valor }}
                    />
                    <small className="text-[10px] text-texto-suave">{b.mes}</small>
                  </div>
                ))}
              </div>
              <div className="absolute top-[22px] left-[62%] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-borde bg-white px-3 py-2 text-[11px] shadow-sombra">
                <strong className="mb-0.5 block text-[11px] text-texto">Octubre 2026</strong>
                <span className="block text-texto-suave">Proyección: S/ 1,650,000</span>
              </div>
            </div>
            <div className="mt-3 flex gap-4.5 text-xs text-texto-suave">
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-[3px] w-3.5 rounded-sm bg-[#7c3aed] not-italic" /> Ventas reales
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="inline-block h-2.5 w-2.5 rounded-full bg-[#e4defb] not-italic" /> Proyección
              </span>
            </div>
          </article>

          <article className="min-w-0 rounded-[10px] border border-gris-borde bg-white p-[18px_20px] shadow-sombra">
            <div className="mb-3.5 flex items-center justify-between border-b border-[#f0eef5] pb-3.5">
              <h2 className="m-0 text-[15px] font-bold text-texto">Flujo de caja proyectado</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline">Ver detalle</a>
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
              <div className="absolute top-[30px] -translate-x-1/2 whitespace-nowrap rounded-lg border border-borde bg-white px-3 py-1.5 text-[11px] shadow-sombra" style={{ left: '80%' }}>
                <strong className="mb-0.5 block text-[11px] font-bold text-texto">Noviembre 2026</strong>
                <span className="block text-texto-suave">Flujo proyectado: S/ 385,000</span>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-texto-suave">
                {['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((m) => (
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
