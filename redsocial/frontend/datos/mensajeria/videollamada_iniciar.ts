import type { IconName } from '../../tipos/compartido/icono'

export const DISPOSITIVOS: { icono: IconName; titulo: string; detalle: string }[] = [
  { icono: 'video', titulo: 'Cámara', detalle: 'Logitech C920 Pro HD' },
  { icono: 'microfono', titulo: 'Micrófono', detalle: 'Micrófono (Realtek High Definition Audio)' },
  { icono: 'altavoz', titulo: 'Altavoces', detalle: 'Altavoces (Realtek High Definition Audio)' },
]

export const CONFIGURACION_LLAMADA: { icono: IconName; titulo: string; detalle: string }[] = [
  { icono: 'video', titulo: 'Fondo virtual', detalle: 'Desenfocar mi fondo' },
  { icono: 'sentimiento', titulo: 'Mejorar iluminación', detalle: 'Ajustar automáticamente' },
  { icono: 'microfono', titulo: 'Reducir ruido', detalle: 'Filtrar sonidos de fondo' },
]

export const PARTICIPANTES_INICIAR: { nombre: string; rol: string }[] = [
  { nombre: 'Pedro Lozano (Tú)', rol: 'Organizador' },
  { nombre: 'María Fernández', rol: 'En línea' },
]

export const CONTACTOS_INVITAR = ['Luis Rodríguez', 'Carmen López', 'Diego Mendoza', 'Ana García']

export const OPCIONES_LLAMADA: { icono: IconName; titulo: string; detalle: string }[] = [
  { icono: 'nuevo-usuario', titulo: 'Agregar participante', detalle: 'Invita a alguien a la llamada' },
  { icono: 'usuarios', titulo: 'Llamada en grupo', detalle: 'Crea o gestiona una llamada grupal' },
]

export const DETALLE_REUNION = {
  titulo: 'Reunión de seguimiento del proyecto Puente Central',
  fecha: 'Viernes, 15 de agosto de 2026',
  horario: '10:00 AM - 11:00 AM (1h)',
  participantes: '4 participantes',
}

export const VOLVER_A_VIDEOLLAMADAS = 'Volver a Videollamadas'
