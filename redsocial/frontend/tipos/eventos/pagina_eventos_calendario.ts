export interface EventoCalGrid {
  hora: string
  nombre: string
  color: 'musica' | 'tecnologia' | 'negocios' | 'educacion' | 'empresa'
}

export interface CeldaCal {
  numero: number
  otroMes?: boolean
  hoy?: boolean
  evento?: EventoCalGrid
  masTexto?: string
}

export interface EventoLateral {
  gradiente: string
  dia: string
  mes: string
  nombre: string
  fechaHora: string
  ubicacion: string
  asistentes: string
}
