export interface DetalleEventoDestacado {
  diaSemana: string
  fechaLarga: string
  horario: string
  duracion: string
  lugar: string
  direccion: string
  lat: number
  lng: number
  categoria: string
  descripcionLarga: string
  agenda: { hora: string; actividad: string }[]
  organizador: { nombre: string; detalle: string }
  totalAsistentes: string
}

export interface EventoDestacado {
  categoriaEtiqueta: string
  gradiente: string
  dia: string
  mes: string
  nombre: string
  descripcion: string
  fecha: string
  hora: string
  ubicacion: string
  asistentes: string
  detalle: DetalleEventoDestacado
}

export interface EventoProximo {
  categoria: 'tecnologia' | 'negocios' | 'educacion' | 'gastronomia'
  categoriaEtiqueta: string
  nombre: string
  dia: string
  mes: string
  fecha: string
  ubicacion: string
  masAsistentes: string
}
