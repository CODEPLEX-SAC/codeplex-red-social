import { Icono } from '../../compartido/icono'
import { BannerInformativo } from '../../compartido/interfaz/banner_informativo'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Radio } from '../../compartido/interfaz/radio'
import { SeccionDatosDelColaborador3 } from './seccion_datos_del_colaborador3'
import type { CambiarCampoColaborador, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const clases = catalogoColaboradores.clases.invitar_informacion
const comun = catalogoColaboradores.clases.invitar_comun
const textos = catalogoColaboradores.campos_informacion

export function SeccionDatosDelColaborador2({
  colaborador,
  alCambiarCampo,
}: { colaborador: DatosColaboradorInvitado; alCambiarCampo: CambiarCampoColaborador }) {
  return (
    <div className={clases.formulario}>
      <SeccionDatosDelColaborador3 colaborador={colaborador} alCambiarCampo={alCambiarCampo} />

      <div className={clases.metodo}>
        <div className={clases.metodo_cabecera}>
          <Icono name="mensaje" className={clases.metodo_glifo} />
          <span className={clases.metodo_titulo}>{catalogoColaboradores.secciones.metodo_de_invitacion}</span>
        </div>
        <p className={clases.metodo_ayuda}>{textos.metodo_invitacion_ayuda}</p>
        <div className={clases.metodo_opciones}>
          <label className={clases.metodo_opcion}>
            <Radio name="metodo-inv" defaultChecked />
            <div className={comun.opcion_textos}>
              <span className={comun.opcion_titulo}>{textos.enviar_correo}</span>
              <span className={clases.ayuda}>{textos.enviar_correo_ayuda}</span>
            </div>
          </label>
          <label className={clases.metodo_opcion}>
            <Radio name="metodo-inv" />
            <div className={comun.opcion_textos}>
              <span className={comun.opcion_titulo}>{textos.enviar_whatsapp}</span>
              <span className={clases.ayuda}>{textos.enviar_whatsapp_ayuda}</span>
            </div>
          </label>
        </div>
        <BannerInformativo icono="aviso" descripcion={textos.nota_registro} variante="nota" className={clases.metodo_banner} />
      </div>
    </div>
  )
}
