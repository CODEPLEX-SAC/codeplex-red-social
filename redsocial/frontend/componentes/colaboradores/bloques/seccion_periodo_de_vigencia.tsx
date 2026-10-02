import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Radio } from '../../compartido/interfaz/radio'
import { SeccionPeriodoDeVigencia2 } from './seccion_periodo_de_vigencia2'
import { BloqueRenovacion } from './bloque_renovacion'

export function SeccionPeriodoDeVigencia({
  VIGENCIA_DEFAULT,
  OPCIONES_RECORDATORIO,
  OPCIONES_ZONA_HORARIA,
}: {
  VIGENCIA_DEFAULT: { fechaInicio: string; fechaVencimiento: string; duracion: string; }
  OPCIONES_RECORDATORIO: string[]
  OPCIONES_ZONA_HORARIA: string[]
}) {
  return (
    <div className="grid grid-cols-2 gap-6 p-7 max-960:grid-cols-1 max-960:p-4">
      <div>
        <SeccionPeriodoDeVigencia2 VIGENCIA_DEFAULT={VIGENCIA_DEFAULT} />

        <div className="mt-5 rounded-xl border border-gris-borde p-5">
          <div className="mb-1 flex items-center gap-2">
            <Icono name="reloj" className="w-5 h-5 text-primario" />
            <h3 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.al_vencer_vigencia}</h3>
          </div>
          <p className="-mt-2 mb-4 text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.al_vencer_subtitulo}</p>

          <label className="mb-4 flex cursor-pointer items-start gap-2.5">
            <Radio name="al-vencer" value="desactivar" defaultChecked />
            <span className="flex flex-col gap-0.5">
              <span className="text-campo-formulario font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.desactivar_automaticamente}</span>
              <span className="text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.desactivar_automaticamente_detalle}</span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-2.5">
            <Radio name="al-vencer" value="revision" />
            <span className="flex flex-col gap-0.5">
              <span className="text-campo-formulario font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.mantener_con_revision}</span>
              <span className="text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.mantener_con_revision_detalle}</span>
            </span>
          </label>
        </div>
      </div>

      <BloqueRenovacion
        OPCIONES_RECORDATORIO={OPCIONES_RECORDATORIO}
        OPCIONES_ZONA_HORARIA={OPCIONES_ZONA_HORARIA}
      />
    </div>
  )
}
