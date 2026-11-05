import { AudioGrabando } from '../../compartido/interfaz/audio_grabando'
import { AudioVistaPrevia } from '../../compartido/interfaz/audio_vista_previa'
import { adjuntoDeGrabacion } from './logica_adjuntos'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ControlesAudioComposicionProps } from '@/tipos/mensajeria/contrato_conversacion'

const textos = catalogoMensajeria.conversacion

export function ControlesAudioComposicion({ grabacion, onAdjuntar }: ControlesAudioComposicionProps) {
  function enviarGrabando() {
    grabacion.entregar((audio) => onAdjuntar?.([adjuntoDeGrabacion(audio)]))
  }

  function enviarBorrador() {
    const audio = grabacion.tomarBorrador()
    if (audio) onAdjuntar?.([adjuntoDeGrabacion(audio)])
  }

  if (grabacion.grabando) {
    return <AudioGrabando segundos={grabacion.segundos} picos={grabacion.niveles} etiquetas={textos.grabacion} onCancelar={grabacion.cancelar} onDetener={grabacion.detener} onEnviar={enviarGrabando} />
  }
  if (!grabacion.borrador) return null
  return (
    <AudioVistaPrevia
      url={grabacion.borrador.url}
      duracion={grabacion.borrador.duracion}
      picos={grabacion.borrador.picos}
      semilla={grabacion.borrador.url}
      etiquetas={{ ...textos.adjuntos.etiquetas, descartar: textos.grabacion.descartar, enviar: textos.grabacion.enviar, grupo: textos.grabacion.vista_previa }}
      onDescartar={grabacion.descartar}
      onEnviar={enviarBorrador}
    />
  )
}
