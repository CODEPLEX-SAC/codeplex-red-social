import type { IconName } from './contrato_icono'

export interface AccionFilaTabla {
  icono: IconName
  etiqueta: string
  etiquetaMenu: string
  clase?: string
  peligro?: boolean
  alHacerClick: () => void
}

export interface AccionesFilaTablaProps {
  acciones: readonly AccionFilaTabla[]
  nombre: string
  claseContenedor?: string
  claseBoton?: string
}
