import type { IconName } from '@/tipos/compartido/icono'

export interface Aplicacion {
  icono: IconName
  clase: string
}

export type Vigencia =
  | { tipo: 'rango'; desde: string; hasta: string }
  | { tipo: 'simple'; etiqueta: string; fecha: string }

export interface Colaborador {
  nombre: string
  correo: string
  telefono: string
  rol: string
  rolClase: string
  descripcionRol: string
  aplicaciones: Aplicacion[]
  masApps?: number
  estado: 'activo' | 'invitado' | 'inactivo' | 'baja'
  vigencia: Vigencia
  acciones: 'menu' | 'reenviar'
}
