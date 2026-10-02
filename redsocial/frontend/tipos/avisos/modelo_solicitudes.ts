import type { IconName } from '@/tipos/compartido/contrato_icono'

export interface SolicitudAmistad {
  id: string
  nombre: string
  rol: string
  comunes: string
  tiempo: string
}

export interface SolicitudGrupo {
  id: string
  nombreGrupo: string
  miembros: string
  solicitanteNombre: string
  solicitanteTexto: string
  tiempo: string
  colorMiniatura: string
  iconoMiniatura: IconName
}

export interface SolicitudEvento {
  id: string
  nombreEvento: string
  organizador: string
  solicitanteNombre: string
  solicitanteTexto: string
  tiempo: string
  dia: string
  mes: string
  colorMiniatura: string
}
