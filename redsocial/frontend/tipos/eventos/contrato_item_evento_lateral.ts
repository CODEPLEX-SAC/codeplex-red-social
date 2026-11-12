export interface ItemEventoLateralProps {
  evento: {
    dia: string
    mes: string
    nombre: string
    fechaHora: string
    ubicacion?: string
    asistentes: string
  }
  conBorde: boolean
}
