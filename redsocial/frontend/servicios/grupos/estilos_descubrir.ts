import type { GrupoDestacado, ColorCategoria } from '@/tipos/grupos/modelo_grupos_descubrir'
import datos from './estilos_descubrir.json'

export const CLASES_FONDO = datos.clasesFondo as Record<GrupoDestacado['fondo'], string>
export const CLASES_OVERLAY = datos.clasesOverlay as Record<GrupoDestacado['overlay'], string>
export const CLASES_CATEGORIA = datos.clasesCategoria as Record<ColorCategoria, string>
export const CLASES_LATERAL = datos.clasesLateral as Record<'morado' | 'naranja' | 'verde' | 'azul' | 'rosa', string>
