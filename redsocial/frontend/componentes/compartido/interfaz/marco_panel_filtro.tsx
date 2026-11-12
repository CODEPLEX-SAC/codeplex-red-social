import { useLayoutEffect, useRef } from 'react'
import type { MarcoPanelFiltroProps } from '@/tipos/compartido/contrato_filtro_desplegable'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.filtro_desplegable

function ajustarAlViewport(panel: HTMLElement) {
  panel.style.setProperty(clases.variable_desplazamiento, clases.desplazamiento_inicial)
  if (getComputedStyle(panel).position === clases.posicion_hoja) return
  const caja = panel.getBoundingClientRect()
  const sobrante = caja.right - (window.innerWidth - clases.margen_viewport)
  if (sobrante <= 0) return
  const desplazamiento = Math.min(sobrante, Math.max(caja.left - clases.margen_viewport, 0))
  panel.style.setProperty(clases.variable_desplazamiento, [-desplazamiento, clases.unidad].join(''))
}

export function MarcoPanelFiltro({ id, className, children }: MarcoPanelFiltroProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const ajustar = () => ajustarAlViewport(panel)
    ajustar()
    window.addEventListener('resize', ajustar)
    return () => window.removeEventListener('resize', ajustar)
  }, [])

  return (
    <div ref={panelRef} id={id} onClick={(evento) => evento.stopPropagation()} className={className ? [clases.marco, className].join(' ') : clases.marco}>
      {children}
    </div>
  )
}
