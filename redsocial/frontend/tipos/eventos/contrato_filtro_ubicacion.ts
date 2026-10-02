export interface CiudadFiltroEvento {
  nombre: string
  conteo: number
  lat: number
  lng: number
}

export interface MarcadorMapaEvento {
  id: string
  lat: number
  lng: number
  conteo: number
  nombreLugar?: string
}

export interface PanelFiltroUbicacionProps {
  ciudades: CiudadFiltroEvento[]
  marcadores: MarcadorMapaEvento[]
  ciudadActual: string | null
  onAplicar: (ciudad: string | null) => void
  onCerrar: () => void
}


export interface FilaCiudadProps {
  nombre: string
  activa: boolean
  onElegir: () => void
}
