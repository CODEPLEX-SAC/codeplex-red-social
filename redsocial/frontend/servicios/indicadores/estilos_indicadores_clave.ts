import type { Kpi, EstadoInd, TarjetaModulo } from '@/tipos/indicadores/modelo_indicadores_clave'
import catalogoCompartido from '../../catalogos/capacidades/redsocial/compartido.json'
import datos from './estilos_indicadores_clave.json'

export const CLASES_ICONO_KPI = datos.clasesIconoKpi as Record<Kpi['color'], string>
export const CLASES_ESTADO_IND = datos.clasesEstadoInd as Record<EstadoInd, string>
export const ETIQUETA_ESTADO_IND = datos.etiquetaEstadoInd as Record<EstadoInd, string>
export const CLASES_ICONO_MODULO = datos.clasesIconoModulo as Record<TarjetaModulo['color'], string>
export const TH = catalogoCompartido.tabla_datos.compacta.encabezado
export const TD = catalogoCompartido.tabla_datos.compacta.celda
export const TD_NOMBRE = catalogoCompartido.tabla_datos.compacta.celda_nombre
