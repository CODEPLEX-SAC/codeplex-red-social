import type { EventoDiaCal } from '@/tipos/eventos/modelo_eventos_calendario'
import datos from './calendario_dia.json'

export const FECHA_DIA = datos.fechaDia
export const HORAS_DIA = datos.horasDia
export const EVENTOS_DIA = datos.eventosDia as EventoDiaCal[]
