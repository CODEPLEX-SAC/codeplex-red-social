import { Icono } from '../../compartido/icono'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { BloqueTelefonoWhatsapp } from './bloque_telefono_whatsapp'
import { etiquetarCampo, manejarSelector, manejarTexto } from './manejadores_campo_colaborador'
import type { CambiarCampoColaborador, DatosColaboradorInvitado } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const clases = catalogoColaboradores.clases.invitar_informacion
const campos = catalogoColaboradores.campos_informacion

export function SeccionDatosDelColaborador3({
  colaborador,
  alCambiarCampo,
}: { colaborador: DatosColaboradorInvitado; alCambiarCampo: CambiarCampoColaborador }) {
  return (
    <div className={clases.datos}>
      <div className={clases.datos_cabecera}>
        <Icono name="grupo" className={clases.datos_glifo} />
        <h3 className={catalogoColaboradores.clases.invitar_comun.titulo}>{catalogoColaboradores.secciones.datos_del_colaborador}</h3>
      </div>

      <div className={clases.datos_rejilla}>
        <CampoEtiquetado variante="compacta" etiqueta={campos.nombres} requerido>
          <CampoTexto valor={colaborador.nombres} alCambiar={manejarTexto(alCambiarCampo, 'nombres')} inputProps={etiquetarCampo(campos.nombres)} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={campos.apellidos} requerido>
          <CampoTexto valor={colaborador.apellidos} alCambiar={manejarTexto(alCambiarCampo, 'apellidos')} inputProps={etiquetarCampo(campos.apellidos)} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={campos.correo_electronico} requerido>
          <CampoTexto valor={colaborador.correo} alCambiar={manejarTexto(alCambiarCampo, 'correo')} tipo="email" inputProps={etiquetarCampo(campos.correo_electronico)} />
          <span className={clases.ayuda}>{campos.correo_ayuda}</span>
        </CampoEtiquetado>
        <BloqueTelefonoWhatsapp etiqueta={campos.telefono_whatsapp} ayuda={campos.telefono_ayuda} numero={{ valor: colaborador.telefono, alCambiar: manejarTexto(alCambiarCampo, 'telefono') }} />
        <CampoEtiquetado variante="compacta" etiqueta={campos.documento_identidad}>
          <div className={clases.documento}>
            <div className={clases.documento_tipo}>
              <Selector variant="compacto" aria-label={campos.documento_identidad} value={colaborador.tipo_documento} onChange={manejarSelector(alCambiarCampo, 'tipo_documento')}>
                {catalogoColaboradores.selectores.tipo_documento.opciones.map((o) => <option key={o}>{o}</option>)}
              </Selector>
            </div>
            <div className={clases.documento_numero}>
              <CampoTexto valor={colaborador.documento_numero} alCambiar={manejarTexto(alCambiarCampo, 'documento_numero')} inputProps={etiquetarCampo(campos.documento_identidad)} />
            </div>
          </div>
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={campos.cargo_puesto}>
          <CampoTexto valor={colaborador.cargo} alCambiar={manejarTexto(alCambiarCampo, 'cargo')} inputProps={etiquetarCampo(campos.cargo_puesto)} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={campos.empresa}>
          <Selector variant="colaboradores" aria-label={campos.empresa} value={colaborador.empresa} onChange={manejarSelector(alCambiarCampo, 'empresa')}>
            {catalogoColaboradores.selectores.empresa_colaborador.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" etiqueta={campos.area_departamento}>
          <Selector variant="colaboradores" aria-label={campos.area_departamento} value={colaborador.area} onChange={manejarSelector(alCambiarCampo, 'area')}>
            {catalogoColaboradores.selectores.area_departamento.opciones.map((o) => <option key={o}>{o}</option>)}
          </Selector>
          <span className={clases.ayuda}>{campos.area_ayuda}</span>
        </CampoEtiquetado>
      </div>
    </div>
  )
}
