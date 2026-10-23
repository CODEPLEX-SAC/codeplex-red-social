import { Icono } from '../../compartido/icono'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Selector } from '../../compartido/interfaz/selector'

export function BloqueRecordatorios({ OPCIONES_RECORDATORIO }: { OPCIONES_RECORDATORIO: string[] }) {
  return (
    <div className="rounded-xl border border-gris-borde px-5 py-4.5">
      <div className="mb-3.5 flex items-center gap-2">
        <Icono name="campana" className="w-5 h-5 text-primario" />
        <h4 className="m-0 text-nombre-entidad text-texto">{catalogoColaboradores.campos_vigencia.recordatorios}</h4>
      </div>
      <p className="-mt-2 mb-3.5 text-auxiliar leading-texto text-texto-suave">{catalogoColaboradores.campos_vigencia.recordatorios_subtitulo}</p>

      <label className="mb-3 flex cursor-pointer items-start gap-2.5">
        <Casilla defaultChecked />
        <span className="flex flex-col gap-0.5">
          <span className="text-campo-formulario text-texto">{catalogoColaboradores.campos_vigencia.enviar_recordatorio_correo}</span>
          <span className="text-auxiliar leading-texto text-texto-suave">{catalogoColaboradores.campos_vigencia.enviar_recordatorio_correo_detalle}</span>
        </span>
      </label>

      <CampoEtiquetado variante="compacta" etiqueta={catalogoColaboradores.campos_vigencia.recordar_con_anticipacion} requerido className="mt-2">
        <Selector variant="colaboradores" defaultValue={OPCIONES_RECORDATORIO[0]}>
          {OPCIONES_RECORDATORIO.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </CampoEtiquetado>
    </div>
  )
}
