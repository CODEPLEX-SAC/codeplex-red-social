import type { IconName } from '../../tipos/compartido/icono'
import type { SolicitudRecibida } from '@/tipos/amigos/pagina_amigos_solicitudes'

export const RECIBIDAS: SolicitudRecibida[] = [
  { nombre: 'Valeria Quispe', tiempo: 'Hace 2 horas', descripcion: 'Contadora en Estudio Contable Quispe & Asociados', comunes: '5 amigos en común', masAvatares: '+3' },
  { nombre: 'Andrés Salazar', tiempo: 'Ayer', descripcion: 'Analista de Sistemas en TechSolutions SAC', comunes: '7 amigos en común', masAvatares: '+5' },
  { nombre: 'Paola Martínez', tiempo: 'Hace 2 días', descripcion: 'Abogada en Legal Solutions', comunes: '3 amigos en común', masAvatares: '' },
]

export const PERSONAS_CONOCER_SOLICITUDES: { nombre: string; comunes: string }[] = [
  { nombre: 'Sofía Huamán', comunes: '4 amigos en común' },
  { nombre: 'Ricardo Guerrero', comunes: '3 amigos en común' },
  { nombre: 'Daniela Vargas', comunes: '6 amigos en común' },
  { nombre: 'Roberto Silva', comunes: '2 amigos en común' },
]

export const TUS_LISTAS_SOLICITUDES: { icono: IconName; color: string; nombre: string; miembros: string }[] = [
  { icono: 'amigos', color: '#7c3aed', nombre: 'Mejores amigos', miembros: '24 amigos' },
  { icono: 'amigos', color: '#f97316', nombre: 'Familia', miembros: '16 amigos' },
  { icono: 'colaborador', color: '#3b82f6', nombre: 'Trabajo', miembros: '38 amigos' },
  { icono: 'inicio', color: '#22c55e', nombre: 'Universidad', miembros: '22 amigos' },
]

export const SOLICITUD_ENVIADA_EJEMPLO = {
  nombre: 'Miguel Ángel Vargas',
  estado: 'Pendiente',
  descripcion: 'Desarrollador en Codeplex Tech',
  comunes: '2 amigos en común',
}

export const ACTIVIDAD_RECIENTE_SOLICITUDES: { nombre: string; accion: string; tiempo: string }[] = [
  { nombre: 'Valeria Quispe', accion: 'te envió una solicitud de amistad.', tiempo: 'Hace 2 horas' },
  { nombre: 'Andrés Salazar', accion: 'te envió una solicitud de amistad.', tiempo: 'Ayer' },
  { nombre: 'Paola Martínez', accion: 'te envió una solicitud de amistad.', tiempo: 'Hace 2 días' },
]
