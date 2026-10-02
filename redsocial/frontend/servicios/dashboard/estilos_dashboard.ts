import type { CodeplexGraficoColor } from '@codeplex-sac/graficos'
import type { Kpi, Modulo } from '@/tipos/dashboard/modelo_dashboard'
import datos from './estilos_dashboard.json'

export const COLOR_GRAFICO = datos.colorGrafico as Record<string, CodeplexGraficoColor>
export const COLOR_GRAFICO_NOMBRE = datos.colorGraficoNombre as Record<string, CodeplexGraficoColor>
export const CLASES_ICONO_KPI = datos.clasesIconoKpi as Record<Kpi['color'], string>
export const CLASES_ESTADO_DASH = datos.clasesEstadoDash
export const CLASES_ICONO_MODULO = datos.clasesIconoModulo as Record<Modulo['color'], string>
export const ETIQUETA_RATIO = datos.etiquetaRatio as Record<keyof typeof CLASES_ESTADO_DASH, string>
