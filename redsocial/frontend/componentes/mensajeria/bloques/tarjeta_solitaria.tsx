import { VideoFlujo } from './video_flujo'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { TarjetaSolitariaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos
const clases = catalogoMensajeria.videollamada.clases.sala

export function TarjetaSolitaria({ participante, flujo }: TarjetaSolitariaProps) {
  const conVideo = flujo !== null && participante.camaraActiva

  return (
    <section aria-label={participante.nombre} className={clases.solitaria}>
      {conVideo && <VideoFlujo flujo={flujo} etiqueta={participante.nombre} silenciado={participante.local} className={clases.media} />}
      {!conVideo && <img src={participante.fotografia} alt="" className={clases.foto_difuminada} />}
      {!conVideo && (
        <div className={clases.solitaria_contenido}>
          <img src={participante.fotografia} alt={participante.nombre} className={clases.solitaria_foto} />
          <h2 className={clases.solitaria_nombre}>{participante.nombre}</h2>
          {participante.organizador && <span className={clases.solitaria_rol}>{textos.sala.organizador}</span>}
        </div>
      )}
    </section>
  )
}
