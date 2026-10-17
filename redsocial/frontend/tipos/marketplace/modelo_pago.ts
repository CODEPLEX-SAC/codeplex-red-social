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

export interface DatosTransferencia {
  banco: string
  tipo_cuenta: string
  numero_cuenta: string
  cci: string
  titular: string
  referencia: string
}

export interface ConfiguracionPago {
  transferencia: DatosTransferencia
  vip: { precio: number; precio_antes: number; beneficios: BeneficioVip[] }
  paises: PaisPago[]
}

export interface OpcionMetodoPagoProps {
  titulo: string
  detalle?: string
  icono: IconName
  activa: boolean
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
  tarjetaNueva?: TarjetaGuardada
  perfilNuevo?: PerfilFacturacion
}
