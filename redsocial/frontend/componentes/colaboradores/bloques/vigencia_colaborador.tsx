import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador, TipoVigenciaRango } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.tabla_vigencia
const TIPO_RANGO = catalogoColaboradores.celda_vigencia.tipo_rango as TipoVigenciaRango

export function VigenciaColaborador({ c }: { c: Colaborador }) {
  return (
    <div className={clases.contenedor}>
      {c.vigencia.tipo === TIPO_RANGO ? (
        <span className={clases.linea}>
          {c.vigencia.desde}
          <br />
          {catalogoColaboradores.celda_vigencia.conector_hasta} {c.vigencia.hasta}
        </span>
      ) : (
        <>
          <span className={clases.linea}>{c.vigencia.etiqueta}</span>
          <span className={clases.fecha}>{c.vigencia.fecha}</span>
        </>
      )}
    </div>
  )
}
