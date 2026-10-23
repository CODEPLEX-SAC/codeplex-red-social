import type { PointerEvent } from 'react'

const TIPO_PUNTERO_RATON = 'mouse'

export function esPunteroRaton(evento: PointerEvent) {
  return evento.pointerType === TIPO_PUNTERO_RATON
}
