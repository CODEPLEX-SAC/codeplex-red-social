import { createContext } from 'react'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { SesionDemostracion } from '@/tipos/compartido/contrato_sesion'

export const ContextoSesion = createContext<SesionDemostracion>({
  autenticado: true,
  usuario: catalogoCompartido.sesion_actual,
  iniciarSesion: () => undefined,
  cerrarSesion: () => undefined,
})
