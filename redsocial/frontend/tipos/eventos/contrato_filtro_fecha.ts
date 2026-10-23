export type OpcionRapidaFecha = 'cualquiera' | 'hoy' | 'manana' | 'fin_de_semana' | 'especifica' | 'rango'

export interface FiltroFecha {
  inicio: Date
  fin: Date
  opcion?: OpcionRapidaFecha
}

export interface PanelFiltroFechaProps {
  id?: string
  onCerrar: () => void
  onAplicar: (filtro: FiltroFecha | null) => void
}
