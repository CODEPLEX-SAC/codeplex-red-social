import type { ReactNode } from 'react'
import type { Dayjs } from 'dayjs'
import type { CodeplexArchivoInfo } from '@codeplex-sac/formularios'
import type { IconName } from '../../tipos/compartido/contrato_icono'

export interface TarjetaFormularioEventoProps {
  icono: IconName
  titulo: string
  opcional?: string
  accion?: ReactNode
  children: ReactNode
}

export interface AvisoFormularioEventoProps {
  texto: string
}

export interface CampoFormularioEventoProps {
  texto: string
  requerido?: boolean
  ayuda?: string
  className?: string
  children: ReactNode
}

export interface OpcionModalidadEventoProps {
  icono: IconName
  etiqueta: string
  activa: boolean
  onElegir: () => void
}

export interface OpcionCostoEventoProps {
  etiqueta: string
  detalle: string
  activa: boolean
  onElegir: () => void
}

export interface FilaInterruptorEventoProps {
  etiqueta: string
  activo: boolean
  onCambiar: (activo: boolean) => void
}

export interface OpcionModalidadCatalogo {
  valor: string
  etiqueta: string
  icono: IconName
}

export interface CampoFechaHoraEventoProps {
  etiqueta: string
  valorInicial?: Dayjs | null
}

export interface ValoresFormularioEvento {
  titulo: string
  descripcion: string
  categoria: string
  tipo: string
  ubicacion: string
  modalidad: string
  costo: string
  limiteActivo: boolean
  limite: number | null
  imagenes: CodeplexArchivoInfo[]
  imagenActualVisible: boolean
  enlace: string
  etiquetas: string
  inscripciones: boolean
  calendarioPublico: boolean
  comentarios: boolean
}

export type AsignadoresFormularioEvento = {
  [Campo in keyof ValoresFormularioEvento]: (valor: ValoresFormularioEvento[Campo]) => void
}
