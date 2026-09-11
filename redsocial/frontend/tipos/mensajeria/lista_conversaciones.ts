import type { Conversacion } from '@/tipos/mensajeria/mensajes'

export interface ListaConversacionesProps {
  conversaciones: readonly Conversacion[]
  activa: string | null
  onSeleccionar: (nombre: string) => void
  oculta: boolean
}
