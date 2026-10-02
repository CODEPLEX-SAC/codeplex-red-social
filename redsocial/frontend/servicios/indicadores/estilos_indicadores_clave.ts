import type { CodeplexGraficoColor } from '@codeplex-sac/graficos'
import type { Kpi, EstadoInd, TarjetaModulo } from '@/tipos/indicadores/modelo_indicadores_clave'
import datos from './estilos_indicadores_clave.json'

export const COLOR_GRAFICO = datos.colorGrafico as Record<string, CodeplexGraficoColor>
export const CLASES_ICONO_KPI = datos.clasesIconoKpi as Record<Kpi['color'], string>
export const CLASES_ESTADO_IND = datos.clasesEstadoInd as Record<EstadoInd, string>
export const ETIQUETA_ESTADO_IND = datos.etiquetaEstadoInd as Record<EstadoInd, string>
export const CLASES_ICONO_MODULO = datos.clasesIconoModulo as Record<TarjetaModulo['color'], string>
export const TH = datos.claseTh
export const TD = datos.claseTd
