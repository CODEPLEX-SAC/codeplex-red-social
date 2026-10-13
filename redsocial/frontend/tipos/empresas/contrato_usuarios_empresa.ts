import type { Empresa } from './modelo_empresas'
import type { UsuarioBaseEmpresa, UsuarioEmpresa } from './modelo_usuarios_empresa'

export interface CriteriosUsuariosEmpresa {
  busqueda: string
  rol: string
  estado: string
}

export interface ListadoUsuariosEmpresa {
  busqueda: string
  rol: string
  estado: string
  pagina: number
  totalPaginas: number
  filas: UsuarioEmpresa[]
  total: number
  hayUsuarios: boolean
  cambiarBusqueda: (evento: { target: { value: unknown } }) => void
  cambiarRol: (evento: { target: { value: unknown } }) => void
  cambiarEstado: (evento: { target: { value: unknown } }) => void
  irAPagina: (pagina: number) => void
}

export interface DatosNuevoUsuario {
  nombres: string
  apellidos: string
  correo: string
  telefono: string
  rol: string
  estado: string
  notas: string
}

export type CampoNuevoUsuario = keyof DatosNuevoUsuario

export interface EdicionUsuariosEmpresa {
  usuarios: UsuarioEmpresa[]
  actualizar: (correoOriginal: string, nuevo: UsuarioEmpresa) => void
  correoDisponible: (nuevo: string, correoOriginal: string) => boolean
  agregando: boolean
  nuevo: DatosNuevoUsuario
  puedeAgregar: boolean
  iniciarAgregado: () => void
  cancelarAgregado: () => void
  confirmarAgregado: () => void
  manejarTexto: (campo: CampoNuevoUsuario) => (texto: string) => void
  manejarSelector: (campo: CampoNuevoUsuario) => (evento: { target: { value: unknown } }) => void
}

export interface PestanaUsuariosEmpresaProps {
  empresa: Empresa
  usuariosBase: UsuarioBaseEmpresa[]
  usuariosGuardados?: UsuarioEmpresa[]
  edicionUsuarios?: EdicionUsuariosEmpresa
}

export interface ListadoUsuariosProps {
  listado: ListadoUsuariosEmpresa
}

export interface EdicionUsuariosProps {
  editable: boolean
  alAgregar?: () => void
}

export interface TablaUsuariosEmpresaProps extends ListadoUsuariosProps, EdicionUsuariosProps {
  edicionUsuarios?: EdicionUsuariosEmpresa
}

export interface FilaUsuarioEmpresaProps extends EdicionUsuariosProps {
  usuario: UsuarioEmpresa
  edicionUsuarios?: EdicionUsuariosEmpresa
}

export interface FilaUsuarioEdicionProps {
  usuario: UsuarioEmpresa
  alGuardar: (nuevo: UsuarioEmpresa) => void
  alCancelar: () => void
  correoDisponible: (nuevo: string) => boolean
}

export interface OpcionMenuUsuarioEmpresa {
  clave: string
  etiqueta: string
  peligro?: boolean
  estado?: string
}

export interface FormularioAgregarUsuarioProps {
  edicionUsuarios: EdicionUsuariosEmpresa
}

export interface AvatarUsuarioEmpresaProps {
  usuario: Pick<UsuarioEmpresa, 'nombre' | 'iniciales'>
}

export interface EncabezadoSeccionEmpresaProps {
  icono: string
  titulo: string
  subtitulo: string
}

export interface TituloSeccionEmpresaProps {
  icono: string
  titulo: string
}
