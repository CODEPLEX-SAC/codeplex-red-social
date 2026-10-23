import type { IconName } from '@/tipos/compartido/contrato_icono'

export type ClaveReaccion = 'me_gusta' | 'me_encanta' | 'asombroso'

export type ReaccionesPorTipo = Record<ClaveReaccion, number>

export type VarianteBotonReaccion = 'publicacion' | 'comentario'

export interface OpcionReaccion {
  clave: ClaveReaccion
  etiqueta: string
  icono: IconName
  clase_color: string
  clase_resumen: string
}

export interface PanelReaccionesProps {
  opciones: readonly OpcionReaccion[]
  onElegir: (clave: ClaveReaccion) => void
}

export interface BotonReaccionProps {
  reaccion: ClaveReaccion | null
  variante: VarianteBotonReaccion
  onReaccionar: (clave: ClaveReaccion) => void
}
