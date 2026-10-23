import type { ReactNode } from 'react'
import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface BeneficioVip {
  n: string
  titulo: string
  desc: string
}

export interface PaisPago {
  id: string
  nombre: string
  prefijo: string
}

export type BilleteraDigital = 'yape' | 'plin'

export interface ConfiguracionPago {
  vip: { precio: number; precio_antes: number; beneficios: BeneficioVip[] }
  paises: PaisPago[]
}

export interface OpcionMetodoPagoProps {
  titulo: string
  detalle?: string
  icono: IconName
  activa: boolean
  deshabilitada?: boolean
  adicional?: ReactNode
  alElegir: () => void
}

export interface DatosTarjeta {
  numero: string
  vencimiento: string
  cvv: string
  propietario: string
}

export interface DatosFacturacion {
  documento: string
  razon: string
  pais: string
  direccion: string
  correo: string
  celular: string
  whatsapp: boolean
  sms: boolean
}

import type { PerfilFacturacion, TarjetaGuardada } from './modelo_carrito'

export interface ResumenActivacion {
  fechaCobro: string
  total: number
  marca: string
  ultimos4: string
  vip: boolean
  mejora?: boolean
  perfilNuevo?: PerfilFacturacion
}

export interface ErroresTarjeta {
  numero?: string
  vencimiento?: string
  cvv?: string
  propietario?: string
}

export interface DatosMetodoGuardado {
  marca: string
  ultimos4: string
  vencimiento: string
  titular?: string
}

export type EstadoMetodosPago = 'cargando' | 'listo' | 'error'

export interface OperacionMetodosPago {
  (): Promise<TarjetaGuardada[]>
}

export interface RepositorioMetodosPago {
  leerEstadoInicial(): EstadoInicialMetodosPago
  listar(): Promise<TarjetaGuardada[]>
  registrar(datos: DatosMetodoGuardado, predeterminada: boolean): Promise<TarjetaGuardada[]>
  codigoDeFallo(fallo: unknown): CodigoErrorMetodosPago
}

export type MetodoPagoElegido = 'tarjeta' | 'billetera'

export type CodigoErrorMetodosPago = 'lectura' | 'escritura'

export interface EstadoInicialMetodosPago {
  tarjetas: TarjetaGuardada[]
  estado: EstadoMetodosPago
}

export interface MetodosPago {
  tarjetas: TarjetaGuardada[]
  estado: EstadoMetodosPago
  ocupado: boolean
  error: string | null
  recargar(): void
  registrar(datos: DatosMetodoGuardado, predeterminada: boolean): Promise<TarjetaGuardada | null>
  limpiarError(): void
}

export interface FormularioTarjeta {
  tarjeta: DatosTarjeta
  errores: ErroresTarjeta
  cambiarNumero(valor: string): void
  cambiarVencimiento(valor: string): void
  cambiarCvv(valor: string): void
  cambiarPropietario(valor: string): void
  validar(): boolean
  limpiar(): void
}
