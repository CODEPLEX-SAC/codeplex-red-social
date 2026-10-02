export type TipoPublicacion = 'publicacion' | 'encuesta' | 'pregunta'

export type PrioridadPublicacion = 'urgente' | 'normal'

export interface MedioLocalPublicacion {
  id: string
  url: string
  esVideo: boolean
}

export interface OpcionEncuestaPublicacion {
  id: string
  texto: string
}

export interface ContenidoPublicacion {
  tipo: TipoPublicacion
  texto: string
}

export interface ModalCrearPublicacionProps {
  tipoInicial?: TipoPublicacion
  onPublicar: (contenido: ContenidoPublicacion) => void
  onCerrar: () => void
}

export interface VistaPreviaMediosPublicacionProps {
  medios: MedioLocalPublicacion[]
  onQuitar: (id: string) => void
}

export interface BloqueOpcionesEncuestaProps {
  opciones: OpcionEncuestaPublicacion[]
  onActualizar: (id: string, texto: string) => void
  onAgregar: () => void
  onQuitar: (id: string) => void
}

export interface BloqueUsuarioTipoPublicacionProps {
  tipo: TipoPublicacion
  onCambiar: (tipo: TipoPublicacion) => void
}

export interface BloquePrioridadPublicacionProps {
  prioridad: PrioridadPublicacion
  onCambiar: (prioridad: PrioridadPublicacion) => void
}

export interface BloquePiePublicacionProps {
  puedeAgregarMedios: boolean
  contenidoValido: boolean
  onAgregarMedios: (archivos: File[]) => void
  onPublicar: () => void
}

export interface EditorPublicacionProps {
  valor: string
  marcador: string
  etiqueta: string
  filasMinimas: number
  onCambiar: (valor: string) => void
}
