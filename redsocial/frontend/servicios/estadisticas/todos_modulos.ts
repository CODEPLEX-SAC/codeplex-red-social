import type { Kpi, EstadoRatio } from '@/tipos/estadisticas/modelo_estadisticas_todos_modulos'
import datos from './todos_modulos.json'

export const KPIS = datos.kpis as Kpi[]
export const COMPOSICION_INGRESOS = datos.composicionIngresos
export const GASTOS_CATEGORIA = datos.gastosCategoria
export const TOP_CLIENTES = datos.topClientes
export const ESTADO_RESULTADOS = datos.estadoResultados as { concepto: string; actual: string; pct: string; variacion: string; tipo: 'positiva' | 'negativa'; fuerte?: boolean }[]
export const RATIOS_FINANCIEROS = datos.ratiosFinancieros as { nombre: string; valor: string; variacion: string; tipo: 'positiva' | 'negativa'; estado: EstadoRatio }[]
export const PROYECCION_VENTAS = datos.proyeccionVentas as { mes: string; claseAlto: number; tipo: 'real' | 'proyeccion' }[]
export const RENTABILIDAD_PROYECTO = datos.rentabilidadProyecto as { nombre: string; margen: string; estado: EstadoRatio }[]
export const COMPARATIVO_KPI = datos.comparativoKpi
export const ESCALA_TOP_CLIENTES = datos.escalaTopClientes
export const VENTAS_MENSUALES = datos.ventasMensuales
export const FLUJO_CAJA_MENSUAL = datos.flujoCajaMensual
