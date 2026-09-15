export const FAVORITOS: { nombre: string; preview: string; contexto: string; hora: string }[] = [
  { nombre: 'María Fernández', preview: 'Hola Pedro, ¿puedes enviarme el reporte de avances del proyecto Central?', contexto: 'Proyecto Puente Central', hora: '10:18 AM' },
  { nombre: 'Luis Rodríguez', preview: 'Te comparto el informe solicitado.', contexto: 'Informe de Costos - Proyecto Puente', hora: '09:15 AM' },
  { nombre: 'Equipo de Proyectos', preview: 'Por favor confirma si puedes asistir a la reunión de seguimiento este viernes.', contexto: 'Reunión de seguimiento', hora: 'Ayer' },
  { nombre: 'Ana García', preview: 'Gracias por la información.', contexto: 'Información general', hora: 'Ayer' },
  { nombre: 'Diego Mendoza', preview: 'Estoy revisando los documentos.', contexto: 'Documentos del proyecto', hora: '2 días' },
]

export const NO_LEIDOS: { nombre: string; preview: string; contexto: string; hora: string; badge: number }[] = [
  { nombre: 'María Fernández', preview: 'Hola Pedro, ¿puedes enviarme el reporte de avances del proyecto Central?', contexto: 'Proyecto Puente Central', hora: '10:18 AM', badge: 2 },
  { nombre: 'Luis Rodríguez', preview: 'Te comparto el informe solicitado.', contexto: 'Informe de Costos - Proyecto Puente', hora: '09:15 AM', badge: 1 },
  { nombre: 'Equipo de Proyectos', preview: 'Por favor confirma si puedes asistir a la reunión de seguimiento este viernes.', contexto: 'Reunión de seguimiento', hora: 'Ayer', badge: 1 },
  { nombre: 'Ana García', preview: 'Gracias por la información.', contexto: 'Información general', hora: 'Ayer', badge: 1 },
  { nombre: 'Diego Mendoza', preview: 'Estoy revisando los documentos.', contexto: 'Documentos del proyecto', hora: '2 días', badge: 1 },
]

export const MOSTRANDO_FAVORITOS = 'Mostrando 5 de 5 mensajes favoritos'

export const MOSTRANDO_NO_LEIDOS = 'Mostrando 5 de 5 mensajes no leídos'
