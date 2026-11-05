import type { RespuestaMensaje, TipoAdjunto } from './contrato_mensajes'

export interface AdjuntoServidor {
  id: string
  nombre: string
  mime: string
  bytes: number
  tipo: TipoAdjunto
  formato?: string
  extension?: string
  duracion?: number
  picos?: readonly number[]
  enlace?: string
}

export interface MensajeServidor {
  id: string
  conversacionId: string
  autorId: string
  creadoEn: string
  contenido?: string
  adjunto?: AdjuntoServidor
  respuestaA?: RespuestaMensaje
  reenviadoDe?: string
}
