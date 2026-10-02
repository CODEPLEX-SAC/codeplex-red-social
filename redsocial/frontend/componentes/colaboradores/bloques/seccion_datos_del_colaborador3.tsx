import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { BloqueTelefonoWhatsapp } from './bloque_telefono_whatsapp'

export function SeccionDatosDelColaborador3({
  FORM_INFORMACION_DEFAULT,
}: {
  FORM_INFORMACION_DEFAULT: { nombres: string; apellidos: string; correo: string; telefono: string; documentoNumero: string; cargo: string; }
}) {
  return (
    <div className="mb-6">
      <div className="mb-1 flex items-center gap-2">
        <Icono name="usuarios" className="w-5 h-5 text-primario" />
        <h2 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.secciones.datos_del_colaborador}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 max-768:grid-cols-1 max-768:gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-campo-formulario font-medium text-gris-texto">
            {catalogoColaboradores.campos_informacion.nombres} <span className="ml-0.5 text-negativo-kpi">*</span>
          </label>
          <CampoTexto defaultValue={FORM_INFORMACION_DEFAULT.nombres} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-campo-formulario font-medium text-gris-texto">
            {catalogoColaboradores.campos_informacion.apellidos} <span className="ml-0.5 text-negativo-kpi">*</span>
          </label>
          <CampoTexto defaultValue={FORM_INFORMACION_DEFAULT.apellidos} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-campo-formulario font-medium text-gris-texto">
            {catalogoColaboradores.campos_informacion.correo_electronico} <span className="ml-0.5 text-negativo-kpi">*</span>
          </label>
          <CampoTexto defaultValue={FORM_INFORMACION_DEFAULT.correo} tipo="email" />
          <span className="text-auxiliar text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.correo_ayuda}</span>
        </div>
        <BloqueTelefonoWhatsapp FORM_INFORMACION_DEFAULT={FORM_INFORMACION_DEFAULT} />
        <div className="flex flex-col gap-1">
          <label className="text-campo-formulario font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.documento_identidad}</label>
          <div className="flex gap-2">
            <Selector variant="colaboradores" defaultValue={catalogoColaboradores.selectores.tipo_documento.opciones[0]}>
              {catalogoColaboradores.selectores.tipo_documento.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <div className="min-w-0 flex-1">
              <CampoTexto defaultValue={FORM_INFORMACION_DEFAULT.documentoNumero} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-campo-formulario font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.cargo_puesto}</label>
          <CampoTexto defaultValue={FORM_INFORMACION_DEFAULT.cargo} />
          <span className="text-auxiliar text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.cargo_ayuda}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-campo-formulario font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.empresa}</label>
          <Selector variant="colaboradores" defaultValue={catalogoColaboradores.selectores.empresa_colaborador.opciones[0]}>
            {catalogoColaboradores.selectores.empresa_colaborador.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-campo-formulario font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.area_departamento}</label>
          <Selector variant="colaboradores" defaultValue={catalogoColaboradores.selectores.area_departamento.opciones[0]}>
            {catalogoColaboradores.selectores.area_departamento.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
          <span className="text-auxiliar text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.area_ayuda}</span>
        </div>
      </div>
    </div>
  )
}
