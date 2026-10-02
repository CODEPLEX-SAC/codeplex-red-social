import type { Modulo, FilaPermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import datos from './permisos.json'

export const MODULOS = datos.modulos as Modulo[]
export const PERFILES_NIVEL_RAPIDO = datos.perfilesNivelRapido
export const PERFIL_APLICADO = datos.perfilAplicado
export const FILAS = datos.filas as FilaPermiso[]
