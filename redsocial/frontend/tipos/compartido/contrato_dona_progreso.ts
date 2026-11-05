export interface SegmentoDona {
  color: string
  porcentaje: number
}

export interface DonaProgresoProps {
  segmentos: SegmentoDona[]
  tamano?: number
  grosor?: number
  valorCentral?: string
  etiquetaCentral?: string
  className?: string
}
