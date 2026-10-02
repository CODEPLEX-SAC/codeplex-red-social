export interface DetalleEdicionEvento {
  descripcion: string
  categoria: string
  tipo: string
  inicioISO: string
  finISO: string
  ubicacion: string
  modalidad: string
  costo: string
  limiteActivo: boolean
  limite: number
  enlace: string
  etiquetas: string
  permitirInscripciones: boolean
  mostrarCalendario: boolean
  permitirComentarios: boolean
}

export interface PieEstadisticasEvento {
  tipo: 'stats'
  asistentesTexto: string
  statValor: string
  statPct: string
}

export interface PieBorradorEvento {
  tipo: 'borrador'
}

export interface PieColaboradorEvento {
  tipo: 'colaborador'
  organizador: string
  statValor: string
  statPct: string
}

export interface AccionesMenuEvento {
  alAbrirMenuOrganizas: (evento: { stopPropagation: () => void; currentTarget: HTMLElement }, nombre: string) => void
  menuOrganizasAbierto: string | null
  anclaMenuOrganizas: HTMLElement | null
  cerrarMenuOrganizas: () => void
}

export interface EventoOrganizas {
  gradiente: string
  dia: string
  mes: string
  estado: 'publicado' | 'borrador' | 'colaborador'
  nombre: string
  fecha: string
  hora: string
  ubicacion: string
  pieDerecho: PieEstadisticasEvento | PieBorradorEvento | PieColaboradorEvento
  edicion?: DetalleEdicionEvento
}

export interface EventoLateral {
  gradiente: string
  dia: string
  mes: string
  nombre: string
  fechaHora: string
  ubicacion?: string
  asistentes: string
}
