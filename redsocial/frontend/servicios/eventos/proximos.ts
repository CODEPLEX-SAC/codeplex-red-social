import type { IconName } from '../../tipos/compartido/contrato_icono'
import type { EventoLista } from '@/tipos/eventos/modelo_eventos_proximos'
import type { DiaCalendarioMini } from '@/tipos/eventos/modelo_calendario_mini'
import datos from './proximos.json'

export const EVENTOS = datos.eventos as EventoLista[]
export const PROXIMAS_FECHAS_EVENTOS_PROXIMOS = datos.proximasFechasEventosProximos as { dia: string; mes: string; nombre: string; punto: 'tecnologia' | 'negocios' | 'educacion'; detalle: string }[]
export const CATEGORIAS_LATERAL_EVENTOS_PROXIMOS = datos.categoriasLateralEventosProximos as { icono: IconName; color: string; nombre: string; conteo: string }[]
export const MES_CALENDARIO_PROXIMOS = datos.mesCalendarioProximos
export const SEMANAS_CALENDARIO_PROXIMOS = datos.semanasCalendarioProximos as DiaCalendarioMini[][]
