import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Radio } from '../../compartido/interfaz/radio'
import { Selector } from '../../compartido/interfaz/selector'
import { BloqueRecordatorios } from './bloque_recordatorios'

export function BloqueRenovacion({
  OPCIONES_RECORDATORIO,
  OPCIONES_ZONA_HORARIA,
}: {
  OPCIONES_RECORDATORIO: string[]
  OPCIONES_ZONA_HORARIA: string[]
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-gris-borde px-5 py-4.5">
        <div className="mb-3.5 flex items-center gap-2">
          <Icono name="actualizar" className="w-5 h-5 text-primario" />
          <h4 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.renovacion}</h4>
        </div>
        <p className="-mt-2 mb-3.5 text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.renovacion_subtitulo}</p>

        <label className="mb-3 flex cursor-pointer items-start gap-2.5">
          <Radio name="renovacion" value="permitir" defaultChecked />
          <span className="flex flex-col gap-0.5">
            <span className="text-campo-formulario font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.permitir_renovacion}</span>
            <span className="text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.permitir_renovacion_detalle}</span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-2.5">
          <Radio name="renovacion" value="no-permitir" />
          <span className="flex flex-col gap-0.5">
            <span className="text-campo-formulario font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.no_permitir_renovacion}</span>
            <span className="text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.no_permitir_renovacion_detalle}</span>
          </span>
        </label>
      </div>

      <BloqueRecordatorios OPCIONES_RECORDATORIO={OPCIONES_RECORDATORIO} />

      <div className="rounded-xl border border-gris-borde px-5 py-4.5">
        <div className="mb-3.5 flex items-center gap-2">
          <Icono name="mundo" className="w-5 h-5 text-primario" />
          <h4 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.zona_horaria}</h4>
        </div>
        <p className="-mt-2 mb-3.5 text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.zona_horaria_subtitulo}</p>
        <Selector variant="colaboradores" defaultValue={OPCIONES_ZONA_HORARIA[0]}>
          {OPCIONES_ZONA_HORARIA.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </div>
    </div>
  )
}
