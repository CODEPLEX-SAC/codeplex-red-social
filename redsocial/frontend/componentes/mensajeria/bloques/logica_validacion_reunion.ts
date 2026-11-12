import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { minutosDeDuracion } from './logica_duracion_reunion'
import type { Dayjs } from 'dayjs'
import type { BorradorReunion, ErroresProgramacion } from '@/tipos/mensajeria/contrato_programar_reunion'

const errores = catalogoMensajeria.videollamada.programar.textos.errores

export function erroresDeHorario({ fecha, inicio, fin }: BorradorReunion, ahora: Dayjs): ErroresProgramacion {
  const resultado: ErroresProgramacion = {}
  if (inicio !== null && fin !== null && minutosDeDuracion(inicio, fin) <= 0) resultado.fin = errores.orden
  if (fecha !== null && inicio !== null && fecha.hour(inicio.hour()).minute(inicio.minute()).second(0).isBefore(ahora)) resultado.fecha = errores.pasado
  return resultado
}
