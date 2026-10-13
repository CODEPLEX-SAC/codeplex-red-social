import { useEffect, useRef } from 'react'
import type { FondoPanelFlotanteProps } from '@/tipos/compartido/contrato_fondo_panel_flotante'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const configuracion = catalogoCompartido.fondo_panel_flotante
const enfocables = catalogoCompartido.modal.selectores_enfocables.join(',')

function esVisible(elemento: HTMLElement): boolean {
  return typeof elemento.checkVisibility === 'function' ? elemento.checkVisibility() : true
}

function enfocarPrimero(panel: Element | null | undefined) {
  if (!(panel instanceof HTMLElement)) return
  const primero = [...panel.querySelectorAll<HTMLElement>(enfocables)].find(esVisible) ?? panel
  primero.focus()
}

export function FondoPanelFlotante({ onCerrar, atenuarMovil = true }: FondoPanelFlotanteProps) {
  const fondoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previo = document.activeElement instanceof HTMLElement ? document.activeElement : null
    enfocarPrimero(fondoRef.current?.nextElementSibling)
    return () => previo?.focus()
  }, [])

  useEffect(() => {
    function alPresionarTecla(evento: KeyboardEvent) {
      if (evento.key === configuracion.tecla_cerrar) onCerrar()
    }
    document.addEventListener('keydown', alPresionarTecla)
    return () => document.removeEventListener('keydown', alPresionarTecla)
  }, [onCerrar])

  return <div ref={fondoRef} className={atenuarMovil ? `${configuracion.clase} ${configuracion.clase_atenuada}` : configuracion.clase} onClick={onCerrar} />
}
