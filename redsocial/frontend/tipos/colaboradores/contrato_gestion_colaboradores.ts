import type { Dayjs } from 'dayjs'
import type { UserOptions } from 'jspdf-autotable'
import type { Colaborador } from './modelo_colaboradores'

export interface FiltrosAvanzadosColaboradores {
  fechaInicio: Dayjs | null
  fechaFin: Dayjs | null
  invitacionDesde: Dayjs | null
  invitacionHasta: Dayjs | null
  ultimoAcceso: string
  accesoVigente: boolean
  accesoVencido: boolean
  aplicaciones: string
  cuentaCreada: boolean
  cuentaInvitada: boolean
  metodoInvitacion: string
}

export interface BorradorColaborador {
  nombre: string
  correo: string
  telefono: string
  rol: string
  fechaInicio: string
  fechaFin: string
  aplicaciones: string[]
  estado: Colaborador['estado']
}

export type CambiarBorrador = <C extends keyof BorradorColaborador>(campo: C, valor: BorradorColaborador[C]) => void

export interface AccionesExportar {
  excel?: () => void
  pdf?: () => void
  excel_filtrados?: () => void
  pdf_filtrados?: () => void
}

export type FormatoExportacion = 'excel' | 'pdf'

export type AmbitoExportacion = 'vista' | 'filtrados'

export interface CriteriosExportacion {
  pestana: string
  busqueda: string
  rol: string
  aplicacion: string
  ordenarPor: string
  avanzados: FiltrosAvanzadosColaboradores
}

export interface ColumnaReporte {
  clave: string
  titulo: string
  ancho: number
  enPdf: boolean
}

export interface ReporteColaboradores {
  titulo: string
  fechaGeneracion: string
  criterios: string[]
  columnas: ColumnaReporte[]
  filas: string[][]
}

export type OpcionesTablaPdf = Partial<UserOptions>

export type CondicionCriterio = readonly [boolean, string]

export interface AvisoColaboradores {
  texto: string
  error: boolean
}
