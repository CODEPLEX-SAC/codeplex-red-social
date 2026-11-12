export interface LlamadaReciente {
  id: string
  nombre: string
  direccion?: 'entrante' | 'saliente'
  esGrupo?: boolean
  miembros?: string
  hora: string
}

export interface EntradaHistorial {
  id: string
  nombre: string
  esGrupo?: boolean
  fecha: string
  duracion: string
}

export type FiltroLlamadas = 'recientes' | 'contactos' | 'grupos'

export interface FiltrosLlamadas {
  tipo: FiltroLlamadas
}
