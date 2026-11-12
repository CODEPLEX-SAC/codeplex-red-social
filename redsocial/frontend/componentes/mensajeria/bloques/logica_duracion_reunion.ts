import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { Dayjs } from 'dayjs'

const duracion = catalogoMensajeria.videollamada.programar.textos.duracion
const MINUTOS_POR_HORA = 60

function minutosDelDia(hora: Dayjs): number {
  return hora.hour() * MINUTOS_POR_HORA + hora.minute()
}

export function minutosDeDuracion(inicio: Dayjs | null, fin: Dayjs | null): number {
  if (inicio === null || fin === null) return 0
  return minutosDelDia(fin) - minutosDelDia(inicio)
}

export function textoDeDuracion(minutos: number): string {
  if (minutos <= 0) return duracion.sin_datos
  const horas = Math.floor(minutos / MINUTOS_POR_HORA)
  const resto = minutos % MINUTOS_POR_HORA
  if (horas === 0) return duracion.minutos.replace(':n', String(resto))
  if (resto > 0) return duracion.horas_minutos.replace(':h', String(horas)).replace(':m', String(resto))
  if (horas === 1) return duracion.hora
  return duracion.horas.replace(':n', String(horas))
}
