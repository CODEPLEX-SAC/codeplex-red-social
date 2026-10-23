import type { MedioLocalPublicacion } from './contrato_crear_publicacion'
import type { ClaveReaccion, ReaccionesPorTipo } from './contrato_reacciones'

export interface MencionComentario {
  autorId: string
  nombre: string
}

export interface ComentarioPublicacion {
  id: string
  autorId: string
  autor: string
  texto: string
  tiempo: string
  reaccion: ClaveReaccion | null
  editado: boolean
  medios?: MedioLocalPublicacion[]
  mencion?: MencionComentario
  respuestas: ComentarioPublicacion[]
}

export interface InteraccionPublicacion extends AccionesComentarios {
  utilidad: UtilidadComentarios
  reaccion: ClaveReaccion | null
  reaccionesPorTipo: ReaccionesPorTipo
  comentarios: ComentarioPublicacion[]
  onReaccionarPublicacion: (clave: ClaveReaccion) => void
  onComentar: (texto: string, medios?: MedioLocalPublicacion[]) => void
}

export interface UtilidadComentarios {
  habilitada: boolean
  utilId: string | null
  onMarcar: (comentario: ComentarioPublicacion) => void
}

export interface AccionesComentarios {
  onResponder: (idRaiz: string, texto: string, medios?: MedioLocalPublicacion[], mencion?: MencionComentario) => void
  onEditar: (id: string, texto: string) => void
  onEliminar: (id: string) => void
  onReaccionar: (id: string, clave: ClaveReaccion) => void
}

export interface InteraccionesPublicacionProps {
  nombre: string
  texto: string
  interaccion: InteraccionPublicacion
  compartidos: number
  puedeCompartir: boolean
  onCompartir: (comentario: string) => void
}

export interface SeccionComentariosPublicacionProps extends AccionesComentarios {
  id: string
  comentarios: ComentarioPublicacion[]
  total: number
  onComentar: (texto: string, medios?: MedioLocalPublicacion[]) => void
}

export interface ItemComentarioProps extends AccionesComentarios {
  comentario: ComentarioPublicacion
  idRaiz: string
}

export interface MetaComentarioProps {
  comentario: ComentarioPublicacion
  respondiendo: boolean
  onReaccionar: (clave: ClaveReaccion) => void
  onAlternarRespuesta: () => void
}

export interface MenuComentarioProps {
  onEditar: () => void
  onEliminar: () => void
}

export interface FormularioEdicionComentarioProps {
  textoInicial: string
  onGuardar: (texto: string) => void
  onCancelar: () => void
}

export interface FormularioRespuestaComentarioProps {
  mencion: MencionComentario
  onEnviar: (texto: string, medios?: MedioLocalPublicacion[], mencion?: MencionComentario) => void
  onCancelar: () => void
}

export interface CajaComentarioProps {
  marcador: string
  etiqueta: string
  etiquetaEnviar: string
  textoInicial?: string
  conMedios?: boolean
  autoFoco?: boolean
  pista?: string
  mencion?: string
  onEnviar: (texto: string, medios?: MedioLocalPublicacion[]) => void
  onCancelar?: () => void
}

export interface PanelEmojisComentarioProps {
  onElegir: (emoji: string) => void
}

export interface MediosComentarioProps {
  medios: MedioLocalPublicacion[]
}

export interface DialogoCompartirPublicacionProps {
  nombre: string
  texto: string
  onCompartir: (comentario: string) => void
  onCerrar: () => void
}

export interface TextosDialogoEliminar {
  titulo: string
  cerrar: string
  mensaje: string
  cancelar: string
  confirmar: string
}

export interface DialogoEliminarPublicacionProps {
  textos?: TextosDialogoEliminar
  onConfirmar: () => void
  onCerrar: () => void
}
