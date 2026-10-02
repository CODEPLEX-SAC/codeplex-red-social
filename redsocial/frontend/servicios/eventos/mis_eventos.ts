import type { EventoOrganizas, EventoLateral } from '@/tipos/eventos/modelo_eventos_mis_eventos'
import type { DiaCalendarioMini } from '@/tipos/eventos/modelo_calendario_mini'
import datos from './mis_eventos.json'

export const EVENTOS_ORGANIZAS = datos.eventosOrganizas as EventoOrganizas[]
export const EVENTO_COLABORAS = datos.eventoColaboras as EventoOrganizas
export const PROXIMOS_LATERAL = datos.proximosLateral as EventoLateral[]
export const MES_CALENDARIO_MIS_EVENTOS = datos.mesCalendarioMisEventos
export const RESUMEN_MIS_EVENTOS = datos.resumenMisEventos as { valor: string; etiqueta: string }[]
export const SEMANAS_CALENDARIO_MIS_EVENTOS = datos.semanasCalendarioMisEventos as DiaCalendarioMini[][]
