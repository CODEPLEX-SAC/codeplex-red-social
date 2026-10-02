import type { ColorModulo } from '@/tipos/actividad/modelo_actividad_modulos'
import datos from './estilos_actividad_modulos.json'

export const CLASES_ICONO = datos.clasesIcono as Record<ColorModulo, string>
export const CLASES_REFERENCIA = datos.clasesReferencia as Record<ColorModulo, string>
