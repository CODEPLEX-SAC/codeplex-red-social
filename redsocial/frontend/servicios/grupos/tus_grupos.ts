import type { GrupoSugerido, GrupoSugeridoBase } from '@/tipos/grupos/contrato_tus_grupos'
import { imagenDeGrupo } from './imagenes_grupos'
import sugerencias from './sugerencias_grupos.json'

function conImagen(grupo: GrupoSugeridoBase, indice: number): GrupoSugerido {
  return { ...grupo, imagen: imagenDeGrupo(grupo.nombre, indice) }
}

const PARA_TI = sugerencias.paraTi as GrupoSugeridoBase[]

export const GRUPOS_SUGERIDOS_PARA_TI = PARA_TI.map(conImagen)
export const GRUPOS_SUGERIDOS_MAS = (sugerencias.mas as GrupoSugeridoBase[]).map((grupo, indice) => conImagen(grupo, indice + PARA_TI.length))
export const CATEGORIAS_SUGERIDAS = [...new Set([...sugerencias.paraTi, ...sugerencias.mas].map((grupo) => grupo.categoria))]
