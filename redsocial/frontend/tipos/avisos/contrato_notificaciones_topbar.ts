import type { Aviso } from '@/tipos/avisos/modelo_avisos'

export interface PanelNotificacionesTopbarProps {
  onCerrar: () => void
}

export interface FilaPanelTopbarProps {
  aviso: Aviso
  claseIcono: string
}
