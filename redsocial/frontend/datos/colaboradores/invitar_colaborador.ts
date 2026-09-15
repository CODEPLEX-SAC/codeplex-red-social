import type { IconName } from '../../tipos/compartido/icono'

export const PASOS_FUNCIONA_INVITAR_COLABORADOR: { icono: IconName; nombre: string; descripcion: string }[] = [
  { icono: 'mensaje', nombre: '1. Invitación', descripcion: 'Envías una invitación al colaborador por correo o WhatsApp.' },
  { icono: 'inicio-sesion', nombre: '2. Registro / Acceso', descripcion: 'El colaborador acepta la invitación y crea su cuenta o inicia sesión.' },
  { icono: 'ajustes-sistema', nombre: '3. Asignación', descripcion: 'Se le asigna el rol y permisos según lo que hayas configurado.' },
  { icono: 'verificado', nombre: '4. Listo', descripcion: 'El colaborador aparecerá en tu lista y podrá usar los sistemas.' },
]

export const FORM_INFORMACION_DEFAULT = {
  nombres: 'Juan Pérez',
  apellidos: 'Martinez',
  correo: 'juan.perez@email.com',
  telefono: '987 654 321',
  documentoNumero: '45678912',
  cargo: 'Analista Contable',
}
