import { marcaTarjeta, tarjetaVencida } from './logica_tarjeta_pago'

export function datosDeLaTarjeta(conTarjeta: boolean, guardada: { marca: string; ultimos4: string } | null | undefined, nueva: { marca: string; ultimos4: string }) {
  if (!conTarjeta) return { marca: marcaTarjeta(String()), ultimos4: String() }
  return { marca: guardada?.marca ?? nueva.marca, ultimos4: guardada?.ultimos4 ?? nueva.ultimos4 }
}

export function tarjetaGuardadaAUsar<T extends { vencimiento: Parameters<typeof tarjetaVencida>[0] }>(nuevaElegida: boolean, elegida: T | undefined, predeterminada: T | null) {
  if (nuevaElegida) return null
  return elegida && !tarjetaVencida(elegida.vencimiento) ? elegida : predeterminada
}
