import type { Kpi, Modulo } from '@/tipos/dashboard/modelo_dashboard'
import datos from './dashboard.json'

export const KPIS = datos.kpis as Kpi[]
export const RATIOS = datos.ratios as { nombre: string; valor: string; estado: 'optimo' | 'aceptable' | 'bajo' | 'riesgo' }[]
export const MODULOS = datos.modulos as Modulo[]
export const RANKING = datos.ranking
export const BARRAS_PROYECCION = datos.barrasProyeccion
export const DONA_SEGMENTOS = datos.donaSegmentos
export const RESUMEN_DASHBOARD = datos.resumenDashboard
export const MESES_EJE_X_VENTAS = datos.mesesEjeXVentas
export const MESES_EJE_X_FLUJO = datos.mesesEjeXFlujo
export const VENTAS_MENSUALES = datos.ventasMensuales
export const FLUJO_CAJA_MENSUAL = datos.flujoCajaMensual
export const VENTAS_TOTAL_CHART = datos.ventasTotalChart
