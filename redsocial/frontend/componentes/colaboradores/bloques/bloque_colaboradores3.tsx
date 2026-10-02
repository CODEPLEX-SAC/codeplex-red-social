import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador, TipoVigenciaRango } from '@/tipos/colaboradores/modelo_colaboradores'

const TIPO_RANGO = catalogoColaboradores.celda_vigencia.tipo_rango as TipoVigenciaRango

export function BloqueColaboradores3({ c }: { c: Colaborador }) {
  return (
    <td className="p-3.5 align-middle">
      <div className="whitespace-nowrap text-auxiliar leading-snug text-gris-texto-secundario">
        {c.vigencia.tipo === TIPO_RANGO ? (
          <span className="block text-auxiliar">
            {c.vigencia.desde}
            <br />
            {catalogoColaboradores.celda_vigencia.conector_hasta} {c.vigencia.hasta}
          </span>
        ) : (
          <>
            <span className="block text-auxiliar text-gris-texto-terciario">{c.vigencia.etiqueta}</span>
            <span className="block text-fecha-abreviada">{c.vigencia.fecha}</span>
          </>
        )}
      </div>
    </td>
  )
}
