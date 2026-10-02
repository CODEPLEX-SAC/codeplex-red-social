import type { CodeplexGraficoColor } from '@codeplex-sac/graficos'
import type { Kpi, EstadoRatio } from '@/tipos/estadisticas/modelo_estadisticas_todos_modulos'
import datos from './estilos_todos_modulos.json'

export const COLOR_GRAFICO = datos.colorGrafico as Record<string, CodeplexGraficoColor>
export const CLASES_ICONO_KPI = datos.clasesIconoKpi as Record<Kpi['color'], string>
export const CLASES_ESTADO_EST = datos.clasesEstadoEst as Record<EstadoRatio, string>
export const ETIQUETA_ESTADO = datos.etiquetaEstado as Record<EstadoRatio, string>
export const TH = datos.claseTh
export const TD = datos.claseTd
