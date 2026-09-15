import type { ParticipanteVL } from '@/tipos/mensajeria/pagina_mensajes_videollamada_en_curso'

export const PARTICIPANTES: ParticipanteVL[] = [
  { nombre: 'Pedro Lozano (Tú)', rol: 'Organizador', organizador: true, micActivo: true, videoActivo: true },
  { nombre: 'María Fernández', rol: 'En línea', micActivo: true, videoActivo: true },
  { nombre: 'Luis Rodríguez', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Carmen López', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Diego Mendoza', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Ana García', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Jorge Torres', rol: 'Colaborador', micActivo: false, videoActivo: true },
  { nombre: 'Lucía Gómez', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Sofía Ramírez', rol: 'Colaborador', micActivo: false, videoActivo: true },
  { nombre: 'Carlos Sánchez', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Mónica Valdez', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Javier Rojas', rol: 'Colaborador', micActivo: true, videoActivo: true },
  { nombre: 'Natalia Vera', rol: 'Colaborador', micActivo: false, videoActivo: false },
  { nombre: 'Ricardo Silva', rol: 'Invitado', micActivo: true, videoActivo: true },
  { nombre: 'Daniela Costa', rol: 'Invitado', micActivo: true, videoActivo: true },
]

export const LLAMADAS_RECIENTES: {
  nombre: string
  direccion?: 'entrante' | 'saliente'
  esGrupo?: boolean
  miembros?: string
  hora: string
}[] = [
  { nombre: 'María Fernández', direccion: 'entrante', hora: '10:24 AM' },
  { nombre: 'Luis Rodríguez', direccion: 'saliente', hora: '09:15 AM' },
  { nombre: 'Equipo de Proyectos', esGrupo: true, miembros: '4 miembros', hora: 'Ayer' },
  { nombre: 'Carmen López', direccion: 'entrante', hora: 'Ayer' },
  { nombre: 'Diego Mendoza', direccion: 'saliente', hora: '2 días' },
  { nombre: 'Grupo Contabilidad', esGrupo: true, miembros: '5 miembros', hora: '2 días' },
  { nombre: 'Ana García', direccion: 'entrante', hora: '3 días' },
  { nombre: 'Infraestructura TI', esGrupo: true, miembros: '3 miembros', hora: '3 días' },
]

export const CONTACTOS_FRECUENTES: { nombre: string; esGrupo?: boolean; miembros?: string }[] = [
  { nombre: 'María Fernández' },
  { nombre: 'Luis Rodríguez' },
  { nombre: 'Carmen López' },
  { nombre: 'Diego Mendoza' },
  { nombre: 'Equipo de Proyectos', esGrupo: true, miembros: '4 miembros' },
]

export const REUNIONES_PROGRAMADAS: { dia: string; mes: string; titulo: string; hora: string; participantes: string; avatares: number; extra: string }[] = [
  { dia: '15', mes: 'AGO', titulo: 'Reunión de seguimiento del proyecto Puerto Central', hora: '10:00 AM - 11:00 AM', participantes: '4 participantes', avatares: 3, extra: '+1' },
  { dia: '16', mes: 'AGO', titulo: 'Presentación de avances - Módulo Inventario', hora: '02:00 PM - 03:00 PM', participantes: '5 participantes', avatares: 3, extra: '+2' },
  { dia: '18', mes: 'AGO', titulo: 'Capacitación en seguridad de la información', hora: '04:00 PM - 05:00 PM', participantes: '6 participantes', avatares: 3, extra: '+3' },
]

export const REUNION_EN_CURSO = {
  titulo: 'Reunión de seguimiento del proyecto Puente Central',
  horario: '10:00 AM - 11:00 AM',
  duracion: '00:35:42',
}

export const CONTEO_PARTICIPANTES_EN_CURSO = {
  total: 15,
  todos: 15,
  enLinea: 12,
  invitados: 3,
}

export const HISTORIAL: { nombre: string; esGrupo?: boolean; fecha: string; duracion: string }[] = [
  { nombre: 'Videollamada con María Fernández', fecha: 'Ayer, 04:32 PM', duracion: '12 min 45 seg' },
  { nombre: 'Videollamada con Luis Rodríguez', fecha: 'Ayer, 11:15 AM', duracion: '09 min 21 seg' },
  { nombre: 'Videollamada grupal - Equipo de Proyectos', esGrupo: true, fecha: '12 ago, 03:20 PM', duracion: '25 min 10 seg' },
]
