import type { IconName } from './icono'

export interface ElementoNavegacion {
  clave: string
  etiqueta: string
  archivo: string | null
  icono: IconName
  insignia?: number
}

export interface ModuloDisponible {
  etiqueta: string
  descripcion: string
  color: string
  icono: IconName
}

export type SeveridadAlerta = 'peligro' | 'advertencia' | 'neutro'

export interface AlertaBarraLateral {
  severidad: SeveridadAlerta
  titulo: string
  detalle: string
}
