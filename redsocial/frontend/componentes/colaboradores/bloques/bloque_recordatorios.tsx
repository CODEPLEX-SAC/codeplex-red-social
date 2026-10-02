import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Selector } from '../../compartido/interfaz/selector'

export function BloqueRecordatorios({ OPCIONES_RECORDATORIO }: { OPCIONES_RECORDATORIO: string[] }) {
  return (
    <div className="rounded-xl border border-gris-borde px-5 py-4.5">
      <div className="mb-3.5 flex items-center gap-2">
        <Icono name="campana" className="w-5 h-5 text-primario" />
        <h4 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.recordatorios}</h4>
      </div>
      <p className="-mt-2 mb-3.5 text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.recordatorios_subtitulo}</p>

      <label className="mb-3 flex cursor-pointer items-start gap-2.5">
        <Casilla defaultChecked />
        <span className="flex flex-col gap-0.5">
          <span className="text-campo-formulario font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.enviar_recordatorio_correo}</span>
          <span className="text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.enviar_recordatorio_correo_detalle}</span>
        </span>
      </label>

      <div className="mt-2">
        <label className="mb-1 block text-campo-formulario font-medium text-gris-texto">
          {catalogoColaboradores.campos_vigencia.recordar_con_anticipacion} <span className="text-negativo-kpi">*</span>
        </label>
        <Selector variant="colaboradores" defaultValue={OPCIONES_RECORDATORIO[0]}>
          {OPCIONES_RECORDATORIO.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </div>
    </div>
  )
}
