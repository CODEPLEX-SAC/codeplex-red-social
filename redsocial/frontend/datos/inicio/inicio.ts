import type { Historia, PublicacionInicio, PublicacionCompartidaInicio } from '@/tipos/inicio/pagina_inicio'

export const HISTORIAS: Historia[] = [
  { nombre: 'Tu historia', crear: true },
  { nombre: 'Maria F.' },
  { nombre: 'Luis R.' },
  { nombre: 'Carmen L.' },
  { nombre: 'Diego M.' },
  { nombre: 'Ana G.' },
  { nombre: 'Grupo Ing.' },
  { nombre: 'Javier T.' },
  { nombre: 'Sofía R.' },
  { nombre: 'Equipo TI' },
]

export const CONTACTOS_LINEA: { nombre: string; colaborador?: boolean }[] = [
  { nombre: 'Ana García', colaborador: true },
  { nombre: 'Luis Rodríguez', colaborador: true },
  { nombre: 'Carmen López', colaborador: true },
  { nombre: 'Diego Mendoza' },
  { nombre: 'María Fernández' },
]

export const PUBLICACION_INICIO: PublicacionInicio = {
  nombre: 'María Fernández',
  tiempo: '2 horas · 🌐',
  texto: 'Avance del proyecto del puente en la Av. Central.',
  reacciones: '👍❤️😮 128',
  comentarios: '24 comentarios',
}

export const PUBLICACION_COMPARTIDA_INICIO: PublicacionCompartidaInicio = {
  nombre: 'Luis Rodríguez',
  tiempoCompartio: '3 horas · 🌐',
  origenNombre: 'Ingenieros Unidos',
  origenTiempo: '5 horas',
  texto: 'Normas de seguridad en obras: siempre primero la prevención.',
}
