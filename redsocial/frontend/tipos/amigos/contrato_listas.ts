import type { Amigo } from './modelo_amigos_todos'
import type { ListaAmigos } from './modelo_amigos_listas'

export type ModalListaAmigos =
  | { tipo: 'crear' }
  | { tipo: 'editar'; id: string }
  | { tipo: 'eliminar'; id: string }
  | { tipo: 'miembros'; id: string }

export interface TarjetaListaAmigosProps {
  lista: ListaAmigos
  alAbrir: (id: string) => void
  alEditar: (id: string) => void
  alEliminar: (id: string) => void
}

export interface SeccionMisListasProps {
  listas: readonly ListaAmigos[]
  alAbrir: (id: string) => void
  alEditar: (id: string) => void
  alEliminar: (id: string) => void
}

export interface ModalNombreListaProps {
  modo: 'crear' | 'editar'
  nombreInicial: string
  alConfirmar: (nombre: string) => void
  alCerrar: () => void
}

export interface ModalEliminarListaProps {
  lista: ListaAmigos
  alConfirmar: () => void
  alCerrar: () => void
}

export interface ModalMiembrosListaProps {
  lista: ListaAmigos
  amigos: readonly Amigo[]
  alGuardar: (miembros: string[]) => void
  alCerrar: () => void
}

export interface ControlListasAmigos {
  listas: ListaAmigos[]
  modal: ModalListaAmigos | null
  abrirCrear: () => void
  abrirEditar: (id: string) => void
  abrirEliminar: (id: string) => void
  abrirMiembros: (id: string) => void
  cerrar: () => void
  crear: (nombre: string) => void
  renombrar: (id: string, nombre: string) => void
  eliminar: (id: string) => void
  guardarMiembros: (id: string, miembros: string[]) => void
}

export interface ModalesListasAmigosProps {
  control: ControlListasAmigos
  amigos: readonly Amigo[]
}
