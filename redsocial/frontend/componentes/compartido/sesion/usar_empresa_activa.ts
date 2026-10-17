import { useContext } from 'react'
import { ContextoEmpresaActiva } from './contexto_empresa_activa'

export function usarEmpresaActiva() {
  return useContext(ContextoEmpresaActiva)
}
