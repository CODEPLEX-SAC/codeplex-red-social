import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Radio } from '../../compartido/interfaz/radio'
import { Selector } from '../../compartido/interfaz/selector'
import { BloqueRecordatorios } from './bloque_recordatorios'

const clases = catalogoColaboradores.clases.invitar_vigencia
const comun = catalogoColaboradores.clases.invitar_comun
const textos = catalogoColaboradores.campos_vigencia

export function BloqueRenovacion({
  OPCIONES_RECORDATORIO,
  OPCIONES_ZONA_HORARIA,
}: {
  OPCIONES_RECORDATORIO: string[]
  OPCIONES_ZONA_HORARIA: string[]
}) {
  return (
    <div className={clases.columna}>
      <div className={comun.tarjeta_compacta}>
        <div className={clases.cabecera}>
          <Icono name="actualizar" className={comun.glifo_titulo} />
          <h4 className={comun.titulo}>{textos.renovacion}</h4>
        </div>
        <p className={comun.subtitulo}>{textos.renovacion_subtitulo}</p>

        <label className={clases.opcion_media}>
          <Radio name="renovacion" value="permitir" defaultChecked />
          <span className={comun.opcion_textos}>
            <span className={comun.opcion_titulo}>{textos.permitir_renovacion}</span>
            <span className={comun.opcion_detalle}>{textos.permitir_renovacion_detalle}</span>
          </span>
        </label>

        <label className={comun.opcion}>
          <Radio name="renovacion" value="no-permitir" />
          <span className={comun.opcion_textos}>
            <span className={comun.opcion_titulo}>{textos.no_permitir_renovacion}</span>
            <span className={comun.opcion_detalle}>{textos.no_permitir_renovacion_detalle}</span>
          </span>
        </label>
      </div>

      <BloqueRecordatorios OPCIONES_RECORDATORIO={OPCIONES_RECORDATORIO} />

      <div className={comun.tarjeta_compacta}>
        <div className={clases.cabecera}>
          <Icono name="mundo" className={comun.glifo_titulo} />
          <h4 className={comun.titulo}>{textos.zona_horaria}</h4>
        </div>
        <p className={comun.subtitulo}>{textos.zona_horaria_subtitulo}</p>
        <Selector variant="colaboradores" defaultValue={OPCIONES_ZONA_HORARIA[0]}>
          {OPCIONES_ZONA_HORARIA.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </div>
    </div>
  )
}
