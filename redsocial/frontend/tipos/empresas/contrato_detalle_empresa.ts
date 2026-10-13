import type { ReactNode } from 'react'
import type { Empresa } from './modelo_empresas'
import type { RegistroHistorialBase } from './modelo_historial_empresa'
import type { EdicionUsuariosEmpresa } from './contrato_usuarios_empresa'
import type { UsuarioBaseEmpresa, UsuarioEmpresa } from './modelo_usuarios_empresa'

export interface DatosDetalleEmpresa {
  usuariosBase: UsuarioBaseEmpresa[]
  historialBase: RegistroHistorialBase[]
}

export type PestanaDetalleEmpresa = 'informacion' | 'usuarios' | 'historial'

export interface SolicitudDetalleEmpresa {
  codigo: string
  pestana: PestanaDetalleEmpresa
}

export interface ModalDetalleEmpresaProps {
  empresa: Empresa
  pestanaInicial: PestanaDetalleEmpresa
  datosDetalle: DatosDetalleEmpresa
  usuariosGuardados?: UsuarioEmpresa[]
  alCerrar: () => void
}

export interface DetalleEmpresaProps {
  empresa: Empresa
}

export interface FilaDatoEmpresaProps {
  etiqueta: string
  requerido?: boolean
  children: ReactNode
}

export interface ContenidoPestanaEmpresaProps {
  empresa: Empresa
  pestana: PestanaDetalleEmpresa
  datosDetalle: DatosDetalleEmpresa
  usuariosGuardados?: UsuarioEmpresa[]
  edicionUsuarios?: EdicionUsuariosEmpresa
}

export interface EtiquetaCampoEmpresaProps {
  etiqueta: string
  requerido?: boolean
  className?: string
}

export interface EstadoEmpresaProps {
  estado: Empresa['estado']
}
