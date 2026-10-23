import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface CategoriaFiltroEvento {
  icono: IconName
  color: string
  nombre: string
  conteo: string
}

export interface PanelFiltroCategoriaProps {
  id?: string
  categorias: CategoriaFiltroEvento[]
  seleccionadas: string[]
  alCambiarSeleccion: (seleccionadas: string[]) => void
  onCerrar: () => void
}
