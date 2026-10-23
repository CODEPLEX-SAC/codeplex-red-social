import type { EdicionPerfil, EdicionesPerfil } from './modelo_perfil'

export interface AlmacenPerfil {
  leer: () => EdicionesPerfil
  suscribir: (escucha: () => void) => () => void
  guardar: (id: string, edicion: EdicionPerfil) => void
}
