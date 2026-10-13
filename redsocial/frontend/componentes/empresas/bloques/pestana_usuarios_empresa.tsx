import { useMemo } from 'react'
import { CabeceraUsuariosEmpresa } from './cabecera_usuarios_empresa'
import { FiltrosUsuariosEmpresa } from './filtros_usuarios_empresa'
import { FormularioAgregarUsuario } from './formulario_agregar_usuario'
import { armarUsuarios } from './logica_usuarios_empresa'
import { PieUsuariosEmpresa } from './pie_usuarios_empresa'
import { TablaUsuariosEmpresa } from './tabla_usuarios_empresa'
import { usarUsuariosEmpresa } from './usar_usuarios_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { PestanaUsuariosEmpresaProps } from '@/tipos/empresas/contrato_usuarios_empresa'

export function PestanaUsuariosEmpresa({ empresa, usuariosBase, usuariosGuardados, edicionUsuarios }: PestanaUsuariosEmpresaProps) {
  const usuariosLectura = useMemo(() => usuariosGuardados ?? armarUsuarios(empresa, usuariosBase), [empresa, usuariosBase, usuariosGuardados])
  const listado = usarUsuariosEmpresa(edicionUsuarios ? edicionUsuarios.usuarios : usuariosLectura)
  const editable = Boolean(edicionUsuarios)

  if (edicionUsuarios?.agregando) return <FormularioAgregarUsuario edicionUsuarios={edicionUsuarios} />

  return (
    <div role="tabpanel" aria-label={catalogoEmpresas.detalle_empresa.pestanas.usuarios} className="flex flex-col gap-4 px-6 max-480:px-4">
      <CabeceraUsuariosEmpresa editable={editable} alAgregar={edicionUsuarios?.iniciarAgregado} />
      <FiltrosUsuariosEmpresa listado={listado} />
      <TablaUsuariosEmpresa listado={listado} editable={editable} edicionUsuarios={edicionUsuarios} />
      <PieUsuariosEmpresa listado={listado} />
    </div>
  )
}
