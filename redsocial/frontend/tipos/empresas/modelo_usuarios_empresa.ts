export type RolUsuarioEmpresa = 'administrador' | 'contador' | 'supervisor' | 'usuario'

export type EstadoUsuarioEmpresa = 'activo' | 'inactivo'

export interface UsuarioBaseEmpresa {
  nombre: string
  correoLocal: string
  rol: RolUsuarioEmpresa
  estado: EstadoUsuarioEmpresa
  fecha: string
  hora: string
}

export interface UsuarioEmpresa {
  nombre: string
  correo: string
  rol: RolUsuarioEmpresa
  estado: EstadoUsuarioEmpresa
  fecha: string
  hora: string
  notas?: string
  iniciales?: string
}
