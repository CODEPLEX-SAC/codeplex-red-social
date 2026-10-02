import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { GrupoAdmin, GrupoMis } from '@/tipos/grupos/modelo_grupos_mis_grupos'
import datos from './mis_grupos.json'

export const GRUPOS_ADMIN = datos.gruposAdmin as GrupoAdmin[]
export const MIS_GRUPOS = datos.misGrupos as GrupoMis[]
export const ACTIVIDAD_MIS_GRUPOS = datos.actividadMisGrupos as { nombre: string; accion: string; grupo: string; tiempo: string; icono: IconName; color: 'morado' | 'rosa' | 'azul' | 'naranja' | 'verde' }[]
export const GRUPOS_POPULARES = datos.gruposPopulares as { nombre: string; color: 'morado' | 'rosa' | 'verde' | 'azul'; tipo: string }[]
