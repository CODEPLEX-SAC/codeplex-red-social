import { useContext } from 'react'
import { ContextoAdministracionGrupo } from './contexto_administracion_grupo'

export function usarAdministrarGrupo() {
  return useContext(ContextoAdministracionGrupo)
}
