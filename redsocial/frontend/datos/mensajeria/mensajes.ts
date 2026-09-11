import type { Conversacion, ConversacionActiva } from '../../tipos/mensajeria/mensajes'

export const CONVERSACIONES: readonly Conversacion[] = [
  { nombre: 'María Fernández', extracto: 'Perfecto, muchas gracias Pedro.', hora: '10:24 AM', noLeidos: 2 },
  { nombre: 'Luis Rodríguez', extracto: 'Te comparto el informe solicitado.', hora: '09:15 AM', noLeidos: 1 },
  { nombre: 'Equipo de Proyectos', extracto: 'Ana: Se ha actualizado el cronograma.', hora: 'Ayer', esGrupo: true },
  { nombre: 'Carmen López', extracto: 'Nos vemos en la reunión de hoy.', hora: 'Ayer' },
  { nombre: 'Diego Mendoza', extracto: 'Estoy revisando los documentos.', hora: '2 días' },
  { nombre: 'Grupo Contabilidad', extracto: 'Luis: Se cerró el mes de julio.', hora: '2 días', esGrupo: true, silenciado: true },
  { nombre: 'Ana García', extracto: 'Gracias por la información.', hora: '3 días' },
  { nombre: 'Infraestructura TI', extracto: 'Servidor de reportes reiniciado.', hora: '3 días', esGrupo: true },
  { nombre: 'Javier Torres', extracto: 'Avísame cualquier novedad.', hora: '4 días' },
] as const

export const CONVERSACION_ACTIVA: ConversacionActiva = {
  nombre: 'María Fernández',
  enLinea: true,
  mensajeFijado: 'Reunión de seguimiento del proyecto - Viernes 15 de agosto a las 10:00 AM',
  hilo: [
    { fecha: 'Lunes, 11 de agosto', contenido: 'Hola Pedro, ¿puedes enviarme el reporte de avances del proyecto Central?', hora: '10:18 AM', propio: false },
    { contenido: 'Hola María, claro que sí. Te lo envío en un momento.', hora: '10:20 AM', propio: true, confirmado: true },
    { adjunto: { nombre: 'reporte_avances_proyecto_central.pdf', peso: '2.4 MB' }, hora: '10:21 AM', propio: false, confirmado: true },
    { contenido: 'Perfecto, muchas gracias Pedro.', hora: '10:24 AM', propio: false },
    { fecha: 'Martes, 12 de agosto', contenido: 'Por favor confirma si puedes asistir a la reunión de seguimiento este viernes.', hora: '09:10 AM', propio: true, confirmado: true },
    { contenido: 'Sí, confirmo mi asistencia.', propio: false, reaccion: { emoji: '👍', cantidad: 1 } },
  ],
} as const
