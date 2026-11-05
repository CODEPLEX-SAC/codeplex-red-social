import type { Dayjs } from 'dayjs'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { EstadoPermisosInvitacion, Modulo, PerfilesDeModulo, RecursoPermiso, RepositorioRolesModulo } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

export type PasoInvitacion = 1 | 2 | 3 | 4

export type EstadoInvitacion = 'cerrada' | 'abierta'

export interface DatosColaboradorInvitado {
  nombres: string
  apellidos: string
  correo: string
  telefono: string
  tipo_documento: string
  documento_numero: string
  cargo: string
  empresa: string
  area: string
}

export type CampoColaboradorInvitado = keyof DatosColaboradorInvitado

export type CambiarCampoColaborador = (campo: CampoColaboradorInvitado, valor: string) => void

export interface ResumenColaboradorInvitado {
  iniciales: string
  nombreCompleto: string
  correo: string
  telefono: string
}

export interface PasoFuncionaInvitacion {
  icono: IconName
  nombre: string
  descripcion: string
}

export interface DatosAsistenteInvitacion {
  informacion: { nombres: string; apellidos: string; correo: string; telefono: string; documentoNumero: string; cargo: string }
  pasosFunciona: PasoFuncionaInvitacion[]
  modulos: Modulo[]
  recursosModulos: Record<string, RecursoPermiso[]>
  perfilesModulos: Record<string, PerfilesDeModulo>
  perfilInicialModulos: Record<string, string>
  perfilesValidados: boolean
  repositorioRoles: RepositorioRolesModulo
  vigencia: { fechaInicio: string; fechaVencimiento: string }
  opcionesRecordatorio: string[]
  opcionesZonaHoraria: string[]
  resumenRol: { rolAsignado: string; modulosTexto: string }
  resumenVigencia: { fechaInicio: string; fechaVencimiento: string; alVencer: string; recordatorios: string; zonaHoraria: string }
  correoPreview: { nombrePila: string; invitadoPor: string; empresa: string; vigenciaTexto: string; expiraEnDias: string }
}

export interface ModalInvitarColaboradorProps {
  datos: DatosAsistenteInvitacion
  alCerrar: () => void
  alEnviar: (invitado: DatosColaboradorInvitado) => void
}

export interface PieInvitarColaboradorProps {
  paso: PasoInvitacion
  etiquetaSiguiente?: string
  alCancelar: () => void
  alAnterior: () => void
  alSiguiente: () => void
  alEnviar: () => void
}

export interface StepperInvitarColaboradorProps {
  pasoActivo: PasoInvitacion
}

export interface ContenidoPasoInvitacionProps {
  paso: PasoInvitacion
  datos: DatosAsistenteInvitacion
  colaborador: DatosColaboradorInvitado
  resumen: ResumenColaboradorInvitado
  alCambiarCampo: CambiarCampoColaborador
  alEditarPaso: (paso: PasoInvitacion) => void
  permisos: EstadoPermisosInvitacion
  vigencia: EstadoVigenciaInvitacion
}

export interface EstadoVigenciaInvitacion {
  inicio: Dayjs | null
  vencimiento: Dayjs | null
  asignarInicio: (valor: Dayjs | null) => void
  asignarVencimiento: (valor: Dayjs | null) => void
}

export interface DuracionVigencia {
  unidad: 'incompleta' | 'invalida' | 'anio' | 'mes' | 'dia'
  cantidad: number
}
