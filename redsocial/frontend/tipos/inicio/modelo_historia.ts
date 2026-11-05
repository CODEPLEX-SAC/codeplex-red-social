import type { MedioLocalPublicacion } from './contrato_crear_publicacion'

export type TipoHistoria = 'texto' | 'media'

export type PasoCreacionHistoria = 'tipo' | 'editor' | 'vista_previa'

export type TipoFondoHistoria = 'solido' | 'degradado' | 'decorativo' | 'imagen'

export interface FondoHistoria {
  id: string
  tipo: TipoFondoHistoria
  etiqueta: string
  clase: string
  texto: string
  recurso?: string
}

export interface EstiloTextoHistoria {
  id: string
  etiqueta: string
  clases: string
}

export interface PosicionHistoria {
  id: string
  clase: string
}

export interface ElementoSuperpuestoHistoria {
  id: string
  contenido: string
  estiloTextoId: string
  posicionId: string
}

export interface BorradorHistoria {
  tipo: TipoHistoria
  fondoId: string
  texto: string
  estiloTextoId: string
  medio: MedioLocalPublicacion | null
  ajusteMedio: number
  elementos: ElementoSuperpuestoHistoria[]
}

export interface VistaLienzoHistoria {
  claseFondo: string
  claseAjusteMedio: string
  claseTexto: string
  imagenFondo: string | null
  superponer: boolean
  medio: MedioLocalPublicacion | null
  texto: string
  elementos: { id: string; contenido: string; clases: string }[]
}

export type EstadoSegmentoHistoria = 'visto' | 'actual' | 'pendiente'

export interface GrupoHistorias {
  id: string
  autorId: string
  nombre: string
  historias: HistoriaPublicada[]
}

export interface HistoriaPublicada {
  id: string
  autorId: string
  nombre: string
  tiempo: string
  borrador: BorradorHistoria
}

export interface RespuestaHistoria {
  id: string
  historiaId: string
  destinatarioId: string
  texto: string
}

export interface HistoriaContactoDatos {
  id: string
  autorId: string
  nombre: string
  tiempo: string
  borrador: {
    tipo: TipoHistoria
    fondoId: string
    texto: string
    estiloTextoId: string
    recurso: string | null
    ajusteMedio?: number
    elementos: ElementoSuperpuestoHistoria[]
  }
}
