import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Radio } from '../../compartido/interfaz/radio'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'

export function SeccionPeriodoDeVigencia2({
  VIGENCIA_DEFAULT,
}: {
  VIGENCIA_DEFAULT: { fechaInicio: string; fechaVencimiento: string; duracion: string; }
}) {
  return (
    <div className="rounded-xl border border-gris-borde p-5">
      <div className="mb-4 flex items-center gap-2">
        <Icono name="calendario" className="w-5 h-5 text-primario" />
        <h3 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.periodo_de_vigencia}</h3>
      </div>

      <label className="mb-4 flex cursor-pointer items-start gap-2.5 last:mb-0">
        <Radio name="vigencia" value="periodo" defaultChecked />
        <span className="flex flex-col gap-0.5">
          <span className="text-campo-formulario font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.vigencia_por_periodo}</span>
          <span className="text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.vigencia_por_periodo_detalle}</span>
        </span>
      </label>

      <div className="my-3 grid grid-cols-2 gap-4 max-960:grid-cols-1">
        <div>
          <label className="mb-1 block text-campo-formulario font-medium text-gris-texto">
            {catalogoColaboradores.campos_vigencia.fecha_de_inicio} <span className="text-negativo-kpi">*</span>
          </label>
          <CampoTexto defaultValue={VIGENCIA_DEFAULT.fechaInicio} soloLectura iconoInicio={<Icono name="calendario" className="h-4.5 w-4.5" />} />
        </div>
        <div>
          <label className="mb-1 block text-campo-formulario font-medium text-gris-texto">
            {catalogoColaboradores.campos_vigencia.fecha_de_vencimiento} <span className="text-negativo-kpi">*</span>
          </label>
          <CampoTexto defaultValue={VIGENCIA_DEFAULT.fechaVencimiento} soloLectura iconoInicio={<Icono name="calendario" className="h-4.5 w-4.5" />} />
        </div>
      </div>
      <span className="mt-2 inline-flex items-center rounded-md bg-t-f3f4f6 px-3 py-1 text-etiqueta-estado font-semibold text-gris-texto-secundario">{VIGENCIA_DEFAULT.duracion}</span>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5">
        <Radio name="vigencia" value="indefinida" />
        <span className="flex flex-col gap-0.5">
          <span className="text-campo-formulario font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.vigencia_indefinida}</span>
          <span className="text-auxiliar leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.vigencia_indefinida_detalle}</span>
        </span>
      </label>

      <div className="mt-3 flex items-start gap-2 rounded-lg border border-t-bfdbfe bg-t-f0f7ff px-3.5 py-2.5">
        <Icono name="aviso" className="mt-px w-4 h-4 flex-none text-primario" />
        <p className="m-0 text-auxiliar leading-snug text-t-1e40af">{catalogoColaboradores.campos_vigencia.nota_indefinida}</p>
      </div>
    </div>
  )
}
