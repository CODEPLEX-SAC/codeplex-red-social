import type { IconName } from '@/tipos/compartido/contrato_icono'

export type CategoriaGrupoGuardado = 'tecnologia' | 'diseno' | 'negocios' | 'productividad' | 'impacto' | 'trabajo_remoto'
export type PestanaGuardado = 'todo' | 'publicaciones' | 'eventos' | 'grupos' | 'recursos'
export type ColorColeccionGuardada = 'rojo' | 'morado' | 'naranja' | 'amarillo'
export type VistaGruposGuardados = 'cuadricula' | 'listas'

export interface GrupoGuardado {
  id: string
  nombre: string
  miembros: string
  categoria: CategoriaGrupoGuardado
  descripcion: string
  imagen: string
}

export interface ColeccionGuardada {
  id: string
  icono: IconName
  color: ColorColeccionGuardada
  nombre: string
  grupos: string[]
}

export type PestanaPrincipalGuardados = 'elementos' | 'colecciones'

export type ModalGuardados =
  | { tipo: 'crear' }
  | { tipo: 'renombrar'; coleccionId: string }
  | { tipo: 'eliminar'; coleccionId: string }
  | { tipo: 'agregar'; grupoId: string }
  | { tipo: 'quitar'; grupoId: string }
  | { tipo: 'compartir'; titulo: string; nombre: string; texto: string }
