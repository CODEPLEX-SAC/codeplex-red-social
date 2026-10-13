import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { CampoEtiquetadoEmpresa } from './campo_etiquetado_empresa'
import { TituloSeccionEmpresa } from './titulo_seccion_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { EdicionEmpresaProps } from '@/tipos/empresas/contrato_edicion_empresa'

const detalle = catalogoEmpresas.detalle_empresa
const campos = detalle.campos
const etiquetas = catalogoEmpresas.edicion_empresa.etiquetas
const clases = catalogoEmpresas.edicion_empresa.clases
const claseEtiqueta = catalogoEmpresas.clases.etiqueta_campo

export function TarjetaContactoEdicionEmpresa({ edicion }: EdicionEmpresaProps) {
  const { datos, opcionesUbigeo } = edicion

  return (
    <section aria-label={detalle.secciones.contacto} className={clases.seccion}>
      <TituloSeccionEmpresa icono="llamada" titulo={detalle.secciones.contacto} />
      <div className={clases.cuadricula}>
        <CampoEtiquetadoEmpresa etiqueta={campos.direccion} requerido>
          <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.direccion }} valor={datos.direccion} alCambiar={edicion.manejarTexto('direccion')} />
        </CampoEtiquetadoEmpresa>
        <CampoEtiquetadoEmpresa etiqueta={campos.telefono} requerido>
          <CampoTexto anchoCompleto tipo="tel" inputProps={{ 'aria-label': campos.telefono }} valor={datos.telefono} alCambiar={edicion.manejarTexto('telefono')} />
        </CampoEtiquetadoEmpresa>
        <div className="flex min-w-0 flex-col gap-1">
          <span className={claseEtiqueta}>
            {campos.ubigeo}
            <span className="ml-0.5 text-negativo-kpi">*</span>
          </span>
          <div className={clases.contacto_ubigeo}>
            <Selector variant="colaboradores" aria-label={etiquetas.departamento} value={datos.departamento} onChange={edicion.manejarSelector('departamento')}>
              {opcionesUbigeo.departamentos.map((opcion) => <option key={opcion}>{opcion}</option>)}
            </Selector>
            <Selector variant="colaboradores" aria-label={etiquetas.provincia} value={datos.provincia} onChange={edicion.manejarSelector('provincia')}>
              {opcionesUbigeo.provincias.map((opcion) => <option key={opcion}>{opcion}</option>)}
            </Selector>
            <Selector variant="colaboradores" aria-label={etiquetas.distrito} value={datos.distrito} onChange={edicion.manejarSelector('distrito')}>
              {opcionesUbigeo.distritos.map((opcion) => <option key={opcion}>{opcion}</option>)}
            </Selector>
          </div>
        </div>
        <CampoEtiquetadoEmpresa etiqueta={campos.email} requerido>
          <CampoTexto anchoCompleto tipo="email" inputProps={{ 'aria-label': campos.email }} valor={datos.email} alCambiar={edicion.manejarTexto('email')} />
        </CampoEtiquetadoEmpresa>
        <div className={clases.ancho_completo}>
          <CampoEtiquetadoEmpresa etiqueta={campos.web}>
            <CampoTexto anchoCompleto inputProps={{ 'aria-label': campos.web }} valor={datos.web} alCambiar={edicion.manejarTexto('web')} />
          </CampoEtiquetadoEmpresa>
        </div>
      </div>
    </section>
  )
}
