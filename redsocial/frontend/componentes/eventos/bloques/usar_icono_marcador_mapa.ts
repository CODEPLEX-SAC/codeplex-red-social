import { useEffect, useState } from 'react'
import type { IconoMarcadorMapa } from '@/tipos/eventos/contrato_marcador_mapa'

async function crearIcono(clase: string, tamano: number): Promise<IconoMarcadorMapa> {
  const { divIcon } = await import('leaflet')
  return divIcon({ className: clase, iconSize: [tamano, tamano] })
}

function cargarIcono(clase: string, tamano: number, alCargar: (icono: IconoMarcadorMapa) => void) {
  let vigente = true
  async function cargar() {
    const icono = await crearIcono(clase, tamano)
    if (vigente) alCargar(icono)
  }
  void cargar()
  return () => {
    vigente = false
  }
}

export function usarIconoMarcadorMapa(clase: string, tamano: number): IconoMarcadorMapa | null {
  const [icono, setIcono] = useState<IconoMarcadorMapa | null>(null)
  useEffect(() => cargarIcono(clase, tamano, setIcono), [clase, tamano])
  return icono
}
