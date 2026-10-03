import { useState } from 'react'
import { ContextoSesion } from './contexto_sesion'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { ProveedorSesionDemostracionProps } from '@/tipos/compartido/contrato_sesion'

export function ProveedorSesionDemostracion({ children }: ProveedorSesionDemostracionProps) {
  const [autenticado, setAutenticado] = useState(true)

  const sesion = {
    autenticado,
    usuario: autenticado ? catalogoCompartido.sesion_actual : null,
    iniciarSesion: () => setAutenticado(true),
    cerrarSesion: () => setAutenticado(false),
  }

  return <ContextoSesion.Provider value={sesion}>{children}</ContextoSesion.Provider>
}
