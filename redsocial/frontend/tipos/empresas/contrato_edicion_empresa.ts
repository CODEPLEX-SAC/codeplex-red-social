import type { ChangeEvent } from 'react'
import type { DatosDetalleEmpresa, PestanaDetalleEmpresa } from './contrato_detalle_empresa'
import type { EdicionUsuariosEmpresa } from './contrato_usuarios_empresa'
import type { Empresa } from './modelo_empresas'
import type { UsuarioEmpresa } from './modelo_usuarios_empresa'

export interface DatosEdicionEmpresa {
  razon_social: string
  nombre_comercial: string
  ruc: string
  rubro: string
  plan: string
  estado: string
  direccion: string
  departamento: string
  provincia: string
  distrito: string
  telefono: string
  email: string
  web: string
}

export type CampoEdicionEmpresa = keyof DatosEdicionEmpresa

export interface OpcionesUbigeo {
  departamentos: string[]
  provincias: string[]
  distritos: string[]
}

export interface EdicionEmpresa {
  datos: DatosEdicionEmpresa
  opcionesUbigeo: OpcionesUbigeo
  logo: string | null
  errorLogo: string | null
  puedeGuardar: boolean
  manejarTexto: (campo: CampoEdicionEmpresa) => (texto: string) => void
  manejarSelector: (campo: CampoEdicionEmpresa) => (evento: { target: { value: unknown } }) => void
  elegirLogo: (evento: ChangeEvent<HTMLInputElement>) => void
  quitarLogo: () => void
  construirEmpresa: () => Empresa
}

export interface EdicionEmpresaProps {
  edicion: EdicionEmpresa
  fechaRegistro: string
}

export interface CuerpoEditarEmpresaProps {
  empresa: Empresa
  edicion: EdicionEmpresa
  pestanaInicial: PestanaDetalleEmpresa
  datosDetalle: DatosDetalleEmpresa
  edicionUsuarios: EdicionUsuariosEmpresa
}

export interface ModalEditarEmpresaProps {
  empresa: Empresa
  pestanaInicial: PestanaDetalleEmpresa
  datosDetalle: DatosDetalleEmpresa
  usuariosGuardados?: UsuarioEmpresa[]
  alCerrar: () => void
  alGuardar: (empresa: Empresa, usuarios: UsuarioEmpresa[]) => void
}
