export type TonoOndaAudio = 'primario' | 'peligro'

export interface EtiquetasReproductorAudio {
  reproducir: string
  pausar: string
  posicion: string
  progreso: string
}

export interface EtiquetasGrabacionAudio {
  grabando: string
  cancelar: string
  detener: string
  enviar: string
}

export interface GrabacionAudio {
  url: string
  duracion: number
  picos: number[]
  bytes: number
  tipo: string
}

export interface MensajesGrabacionAudio {
  sinSoporte: string
  sinPermiso: string
  limite: string
}

export interface ControlGrabacionAudio {
  grabando: boolean
  segundos: number
  niveles: readonly number[]
  borrador: GrabacionAudio | null
  cancelar: () => void
  detener: () => void
  entregar: (alTerminar: (grabacion: GrabacionAudio) => void) => void
  descartar: () => void
  tomarBorrador: () => GrabacionAudio | null
}

export interface BarraOnda {
  id: string
  altura: string
  hecha: boolean
  cursor: boolean
}

export interface OndaAudioProps {
  picos: readonly number[]
  progreso: number
  tono: TonoOndaAudio
  cursor?: boolean
}

export interface ReproductorAudioProps {
  url?: string
  duracion?: number
  picos?: readonly number[]
  semilla: string
  propio?: boolean
  etiquetas: EtiquetasReproductorAudio
}

export interface AudioGrabandoProps {
  segundos: number
  picos: readonly number[]
  etiquetas: EtiquetasGrabacionAudio
  onCancelar: () => void
  onDetener: () => void
  onEnviar: () => void
}

export interface AudioVistaPreviaProps {
  url?: string
  duracion?: number
  picos?: readonly number[]
  semilla: string
  etiquetas: EtiquetasReproductorAudio & { descartar: string; enviar: string; grupo: string }
  onDescartar: () => void
  onEnviar: () => void
}
