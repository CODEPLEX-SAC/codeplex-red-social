import { useLayoutEffect, useRef } from 'react'
import { Boton } from './boton'
import { BotonIcono } from './boton_icono'
import { FondoPanelFlotante } from './fondo_panel_flotante'
import { Icono } from '../icono'
import type { FiltroDesplegableProps, MarcoPanelFiltroProps } from '@/tipos/compartido/contrato_filtro_desplegable'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.filtro_desplegable

export function FiltroDesplegable({ id, abierto, alCambiarAbierto, icono, etiqueta, activo, quitar, children }: FiltroDesplegableProps) {
  const conQuitar = quitar !== undefined

  return (
    <div className={clases.contenedor}>
      <Boton
        type="button"
        onClick={(evento) => {
          evento.stopPropagation()
          alCambiarAbierto(!abierto)
        }}
        variant="filtro"
        size="filtro"
        activo={activo ?? abierto}
        aria-expanded={abierto}
        aria-controls={abierto ? id : undefined}
        className={conQuitar ? clases.disparador_con_quitar : undefined}
      >
        <Icono name={icono} className={clases.clase_icono} /> {etiqueta}
        {!conQuitar && <Icono name={abierto ? clases.icono_abierto : clases.icono_cerrado} className={clases.clase_icono} />}
      </Boton>
      {quitar && <BotonIcono icono="cerrar" type="button" aria-label={quitar.etiqueta} onClick={quitar.alQuitar} variant="discreto" size="sm" className={clases.quitar} />}
      {abierto && (
        <>
          <FondoPanelFlotante onCerrar={() => alCambiarAbierto(false)} />
          {children}
        </>
      )}
    </div>
  )
}

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
