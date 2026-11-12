import type { ReactNode } from 'react'
import type { PestanaGrupo } from './contrato_grupos'
import type { PuertoGrupos } from './contrato_puerto_grupos'
import type { TuGrupo } from './contrato_tus_grupos'

export interface CabeceraPaginaGrupos {
  titulo: string
  activa: PestanaGrupo
  imagenCrear: string
  puerto: PuertoGrupos
}

export interface PaginaConLateralGruposProps {
  cabecera: CabeceraPaginaGrupos
  lateral: ReactNode
  children: ReactNode
}

export interface TarjetaLateralGruposProps {
  titulo: string
  texto?: string
  icono?: string
  variante?: 'normal' | 'suave' | 'verde'
  children?: ReactNode
}

export interface LateralTusGruposProps {
  grupos: readonly TuGrupo[]
}

export interface LateralSugerenciasGruposProps {
  categorias: readonly string[]
  categoriaActiva: string
  alElegirCategoria: (categoria: string) => void
  crear: ReactNode
}

export interface LateralAdministradosGruposProps {
  grupos: readonly TuGrupo[]
  puerto: PuertoGrupos
}
