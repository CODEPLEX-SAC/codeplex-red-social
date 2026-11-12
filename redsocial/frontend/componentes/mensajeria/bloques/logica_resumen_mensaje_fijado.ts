import { extensionDe } from './logica_adjuntos'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { Mensaje } from '@/tipos/mensajeria/contrato_mensajes'

const textosFijado = catalogoMensajeria.conversacion.fijado

export function resumenDeMensajeFijado(mensaje: Mensaje): string {
  if (mensaje.contenido) return mensaje.contenido
  const adjunto = mensaje.adjunto
  if (!adjunto) return ''
  if (adjunto.tipo === 'audio') return textosFijado.audio
  if (adjunto.tipo !== 'imagen') return adjunto.nombre
  const extension = adjunto.extension ?? extensionDe(adjunto.nombre)
  return extension ? textosFijado.imagen_con_extension.replace(':extension', extension) : textosFijado.imagen
}
