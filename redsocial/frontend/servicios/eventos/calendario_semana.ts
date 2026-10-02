import type { DiaSemanaCal, EventoSemanaCal } from '@/tipos/eventos/modelo_eventos_calendario'
import datos from './calendario_semana.json'

export const RANGO_FECHA_SEMANA = datos.rangoFechaSemana
export const DIAS_SEMANA_CAL = datos.diasSemanaCal as DiaSemanaCal[]
export const HORAS_SEMANA = datos.horasSemana
export const EVENTOS_SEMANA = datos.eventosSemana as EventoSemanaCal[]
