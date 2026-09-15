import type { IconName } from '../../tipos/compartido/icono'
import type { Amigo } from '@/tipos/amigos/pagina_amigos_todos'

export const RESUMEN_AMIGOS: { icono: IconName; peligro?: boolean; etiqueta: string; valor: string }[] = [
  { icono: 'amigos-todos', etiqueta: 'Todos los amigos', valor: '128' },
  { icono: 'colaboradores', etiqueta: 'En común', valor: '24' },
  { icono: 'solicitudes', etiqueta: 'Pendientes', valor: '3' },
  { icono: 'bloqueado', peligro: true, etiqueta: 'Bloqueados', valor: '2' },
]

export const AMIGOS: Amigo[] = [
  { nombre: 'María Fernández', estado: 'En línea', enLinea: true, comunes: '24 amigos en común', masAvatares: '+21' },
  { nombre: 'Luis Rodríguez', estado: 'En línea', enLinea: true, comunes: '18 amigos en común', masAvatares: '+15' },
  { nombre: 'Carmen López', estado: 'En línea', enLinea: true, comunes: '15 amigos en común', masAvatares: '+12' },
  { nombre: 'Diego Mendoza', estado: 'Hace 15 min', comunes: '12 amigos en común', masAvatares: '+9' },
  { nombre: 'Ana García', estado: 'Hace 1 hora', comunes: '10 amigos en común', masAvatares: '+7' },
  { nombre: 'Javier Torres', estado: 'Hace 2 horas', comunes: '8 amigos en común', masAvatares: '+5' },
  { nombre: 'Elena Sánchez', estado: 'Hace 3 horas', comunes: '6 amigos en común', masAvatares: '+3' },
  { nombre: 'Roberto Pérez', estado: 'Hace 5 horas', comunes: '5 amigos en común', masAvatares: '+2' },
]

export const SOLICITUDES_AMIGOS: { nombre: string; descripcion: string }[] = [
  { nombre: 'Carlos Ramírez', descripcion: 'Gerente de Proyectos en Constructora ABC' },
  { nombre: 'Valeria Quispe', descripcion: 'Contadora en Estudio Contable Quispe & Asociados' },
  { nombre: 'Andrés Salazar', descripcion: 'Analista de Sistemas en TechSolutions SAC' },
]

export const PERSONAS_CONOCER_TODOS: { nombre: string; comunes: string }[] = [
  { nombre: 'Paola Martínez', comunes: '3 amigos en común' },
  { nombre: 'Miguel Angel Vargas', comunes: '2 amigos en común' },
  { nombre: 'Sofía Huamán', comunes: '4 amigos en común' },
  { nombre: 'Ricardo Guerrero', comunes: '1 amigo en común' },
]

export const TUS_LISTAS_TODOS: { icono: IconName; color: string; nombre: string; cantidad: string }[] = [
  { icono: 'guardados', color: '#7a5af4', nombre: 'Mejores amigos', cantidad: '24 amigos' },
  { icono: 'amigos-todos', color: '#e08a1e', nombre: 'Familia', cantidad: '16 amigos' },
  { icono: 'maletin', color: '#3d6bf4', nombre: 'Trabajo', cantidad: '38 amigos' },
  { icono: 'listas', color: '#1e9a68', nombre: 'Universidad', cantidad: '22 amigos' },
]
