import type { ConversacionActiva } from '@/tipos/mensajeria/contrato_mensajes'

export interface PanelConversacionProps {
  conversacion: ConversacionActiva
  onVolver: () => void
  oculta: boolean
}
