import type { DatosAsistenteInvitacion } from '@/tipos/colaboradores/contrato_invitar_colaborador'
import { PASOS_FUNCIONA_INVITAR_COLABORADOR, FORM_INFORMACION_DEFAULT } from './invitar_colaborador'
import { RESUMEN_ROL, RESUMEN_VIGENCIA, CORREO_PREVIEW } from './invitacion_resumen'
import { REPOSITORIO_ROLES_MODULO } from './roles_modulo'
import { MODULOS, RECURSOS_MODULOS, PERFILES_MODULOS, PERFIL_INICIAL_MODULOS, PERFILES_VALIDADOS } from './permisos'
import { VIGENCIA_DEFAULT, OPCIONES_RECORDATORIO, OPCIONES_ZONA_HORARIA } from './vigencia'

export const DATOS_ASISTENTE_INVITACION: DatosAsistenteInvitacion = {
  informacion: FORM_INFORMACION_DEFAULT,
  pasosFunciona: PASOS_FUNCIONA_INVITAR_COLABORADOR,
  modulos: MODULOS,
  recursosModulos: RECURSOS_MODULOS,
  perfilesModulos: PERFILES_MODULOS,
  perfilInicialModulos: PERFIL_INICIAL_MODULOS,
  perfilesValidados: PERFILES_VALIDADOS,
  repositorioRoles: REPOSITORIO_ROLES_MODULO,
  vigencia: VIGENCIA_DEFAULT,
  opcionesRecordatorio: OPCIONES_RECORDATORIO,
  opcionesZonaHoraria: OPCIONES_ZONA_HORARIA,
  resumenRol: RESUMEN_ROL,
  resumenVigencia: RESUMEN_VIGENCIA,
  correoPreview: CORREO_PREVIEW,
}
