import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Radio } from '../../compartido/interfaz/radio'
import { SeccionDatosDelColaborador3 } from './seccion_datos_del_colaborador3'
import type { CambiarCampoColaborador, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'

export function SeccionDatosDelColaborador2({
  colaborador,
  alCambiarCampo,
}: { colaborador: DatosColaboradorInvitado; alCambiarCampo: CambiarCampoColaborador }) {
  return (
    <div className="border-r border-borde-suave px-7 pb-7 pt-6 max-960:border-b max-960:border-r-0 max-960:px-6 max-960:py-5 max-768:p-4 max-480:p-3">
      <SeccionDatosDelColaborador3 colaborador={colaborador} alCambiarCampo={alCambiarCampo} />

      <div className="mt-2">
        <div className="mb-3 flex items-center gap-2">
          <Icono name="mensaje" className="w-4.5 h-4.5 text-primario" />
          <span className="text-titulo-subseccion text-texto">{catalogoColaboradores.secciones.metodo_de_invitacion}</span>
        </div>
        <p className="mb-3 text-auxiliar text-texto-suave">{catalogoColaboradores.campos_informacion.metodo_invitacion_ayuda}</p>
        <div className="mb-3 flex gap-4 max-480:flex-col">
          <label className="flex cursor-pointer items-start gap-2">
            <Radio name="metodo-inv" defaultChecked />
            <div className="flex flex-col gap-0.5">
              <span className="text-campo-formulario text-texto">{catalogoColaboradores.campos_informacion.enviar_correo}</span>
              <span className="text-auxiliar text-texto-suave">{catalogoColaboradores.campos_informacion.enviar_correo_ayuda}</span>
            </div>
          </label>
          <label className="flex cursor-pointer items-start gap-2">
            <Radio name="metodo-inv" />
            <div className="flex flex-col gap-0.5">
              <span className="text-campo-formulario text-texto">{catalogoColaboradores.campos_informacion.enviar_whatsapp}</span>
              <span className="text-auxiliar text-texto-suave">{catalogoColaboradores.campos_informacion.enviar_whatsapp_ayuda}</span>
            </div>
          </label>
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-borde-primario-suave bg-primario-suave px-3.5 py-2.5">
          <Icono name="aviso" className="mt-px w-4 h-4 flex-none text-primario" />
          <p className="m-0 text-auxiliar leading-texto text-texto-suave">
            {catalogoColaboradores.campos_informacion.nota_registro}
          </p>
        </div>
      </div>
    </div>
  )
}
