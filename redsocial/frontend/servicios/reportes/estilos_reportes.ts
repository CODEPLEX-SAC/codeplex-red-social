import type { CodeplexGraficoColor } from '@codeplex-sac/graficos'
import type { Plantilla } from '@/tipos/reportes/modelo_reportes'
import datos from './estilos_reportes.json'

export const COLOR_GRAFICO = datos.colorGrafico as Record<string, CodeplexGraficoColor>
export const CLASES_ICONO_PLANTILLA = datos.clasesIconoPlantilla as Record<Plantilla['color'], string>
export const CLASES_FORMATO = datos.clasesFormato as Record<'pdf' | 'excel', string>
