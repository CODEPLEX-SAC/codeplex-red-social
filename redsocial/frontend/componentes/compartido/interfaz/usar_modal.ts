import { useEffect, useRef } from 'react'
import type { KeyboardEvent as EventoTeclado } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.modal

export function usarModal(onCerrar: () => void) {
  const dialogoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elementoPrevio = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const dialogo = dialogoRef.current
    const inicial = dialogo?.querySelector<HTMLElement>(configuracion.selector_foco_inicial)
    ;(inicial ?? dialogo)?.focus()
    return () => {
      document.body.style.overflow = overflowAnterior
      elementoPrevio?.focus()
    }
  }, [])

  useEffect(() => {
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === configuracion.tecla_cerrar) onCerrar()
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

  return { dialogoRef, mantenerFoco }
}
