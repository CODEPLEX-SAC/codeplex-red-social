import { Icono } from '../../compartido/icono'
import { EncabezadoSeccionEmpresa } from './encabezado_seccion_empresa'
import { Boton } from '../../compartido/interfaz/boton'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { EdicionUsuariosProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const textos = catalogoEmpresas.usuarios_empresa

export function CabeceraUsuariosEmpresa({ editable, alAgregar }: EdicionUsuariosProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 max-600:flex-col max-600:items-stretch">
      <EncabezadoSeccionEmpresa icono="grupo" titulo={textos.titulo} subtitulo={textos.subtitulo} />
      {editable ? (
        <Boton type="button" variant="primario" size="md" onClick={alAgregar}>
          <Icono name="mas" className="w-4 h-4" />
          {textos.agregar}
        </Boton>
      ) : null}
    </div>
  )
}
