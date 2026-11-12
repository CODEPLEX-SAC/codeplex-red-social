import { usarFlujoVideo } from './usar_flujo_video'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { VideoFlujoProps } from '@/tipos/mensajeria/contrato_sala_llamada'

export function VideoFlujo({ flujo, etiqueta, className, silenciado = catalogoCompartido.video_flujo.silenciado_inicial }: VideoFlujoProps) {
  const referencia = usarFlujoVideo(flujo)

  return <video ref={referencia} autoPlay playsInline muted={silenciado} aria-label={etiqueta} className={className} />
}
