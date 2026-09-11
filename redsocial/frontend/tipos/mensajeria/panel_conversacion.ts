import type { ConversacionActiva } from '@/tipos/mensajeria/mensajes'

export interface PanelConversacionProps {
  conversacion: ConversacionActiva
  onVolver: () => void
  oculta: boolean
}
