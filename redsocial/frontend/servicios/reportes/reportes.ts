import type { Plantilla, ReporteReciente } from '@/tipos/reportes/modelo_reportes'
import { resolverColoresGraficos } from '../compartido/colores_graficos'
import datosJson from './reportes.json'

const datos = resolverColoresGraficos(datosJson)

export const PLANTILLAS = datos.plantillas as Plantilla[]
export const REPORTES_RECIENTES = datos.reportesRecientes as ReporteReciente[]
