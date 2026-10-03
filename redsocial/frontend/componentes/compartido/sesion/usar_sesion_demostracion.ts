import { useContext } from 'react'
import { ContextoSesion } from './contexto_sesion'

export function usarSesionDemostracion() {
  return useContext(ContextoSesion)
}
