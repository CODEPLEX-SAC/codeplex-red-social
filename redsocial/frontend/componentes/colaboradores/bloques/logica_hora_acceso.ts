import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const HORA_ACCESO = catalogoColaboradores.editar.hora_acceso
const PATRON_HORA_ACCESO = new RegExp(HORA_ACCESO.patron)
const HORAS_POR_MERIDIANO = 12

export function horaDeAcceso(texto: string): Dayjs | null {
  const partes = PATRON_HORA_ACCESO.exec(texto)
  if (!partes) return null
  const esTarde = partes[3].toLowerCase() === HORA_ACCESO.inicial_pm
  const hora = (Number(partes[1]) % HORAS_POR_MERIDIANO) + (esTarde ? HORAS_POR_MERIDIANO : 0)
  return dayjs().hour(hora).minute(Number(partes[2])).second(0).millisecond(0)
}

export function componerAcceso(texto: string, hora: Dayjs | null): string {
  if (!hora || !hora.isValid()) return texto
  return texto.replace(PATRON_HORA_ACCESO, hora.format(HORA_ACCESO.formato))
}
