import { useEffect, useRef, useState } from 'react'
import type { FocusEvent, KeyboardEvent, PointerEvent } from 'react'
import { esPunteroRaton } from './puntero_raton'
import { usarPulsacionLarga } from './usar_pulsacion_larga'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'

const configuracion = catalogoInicio.reacciones

export function usarPanelReacciones() {
  const contenedor = useRef<HTMLDivElement>(null)
  const temporizador = useRef<number | undefined>(undefined)
  const [abierto, setAbierto] = useState(false)
  const pulsacion = usarPulsacionLarga(() => setAbierto(true))

  function cerrar() {
    window.clearTimeout(temporizador.current)
    setAbierto(false)
  }

  function programarConRaton(valor: boolean, retardo: number) {
    return (evento: PointerEvent) => {
      if (!esPunteroRaton(evento)) return
      window.clearTimeout(temporizador.current)
      temporizador.current = window.setTimeout(() => setAbierto(valor), retardo)
    }
  }

  function abrirConTeclado(evento: KeyboardEvent) {
    if (evento.key !== configuracion.tecla_abrir) return
    evento.preventDefault()
    setAbierto(true)
  }

  function cerrarSiSaleElFoco(evento: FocusEvent<HTMLElement>) {
    if (!evento.currentTarget.contains(evento.relatedTarget)) cerrar()
  }

  useEffect(() => () => window.clearTimeout(temporizador.current), [])

  useEffect(() => {
    if (!abierto) return
    function alPulsarFuera(evento: globalThis.PointerEvent) {
      if (evento.target instanceof Node && !contenedor.current?.contains(evento.target)) setAbierto(false)
    }
    document.addEventListener('pointerdown', alPulsarFuera)
    return () => document.removeEventListener('pointerdown', alPulsarFuera)
  }, [abierto])

  const propsContenedor = {
    ref: contenedor,
    onPointerEnter: programarConRaton(true, configuracion.retardo_apertura_ms),
    onPointerLeave: programarConRaton(false, configuracion.retardo_cierre_ms),
    onBlur: cerrarSiSaleElFoco,
    onKeyDown: (evento: KeyboardEvent) => (evento.key === catalogoCompartido.modal.tecla_cerrar ? cerrar() : undefined),
  }

  const propsBoton = { ...pulsacion.propsPulsacion, onKeyDown: abrirConTeclado }

  return { abierto, cerrar, consumirPulsacionLarga: pulsacion.consumir, propsContenedor, propsBoton }
}
