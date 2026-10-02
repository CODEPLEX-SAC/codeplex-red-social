import catalogoReportes from '../../../catalogos/capacidades/redsocial/reportes.json'
import { Selector } from '../../compartido/interfaz/selector'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { SeccionReportesRecientes } from './seccion_reportes_recientes'
import type { IconName } from '../../../tipos/compartido/contrato_icono'
import type { Plantilla, MiniGrafico, ReporteReciente } from '@/tipos/reportes/modelo_reportes'

const MODULOS_TABS: { etiqueta: string; icono: IconName }[] = catalogoReportes.modulos_tabs as { etiqueta: string; icono: IconName }[]

export function SeccionPlantillasDeReportes({
  modulos,
  PLANTILLAS,
  CLASES_ICONO_PLANTILLA,
  MiniGraficoPlantilla,
  REPORTES_RECIENTES,
  CLASES_FORMATO,
}: {
  modulos: { pistaRef: React.RefObject<HTMLDivElement | null>; }
  PLANTILLAS: Plantilla[]
  CLASES_ICONO_PLANTILLA: Record<'morado' | 'verde' | 'naranja' | 'azul' | 'rojo', string>
  MiniGraficoPlantilla: ({ grafico }: { grafico: MiniGrafico; }) => React.JSX.Element
  REPORTES_RECIENTES: ReporteReciente[]
  CLASES_FORMATO: Record<'pdf' | 'excel', string>
}) {
  return (
    <div className="mx-auto max-w-420">
      <div className="mb-5 flex items-start justify-between gap-5 max-900:flex-col max-900:items-stretch">
        <div>
          <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">{catalogoReportes.titulos.principal}</h1>
          <p className="m-0 mt-1 text-subtitulo text-texto-suave">{catalogoReportes.subtitulos.principal}</p>
        </div>
        <div className="flex flex-wrap items-end gap-3.5 max-480:flex-col max-480:items-stretch">
          <Selector variant="default" label={catalogoReportes.selectores.periodo.etiqueta}>
            {catalogoReportes.selectores.periodo.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
          <Selector variant="default" label={catalogoReportes.selectores.comparar_con.etiqueta}>
            {catalogoReportes.selectores.comparar_con.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
          <Boton type="button" variant="contorno" size="md" className="flex-none max-900:w-full max-900:justify-center">
            <Icono name="filtro" className="h-3.75 w-3.75" /> {catalogoReportes.botones.filtros_avanzados}
          </Boton>
        </div>
      </div>

      <div
        ref={modulos.pistaRef}
        className="mb-6 flex gap-2 overflow-x-auto scrollbar-oculto"
      >
        {MODULOS_TABS.map((m, i) => (
          <Boton key={m.etiqueta} type="button" variant="filtro" size="md" activo={i === 0}>
            <Icono name={m.icono} className="h-3.75 w-3.75" /> {m.etiqueta}
          </Boton>
        ))}
      </div>

      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoReportes.secciones.plantillas_de_reportes}</h2>
        <a href="#" className="text-enlace-accion font-semibold text-primario no-underline">{catalogoReportes.botones.ver_todas_las_plantillas}</a>
      </div>
      <div className="mb-7 grid grid-cols-5 gap-4 max-1250:grid-cols-3 max-900:grid-cols-2 max-480:grid-cols-1">
        {PLANTILLAS.map((p) => (
          <article key={p.nombre} className="flex min-w-0 flex-col gap-2 rounded-xl border border-borde bg-white p-4">
            <div className="flex items-center gap-2.5">
              <span className={`grid h-8.5 w-8.5 flex-none place-items-center rounded-9 ${CLASES_ICONO_PLANTILLA[p.color]}`}>
                <Icono name={p.icono} className="h-4 w-4" />
              </span>
              <strong className="text-nombre-entidad font-bold leading-tight text-texto">{p.nombre}</strong>
            </div>
            <p className="m-0 min-h-8 text-cuerpo leading-1.45 text-texto-suave">{p.descripcion}</p>
            <span className="text-auxiliar font-semibold text-texto-suave">{p.modulo}</span>
            <MiniGraficoPlantilla grafico={p.grafico} />
            <div className="mt-1 flex items-center justify-between border-t border-t-f5f3fa pt-2">
              <BotonIcono icono="estrella" type="button" aria-label={catalogoReportes.botones.favorito} variant="sutil" size="md" />
              <BotonIcono icono="puntos" type="button" aria-label={catalogoReportes.botones.mas_opciones} variant="sutil" size="md" />
            </div>
          </article>
        ))}
      </div>

      <SeccionReportesRecientes REPORTES_RECIENTES={REPORTES_RECIENTES} CLASES_FORMATO={CLASES_FORMATO} />
    </div>
  )
}
