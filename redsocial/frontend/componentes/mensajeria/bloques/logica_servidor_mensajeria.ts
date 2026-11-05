import { formatearHora } from './logica_fecha_mensajeria'
import { pesoLegible } from './logica_adjuntos'
import type { AdjuntoServidor, MensajeServidor } from '@/tipos/mensajeria/contrato_servidor_mensajeria'
import type { AdjuntoMensaje, Mensaje } from '@/tipos/mensajeria/contrato_mensajes'

export function adjuntoDeServidor(adjunto: AdjuntoServidor): AdjuntoMensaje {
  return {
    nombre: adjunto.nombre,
    peso: pesoLegible(adjunto.bytes),
    tipo: adjunto.tipo,
    formato: adjunto.formato,
    extension: adjunto.extension,
    mime: adjunto.mime,
    bytes: adjunto.bytes,
    url: adjunto.enlace,
    duracion: adjunto.duracion,
    picos: adjunto.picos,
  }
}

export function adjuntoParaServidor(adjunto: AdjuntoMensaje): Omit<AdjuntoServidor, 'id' | 'enlace'> {
  return {
    nombre: adjunto.nombre,
    mime: adjunto.mime ?? String(),
    bytes: adjunto.bytes ?? 0,
    tipo: adjunto.tipo ?? 'documento',
    formato: adjunto.formato,
    extension: adjunto.extension,
    duracion: adjunto.duracion,
    picos: adjunto.picos,
  }
}

export function mensajeDeServidor(mensaje: MensajeServidor): Mensaje {
  return {
    id: mensaje.id,
    autorId: mensaje.autorId,
    creadoEn: mensaje.creadoEn,
    contenido: mensaje.contenido,
    adjunto: mensaje.adjunto ? adjuntoDeServidor(mensaje.adjunto) : undefined,
    respuestaA: mensaje.respuestaA,
    reenviado: mensaje.reenviadoDe !== undefined,
    hora: formatearHora(new Date(mensaje.creadoEn)),
  }
}
