import type { PromesaCaptura, PromesaFlujo, PromesaInventario, PromesaInvitacion, PromesaOperacion, PromesaVacia } from './modelo_promesas_llamada'
export type TipoDispositivo = 'camara' | 'microfono' | 'altavoz'
export type MotivoFallo = 'sin_permiso' | 'no_soportado' | 'no_disponible' | 'error'
export type EstadoAcceso = 'sin_consultar' | 'disponible' | 'sin_permiso' | 'no_soportado'
export type MotivoCaptura = MotivoFallo | 'cancelado'
export type EstadoInvitacion = 'ninguna' | 'preparada' | 'enviada'

export interface DispositivoMultimedia {
  id: string
  etiqueta: string
  tipo: TipoDispositivo
}

export interface InventarioDispositivos {
  acceso: EstadoAcceso
  dispositivos: DispositivoMultimedia[]
}

export type ResultadoOperacion = { exito: true } | { exito: false; motivo: MotivoFallo }
export type ResultadoFlujo = { exito: true; flujo: MediaStream } | { exito: false; motivo: MotivoFallo }
export type ResultadoCaptura = { exito: true; flujo: MediaStream } | { exito: false; motivo: MotivoCaptura }
export type ResultadoInvitacion = { exito: true } | { exito: false; motivo: MotivoFallo }

export interface PuertoDispositivos {
  listar: () => PromesaInventario
  abrirCamara: (idDispositivo: string | null) => PromesaFlujo
  detenerCamara: () => void
  seleccionarSalida: (idDispositivo: string) => PromesaOperacion
  probarSalida: () => PromesaOperacion
}

export type PuertoSalidaAudio = Pick<PuertoDispositivos, 'seleccionarSalida' | 'probarSalida'>

export interface PuertoSala {
  flujoDe: (idParticipante: string) => MediaStream | null
  compartirPantalla: () => PromesaCaptura
  detenerPantalla: () => void
  invitar: (idContacto: string) => PromesaInvitacion
  silenciarParticipante: (idParticipante: string) => PromesaOperacion
  quitarParticipante: (idParticipante: string) => PromesaOperacion
  finalizarParaTodos: () => PromesaOperacion
  informarProblema: (descripcion: string) => PromesaOperacion
  copiarEnlace: (enlace: string) => PromesaOperacion
}

export interface ParticipanteSala {
  id: string
  nombre: string
  rol: string
  local: boolean
  organizador: boolean
  enLinea: boolean
  invitado: boolean
  micActivo: boolean
  camaraActiva: boolean
  hablando: boolean
  manoLevantada: boolean
  fotografia: string
}

export interface ContactoInvitable {
  id: string
  nombre: string
  detalle: string
}

export interface PresentacionSala {
  idParticipante: string
  flujo: MediaStream | null
  simulada: boolean
}

export type ResultadoPrueba = 'sin_probar' | 'correcto' | 'fallo' | 'pendiente_integracion'

export interface ResultadosPruebaDispositivos {
  camara: ResultadoPrueba
  microfono: ResultadoPrueba
  altavoz: ResultadoPrueba
}

export interface SeleccionDispositivos {
  camara: string
  microfono: string
  altavoz: string
}

export interface ConfiguracionLlamada {
  fondo: boolean
  iluminacion: boolean
  ruido: boolean
}

export type EstadoCopiaEnlace = 'ninguna' | 'copiado' | 'error'

export interface InvitacionesLlamada {
  estados: Record<string, EstadoInvitacion>
  copia: EstadoCopiaEnlace
  invitar: (idContacto: string) => PromesaVacia
  copiarEnlace: (enlace: string) => PromesaVacia
}

export interface ContextoConSalida {
  setSinkId: (id: string) => PromesaVacia
}

export type MenuAbiertoSala = 'reacciones' | 'mas' | null

export type AccionGestion = 'silenciar' | 'quitar'
