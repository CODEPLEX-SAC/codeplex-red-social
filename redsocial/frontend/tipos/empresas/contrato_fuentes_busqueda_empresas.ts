import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
import type { FiltrosBusquedaEmpresas } from './contrato_listado_empresas'
import type { FiltrosBusquedaHistorialEmpresa } from './contrato_historial_empresa'
import type { FiltrosBusquedaUsuariosEmpresa } from './contrato_usuarios_empresa'
import type { Empresa } from './modelo_empresas'
import type { RegistroHistorialBase } from './modelo_historial_empresa'
import type { UsuarioEmpresa } from './modelo_usuarios_empresa'

export interface FuentesBusquedaEmpresas {
  empresas?: FuenteBusqueda<Empresa, FiltrosBusquedaEmpresas>
  usuarios?: FuenteBusqueda<UsuarioEmpresa, FiltrosBusquedaUsuariosEmpresa>
  historial?: FuenteBusqueda<RegistroHistorialBase, FiltrosBusquedaHistorialEmpresa>
}
