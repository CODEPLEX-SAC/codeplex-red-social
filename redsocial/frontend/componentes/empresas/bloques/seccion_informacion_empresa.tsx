import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Interruptor } from '../../compartido/interfaz/interruptor'
import { Selector } from '../../compartido/interfaz/selector'
import { CampoEtiquetadoEmpresa } from './campo_etiquetado_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FormularioEmpresaProps } from '@/tipos/empresas/contrato_formulario_empresa'

const textos = catalogoEmpresas.modal_empresa
const campos = textos.campos
const opciones = textos.opciones
const RUBROS = catalogoEmpresas.selectores.rubro.opciones.slice(1)

export function SeccionInformacionEmpresa({ formulario }: FormularioEmpresaProps) {
  const { datos } = formulario

  function cambiarActiva(_: unknown, marcada: boolean) {
    formulario.cambiarActiva(marcada)
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className={textos.clases.seccion}>{textos.seccion_informacion}</h3>
      <div className="grid grid-cols-2 gap-4 max-480:grid-cols-1">
        <CampoEtiquetadoEmpresa etiqueta={campos.direccion} requerido>
          <CampoTexto anchoCompleto valor={datos.direccion} alCambiar={formulario.manejarTexto('direccion')} />
        </CampoEtiquetadoEmpresa>
        <CampoEtiquetadoEmpresa etiqueta={campos.ubigeo}>
          <Selector variant="colaboradores" aria-label={campos.ubigeo} value={datos.ubigeo} onChange={formulario.manejarSelector('ubigeo')}>
            {opciones.ubigeos.map((ubigeo) => <option key={ubigeo}>{ubigeo}</option>)}
          </Selector>
        </CampoEtiquetadoEmpresa>
        <CampoEtiquetadoEmpresa etiqueta={campos.telefono} requerido>
          <div className="flex gap-2">
            <Selector variant="default" className="flex-none" aria-label={campos.codigo_pais} value={datos.codigo_pais} onChange={formulario.manejarSelector('codigo_pais')}>
              {opciones.codigos_pais.map((codigo) => <option key={codigo}>{codigo}</option>)}
            </Selector>
            <div className="min-w-0 flex-1">
              <CampoTexto anchoCompleto tipo="tel" inputProps={{ 'aria-label': campos.telefono }} valor={datos.telefono} alCambiar={formulario.manejarTexto('telefono')} />
            </div>
          </div>
        </CampoEtiquetadoEmpresa>
        <CampoEtiquetadoEmpresa etiqueta={campos.email} requerido>
          <CampoTexto anchoCompleto tipo="email" valor={datos.email} alCambiar={formulario.manejarTexto('email')} />
        </CampoEtiquetadoEmpresa>
      </div>
      <CampoEtiquetadoEmpresa etiqueta={campos.web}>
        <CampoTexto anchoCompleto valor={datos.web} alCambiar={formulario.manejarTexto('web')} />
      </CampoEtiquetadoEmpresa>
      <div className="grid grid-cols-2 gap-4 max-480:grid-cols-1">
        <CampoEtiquetadoEmpresa etiqueta={campos.rubro} requerido>
          <Selector variant="colaboradores" aria-label={campos.rubro} value={datos.rubro} onChange={formulario.manejarSelector('rubro')}>
            {RUBROS.map((rubro) => <option key={rubro}>{rubro}</option>)}
          </Selector>
        </CampoEtiquetadoEmpresa>
        <CampoEtiquetadoEmpresa etiqueta={campos.tipo_plan_cuenta} requerido>
          <Selector variant="colaboradores" aria-label={campos.tipo_plan_cuenta} value={datos.tipo_plan_cuenta} onChange={formulario.manejarSelector('tipo_plan_cuenta')}>
            {opciones.tipos_plan_cuenta.map((tipo) => <option key={tipo}>{tipo}</option>)}
          </Selector>
        </CampoEtiquetadoEmpresa>
      </div>
      <Interruptor etiqueta={campos.activa} posicionEtiqueta="fin" seleccionado={datos.activa} alCambiar={cambiarActiva} />
    </div>
  )
}
