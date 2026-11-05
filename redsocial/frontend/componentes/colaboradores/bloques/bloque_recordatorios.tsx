import { Icono } from '../../compartido/icono'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Casilla } from '../../compartido/interfaz/casilla'
import { Selector } from '../../compartido/interfaz/selector'

const clases = catalogoColaboradores.clases.invitar_vigencia
const comun = catalogoColaboradores.clases.invitar_comun
const textos = catalogoColaboradores.campos_vigencia

export function BloqueRecordatorios({ OPCIONES_RECORDATORIO }: { OPCIONES_RECORDATORIO: string[] }) {
  return (
    <div className={comun.tarjeta_compacta}>
      <div className={clases.cabecera}>
        <Icono name="campana" className={comun.glifo_titulo} />
        <h4 className={comun.titulo}>{textos.recordatorios}</h4>
      </div>
      <p className={comun.subtitulo}>{textos.recordatorios_subtitulo}</p>

      <label className={clases.opcion_media}>
        <Casilla defaultChecked />
        <span className={comun.opcion_textos}>
          <span className={comun.opcion_titulo}>{textos.enviar_recordatorio_correo}</span>
          <span className={comun.opcion_detalle}>{textos.enviar_recordatorio_correo_detalle}</span>
        </span>
      </label>

      <CampoEtiquetado variante="compacta" etiqueta={textos.recordar_con_anticipacion} requerido className={clases.campo_recordatorio}>
        <Selector variant="colaboradores" defaultValue={OPCIONES_RECORDATORIO[0]}>
          {OPCIONES_RECORDATORIO.map((o) => <option key={o}>{o}</option>)}
        </Selector>
      </CampoEtiquetado>
    </div>
  )
}
