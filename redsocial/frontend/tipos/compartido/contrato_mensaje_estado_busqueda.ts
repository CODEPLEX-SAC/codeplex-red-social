import type { ErrorBusqueda, EstadoBusqueda } from './contrato_busqueda'

export interface MensajeEstadoBusquedaProps {
  estado: EstadoBusqueda
  error?: ErrorBusqueda | null
  sinCoincidencias?: boolean
  className?: string
}
