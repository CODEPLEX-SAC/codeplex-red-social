import type { DatosAsistenteInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'
import { PASOS_FUNCIONA_INVITAR_COLABORADOR, FORM_INFORMACION_DEFAULT } from './invitar_colaborador'
import { RESUMEN_ROL, RESUMEN_VIGENCIA, CORREO_PREVIEW } from './invitacion_resumen'
import { MODULOS, FILAS, PERFILES_NIVEL_RAPIDO, PERFIL_APLICADO } from './permisos'
import { VIGENCIA_DEFAULT, OPCIONES_RECORDATORIO, OPCIONES_ZONA_HORARIA } from './vigencia'

export const DATOS_ASISTENTE_INVITACION: DatosAsistenteInvitacion = {
  informacion: FORM_INFORMACION_DEFAULT,
  pasosFunciona: PASOS_FUNCIONA_INVITAR_COLABORADOR,
  modulos: MODULOS,
  filas: FILAS,
  perfilesNivelRapido: PERFILES_NIVEL_RAPIDO,
  perfilAplicado: PERFIL_APLICADO,
  vigencia: VIGENCIA_DEFAULT,
  opcionesRecordatorio: OPCIONES_RECORDATORIO,
  opcionesZonaHoraria: OPCIONES_ZONA_HORARIA,
  resumenRol: RESUMEN_ROL,
  resumenVigencia: RESUMEN_VIGENCIA,
  correoPreview: CORREO_PREVIEW,
}
