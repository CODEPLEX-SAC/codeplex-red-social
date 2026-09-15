import type { IconName } from '../../tipos/compartido/icono'
import type { ColorGrupo, InvitacionPendiente, InvitacionAceptada } from '@/tipos/grupos/pagina_grupos_invitaciones'

export const PENDIENTES: InvitacionPendiente[] = [
  { nombre: 'Marketing Digital LATAM', icono: 'campana', color: 'rosa', tipo: 'Grupo público · 9.5K miembros', masAvatares: '+4 más', invitadoPor: 'Ana García', tiempo: 'Hace 3 horas', expiraTexto: '6 días', expiraColor: 'verde' },
  { nombre: 'Desarrolladores Codeplex', privado: true, icono: 'cuadricula', color: 'violeta', tipo: 'Grupo privado · 3.2K miembros', masAvatares: '+8 más', invitadoPor: 'Diego Mendoza', tiempo: 'Hace 1 día', expiraTexto: '13 días', expiraColor: 'naranja' },
]

export const ACEPTADAS: InvitacionAceptada[] = [
  { nombre: 'Equipo Codeplex', icono: 'amigos', color: 'morado', tipo: 'Grupo privado · 25 miembros', invitadoPor: 'Pedro Lozano', tiempo: 'Hace 2 semanas', fecha: '12/05/2026' },
  { nombre: 'Proyecto Alfa', icono: 'maletin', color: 'naranja', tipo: 'Grupo privado · 12 miembros', invitadoPor: 'María Fernández', tiempo: 'Hace 3 semanas', fecha: '05/05/2026' },
  { nombre: 'Programación Go', icono: 'cuadricula', color: 'morado', tipo: 'Grupo público · 85 miembros', invitadoPor: 'Luis Rodríguez', tiempo: 'Hace 1 mes', fecha: '28/04/2026' },
  { nombre: 'Ideas y Feedback', icono: 'sentimiento', color: 'azul', tipo: 'Grupo privado · 34 miembros', invitadoPor: 'Carlos Herrera', tiempo: 'Hace 1 mes', fecha: '20/04/2026' },
  { nombre: 'Contadores Perú', icono: 'estadisticas', color: 'morado', tipo: 'Grupo público · 1.2K miembros', invitadoPor: 'Carmen López', tiempo: 'Hace 2 meses', fecha: '11/04/2026' },
]

export const RESUMEN_INVITACIONES: { icono: IconName; color: 'morado' | 'verde' | 'rojo' | 'gris'; etiqueta: string; valor: number }[] = [
  { icono: 'reloj', color: 'morado', etiqueta: 'Pendientes', valor: 2 },
  { icono: 'nuevo-usuario', color: 'verde', etiqueta: 'Aceptadas', valor: 15 },
  { icono: 'cerrar', color: 'rojo', etiqueta: 'Rechazadas', valor: 1 },
  { icono: 'reloj', color: 'gris', etiqueta: 'Expiradas', valor: 0 },
]

export const CONTEO_PESTANAS_INVITACIONES_GRUPO = {
  todas: 2,
  pendientes: 2,
  aceptadas: 15,
  rechazadas: 1,
  expiradas: 0,
}

export const ACTIVIDAD_INVITACIONES: { nombre: string; accion: string; grupo: string; tiempo: string; icono: IconName; color: ColorGrupo }[] = [
  { nombre: 'Ana García', accion: 'te invitó a unirte a', grupo: 'Marketing Digital LATAM', tiempo: 'Hace 3 horas', icono: 'nuevo-usuario', color: 'violeta' },
  { nombre: 'Diego Mendoza', accion: 'te invitó a unirte a', grupo: 'Desarrolladores Codeplex', tiempo: 'Hace 1 día', icono: 'cuadricula', color: 'verde' },
  { nombre: 'Carlos Herrera', accion: 'aceptó tu invitación a', grupo: 'Equipo Codeplex', tiempo: 'Hace 2 días', icono: 'amigos', color: 'azul' },
  { nombre: 'María Fernández', accion: 'aceptó tu invitación a', grupo: 'Proyecto Alfa', tiempo: 'Hace 3 días', icono: 'maletin', color: 'naranja' },
]
