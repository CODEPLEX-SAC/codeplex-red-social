export type PlanEmpresa = 'avanzado' | 'intermedio' | 'basico'

export type EstadoEmpresa = 'activa' | 'inactiva'

export interface Empresa {
  codigo: string
  nombre: string
  ruc: string
  correo: string
  nombreComercial: string
  direccion: string
  ubigeo: string
  telefono: string
  web: string
  rubro: string
  plan: PlanEmpresa
  usuarios: number
  estado: EstadoEmpresa
  fechaRegistro: string
  logo?: string
}
