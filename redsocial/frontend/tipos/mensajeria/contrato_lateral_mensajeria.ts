export interface ContactoLineaMensajeria {
  nombre: string
  colaborador: boolean
}

export interface GrupoRecienteMensajeria {
  nombre: string
  miembros: string
}

export interface EventoProximoMensajeria {
  dia: string
  mes: string
  titulo: string
  detalle: string
}

export interface PanelLateralMensajeriaProps {
  contactosLinea: readonly ContactoLineaMensajeria[]
  gruposRecientes: readonly GrupoRecienteMensajeria[]
  eventosProximos: readonly EventoProximoMensajeria[]
}
