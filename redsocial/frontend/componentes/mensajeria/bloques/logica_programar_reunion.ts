import dayjs from 'dayjs'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { Dayjs } from 'dayjs'
import { erroresObligatorios } from './logica_obligatorios_reunion'
import { erroresDeHorario } from './logica_validacion_reunion'
import type { BorradorReunion, DatosReunionProgramada, ErroresProgramacion } from '@/tipos/mensajeria/contrato_programar_reunion'

const programar = catalogoMensajeria.videollamada.programar
const HORA_INICIAL = 10
const FORMATO_FECHA = programar.formatos.fecha
const FORMATO_HORA = programar.formatos.hora

export function sumarDuracionInicial(hora: Dayjs): Dayjs {
  return hora.add(programar.minutos_duracion_inicial, 'minute')
}

export function borradorInicial(): BorradorReunion {
  const inicio = dayjs().hour(HORA_INICIAL).minute(0).second(0)
  return {
    nombre: String(),
    descripcion: String(),
    fecha: dayjs().add(1, 'day'),
    zona: programar.zona_inicial,
    inicio,
    fin: sumarDuracionInicial(inicio),
    invitados: [...programar.invitados_iniciales],
    permitirCompartir: true,
    solicitarAdmision: true,
  }
}

export function validarBorrador(borrador: BorradorReunion, ahora: Dayjs = dayjs()): ErroresProgramacion {
  return { ...erroresObligatorios(borrador), ...erroresDeHorario(borrador, ahora) }
}

export function hayErrores(resultado: ErroresProgramacion): boolean {
  return Object.keys(resultado).length > 0
}

export function datosDeBorrador(borrador: BorradorReunion): DatosReunionProgramada {
  return {
    nombre: borrador.nombre.trim(),
    descripcion: borrador.descripcion.trim(),
    fecha: borrador.fecha?.format(FORMATO_FECHA) ?? String(),
    zona: borrador.zona,
    inicio: borrador.inicio?.format(FORMATO_HORA) ?? String(),
    fin: borrador.fin?.format(FORMATO_HORA) ?? String(),
    invitados: borrador.invitados,
    permitirCompartir: borrador.permitirCompartir,
    solicitarAdmision: borrador.solicitarAdmision,
  }
}
