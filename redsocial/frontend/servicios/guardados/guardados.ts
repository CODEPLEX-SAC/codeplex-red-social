import { imagenesGaleria } from '../grupos/imagenes_grupos'
import type { GrupoGuardado, ColeccionGuardada } from '@/tipos/guardados/modelo_guardados'
import datos from './guardados.json'

const IMAGENES = imagenesGaleria()
const GRUPOS = datos.grupos
const COLECCIONES = datos.colecciones

export const GRUPOS_GUARDADOS: GrupoGuardado[] = GRUPOS.map((grupo, indice) => ({ ...(grupo as Omit<GrupoGuardado, 'imagen'>), imagen: IMAGENES[indice % IMAGENES.length] }))
export const COLECCIONES_GUARDADAS = COLECCIONES as ColeccionGuardada[]
