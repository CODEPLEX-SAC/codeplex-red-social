import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador, TipoVigenciaRango } from '@/tipos/colaboradores/modelo_colaboradores'
import { CLASES_TABLA } from '../../compartido/clases_tabla'

const TIPO_RANGO = catalogoColaboradores.celda_vigencia.tipo_rango as TipoVigenciaRango

export function BloqueColaboradores3({ c }: { c: Colaborador }) {
  return (
    <td className={`${CLASES_TABLA.celda} ${CLASES_TABLA.columnas.periodo}`}>
      <div className="whitespace-nowrap text-auxiliar leading-texto text-texto-suave">
        {c.vigencia.tipo === TIPO_RANGO ? (
          <span className="block text-auxiliar">
            {c.vigencia.desde}
            <br />
            {catalogoColaboradores.celda_vigencia.conector_hasta} {c.vigencia.hasta}
          </span>
        ) : (
          <>
            <span className="block text-auxiliar text-texto-suave">{c.vigencia.etiqueta}</span>
            <span className="block text-fecha-abreviada">{c.vigencia.fecha}</span>
          </>
        )}
      </div>
    </td>
  )
}
