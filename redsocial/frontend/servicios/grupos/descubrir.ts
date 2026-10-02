import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { GrupoDestacado, ColorCategoria } from '@/tipos/grupos/modelo_grupos_descubrir'
import datos from './descubrir.json'

export const DESTACADOS = datos.destacados as GrupoDestacado[]
export const CATEGORIAS = datos.categorias as { icono: IconName; color: ColorCategoria; nombre: string; cantidad: string }[]
export const MIS_GRUPOS_LATERAL = datos.misGruposLateral as { nombre: string; color: 'morado' | 'naranja' | 'verde' | 'azul' | 'rosa'; admin?: boolean; miembros: string }[]
export const ACTIVIDAD_DESCUBRIR = datos.actividadDescubrir as { nombre: string; accion: string; grupo: string; tiempo: string }[]
