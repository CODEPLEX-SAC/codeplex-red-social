import type {
  CambiosTarjetaPago,
  CodigoErrorPago,
  ControlTarjetasPago,
  EstadoCargaPago,
  EstadoInicialTarjetasPago,
  PaisPago,
  RepositorioTarjetasPago,
  TarjetaPorGuardar,
} from '../compartido/contrato_flujo_pago'

export interface BeneficioVip {
  n: string
  titulo: string
  desc: string
}

export interface ConfiguracionPago {
  vip: { precio: number; precio_antes: number; beneficios: BeneficioVip[] }
  paises: PaisPago[]
}

export interface ResumenActivacion {
  fechaCobro: string
  total: number
  marca: string
  ultimos4: string
  vip: boolean
  mejora?: boolean
}

export type DatosMetodoGuardado = TarjetaPorGuardar

export type CambiosMetodoGuardado = CambiosTarjetaPago

export type EstadoMetodosPago = EstadoCargaPago

export type RepositorioMetodosPago = RepositorioTarjetasPago

export type CodigoErrorMetodosPago = CodigoErrorPago

export type EstadoInicialMetodosPago = EstadoInicialTarjetasPago

export type MetodosPago = ControlTarjetasPago
