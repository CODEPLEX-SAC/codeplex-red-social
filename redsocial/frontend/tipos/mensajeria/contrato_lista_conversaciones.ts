import type { Conversacion } from '@/tipos/mensajeria/contrato_mensajes'

export interface ListaConversacionesProps {
  conversaciones: readonly Conversacion[]
  activa: string | null
  onSeleccionar: (nombre: string) => void
  oculta: boolean
  contadorNoLeidos: number
}
