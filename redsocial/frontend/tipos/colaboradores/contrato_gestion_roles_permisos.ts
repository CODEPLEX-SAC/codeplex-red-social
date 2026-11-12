import type { Dispatch, SetStateAction } from 'react'
import type { DatosAsistenteInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'
import type { AvisoPermisos, ConfiguracionPermisos, ResultadoCreacionRol, RolModulo, SolicitudGuardadoRol } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

export type RolesPorModulo = Record<string, RolModulo[]>

export type AsignacionesPorModulo = Record<string, ConfiguracionPermisos>

export type CadenasPorModulo = Record<string, string>

export interface ValoresRolesPermisos {
  roles: RolesPorModulo
  perfiles: CadenasPorModulo
  asignaciones: AsignacionesPorModulo
  ajustados: Record<string, boolean>
  sinAccesoConfirmado: Record<string, boolean>
}

export interface AccionesRolesPermisos {
  setRoles: Dispatch<SetStateAction<RolesPorModulo>>
  setPerfiles: Dispatch<SetStateAction<CadenasPorModulo>>
  setAsignaciones: Dispatch<SetStateAction<AsignacionesPorModulo>>
  setCargados: Dispatch<SetStateAction<CadenasPorModulo>>
  setSinAccesoConfirmado: Dispatch<SetStateAction<Record<string, boolean>>>
  setAviso: Dispatch<SetStateAction<AvisoPermisos | null>>
  rolDe: (modulo: string, clave: string) => RolModulo | undefined
  guardarBorradorActual: (modulo: string) => void
  sinRegistro: (modulo: string) => (anterior: CadenasPorModulo) => CadenasPorModulo
}

export interface ContextoRolesPermisos {
  datos: DatosAsistenteInvitacion
  ambito: string
  valores: ValoresRolesPermisos
  acciones: AccionesRolesPermisos
}

export interface EdicionRolesPermisos {
  crearBorrador: (modulo: string, nombre: string) => ResultadoCreacionRol
  guardarRol: (solicitud: SolicitudGuardadoRol) => ResultadoCreacionRol
}

export interface ConsolidacionRolesPermisos {
  eliminarRol: (modulo: string, clave: string) => boolean
  revisarAvance: (confirmados?: string[]) => string[]
}

export interface ParametrosPendientes {
  valores: ValoresRolesPermisos
  confirmados: string[]
}

export interface ParametrosConsolidacion {
  roles: RolesPorModulo
  perfiles: CadenasPorModulo
  asignaciones: AsignacionesPorModulo
  registrar: (modulo: string, rol: RolModulo) => RolModulo
}

export interface ResultadoConsolidacion {
  roles: RolesPorModulo
  modulosSinPerfil: string[]
}
