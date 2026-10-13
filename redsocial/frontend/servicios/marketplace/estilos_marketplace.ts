import type { EstiloSelectorPlanes, EstiloPlanDestacado } from '@/tipos/marketplace/modelo_planes'
import datos from './estilos_marketplace.json'

export const CLASES_MODULO = datos.clasesModulo as Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rojo', string>
export const CLASES_CATEGORIA_COLOR = datos.clasesCategoriaColor as Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rosa', string>
export const CLASES_INSIGNIA_CATEGORIA = datos.clasesInsigniaCategoria as Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rojo', string>
export const CLASES_SELECTOR_PLANES = datos.clasesSelectorPlanes as Record<'verde' | 'azul' | 'morado' | 'naranja' | 'rojo', EstiloSelectorPlanes>
export const CLASES_PLAN_DESTACADO = datos.clasesPlanDestacado as EstiloPlanDestacado
