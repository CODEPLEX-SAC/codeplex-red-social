import type { CeldaCal, EventoLateral, EventoResumenDia } from '@/tipos/eventos/modelo_eventos_calendario'
import datos from './calendario.json'

export const CELDAS = datos.celdas as CeldaCal[]
export const PROXIMOS_LATERAL = datos.proximosLateral as EventoLateral[]
export const MES_CALENDARIO_ACTUAL = datos.mesCalendarioActual
export const MES_ABREVIADO_ACTUAL = datos.mesAbreviadoActual
export const EVENTOS_POR_DIA = datos.eventosPorDia as unknown as Record<number, EventoResumenDia[]>
export const LEYENDA_CALENDARIO = datos.leyendaCalendario as { color: string; nombre: string }[]
export const SEMANAS_MINI = datos.semanasMini as { numero: string; otroMes?: boolean; hoy?: boolean; conPunto?: boolean }[][]
