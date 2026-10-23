export type EstadoEmpresa = 'activa' | 'inactiva'

export type ClaveModuloEmpresa = 'contabilidad' | 'facturacion' | 'planillas' | 'inventario'

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
  modulos: ClaveModuloEmpresa[]
  planesModulo?: Partial<Record<ClaveModuloEmpresa, string>>
  usuarios: number
  estado: EstadoEmpresa
  fechaRegistro: string
  logo?: string
  tipoPlanCuenta?: string
}
