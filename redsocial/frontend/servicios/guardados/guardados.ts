import type { GrupoGuardado, ColeccionGuardada, GrupoRecomendadoGuardado } from '@/tipos/guardados/modelo_guardados'
import datos from './guardados.json'

export const GRUPOS_GUARDADOS = datos.grupos as GrupoGuardado[]
export const COLECCIONES_GUARDADAS = datos.colecciones as ColeccionGuardada[]
export const GRUPOS_RECOMENDADOS_GUARDADOS = datos.recomendados as GrupoRecomendadoGuardado[]
