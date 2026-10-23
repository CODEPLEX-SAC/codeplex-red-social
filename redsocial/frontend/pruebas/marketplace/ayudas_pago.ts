import { leerMetodosPago, reiniciarMetodosPagoDemostracion } from '@/servicios/marketplace/metodos_pago'
import type { TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'

export const TARJETA_DEMOSTRACION: TarjetaGuardada = { id: 't-demostracion-1', marca: 'Visa', ultimos4: '4242', vencimiento: '12/99', predeterminada: true }

export const DATOS_TARJETA_VALIDA = { numero: '4242424242424242', vencimiento: '1299', cvv: '123', titular: 'Ana Prueba' }

export function sembrarTarjetas(tarjetas: TarjetaGuardada[] = [TARJETA_DEMOSTRACION]) {
  reiniciarMetodosPagoDemostracion(tarjetas)
}

export function tarjetasAlmacenadas() {
  return leerMetodosPago()
}

export function textoAlmacenado() {
  return JSON.stringify(leerMetodosPago())
}
