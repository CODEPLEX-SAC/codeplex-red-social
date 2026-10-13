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

export interface ConfiguracionPago {
  vip: { precio: number; precio_antes: number; beneficios: BeneficioVip[] }
  paises: PaisPago[]
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
