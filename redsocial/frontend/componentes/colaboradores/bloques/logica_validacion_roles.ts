import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { nombreDeRolRepetido } from './logica_perfiles_permisos'
import { tieneAcceso } from './logica_permisos_invitacion'
import type { ConfiguracionPermisos, ResultadoCreacionRol, RolModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const errores = catalogoColaboradores.dialogos_rol.errores

export function validarNombreRol(roles: RolModulo[], clave: string | null, etiqueta: string): ResultadoCreacionRol | null {
  if (!etiqueta) return { rol: null, error: errores.nombre_vacio, campo: 'nombre' }
  if (nombreDeRolRepetido(roles, etiqueta, clave)) return { rol: null, error: errores.nombre_repetido, campo: 'nombre' }
  return null
}

export function validarEdicionRol(configuracion: ConfiguracionPermisos, actual: RolModulo | undefined): ResultadoCreacionRol | null {
  if (!tieneAcceso(configuracion)) return { rol: null, error: errores.sin_permisos, campo: 'permisos' }
  if (!actual || actual.borrador) return { rol: null, error: errores.rol_no_editable }
  return null
}
