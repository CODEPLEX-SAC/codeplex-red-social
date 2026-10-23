import { Icono } from '../../compartido/icono'
import { EncabezadoSeccionEmpresa } from './encabezado_seccion_empresa'
import { Boton } from '../../compartido/interfaz/boton'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import { Selector } from '../../compartido/interfaz/selector'
import { CampoEtiquetado } from '../../compartido/interfaz/campo_etiquetado'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { FormularioAgregarUsuarioProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const textos = catalogoEmpresas.usuarios_empresa.agregar_usuario
const campos = textos.campos
const marcadores = textos.marcadores
const ROLES = Object.entries(catalogoEmpresas.usuarios_empresa.roles)
const ESTADOS = Object.entries(catalogoEmpresas.usuarios_empresa.estados)

const textoAuxiliar = catalogoEmpresas.clases.texto_auxiliar

export function FormularioAgregarUsuario({ edicionUsuarios }: FormularioAgregarUsuarioProps) {
  const { nuevo } = edicionUsuarios

  return (
    <div role="tabpanel" aria-label={textos.titulo} className="flex flex-col gap-5 px-6 max-480:px-4">
      <Boton type="button" variant="enlace" size="enlace" onClick={edicionUsuarios.cancelarAgregado} className="self-start">
        <Icono name="flecha-izquierda" className="w-4 h-4" />
        {textos.volver}
      </Boton>
      <EncabezadoSeccionEmpresa icono="nuevo-usuario" titulo={textos.titulo} subtitulo={textos.subtitulo} />
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-600:grid-cols-1">
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.nombres} requerido>
          <CampoTexto anchoCompleto marcador={marcadores.nombres} valor={nuevo.nombres} alCambiar={edicionUsuarios.manejarTexto('nombres')} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.apellidos} requerido>
          <CampoTexto anchoCompleto marcador={marcadores.apellidos} valor={nuevo.apellidos} alCambiar={edicionUsuarios.manejarTexto('apellidos')} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.correo} requerido>
          <CampoTexto anchoCompleto tipo="email" marcador={marcadores.correo} valor={nuevo.correo} alCambiar={edicionUsuarios.manejarTexto('correo')} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.telefono}>
          <CampoTexto anchoCompleto tipo="tel" marcador={marcadores.telefono} valor={nuevo.telefono} alCambiar={edicionUsuarios.manejarTexto('telefono')} />
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.rol} requerido>
          <Selector variant="colaboradores" aria-label={campos.rol} placeholder={marcadores.rol} value={nuevo.rol} onChange={edicionUsuarios.manejarSelector('rol')}>
            {ROLES.map(([clave, etiqueta]) => <option key={clave} value={clave}>{etiqueta}</option>)}
          </Selector>
        </CampoEtiquetado>
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.estado} requerido>
          <Selector variant="colaboradores" aria-label={campos.estado} value={nuevo.estado} onChange={edicionUsuarios.manejarSelector('estado')}>
            {ESTADOS.map(([clave, etiqueta]) => <option key={clave} value={clave}>{etiqueta}</option>)}
          </Selector>
        </CampoEtiquetado>
      </div>
      <div className="flex flex-col gap-1">
        <CampoEtiquetado variante="compacta" tono="suave" envolver etiqueta={campos.notas}>
          <CampoTexto anchoCompleto multilinea filas={3} inputProps={{ 'aria-label': campos.notas }} marcador={marcadores.notas} longitudMaxima={textos.notas_maximo} valor={nuevo.notas} alCambiar={edicionUsuarios.manejarTexto('notas')} />
        </CampoEtiquetado>
        <span aria-label={textos.contador_notas} className={`self-end ${textoAuxiliar}`}>
          {nuevo.notas.length}/{textos.notas_maximo}
        </span>
      </div>
    </div>
  )
}
