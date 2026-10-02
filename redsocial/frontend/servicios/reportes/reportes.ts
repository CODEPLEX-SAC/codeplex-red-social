import type { Plantilla, ReporteReciente } from '@/tipos/reportes/modelo_reportes'
import datos from './reportes.json'

export const PLANTILLAS = datos.plantillas as Plantilla[]
export const REPORTES_RECIENTES = datos.reportesRecientes as ReporteReciente[]
