import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import type { TarjetaGuardada } from '@/tipos/marketplace/modelo_carrito'

const reglas = catalogoMarketplace.pago.reglas_tarjeta
const guardados = catalogoMarketplace.pago.guardados
const textos = catalogoMarketplace.pago.metodo_guardado

export function tituloTarjeta(tarjeta: TarjetaGuardada) {
  return textos.titulo_tarjeta.replace(':marca', tarjeta.marca).replace(':ultimos', tarjeta.ultimos4)
}

export function detalleTarjeta(tarjeta: TarjetaGuardada) {
  return [guardados.vence.replace(':fecha', tarjeta.vencimiento), tarjeta.titular].filter(Boolean).join(guardados.separador)
}

export function tarjetaVencida(vencimiento: string, ahora: Date = new Date()) {
  const [mes, anio] = vencimiento.split(catalogoMarketplace.pago.formato.separador_vencimiento).map(Number)
  if (!mes || mes > reglas.meses || Number.isNaN(anio)) return true
  return new Date(reglas.siglo + anio, mes, 1).getTime() <= ahora.getTime()
}

export function elegirTarjetaInicial(tarjetas: TarjetaGuardada[]) {
  const predeterminada = tarjetas.find((tarjeta) => tarjeta.predeterminada)
  return predeterminada && !tarjetaVencida(predeterminada.vencimiento) ? predeterminada : null
}

export function predeterminadaVencida(tarjetas: TarjetaGuardada[]) {
  const predeterminada = tarjetas.find((tarjeta) => tarjeta.predeterminada)
  return predeterminada !== undefined && tarjetaVencida(predeterminada.vencimiento)
}
