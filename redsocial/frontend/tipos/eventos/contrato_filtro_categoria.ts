import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface CategoriaFiltroEvento {
  icono: IconName
  color: string
  nombre: string
  conteo: string
}

export interface PanelFiltroCategoriaProps {
  categorias: CategoriaFiltroEvento[]
  onCerrar: () => void
}
