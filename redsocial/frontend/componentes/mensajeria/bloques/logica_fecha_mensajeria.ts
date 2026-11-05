import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { Mensaje } from '@/tipos/mensajeria/contrato_mensajes'

const textos = catalogoMensajeria.conversacion
const DOCE_HORAS = 12

export function formatearHora(fecha: Date): string {
  const horas = fecha.getHours()
  const hora12 = horas % DOCE_HORAS === 0 ? DOCE_HORAS : horas % DOCE_HORAS
  const meridiano = horas >= DOCE_HORAS ? textos.meridiano.pm : textos.meridiano.am
  const formato = textos.formato_hora
  const reloj = [hora12, fecha.getMinutes()].map((valor) => String(valor).padStart(2, formato.relleno)).join(formato.separador)
  return [reloj, meridiano].join(formato.espacio)
}

export function esMismoDia(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function formatearFecha(fecha: Date, ahora: Date): string {
  const formato = textos.formato_fecha
  const base = formato.plantilla.replace(':dia', formato.dias[fecha.getDay()]).replace(':n', String(fecha.getDate())).replace(':mes', formato.meses[fecha.getMonth()])
  return fecha.getFullYear() === ahora.getFullYear() ? base : base + formato.sufijo_anio.replace(':anio', String(fecha.getFullYear()))
}

export function etiquetaDeDia(mensaje: Mensaje, anterior: Mensaje | undefined, ahora: Date): string | undefined {
  const creado = new Date(mensaje.creadoEn)
  return anterior && esMismoDia(new Date(anterior.creadoEn), creado) ? undefined : formatearFecha(creado, ahora)
}

const MILISEGUNDOS_POR_DIA = 86400000
const etiquetaTiempo = textos.etiqueta_tiempo

function diasEntre(fecha: Date, ahora: Date): number {
  const inicio = (valor: Date) => Date.UTC(valor.getFullYear(), valor.getMonth(), valor.getDate())
  return Math.round((inicio(ahora) - inicio(fecha)) / MILISEGUNDOS_POR_DIA)
}

function formatearFechaNumerica(fecha: Date): string {
  const relleno = (valor: number) => String(valor).padStart(2, etiquetaTiempo.relleno_numerico)
  return etiquetaTiempo.plantilla_numerica.replace(':dd', relleno(fecha.getDate())).replace(':mm', relleno(fecha.getMonth() + 1)).replace(':aaaa', String(fecha.getFullYear()))
}

export function etiquetaDeConversacion(creadoEn: string | null, ahora: Date): string {
  const fecha = new Date(creadoEn ?? Number.NaN)
  if (Number.isNaN(fecha.getTime())) return String()
  const dias = diasEntre(fecha, ahora)
  if (dias === 0) return formatearHora(fecha)
  if (dias === 1) return etiquetaTiempo.ayer
  return dias < 0 || dias >= etiquetaTiempo.umbral_dias ? formatearFechaNumerica(fecha) : textos.formato_fecha.dias[fecha.getDay()]
}

export function etiquetaCompletaDeConversacion(creadoEn: string | null, ahora: Date): string {
  const fecha = new Date(creadoEn ?? Number.NaN)
  return Number.isNaN(fecha.getTime()) ? String() : [formatearFecha(fecha, ahora), formatearHora(fecha)].join(textos.formato_hora.espacio)
}

export function proximaMedianoche(ahora: Date): number {
  return new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1).getTime()
}
