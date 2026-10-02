import type { Publicacion } from '@/tipos/actividad/modelo_actividad_publicaciones'
import datos from './publicaciones.json'

export const PUBLICACIONES = datos.publicaciones as (Publicacion & { nombreGrupo?: string })[]
