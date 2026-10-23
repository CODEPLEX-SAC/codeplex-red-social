import type { IconName } from './contrato_icono'

export interface CapacidadSuscripcion {
  empresas: number | null
  sucursales: number | null
}

export interface SuscripcionContratada {
  aplicacion: string
  nombre: string
  icono: IconName
  tipo: string
  plan: string
  planNombre: string
  periodo: 'mensual' | 'anual'
  precio: string
  capacidad: CapacidadSuscripcion
}
