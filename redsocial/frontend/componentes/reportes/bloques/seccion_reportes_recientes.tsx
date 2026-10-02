import catalogoReportes from '../../../catalogos/capacidades/redsocial/reportes.json'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Icono } from '../../compartido/icono'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import type { ReporteReciente } from '@/tipos/reportes/modelo_reportes'

const TH = 'whitespace-nowrap border-b border-t-f0eef5 py-0 pb-2.5 pr-2.5 pl-0 text-left text-encabezado-tabla font-semibold uppercase text-texto-suave'
const TD = 'whitespace-nowrap border-b border-t-f7f6fa py-2.5 pr-2.5 pl-0 text-texto'

export function SeccionReportesRecientes({
  REPORTES_RECIENTES,
  CLASES_FORMATO,
}: {
  REPORTES_RECIENTES: ReporteReciente[]
  CLASES_FORMATO: Record<'pdf' | 'excel', string>
}) {
  return (
    <div className="rounded-xl border border-borde bg-white p-5">
      <div className="mb-3.5 border-b border-t-f0eef5 pb-3.5">
        <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoReportes.secciones.reportes_recientes}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-cuerpo tabla-ultima-fila-sin-borde">
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
                    <AvatarImagen className="h-6.5 w-6.5 rounded-full" src={usuarioImg} />
                    <span>{r.autor}</span>
                  </div>
                </td>
                <td className={TD}>{r.fecha}</td>
                <td className={TD}>
                  <span className={`inline-flex items-center gap-1.5 text-etiqueta-estado font-bold ${CLASES_FORMATO[r.formato]}`}>
                    <Icono name="documento" className="h-3.25 w-3.25" /> {r.formato === 'pdf' ? catalogoReportes.formatos.pdf : catalogoReportes.formatos.excel}
                  </span>
                </td>
                <td className={TD}>
                  <div className="flex items-center gap-1">
                    <BotonIcono icono="ver" type="button" aria-label={catalogoReportes.botones.ver} variant="sutil" size="md" />
                    <BotonIcono icono="descargar" type="button" aria-label={catalogoReportes.botones.descargar} variant="sutil" size="md" />
                    <BotonIcono icono="compartir" type="button" aria-label={catalogoReportes.botones.compartir} variant="sutil" size="md" />
                    <BotonIcono icono="puntos" type="button" aria-label={catalogoReportes.botones.mas} variant="sutil" size="md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href="#" className="mt-3.5 block text-center text-enlace-accion font-semibold text-primario no-underline">{catalogoReportes.botones.ver_todos_los_reportes}</a>
    </div>
  )
}
