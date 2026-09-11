export interface EventoOrganizas {
  gradiente: string
  dia: string
  mes: string
  estado: 'publicado' | 'borrador' | 'colaborador'
  nombre: string
  fecha: string
  hora: string
  ubicacion: string
  pieDerecho:
    | { tipo: 'stats'; asistentesTexto: string; statValor: string; statPct: string }
    | { tipo: 'borrador' }
    | { tipo: 'colaborador'; organizador: string; statValor: string; statPct: string }
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
