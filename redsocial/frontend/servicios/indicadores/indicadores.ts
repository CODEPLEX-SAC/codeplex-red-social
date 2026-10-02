import type { Kpi, FilaTabla, TarjetaModulo } from '@/tipos/indicadores/modelo_indicadores_clave'
import datos from './indicadores.json'

export const KPIS = datos.kpis as Kpi[]
export const RENTABILIDAD = datos.rentabilidad as FilaTabla[]
export const LIQUIDEZ = datos.liquidez as FilaTabla[]
export const GESTION = datos.gestion as FilaTabla[]
export const UTILIDAD_NETA_COMBO = datos.utilidadNetaCombo
export const COSTOS = datos.costos
export const COMPARATIVO_KPI = datos.comparativoKpi
export const MESES_EJE_X_INDICADORES = datos.mesesEjeXIndicadores
export const VENTAS_PROYECCION_MENSUAL = datos.ventasProyeccionMensual
export const MODULOS_IND = datos.modulosInd as TarjetaModulo[]
