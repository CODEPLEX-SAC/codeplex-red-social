import type { Plantilla } from '@/tipos/reportes/modelo_reportes'
import datos from './estilos_reportes.json'

export const CLASES_ICONO_PLANTILLA = datos.clasesIconoPlantilla as Record<Plantilla['color'], string>
export const CLASES_FORMATO = datos.clasesFormato as Record<'pdf' | 'excel', string>
