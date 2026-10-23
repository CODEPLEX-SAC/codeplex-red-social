import type { SuscripcionContratada } from '@/tipos/compartido/contrato_suscripciones'
import type { ModuloEmpresaCatalogo } from './contrato_listado_empresas'
import type { ReactNode } from 'react'
import type { EdicionEmpresa } from './contrato_edicion_empresa'
import type { Empresa } from './modelo_empresas'
import type { RegistroHistorialBase } from './modelo_historial_empresa'
import type { EdicionUsuariosEmpresa } from './contrato_usuarios_empresa'
import type { UsuarioBaseEmpresa, UsuarioEmpresa } from './modelo_usuarios_empresa'

export interface DatosDetalleEmpresa {
  usuariosBase: UsuarioBaseEmpresa[]
  historialBase: RegistroHistorialBase[]
}

export type PestanaDetalleEmpresa = 'informacion' | 'usuarios' | 'historial' | 'planes'

export interface SolicitudDetalleEmpresa {
  codigo: string
  pestana: PestanaDetalleEmpresa
}

export interface ModalDetalleEmpresaProps {
  empresa: Empresa
  totalEmpresas: number
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

export interface TarjetaPlanAsignadoProps {
  modulo: ModuloEmpresaCatalogo
  suscripcion: SuscripcionContratada
  planNombre: string
  totalEmpresas: number
}

export interface FilaPlanAsignadoProps {
  modulo: ModuloEmpresaCatalogo
  suscripcion: SuscripcionContratada
  activo: boolean
  totalEmpresas: number
  puedeMejorar: boolean
  onAlternar: () => void
  onMejorar: () => void
}

export interface PestanaPlanesEdicionEmpresaProps {
  edicion: EdicionEmpresa
  totalEmpresas: number
}

export interface PestanaPlanesEmpresaProps {
  empresa: Empresa
  totalEmpresas: number
}

export interface ContenidoPestanaEmpresaProps {
  empresa: Empresa
  pestana: PestanaDetalleEmpresa
  datosDetalle: DatosDetalleEmpresa
  usuariosGuardados?: UsuarioEmpresa[]
  edicionUsuarios?: EdicionUsuariosEmpresa
  totalEmpresas: number
}

export interface EtiquetaCampoEmpresaProps {
  etiqueta: string
  requerido?: boolean
  className?: string
}

export interface EstadoEmpresaProps {
  estado: Empresa['estado']
}
