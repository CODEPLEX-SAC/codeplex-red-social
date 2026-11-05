import type { ChangeEvent, RefObject } from 'react'
import type { MedioLocalPublicacion } from './contrato_crear_publicacion'
import type { Historia } from './modelo_inicio'
import type { ClaveReaccion } from './contrato_reacciones'
import type { BorradorHistoria, EstadoSegmentoHistoria, GrupoHistorias, HistoriaPublicada, PasoCreacionHistoria, PosicionHistoria, RespuestaHistoria, TipoFondoHistoria, TipoHistoria } from './modelo_historia'

export interface LienzoHistoriaProps {
  borrador: BorradorHistoria
  compacto?: boolean
  inmersivo?: boolean
  miniatura?: boolean
  soloFondo?: boolean
  onEscribir?: (texto: string) => void
}

export interface FlujoHistoria {
  paso: PasoCreacionHistoria
  tipo: TipoHistoria | null
  borrador: BorradorHistoria
  confirmandoDescarte: boolean
  puedePublicar: boolean
  errorArchivo: boolean
  selector: RefObject<HTMLInputElement | null>
  alElegirArchivo: (evento: ChangeEvent<HTMLInputElement>) => void
  abrirSelector: () => void
  elegirTipo: (tipo: TipoHistoria) => void
  continuar: () => void
  volverATipo: () => void
  irAVistaPrevia: () => void
  volverAEditar: () => void
  publicar: () => void
  pedirCerrar: () => void
  seguirEditando: () => void
  confirmarDescarte: () => void
  cambiarFondo: (id: string) => void
  cambiarTexto: (texto: string) => void
  cambiarEstilo: (id: string) => void
  cambiarAjusteMedio: (nivel: number) => void
  agregarEmoji: (emoji: string) => void
  elegirMedio: (medio: MedioLocalPublicacion | null) => void
  agregarElemento: (contenido: string) => void
  quitarElemento: (id: string) => void
  cambiarElemento: (id: string, contenido: string) => void
  moverElemento: (id: string, posicionId: string) => void
}

export interface ModalCrearHistoriaProps {
  onPublicar: (borrador: BorradorHistoria) => void
  onCerrar: () => void
}

export interface SelectorTipoHistoriaProps {
  tipo: TipoHistoria | null
  error: boolean
  onElegir: (tipo: TipoHistoria) => void
  onContinuar: () => void
  onCancelar: () => void
}

export interface AjusteMedioHistoriaProps {
  nivel: number
  onCambiar: (nivel: number) => void
}

export interface FlujoHistoriaProps {
  flujo: FlujoHistoria
}

export interface ControlesFondoHistoriaProps {
  fondoId: string
  onCambiar: (id: string) => void
}

export interface ControlesEstiloHistoriaProps {
  estiloId: string
  onCambiar: (id: string) => void
}

export interface ControlesElementosHistoriaProps {
  borrador: BorradorHistoria
  onAgregar: (contenido: string) => void
  onCambiar: (id: string, contenido: string) => void
  onQuitar: (id: string) => void
  onMover: (id: string, posicionId: string) => void
}

export interface AccionesVisorHistoria {
  reaccionDe: (historiaId: string) => ClaveReaccion | null
  respuestasDe: (historiaId: string) => RespuestaHistoria[]
  onReaccionar: (historiaId: string, clave: ClaveReaccion) => void
  onResponder: (historiaId: string, destinatarioId: string, texto: string) => void
  onEliminar: (historiaId: string) => void
}

export interface MenuHistoriaProps {
  historia: HistoriaPublicada
  onEliminar: () => void
}

export interface SeccionHistoriasInicioProps {
  historias: Historia[]
  publicadas: HistoriaPublicada[]
  deContactos: HistoriaPublicada[]
  acciones: AccionesVisorHistoria
  onPublicar: (borrador: BorradorHistoria) => void
}

export interface VisorHistoriaProps {
  grupos: GrupoHistorias[]
  indiceGrupo: number
  segmento: number
  acciones: AccionesVisorHistoria
  hayAnterior: boolean
  haySiguiente: boolean
  onSeleccionarGrupo: (indice: number) => void
  onAnterior: () => void
  onSiguiente: () => void
  onCerrar: () => void
}

export interface OpcionTipoFondo {
  clave: TipoFondoHistoria
  etiqueta: string
}

export interface OpcionPosicionHistoria extends PosicionHistoria {
  etiqueta: string
}

export interface BotonCrearHistoriaProps {
  nombre: string
  limiteAlcanzado: boolean
  onCrear: () => void
}

export interface BotonHistoriaPropiaProps {
  historia: HistoriaPublicada
  onVer: (historia: HistoriaPublicada) => void
}

export interface BotonHistoriaContactoProps {
  nombre: string
  historia: HistoriaPublicada
  onVer: (historia: HistoriaPublicada) => void
}

export interface PieRespuestaHistoriaProps {
  historia: HistoriaPublicada
  acciones: AccionesVisorHistoria
}

export interface VistaLateralHistoriaProps {
  historia: HistoriaPublicada
}

export interface HistoriaContactoProps {
  nombre: string
}

export interface CabeceraVisorHistoriaProps {
  historia: HistoriaPublicada
  segmentos: EstadoSegmentoHistoria[]
  propia: boolean
  onEliminar: () => void
}

export interface TarjetaActivaHistoriaProps {
  grupo: GrupoHistorias
  segmento: number
  acciones: AccionesVisorHistoria
  hayAnterior: boolean
  haySiguiente: boolean
  onAnterior: () => void
  onSiguiente: () => void
  onEliminar: () => void
}
