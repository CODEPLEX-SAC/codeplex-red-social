import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoReportes from '../../catalogos/capacidades/redsocial/reportes.json'
import { Selector } from '../../componentes/compartido/interfaz/selector'
import { SuperficieColor } from '../../componentes/compartido/interfaz/superficie_color'
import { MedidaDinamica } from '../../componentes/compartido/interfaz/medida_dinamica'
import { useCarrusel } from '../../componentes/compartido/usar_carrusel'
import type { IconName } from '../../tipos/compartido/icono'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { MiniGrafico, Plantilla } from '@/tipos/reportes/pagina_reportes'
import { PLANTILLAS, REPORTES_RECIENTES } from '../../datos/reportes/reportes'

const CLASES_ICONO_PLANTILLA: Record<Plantilla['color'], string> = {
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  verde: 'bg-[#dcfce7] text-verde-categoria',
  naranja: 'bg-[#ffedd5] text-naranja-categoria',
  azul: 'bg-[#dbeafe] text-azul-categoria',
  rojo: 'bg-[#fee2e2] text-[#ef4444]',
}

const MODULOS_TABS: { etiqueta: string; icono: IconName }[] = catalogoReportes.modulos_tabs as { etiqueta: string; icono: IconName }[]

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
          <MedidaDinamica key={i} alto={b.v} color={b.c} className="flex-1 rounded-t-sm" />
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
        <SuperficieColor color={grafico.conic} className="relative h-[42px] w-[42px] flex-none rounded-full">
          <div className="absolute inset-[10px] rounded-full bg-white" />
        </SuperficieColor>
        <div className="grid flex-1 gap-[7px]">
          {ANCHOS_MINI_LINEAS_DONA.map((w) => (
            <MedidaDinamica key={w} ancho={w} className="block h-[7px] rounded-full bg-[#f0eef5]" />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="mt-1 grid gap-[7px]">
      {ANCHOS_MINI_LISTA.map((w) => (
        <MedidaDinamica key={w} ancho={w} className="block h-[7px] rounded-full bg-[#f0eef5]" />
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
            <h1 className="m-0 text-[22px] font-extrabold text-texto">{catalogoReportes.titulos.principal}</h1>
            <p className="m-0 mt-1 text-[13px] text-texto-suave">{catalogoReportes.subtitulos.principal}</p>
          </div>
          <div className="flex flex-wrap items-end gap-3.5 max-[480px]:flex-col max-[480px]:items-stretch">
            <Selector variant="default" label={catalogoReportes.selectores.periodo.etiqueta}>
              {catalogoReportes.selectores.periodo.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <Selector variant="default" label={catalogoReportes.selectores.comparar_con.etiqueta}>
              {catalogoReportes.selectores.comparar_con.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <button
              type="button"
              className="inline-flex h-[38px] flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-primario bg-white px-4 text-[13px] font-semibold text-primario hover:bg-[#f5f3ff] max-[900px]:w-full max-[900px]:justify-center"
            >
              <Icono name="filtro" className="h-[15px] w-[15px]" /> {catalogoReportes.botones.filtros_avanzados}
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
          <h2 className="m-0 text-base font-bold text-texto">{catalogoReportes.secciones.plantillas_de_reportes}</h2>
          <a href="#" className="text-xs font-semibold text-primario no-underline">{catalogoReportes.botones.ver_todas_las_plantillas}</a>
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
                <button type="button" aria-label={catalogoReportes.botones.favorito} className="grid h-[26px] w-[26px] place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                  <Icono name="estrella" className="h-[15px] w-[15px]" />
                </button>
                <button type="button" aria-label={catalogoReportes.botones.mas_opciones} className="grid h-[26px] w-[26px] place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                  ⋯
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-xl border border-borde bg-white p-5">
          <div className="mb-3.5 border-b border-[#f0eef5] pb-3.5">
            <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoReportes.secciones.reportes_recientes}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[12.5px] [&_tbody_tr:last-child_td]:border-b-0">
              <thead>
                <tr>
                  <th className={TH}>{catalogoReportes.tabla.nombre_del_reporte}</th>
                  <th className={TH}>{catalogoReportes.tabla.modulo}</th>
                  <th className={TH}>{catalogoReportes.tabla.periodo}</th>
                  <th className={TH}>{catalogoReportes.tabla.generado_por}</th>
                  <th className={TH}>{catalogoReportes.tabla.fecha_de_generacion}</th>
                  <th className={TH}>{catalogoReportes.tabla.formato}</th>
                  <th className={TH}>{catalogoReportes.tabla.columna_acciones}</th>
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
                        <img className="h-[26px] w-[26px] rounded-full object-cover" src={usuarioImg} alt="" />
                        <span>{r.autor}</span>
                      </div>
                    </td>
                    <td className={TD}>{r.fecha}</td>
                    <td className={TD}>
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${CLASES_FORMATO[r.formato]}`}>
                        <Icono name="documento" className="h-[13px] w-[13px]" /> {r.formato === 'pdf' ? catalogoReportes.formatos.pdf : catalogoReportes.formatos.excel}
                      </span>
                    </td>
                    <td className={TD}>
                      <div className="flex items-center gap-1">
                        <button type="button" aria-label={catalogoReportes.botones.ver} className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                          <Icono name="ver" className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" aria-label={catalogoReportes.botones.descargar} className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                          <Icono name="descargar" className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" aria-label={catalogoReportes.botones.compartir} className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                          <Icono name="compartir" className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" aria-label={catalogoReportes.botones.mas} className="grid h-7 w-7 place-items-center rounded-md border-0 bg-transparent text-texto-suave hover:bg-[#f5f3ff] hover:text-primario">
                          <Icono name="puntos" className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <a href="#" className="mt-3.5 block text-center text-[12.5px] font-semibold text-primario no-underline">{catalogoReportes.botones.ver_todos_los_reportes}</a>
        </div>
      </div>
    </EstructuraApp>
  )
}
