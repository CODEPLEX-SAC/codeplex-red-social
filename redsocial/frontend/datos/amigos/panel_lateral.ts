import type { IconName } from '../../tipos/compartido/icono'

export const PERSONAS_CONOCER: { nombre: string; comunes: string }[] = [
  { nombre: 'Javier Torres', comunes: '3 amigos en común' },
  { nombre: 'Elena Ramírez', comunes: '4 amigos en común' },
  { nombre: 'Paola Martínez', comunes: '2 amigos en común' },
  { nombre: 'Luis Rodríguez', comunes: '6 amigos en común' },
  { nombre: 'Diego Mendoza', comunes: '3 amigos en común' },
]

export const TUS_LISTAS_LATERAL: { icono: IconName; color: string; nombre: string; miembros: string }[] = [
  { icono: 'amigos', color: '#7c3aed', nombre: 'Mejores amigos', miembros: '24 amigos' },
  { icono: 'amigos', color: '#f97316', nombre: 'Familia', miembros: '16 amigos' },
  { icono: 'maletin', color: '#3b82f6', nombre: 'Trabajo', miembros: '38 amigos' },
  { icono: 'panel', color: '#22c55e', nombre: 'Universidad', miembros: '22 amigos' },
]

export const ACTIVIDAD_RECIENTE_AMIGOS: { nombre: string; accion: string; tiempo: string }[] = [
  { nombre: 'Sofía Huamán', accion: 'se unió a Codeplex', tiempo: 'Hace 2 horas' },
  { nombre: 'Miguel Ángel Vargas', accion: 'aceptó tu solicitud de amistad.', tiempo: 'Hace 1 día' },
  { nombre: 'Carlos Herrera', accion: 'te envió una solicitud de amistad.', tiempo: 'Hace 2 días' },
]
