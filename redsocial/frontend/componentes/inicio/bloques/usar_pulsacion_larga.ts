import { useEffect, useRef } from 'react'
import type { PointerEvent } from 'react'
import { esPunteroRaton } from './puntero_raton'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'

export function usarPulsacionLarga(alActivar: () => void) {
  const temporizador = useRef<number | undefined>(undefined)
  const activada = useRef(false)

  function cancelar() {
    window.clearTimeout(temporizador.current)
  }

  function iniciar(evento: PointerEvent) {
    if (esPunteroRaton(evento)) return
    activada.current = false
    temporizador.current = window.setTimeout(() => {
      activada.current = true
      alActivar()
    }, catalogoInicio.reacciones.pulsacion_larga_ms)
  }

  function consumir() {
    const fue = activada.current
    activada.current = false
    return fue
  }

  useEffect(() => cancelar, [])

  return { consumir, propsPulsacion: { onPointerDown: iniciar, onPointerUp: cancelar, onPointerCancel: cancelar } }
}
