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
