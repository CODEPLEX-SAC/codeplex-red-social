import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface Modulo {
  icono: IconName
  nombre: string
  descripcion: string
}

export type ClavePermiso = 'sin-acceso' | 'ver' | 'crear' | 'editar' | 'eliminar' | 'imprimir' | 'exportar'

export interface ColumnaPermiso {
  clave: ClavePermiso
  icono: IconName
  color: string
  etiqueta: string
  etiqueta_fila: string
}

export interface RecursoPermiso {
  nombre: string
  descripcion: string
  operaciones: ClavePermiso[]
}

export type ClavePerfil = string

export type PermisosModulo = Record<string, ClavePermiso[]>

export type PermisosPorModulo = Record<string, PermisosModulo>

export type PerfilesDeModulo = Record<string, PermisosModulo>

export interface PermisoEspecifico {
  id: string
  etiqueta: string
  activo: boolean
}

export interface ConfiguracionPermisos {
  operaciones: PermisosModulo
  especificos: Record<string, PermisoEspecifico[]>
}

export interface RolModulo {
  clave: ClavePerfil
  etiqueta: string
  configuracion: ConfiguracionPermisos
  creado: boolean
  borrador?: boolean
}

export interface RepositorioRolesModulo {
  listar: (ambito: string, modulo: string) => RolModulo[]
  registrar: (ambito: string, modulo: string, rol: RolModulo) => RolModulo
  actualizar: (ambito: string, modulo: string, rol: RolModulo) => RolModulo | null
  eliminar: (ambito: string, modulo: string, clave: string) => boolean
}

export type ModoGuardadoRol = 'duplicar' | 'editar'

export type CampoErrorRol = 'nombre' | 'permisos'

export interface ResultadoCreacionRol {
  rol: RolModulo | null
  error: string | null
  campo?: CampoErrorRol
}

export interface AvisoPermisos {
  variante: 'exito' | 'error'
  titulo?: string
  mensaje: string
}

export interface EstadoPermisosInvitacion {
  recursos: Record<string, RecursoPermiso[]>
  roles: Record<string, RolModulo[]>
  perfilesValidados: boolean
  porModulo: Record<string, ConfiguracionPermisos>
  perfiles: Record<string, ClavePerfil>
  ajustados: Record<string, boolean>
  expandidos: Record<string, string[]>
  moduloActivo: string | null
  alternarModulo: (nombre: string) => void
  activarModulo: (nombre: string | null) => void
  alternarPermiso: (modulo: string, recurso: string, clave: ClavePermiso, activo: boolean) => void
  alternarEspecifico: (modulo: string, recurso: string, id: string, activo: boolean) => void
  agregarEspecifico: (modulo: string, recurso: string, etiqueta: string) => string | null
  seleccionarRecurso: (modulo: string, recurso: string, activo: boolean) => void
  seleccionarModulo: (modulo: string, activo: boolean) => void
  aplicarPerfil: (modulo: string, perfil: string) => void
  restablecer: (modulo: string) => void
  crearBorrador: (modulo: string, nombre: string) => ResultadoCreacionRol
  guardarRol: (modulo: string, modo: ModoGuardadoRol, clave: string | null, nombre: string, configuracion: ConfiguracionPermisos) => ResultadoCreacionRol
  revisarAvance: (confirmados?: string[]) => string[]
  hayBorradores: boolean
  eliminarRol: (modulo: string, clave: string) => boolean
  cargados: Record<string, string>
  aviso: AvisoPermisos | null
  cerrarAviso: () => void
  cambiarExpandidos: (modulo: string, ids: string[]) => void
}
