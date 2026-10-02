import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import type { FiltroFecha } from '@/tipos/eventos/contrato_filtro_fecha'
import { esMismoDia } from './fechas_filtro'

const textos = catalogoEventos.panel_filtro_fecha
const MESES = catalogoEventos.meses
const DIAS_SEMANA = catalogoEventos.dias_semana

export function formatearFechaCorta(fecha: Date) {
  return [String(fecha.getDate()), textos.conector_de, MESES[fecha.getMonth()].toLowerCase()].join('')
}

export function formatearFechaLarga(fecha: Date) {
  return [formatearFechaCorta(fecha), textos.conector_de, String(fecha.getFullYear())].join('')
}

export function formatearFechaEvento(fecha: Date) {
  return [
    DIAS_SEMANA[(fecha.getDay() + 6) % 7],
    textos.separador_dia,
    String(fecha.getDate()),
    textos.espacio,
    MESES[fecha.getMonth()].slice(0, 3),
    textos.espacio,
    String(fecha.getFullYear()),
  ].join('')
}

export function esMismoMes(a: Date, b: Date) {
  return a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
}

export function unirExtremos(filtro: FiltroFecha, formatear: (fecha: Date) => string) {
  const inicio = formatear(filtro.inicio)
  return esMismoDia(filtro.inicio, filtro.fin) ? inicio : inicio + textos.separador_rango + formatear(filtro.fin)
}

export function formatearRangoLargo(filtro: FiltroFecha) {
  if (esMismoDia(filtro.inicio, filtro.fin) || !esMismoMes(filtro.inicio, filtro.fin)) return unirExtremos(filtro, formatearFechaLarga)
  return [String(filtro.inicio.getDate()), textos.conector_al, formatearFechaLarga(filtro.fin)].join('')
}

export function formatearRangoFinDeSemana(filtro: FiltroFecha) {
  return [
    textos.este_fin_de_semana,
    textos.rango_apertura,
    String(filtro.inicio.getDate()),
    textos.separador_rango,
    String(filtro.fin.getDate()),
    textos.espacio,
    MESES[filtro.fin.getMonth()].slice(0, 3),
    textos.espacio,
    String(filtro.fin.getFullYear()),
    textos.rango_cierre,
  ].join('')
}

export function etiquetaFiltroFecha(filtro: FiltroFecha) {
  return filtro.opcion === 'fin_de_semana' ? formatearRangoFinDeSemana(filtro) : formatearRangoLargo(filtro)
}

export function obtenerClaveDia(fecha: Date) {
  return String(fecha.getFullYear() * 10000 + (fecha.getMonth() + 1) * 100 + fecha.getDate())
}
