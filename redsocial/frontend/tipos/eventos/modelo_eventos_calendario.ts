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

export interface DiaSemanaCal {
  abrev: string
  numero: number
  hoy?: boolean
}

export interface EventoSemanaCal {
  dia: number
  filaInicio: number
  filas: number
  hora: string
  nombre: string
  color: EventoCalGrid['color']
}

export interface EventoResumenDia {
  hora: string
  nombre: string
  detalle: string
  icono: 'usuarios' | 'video' | 'ubicacion'
  color: EventoCalGrid['color']
}

export interface EventoDiaCal {
  filaInicio: number
  filas: number
  horaTexto: string
  nombre: string
  ubicacion: string
  color: EventoCalGrid['color']
  virtual?: boolean
}

export type VistaCalendario = 'mes' | 'semana' | 'dia'
