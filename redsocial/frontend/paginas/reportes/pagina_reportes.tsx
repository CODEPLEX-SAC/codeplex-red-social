import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import { useCarrusel } from '../../ganchos/compartido/usar_carrusel'
import type { IconName } from '../../tipos/compartido/icono'
import type { MiniGrafico, Plantilla, ReporteReciente } from '@/tipos/reportes/pagina_reportes'

const CLASES_ICONO_PLANTILLA: Record<Plantilla['color'], string> = {
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  verde: 'bg-[#dcfce7] text-verde-categoria',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
  azul: 'bg-[#dbeafe] text-azul-categoria',
  rojo: 'bg-[#fee2e2] text-[#ef4444]',
}

const PLANTILLAS: Plantilla[] = [
  {
    nombre: 'Estado de Resultados', icono: 'documento', color: 'morado',
    descripcion: 'Resumen de ingresos, costos y gastos para determinar la utilidad neta.',
    modulo: 'Contabilidad',
    grafico: { tipo: 'barras', barras: [
      { v: '35%', c: '#c4b5fd' }, { v: '55%', c: '#c4b5fd' }, { v: '45%', c: '#7c3aed' },
      { v: '75%', c: '#c4b5fd' }, { v: '90%', c: '#7c3aed' }, { v: '60%', c: '#c4b5fd' },
    ] },
  },
  {
    nombre: 'Balance General', icono: 'documento', color: 'verde',
    descripcion: 'Situación financiera de la empresa en una fecha determinada.',
    modulo: 'Contabilidad',
    grafico: { tipo: 'linea', color: '#22c55e', puntos: '0,30 20,26 40,32 60,18 80,22 100,10 120,14' },
  },
  {
    nombre: 'Flujo de Caja', icono: 'actualizar', color: 'naranja',
    descripcion: 'Entradas y salidas de efectivo en el periodo seleccionado.',
    modulo: 'Tesorería',
    grafico: { tipo: 'barras', barras: [
      { v: '30%', c: '#fed7aa' }, { v: '50%', c: '#fed7aa' }, { v: '65%', c: '#f97316' },
      { v: '45%', c: '#fed7aa' }, { v: '85%', c: '#f97316' }, { v: '55%', c: '#fed7aa' },
    ] },
  },
  {
    nombre: 'Ventas por Producto', icono: 'ventas', color: 'azul',
    descripcion: 'Análisis de productos más vendidos y su rentabilidad.',
    modulo: 'Ventas',
    grafico: { tipo: 'dona-lista', conic: 'conic-gradient(#3b82f6 0% 60%, #93c5fd 60% 100%)' },
  },
  {
    nombre: 'Cuentas por Cobrar', icono: 'documento', color: 'verde',
    descripcion: 'Detalle de saldos pendientes de cobro de clientes.',
    modulo: 'Contabilidad',
    grafico: { tipo: 'lista' },
  },
  {
    nombre: 'Cuentas por Pagar', icono: 'documento', color: 'rojo',
    descripcion: 'Detalle de saldos pendientes de pago a proveedores.',
    modulo: 'Contabilidad',
    grafico: { tipo: 'lista' },
  },
  {
    nombre: 'Inventario Valorizado', icono: 'caja', color: 'morado',
    descripcion: 'Valor total del inventario por categoría y almacén.',
    modulo: 'Inventarios',
    grafico: { tipo: 'barras', barras: [
      { v: '40%', c: '#ddd6fe' }, { v: '60%', c: '#ddd6fe' }, { v: '50%', c: '#7c3aed' },
      { v: '80%', c: '#ddd6fe' }, { v: '95%', c: '#7c3aed' }, { v: '65%', c: '#ddd6fe' },
    ] },
  },
  {
    nombre: 'Rotación de Inventario', icono: 'actualizar', color: 'azul',
    descripcion: 'Análisis de rotación y días de inventario.',
    modulo: 'Inventarios',
    grafico: { tipo: 'linea', color: '#3b82f6', puntos: '0,20 20,30 40,15 60,25 80,12 100,22 120,8' },
  },
  {
    nombre: 'Planilla de Empleados', icono: 'planillas', color: 'verde',
    descripcion: 'Resumen de remuneraciones y beneficios del personal.',
    modulo: 'Planillas',
    grafico: { tipo: 'lista' },
  },
  {
    nombre: 'Rentabilidad por Proyecto', icono: 'maletin', color: 'morado',
    descripcion: 'Análisis de ingresos, costos y utilidad por proyecto.',
    modulo: 'Proyectos',
    grafico: { tipo: 'barras', barras: [
      { v: '45%', c: '#ddd6fe' }, { v: '65%', c: '#7c3aed' }, { v: '55%', c: '#ddd6fe' },
      { v: '85%', c: '#7c3aed' }, { v: '70%', c: '#ddd6fe' }, { v: '90%', c: '#7c3aed' },
    ] },
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

const REPORTES_RECIENTES: ReporteReciente[] = [
  { nombre: 'Estado de Resultados', modulo: 'Contabilidad', periodo: 'Junio 2026', autor: 'Pedro Lozano', fecha: '15/06/2026 09:15 AM', formato: 'pdf' },
  { nombre: 'Flujo de Caja', modulo: 'Tesorería', periodo: 'Junio 2026', autor: 'María Fernández', fecha: '15/06/2026 08:45 AM', formato: 'excel' },
  { nombre: 'Ventas por Producto', modulo: 'Ventas', periodo: 'Junio 2026', autor: 'Luis Rodríguez', fecha: '14/06/2026 06:30 PM', formato: 'pdf' },
  { nombre: 'Inventario Valorizado', modulo: 'Inventarios', periodo: 'Junio 2026', autor: 'Ana García', fecha: '14/06/2026 04:20 PM', formato: 'excel' },
  { nombre: 'Balance General', modulo: 'Contabilidad', periodo: 'Mayo 2026', autor: 'Pedro Lozano', fecha: '13/06/2026 11:10 AM', formato: 'pdf' },
]

const CLASES_FORMATO: Record<'pdf' | 'excel', string> = {
  pdf: 'text-[#dc2626]',
  excel: 'text-[#16a34a]',
}

const ANCHOS_MINI_LISTA = ['92%', '70%', '84%', '55%']
const ANCHOS_MINI_LINEAS_DONA = ['100%', '75%', '60%']

const TH = 'whitespace-nowrap border-b border-[#f0eef5] py-0 pb-2.5 pr-2.5 pl-0 text-left text-[10px] font-semibold uppercase text-texto-suave'
const TD = 'whitespace-nowrap border-b border-[#f7f6fa] py-2.5 pr-2.5 pl-0 text-texto'

function MiniGraficoPlantilla({ grafico }: { grafico: MiniGrafico }) {
  if (grafico.tipo === 'barras') {
    return (
      <div className="mt-0.5 flex h-[46px] items-end gap-[5px]">
        {grafico.barras.map((b, i) => (
          <span key={i} className="flex-1 rounded-t-sm" style={{ height: b.v, background: b.c }} />
        ))}
      </div>
    )
  }
  if (grafico.tipo === 'linea') {
    return (
      <svg viewBox="0 0 120 40" preserveAspectRatio="none" className="mt-0.5 block h-[46px] w-full">
        <polyline points={grafico.puntos} fill="none" stroke={grafico.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        {grafico.puntos.split(' ').map((p) => {
          const [cx, cy] = p.split(',')
          return <circle key={p} cx={cx} cy={cy} r="2.4" fill={grafico.color} />
        })}
      </svg>
    )
  }
  if (grafico.tipo === 'dona-lista') {
    return (
      <div className="mt-0.5 flex items-center gap-3">
        <div className="relative h-[42px] w-[42px] flex-none rounded-full" style={{ background: grafico.conic }}>
          <div className="absolute inset-[10px] rounded-full bg-white" />
        </div>
        <div className="grid flex-1 gap-[7px]">
          {ANCHOS_MINI_LINEAS_DONA.map((w) => (
            <span key={w} className="block h-[7px] rounded-full bg-[#f0eef5]" style={{ width: w }} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="mt-1 grid gap-[7px]">
      {ANCHOS_MINI_LISTA.map((w) => (
        <span key={w} className="block h-[7px] rounded-full bg-[#f0eef5]" style={{ width: w }} />
      ))}
    </div>
  )
}

export function PaginaReportes() {
  const modulos = useCarrusel()

  return (
    <EstructuraApp paginaActiva="reportes">
      <div className="mx-auto max-w-[1680px]">
        <div className="mb-5 flex items-start justify-between gap-5 max-[900px]:flex-col max-[900px]:items-stretch">
          <div>
            <h1 className="m-0 text-[22px] font-extrabold text-texto">Reportes</h1>
            <p className="m-0 mt-1 text-[13px] text-texto-suave">Genera y consulta reportes de tu empresa. Exporta, programa y comparte información clave.</p>
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
          className="mb-6 flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-base font-bold text-texto">Plantillas de reportes</h2>
          <a href="#" className="text-xs font-semibold text-primario no-underline">Ver todas las plantillas</a>
        </div>
        <div className="mb-7 grid grid-cols-5 gap-4 max-[1250px]:grid-cols-3 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1">
          {PLANTILLAS.map((p) => (
            <article key={p.nombre} className="flex min-w-0 flex-col gap-2 rounded-xl border border-borde bg-white p-4">
              <div className="flex items-center gap-2.5">
                <span className={`grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] ${CLASES_ICONO_PLANTILLA[p.color]}`}>
                  <Icono name={p.icono} className="h-4 w-4" />
                </span>
                <strong className="text-[13px] font-bold leading-tight text-texto">{p.nombre}</strong>
              </div>
              <p className="m-0 min-h-[32px] text-[11.5px] leading-[1.45] text-texto-suave">{p.descripcion}</p>
              <span className="text-[10.5px] font-semibold text-texto-suave">{p.modulo}</span>
              <MiniGraficoPlantilla grafico={p.grafico} />
              <div className="mt-1 flex items-center justify-between border-t border-[#f5f3fa] pt-2">
                <button type="button" aria-label="Favorito" className="grid h-[26px] w-[26px] place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                  <Icono name="estrella" className="h-[15px] w-[15px]" />
                </button>
                <button type="button" aria-label="Más opciones" className="grid h-[26px] w-[26px] place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                  ⋯
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-xl border border-borde bg-white p-5">
          <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
            <h2 className="m-0 text-[15px] font-bold text-texto">Reportes recientes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[12.5px] [&_tbody_tr:last-child_td]:border-b-0">
              <thead>
                <tr>
                  <th className={TH}>Nombre del reporte</th>
                  <th className={TH}>Módulo</th>
                  <th className={TH}>Periodo</th>
                  <th className={TH}>Generado por</th>
                  <th className={TH}>Fecha de generación</th>
                  <th className={TH}>Formato</th>
                  <th className={TH}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {REPORTES_RECIENTES.map((r) => (
                  <tr key={r.nombre + r.fecha}>
                    <td className={TD}><strong>{r.nombre}</strong></td>
                    <td className={TD}>{r.modulo}</td>
                    <td className={TD}>{r.periodo}</td>
                    <td className={TD}>
                      <div className="flex items-center gap-2">
                        <img className="h-[26px] w-[26px] rounded-full object-cover" src="/imagenes/usuario.jpg" alt="" />
                        <span>{r.autor}</span>
                      </div>
                    </td>
                    <td className={TD}>{r.fecha}</td>
                    <td className={TD}>
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${CLASES_FORMATO[r.formato]}`}>
                        <Icono name="documento" className="h-[13px] w-[13px]" /> {r.formato === 'pdf' ? 'PDF' : 'Excel'}
                      </span>
                    </td>
                    <td className={TD}>
                      <div className="flex items-center gap-1">
                        <button type="button" aria-label="Ver" className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                          <Icono name="ver" className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" aria-label="Descargar" className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                          <Icono name="descargar" className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" aria-label="Compartir" className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                          <Icono name="compartir" className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" aria-label="Más" className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                          <Icono name="puntos" className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a href="#" className="mt-3.5 block text-center text-[12.5px] font-semibold text-primario no-underline">Ver todos los reportes</a>
        </div>
      </div>
    </EstructuraApp>
  )
}
