import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import type { TipoAdjunto } from './contrato_mensajes'

export type ClaveFormato = keyof typeof catalogoMensajeria.conversacion.adjuntos.formatos

export interface ClasificacionArchivo {
  tipo: TipoAdjunto
  formato?: ClaveFormato
  extension: string
}
