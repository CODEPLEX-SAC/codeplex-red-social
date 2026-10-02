import type { IconName } from '@/tipos/compartido/contrato_icono'

export type CategoriaGrupoGuardado = 'tecnologia' | 'diseno' | 'negocios' | 'productividad' | 'impacto' | 'trabajo_remoto'
export type PestanaGuardado = 'todo' | 'publicaciones' | 'eventos' | 'grupos' | 'recursos'
export type FiltroGrupoGuardado = 'todos' | 'mis_grupos' | 'tecnologia' | 'diseno' | 'negocios' | 'desarrollo_profesional'
export type ColorPortadaGrupoGuardado = 'morado' | 'azul' | 'naranja' | 'verde' | 'rosa' | 'gris'
export type ColorColeccionGuardada = 'rojo' | 'morado' | 'naranja' | 'amarillo'

export interface GrupoGuardado {
  id: string
  nombre: string
  miembros: string
  categoria: CategoriaGrupoGuardado
  descripcion: string
  actividadReciente: string
  colorPortada: ColorPortadaGrupoGuardado
  tituloPortada?: string
  subtituloPortada?: string
}

export interface ColeccionGuardada {
  id: string
  icono: IconName
  color: ColorColeccionGuardada
  nombre: string
  cantidad: number
}

export interface GrupoRecomendadoGuardado {
  id: string
  nombre: string
  miembros: string
}
