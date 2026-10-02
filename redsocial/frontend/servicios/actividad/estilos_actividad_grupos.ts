import type { GrupoActividad } from '@/tipos/actividad/modelo_actividad_grupos'
import datos from './estilos_actividad_grupos.json'

export const CLASES_ICONO_GRUPO = datos.clasesIconoGrupo as Record<GrupoActividad['color'], string>
