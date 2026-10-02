import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import type { OpcionRapidaFecha } from '@/tipos/eventos/contrato_filtro_fecha'

const textos = catalogoEventos.panel_filtro_fecha

export const OPCIONES_RAPIDAS = textos.opciones_rapidas as readonly { clave: OpcionRapidaFecha; etiqueta: string; detalle: string }[]

export const OPCIONES_AVANZADAS = textos.opciones_avanzadas as readonly { clave: OpcionRapidaFecha; etiqueta: string; detalle: string }[]

export const OPCIONES_MOVIL = [...OPCIONES_RAPIDAS, ...OPCIONES_AVANZADAS]

const MESES = catalogoEventos.meses

export const HOY_PROTOTIPO = new Date(2026, 8, 23)

export const DESPLAZAMIENTOS_RAPIDOS: Partial<Record<OpcionRapidaFecha, [number, number]>> = {
  hoy: [0, 0],
  manana: [1, 1],
  fin_de_semana: [3, 4],
}

export function formatearFechaRango(fecha: Date) {
  return [
    String(fecha.getDate()),
    textos.conector_de,
    MESES[fecha.getMonth()].slice(0, 3),
    textos.espacio,
    String(fecha.getFullYear()),
  ].join('')
}

export function esMismoDia(a: Date, b: Date) {
  return a.toDateString() === b.toDateString()
}

export function sumarDias(fecha: Date, dias: number) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + dias)
}

export function estaEnRango(fecha: Date, inicio: Date, fin: Date) {
  const t = fecha.getTime()
  return Math.min(Math.max(t, inicio.getTime()), fin.getTime()) === t
}

export function generarCeldasMes(anio: number, mes: number) {
  const primerDia = new Date(anio, mes, 1)
  const offsetInicio = (primerDia.getDay() + 6) % 7
  const totalCeldas = 42
  return Array.from({ length: totalCeldas }, (_, indice) => {
    const fecha = new Date(anio, mes, indice - offsetInicio + 1)
    return { fecha, numero: fecha.getDate(), delMes: fecha.getMonth() === mes }
  })
}
