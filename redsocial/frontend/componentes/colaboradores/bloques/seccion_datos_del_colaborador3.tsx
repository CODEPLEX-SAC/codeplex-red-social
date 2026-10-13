import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { BloqueTelefonoWhatsapp } from './bloque_telefono_whatsapp'
import { etiquetarCampo, manejarSelector, manejarTexto } from './manejadores_campo_colaborador'
import type { CambiarCampoColaborador, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'

export function SeccionDatosDelColaborador3({
  colaborador,
  alCambiarCampo,
}: { colaborador: DatosColaboradorInvitado; alCambiarCampo: CambiarCampoColaborador }) {
  return (
    <div className="mb-6">
      <div className="mb-1 flex items-center gap-2">
        <Icono name="grupo" className="w-5 h-5 text-primario" />
        <h3 className="m-0 text-nombre-entidad text-texto">{catalogoColaboradores.secciones.datos_del_colaborador}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 max-768:grid-cols-1 max-768:gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">
            {catalogoColaboradores.campos_informacion.nombres} <span className="ml-0.5 text-negativo-kpi">*</span>
          </label>
          <CampoTexto valor={colaborador.nombres} alCambiar={manejarTexto(alCambiarCampo, 'nombres')} inputProps={etiquetarCampo(catalogoColaboradores.campos_informacion.nombres)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">
            {catalogoColaboradores.campos_informacion.apellidos} <span className="ml-0.5 text-negativo-kpi">*</span>
          </label>
          <CampoTexto valor={colaborador.apellidos} alCambiar={manejarTexto(alCambiarCampo, 'apellidos')} inputProps={etiquetarCampo(catalogoColaboradores.campos_informacion.apellidos)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">
            {catalogoColaboradores.campos_informacion.correo_electronico} <span className="ml-0.5 text-negativo-kpi">*</span>
          </label>
          <CampoTexto valor={colaborador.correo} alCambiar={manejarTexto(alCambiarCampo, 'correo')} tipo="email" inputProps={etiquetarCampo(catalogoColaboradores.campos_informacion.correo_electronico)} />
          <span className="text-auxiliar text-texto-suave">{catalogoColaboradores.campos_informacion.correo_ayuda}</span>
        </div>
        <BloqueTelefonoWhatsapp colaborador={colaborador} alCambiarCampo={alCambiarCampo} />
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">{catalogoColaboradores.campos_informacion.documento_identidad}</label>
          <div className="flex gap-2 max-480:flex-col">
            <Selector variant="colaboradores" aria-label={catalogoColaboradores.campos_informacion.documento_identidad} value={colaborador.tipo_documento} onChange={manejarSelector(alCambiarCampo, 'tipo_documento')}>
              {catalogoColaboradores.selectores.tipo_documento.opciones.map((o) => <option key={o}>{o}</option>)}
            </Selector>
            <div className="min-w-0 flex-1">
              <CampoTexto valor={colaborador.documento_numero} alCambiar={manejarTexto(alCambiarCampo, 'documento_numero')} inputProps={etiquetarCampo(catalogoColaboradores.campos_informacion.documento_identidad)} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">{catalogoColaboradores.campos_informacion.cargo_puesto}</label>
          <CampoTexto valor={colaborador.cargo} alCambiar={manejarTexto(alCambiarCampo, 'cargo')} inputProps={etiquetarCampo(catalogoColaboradores.campos_informacion.cargo_puesto)} />
          <span className="text-auxiliar text-texto-suave">{catalogoColaboradores.campos_informacion.cargo_ayuda}</span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">{catalogoColaboradores.campos_informacion.empresa}</label>
          <Selector variant="colaboradores" aria-label={catalogoColaboradores.campos_informacion.empresa} value={colaborador.empresa} onChange={manejarSelector(alCambiarCampo, 'empresa')}>
            {catalogoColaboradores.selectores.empresa_colaborador.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-etiqueta text-texto">{catalogoColaboradores.campos_informacion.area_departamento}</label>
          <Selector variant="colaboradores" aria-label={catalogoColaboradores.campos_informacion.area_departamento} value={colaborador.area} onChange={manejarSelector(alCambiarCampo, 'area')}>
            {catalogoColaboradores.selectores.area_departamento.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
          <span className="text-auxiliar text-texto-suave">{catalogoColaboradores.campos_informacion.area_ayuda}</span>
        </div>
      </div>
    </div>
  )
}
