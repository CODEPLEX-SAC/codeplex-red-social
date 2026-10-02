export interface EventoProximo {
  dia: string
  mes: string
  titulo: string
  detalle: string
}

export interface EventosProximosPanelProps {
  eventos: readonly EventoProximo[]
}
