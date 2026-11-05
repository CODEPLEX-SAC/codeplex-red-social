import { useLayoutEffect, useRef, useState } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { compactarImporte } from './importe_compacto'

const dona = catalogoCompartido.dona_progreso
const TOLERANCIA_PX = 0.5

function anchoNatural(elemento: HTMLElement): number {
  elemento.style.removeProperty(dona.variable_ancho)
  return elemento.getBoundingClientRect().width
}

function ajustarTexto(elemento: HTMLElement, disponible: number): boolean {
  elemento.style.removeProperty(dona.variable_escala)
  const natural = anchoNatural(elemento)
  if (natural > disponible) elemento.style.setProperty(dona.variable_escala, String(disponible / natural))
  const cabe = anchoNatural(elemento) <= disponible + TOLERANCIA_PX
  elemento.style.setProperty(dona.variable_ancho, `${disponible}px`)
  return cabe
}

export function usarTextoCentralDona(valorCentral: string | undefined, disponible: number) {
  const valorRef = useRef<HTMLElement>(null)
  const [compactadoDe, setCompactadoDe] = useState<string | null>(null)
  const [recortadoDe, setRecortadoDe] = useState<string | null>(null)
  const compacto = valorCentral !== undefined && compactadoDe === valorCentral
  const recortado = valorCentral !== undefined && recortadoDe === valorCentral

  useLayoutEffect(() => {
    const valor = valorRef.current
    if (!valor) return
    const ajustar = () => {
      if (ajustarTexto(valor, disponible) || valorCentral === undefined || compacto) return
      if (compactarImporte(valorCentral) !== null) setCompactadoDe(valorCentral)
      else setRecortadoDe(valorCentral)
    }
    ajustar()
    window.addEventListener('resize', ajustar)
    document.fonts?.addEventListener('loadingdone', ajustar)
    void document.fonts?.ready.then(ajustar)
    return () => {
      window.removeEventListener('resize', ajustar)
      document.fonts?.removeEventListener('loadingdone', ajustar)
    }
  }, [valorCentral, disponible, compacto])

  return { valorRef, compacto, recortado, textoCompacto: compacto ? compactarImporte(valorCentral) : null }
}
