import type { Modulo, PerfilesDeModulo, RecursoPermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import datos from './permisos.json'

export const MODULOS = datos.modulos as Modulo[]
export const RECURSOS_MODULOS = datos.recursosModulos as Record<string, RecursoPermiso[]>
export const PERFILES_MODULOS = datos.perfilesModulos as Record<string, PerfilesDeModulo>
export const PERFILES_VALIDADOS = datos.perfilesValidados
export const PERFIL_INICIAL_MODULOS = datos.perfilInicialModulos as Record<string, string>
