import type { GrupoAdmin, GrupoMis } from '@/tipos/grupos/modelo_grupos_mis_grupos'
import datos from './estilos_mis_grupos.json'

export const CLASES_ICONO_ADMIN = datos.clasesIconoAdmin as Record<GrupoAdmin['color'], string>
export const CLASES_ICONO_MIS = datos.clasesIconoMis as Record<GrupoMis['color'], string>
export const CLASES_ICONO_LATERAL = datos.clasesIconoLateral as Record<'morado' | 'rosa' | 'verde' | 'azul', string>
