import { CodeplexProveedorFechas } from '@codeplex-sac/selectores-fecha'
import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Radio } from '../../compartido/interfaz/radio'
import { SeccionPeriodoDeVigencia2 } from './seccion_periodo_de_vigencia2'
import { BloqueRenovacion } from './bloque_renovacion'
import type { EstadoVigenciaInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const clases = catalogoColaboradores.clases.invitar_vigencia
const comun = catalogoColaboradores.clases.invitar_comun
const textos = catalogoColaboradores.campos_vigencia

export function SeccionPeriodoDeVigencia({
  VIGENCIA,
  OPCIONES_RECORDATORIO,
  OPCIONES_ZONA_HORARIA,
}: {
  VIGENCIA: EstadoVigenciaInvitacion
  OPCIONES_RECORDATORIO: string[]
  OPCIONES_ZONA_HORARIA: string[]
}) {
  return (
    <CodeplexProveedorFechas idioma={textos.idioma}>
      <div className={clases.rejilla}>
        <div>
          <SeccionPeriodoDeVigencia2 VIGENCIA={VIGENCIA} />

          <div className={`${clases.bloque_siguiente} ${comun.tarjeta}`}>
            <div className={clases.vencer_cabecera}>
              <Icono name="reloj" className={comun.glifo_titulo} />
              <h3 className={comun.titulo}>{textos.al_vencer_vigencia}</h3>
            </div>
            <p className={clases.vencer_subtitulo}>{textos.al_vencer_subtitulo}</p>

            <label className={clases.opcion_amplia}>
              <Radio name="al-vencer" value="desactivar" defaultChecked />
              <span className={comun.opcion_textos}>
                <span className={comun.opcion_titulo}>{textos.desactivar_automaticamente}</span>
                <span className={comun.opcion_detalle}>{textos.desactivar_automaticamente_detalle}</span>
              </span>
            </label>

            <label className={comun.opcion}>
              <Radio name="al-vencer" value="revision" />
              <span className={comun.opcion_textos}>
                <span className={comun.opcion_titulo}>{textos.mantener_con_revision}</span>
                <span className={comun.opcion_detalle}>{textos.mantener_con_revision_detalle}</span>
              </span>
            </label>
          </div>
        </div>

        <BloqueRenovacion
          OPCIONES_RECORDATORIO={OPCIONES_RECORDATORIO}
          OPCIONES_ZONA_HORARIA={OPCIONES_ZONA_HORARIA}
        />
      </div>
    </CodeplexProveedorFechas>
  )
}
