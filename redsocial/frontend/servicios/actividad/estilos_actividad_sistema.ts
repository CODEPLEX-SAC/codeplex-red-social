import type { EstadoIndicador, ColorEvento } from '@/tipos/actividad/modelo_actividad_sistema'
import datos from './estilos_actividad_sistema.json'

export const CLASES_ICONO_EVENTO = datos.clasesIconoEvento as Record<ColorEvento, string>
export const CLASES_INDICADOR = datos.clasesIndicador as Record<EstadoIndicador, string>
