export type OpcionRapidaFecha = 'cualquiera' | 'hoy' | 'manana' | 'fin_de_semana' | 'especifica' | 'rango'

export interface FiltroFecha {
  inicio: Date
  fin: Date
  opcion?: OpcionRapidaFecha
}

export interface PanelFiltroFechaProps {
  onCerrar: () => void
  onAplicar: (filtro: FiltroFecha | null) => void
}
