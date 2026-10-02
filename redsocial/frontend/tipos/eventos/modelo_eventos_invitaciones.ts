export interface Invitacion {
  estado: 'pendiente' | 'aceptada' | 'rechazada'
  gradiente: string
  dia: string
  mes: string
  categoria: string
  categoriaColor: string
  nombre: string
  descripcion: string
  fecha: string
  hora: string
  ubicacion: string
  avatares: number
  invitador: string
}

export interface EventoLateral {
  gradiente: string
  dia: string
  mes: string
  nombre: string
  fechaHora: string
  asistentes: string
}
