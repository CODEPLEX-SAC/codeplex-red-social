import { Icono } from '../../compartido/icono'
import { VideoFlujo } from './video_flujo'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ParticipanteSala } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { TarjetaParticipanteProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos
const clases = catalogoMensajeria.videollamada.clases.sala

function MedioParticipante({ participante, flujo, compacta }: { participante: ParticipanteSala; flujo: MediaStream | null; compacta: boolean }) {
  if (flujo !== null && participante.camaraActiva) return <VideoFlujo flujo={flujo} etiqueta={participante.nombre} silenciado={participante.local} className={clases.media} />
  const textoCamara = participante.camaraActiva ? textos.sala.sin_transmision : textos.preparacion.camara_desactivada

  return (
    <>
      <img src={participante.fotografia} alt="" className={clases.foto_difuminada} />
      <div className={clases.avatar}>
        <img src={participante.fotografia} alt={participante.nombre} className={clases.foto} />
      </div>
      {!compacta && <span className={clases.texto_camara}>{textoCamara}</span>}
    </>
  )
}

export function TarjetaParticipante({ participante, flujo, reaccion, compacta = false }: TarjetaParticipanteProps) {
  const claseTarjeta = [clases.tarjeta, participante.hablando ? clases.tarjeta_activa : String()].join(' ').trim()

  return (
    <article aria-label={participante.nombre} className={claseTarjeta}>
      <MedioParticipante participante={participante} flujo={flujo} compacta={compacta} />
      {participante.organizador && !compacta && <span className={clases.organizador}>{textos.sala.organizador}</span>}
      {participante.manoLevantada && (
        <span role="img" aria-label={textos.sala.mano_levantada} className={clases.mano}>
          <Icono name="mano" className="h-full w-full" />
        </span>
      )}
      {participante.local && reaccion !== null && (
        <span role="img" aria-label={textos.sala.reaccion_enviada} className={clases.reaccion}>
          <Icono name={reaccion} className="h-full w-full" />
        </span>
      )}
      <div className={clases.pie}>
        <span className={clases.nombre}>
          {participante.nombre}
          {participante.hablando && <span className="sr-only"> ({textos.sala.hablando})</span>}
        </span>
        <span role="img" aria-label={participante.micActivo ? textos.invitaciones.microfono_activo : textos.invitaciones.microfono_inactivo} className={participante.micActivo ? clases.indicador_activo : clases.indicador_inactivo}>
          <Icono name={participante.micActivo ? 'microfono' : 'microfono-apagado'} className="h-full w-full" />
        </span>
        <span role="img" aria-label={participante.camaraActiva ? textos.invitaciones.camara_activa : textos.invitaciones.camara_inactiva} className={participante.camaraActiva ? clases.indicador_activo : clases.indicador_inactivo}>
          <Icono name={participante.camaraActiva ? 'video' : 'video-apagado'} className="h-full w-full" />
        </span>
      </div>
    </article>
  )
}
