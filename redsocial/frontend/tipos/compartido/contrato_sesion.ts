import type { ReactNode } from 'react'
import type { IconName } from './contrato_icono'

export interface UsuarioSesion {
  usuario: string
  empresa: string
  ruc: string
  rol: string
}

export interface SesionDemostracion {
  autenticado: boolean
  usuario: UsuarioSesion | null
  iniciarSesion: () => void
  cerrarSesion: () => void
}

export interface ProveedorSesionDemostracionProps {
  children: ReactNode
}

export interface PanelUsuarioTopbarProps {
  usuario: UsuarioSesion
  onCerrar: () => void
  onCerrarSesion: () => void
}

export interface OpcionPanelUsuario {
  clave: string
  etiqueta: string
  icono: IconName
}
