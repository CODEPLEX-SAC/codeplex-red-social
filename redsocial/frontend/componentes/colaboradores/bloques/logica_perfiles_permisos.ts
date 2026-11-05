import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { configuracionDeOperaciones, copiarConfiguracion, existeEtiqueta, normalizarEtiqueta } from './logica_permisos_invitacion'
import type { ClavePerfil, ConfiguracionPermisos, PerfilesDeModulo, RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const PERFILES: { clave: string; etiqueta: string }[] = catalogoColaboradores.perfiles_permisos
const PREFIJO_ROL = catalogoColaboradores.dialogos_rol.prefijo_clave
const SIN_ROL = catalogoColaboradores.dialogos_rol.sin_rol
const VALOR_SIN_ROL = catalogoColaboradores.dialogos_rol.valor_sin_rol

export function etiquetaDePerfil(clave: ClavePerfil, roles: RolModulo[] = []): string {
  return roles.find((rol) => rol.clave === clave)?.etiqueta ?? PERFILES.find((perfil) => perfil.clave === clave)?.etiqueta ?? (clave === VALOR_SIN_ROL ? SIN_ROL : clave)
}

export function rolesBase(definiciones: PerfilesDeModulo): RolModulo[] {
  return Object.entries(definiciones).map(([clave, operaciones]) => ({ clave, etiqueta: etiquetaDePerfil(clave), configuracion: configuracionDeOperaciones(operaciones), creado: false }))
}

export function rolesDelModulo(definiciones: PerfilesDeModulo, guardados: RolModulo[]): RolModulo[] {
  const base = rolesBase(definiciones).map((rol) => guardados.find((guardado) => guardado.clave === rol.clave) ?? rol)
  return [...base, ...guardados.filter((guardado) => !base.some((rol) => rol.clave === guardado.clave))]
}

export function configuracionDelRol(roles: RolModulo[], clave: ClavePerfil): ConfiguracionPermisos {
  const rol = roles.find((candidato) => candidato.clave === clave)
  return rol ? copiarConfiguracion(rol.configuracion) : { operaciones: {}, especificos: {} }
}

export function claveDeRolNuevo(roles: RolModulo[], etiqueta: string): string {
  const base = normalizarEtiqueta(etiqueta).toLowerCase().replace(/\s+/g, '-')
  let numero = roles.length
  while (roles.some((rol) => rol.clave === `${PREFIJO_ROL}${base}-${numero}`)) numero += 1
  return `${PREFIJO_ROL}${base}-${numero}`
}

export function nombreDeRolRepetido(roles: RolModulo[], etiqueta: string, claveActual: ClavePerfil | null = null): boolean {
  return existeEtiqueta(roles.filter((rol) => rol.clave !== claveActual).map((rol) => rol.etiqueta), etiqueta)
}
