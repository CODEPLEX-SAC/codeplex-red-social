import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { CampoEtiquetadoEmpresa } from './campo_etiquetado_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FormularioEmpresaProps } from '@/tipos/empresas/contrato_formulario_empresa'

const textos = catalogoEmpresas.modal_empresa
const campos = textos.campos

const textoError = catalogoEmpresas.clases.texto_error

export function SeccionIdentificacionEmpresa({ formulario }: FormularioEmpresaProps) {
  const { datos, estadoRuc } = formulario

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 max-480:grid-cols-1">
        <div className="flex items-end gap-2">
          <div className="min-w-0 flex-1">
            <CampoEtiquetadoEmpresa etiqueta={campos.ruc} requerido>
              <CampoTexto anchoCompleto soloNumeros longitudMaxima={11} valor={datos.ruc} alCambiar={formulario.manejarTexto('ruc')} />
            </CampoEtiquetadoEmpresa>
          </div>
          <Boton type="button" variant="primario" size="md" onClick={formulario.validarRuc}>
            {textos.validar}
          </Boton>
        </div>
        <CampoEtiquetadoEmpresa etiqueta={campos.nombre_comercial}>
          <CampoTexto anchoCompleto valor={datos.nombre_comercial} alCambiar={formulario.manejarTexto('nombre_comercial')} />
        </CampoEtiquetadoEmpresa>
      </div>
      {estadoRuc === 'valido' ? (
        <p role="status" className="m-0 text-auxiliar font-control text-exito-texto">{textos.ruc_valido}</p>
      ) : null}
      {estadoRuc === 'invalido' ? (
        <p role="alert" className={`m-0 ${textoError}`}>{textos.ruc_invalido}</p>
      ) : null}
      <CampoEtiquetadoEmpresa etiqueta={campos.razon_social} requerido>
        <CampoTexto anchoCompleto valor={datos.razon_social} alCambiar={formulario.manejarTexto('razon_social')} />
      </CampoEtiquetadoEmpresa>
    </div>
  )
}
