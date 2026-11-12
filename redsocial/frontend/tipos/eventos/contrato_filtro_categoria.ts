import type { FuenteBusqueda } from '@/tipos/compartido/contrato_busqueda'
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
  fuente?: FuenteBusqueda<CategoriaFiltroEvento>
  seleccionadas: string[]
  alCambiarSeleccion: (seleccionadas: string[]) => void
  onCerrar: () => void
}
