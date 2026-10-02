import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { EventoPopular } from '@/tipos/eventos/modelo_eventos_populares'
import type { DiaCalendarioMini } from '@/tipos/eventos/modelo_calendario_mini'
import datos from './populares.json'

export const EVENTOS = datos.eventos as EventoPopular[]
export const PROXIMAS_FECHAS_POPULARES = datos.proximasFechasPopulares as { dia: string; mes: string; nombre: string; punto: 'tecnologia' | 'negocios' | 'educacion'; detalle: string }[]
export const CATEGORIAS_LATERAL_POPULARES = datos.categoriasLateralPopulares as { icono: IconName; color: string; nombre: string; conteo: string }[]
export const MES_CALENDARIO_POPULARES = datos.mesCalendarioPopulares
export const SEMANAS_CALENDARIO_POPULARES = datos.semanasCalendarioPopulares as DiaCalendarioMini[][]
