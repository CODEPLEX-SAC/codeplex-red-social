import type { Kpi, EstadoRatio } from '@/tipos/estadisticas/modelo_estadisticas_todos_modulos'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import datos from './estilos_todos_modulos.json'

export const CLASES_ICONO_KPI = datos.clasesIconoKpi as Record<Kpi['color'], string>
export const CLASES_ESTADO_EST = datos.clasesEstadoEst as Record<EstadoRatio, string>
export const ETIQUETA_ESTADO = datos.etiquetaEstado as Record<EstadoRatio, string>
export const TH = catalogoCompartido.tabla_datos.compacta.encabezado
export const TD = catalogoCompartido.tabla_datos.compacta.celda
export const TD_NOMBRE = catalogoCompartido.tabla_datos.compacta.celda_nombre
