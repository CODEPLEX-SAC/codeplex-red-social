export interface InvitacionPendiente {
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

export interface InvitacionRespondida {
  gradiente: string
  dia: string
  mes: string
  categoria: string
  categoriaColor: string
  nombre: string
  fecha: string
  hora: string
  ubicacion: string
  estado: 'aceptada' | 'rechazada'
}

export interface EventoLateral {
  gradiente: string
  dia: string
  mes: string
  nombre: string
  fechaHora: string
  asistentes: string
}
