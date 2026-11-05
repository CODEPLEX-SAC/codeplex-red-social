import type { TarjetaCarrusel } from '@/tipos/inicio/contrato_carrusel_historias'

export function ventanaCarrusel(total: number, indice: number, radio: number): TarjetaCarrusel[] {
  const ventana: TarjetaCarrusel[] = []
  for (let distancia = -radio; radio >= distancia; distancia += 1) {
    const posicion = indice + distancia
    if (posicion >= 0 && total > posicion) ventana.push({ indice: posicion, distancia })
  }
  return ventana
}
