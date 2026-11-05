import { useEffect, useRef } from 'react'
import type { KeyboardEvent as EventoTeclado, MouseEvent as EventoRaton } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.modal

let bloqueos = 0
let overflowOriginal = String()

function bloquearScroll() {
  if (bloqueos === 0) overflowOriginal = document.body.style.overflow
  bloqueos += 1
  document.body.style.overflow = 'hidden'
}

function liberarScroll() {
  bloqueos -= 1
  if (bloqueos === 0) document.body.style.overflow = overflowOriginal
}

export function usarModal(onCerrar: () => void) {
  const dialogoRef = useRef<HTMLDivElement>(null)
  const pulsacionEnFondo = useRef(false)

  useEffect(() => {
    const elementoPrevio = document.activeElement instanceof HTMLElement ? document.activeElement : null
    bloquearScroll()
    const dialogo = dialogoRef.current
    const inicial = dialogo?.querySelector<HTMLElement>(configuracion.selector_foco_inicial)
    ;(inicial ?? dialogo)?.focus()
    return () => {
      liberarScroll()
      elementoPrevio?.focus()
    }
  }, [])

  useEffect(() => {
    function alPresionarTecla(evento: KeyboardEvent) {
      const abiertos = document.querySelectorAll(configuracion.selector_dialogo)
      const esElSuperior = abiertos[abiertos.length - 1] === dialogoRef.current
      if (evento.key === configuracion.tecla_cerrar && esElSuperior) onCerrar()
    }
    document.addEventListener('keydown', alPresionarTecla)
    return () => document.removeEventListener('keydown', alPresionarTecla)
  }, [onCerrar])

  function mantenerFoco(evento: EventoTeclado<HTMLDivElement>) {
    const dialogo = dialogoRef.current
    if (evento.key !== configuracion.tecla_tabulador || !dialogo) return
    const enfocables = Array.from(dialogo.querySelectorAll<HTMLElement>(configuracion.selectores_enfocables.join(',')))
    const primero = enfocables[0]
    const ultimo = enfocables[enfocables.length - 1]
    const activo = document.activeElement
    const saleAtras = evento.shiftKey && (activo === primero || activo === dialogo)
    const saleAdelante = !evento.shiftKey && activo === ultimo
    if (!saleAtras && !saleAdelante) return
    evento.preventDefault()
    ;(saleAtras ? ultimo : primero)?.focus()
  }

  function registrarPulsacion(evento: EventoRaton<HTMLDivElement>) {
    pulsacionEnFondo.current = evento.target === evento.currentTarget
  }

  function cerrarAlPulsarFuera(evento: EventoRaton<HTMLDivElement>) {
    const empezoEnFondo = pulsacionEnFondo.current
    pulsacionEnFondo.current = false
    if (empezoEnFondo && evento.target === evento.currentTarget) onCerrar()
  }

  return { dialogoRef, mantenerFoco, registrarPulsacion, cerrarAlPulsarFuera }
}
