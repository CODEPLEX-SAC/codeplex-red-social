import { BurbujaMensaje } from './burbuja_mensaje'
import { etiquetaDeDia } from './logica_fecha_mensajeria'
import { accionesDeMensaje } from './logica_acciones_mensaje'
import { citaDeRespuesta, posicionEnGrupo, presenciaDe } from './logica_presentacion_mensajes'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { HiloMensajesProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat

export function HiloMensajes({ conversacion, mensajes, participantes, conversaciones, usuarioId, ahora, acciones: accionesHilo }: HiloMensajesProps) {
  const participantePorId = new Map(participantes.map((participante) => [participante.id, participante]))

  function remitenteDe(mostrar: boolean | undefined, autorId: string) {
    const autor = participantePorId.get(autorId)
    if (!mostrar || !autor) return undefined
    return { autor, presencia: presenciaDe(conversaciones, autorId) }
  }

  return (
    <div className={clases.hilo}>
      {mensajes.map((mensaje, indice) => {
        const propio = mensaje.autorId === usuarioId
        const remitente = conversacion.esGrupo && !propio
        return (
          <BurbujaMensaje
            key={mensaje.id}
            mensaje={mensaje}
            fecha={etiquetaDeDia(mensaje, mensajes[indice - 1], ahora)}
            propio={propio}
            remitente={remitenteDe(remitente, mensaje.autorId)}
            posicion={posicionEnGrupo(mensajes, indice)}
            acciones={accionesDeMensaje(mensaje, usuarioId, ahora)}
            fijado={conversacion.mensajeFijadoId === mensaje.id}
            cita={citaDeRespuesta(mensaje.respuestaA, mensajes, { conversacion, participantes, usuarioId })}
            manejadores={accionesHilo}
          />
        )
      })}
    </div>
  )
}
