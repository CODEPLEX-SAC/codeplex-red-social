import { BurbujaMensaje } from './burbuja_mensaje'
import { etiquetaDeDia } from './logica_fecha_mensajeria'
import { accionesDeMensaje } from './logica_acciones_mensaje'
import { citaDeRespuesta, posicionEnGrupo, presenciaDe } from './logica_presentacion_mensajes'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { HiloMensajesProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat

export function HiloMensajes({ conversacion, mensajes, participantes, conversaciones, usuarioId, ahora, acciones: accionesHilo }: HiloMensajesProps) {
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
            autor={remitente ? participantes.find((participante) => participante.id === mensaje.autorId) : undefined}
            presencia={remitente ? presenciaDe(conversaciones, mensaje.autorId) : undefined}
            posicion={posicionEnGrupo(mensajes, indice)}
            acciones={accionesDeMensaje(mensaje, usuarioId, ahora)}
            fijado={conversacion.mensajeFijadoId === mensaje.id}
            cita={citaDeRespuesta(mensaje.respuestaA, mensajes, conversacion, participantes, usuarioId)}
            onResponder={accionesHilo.onResponder}
            onEditar={accionesHilo.onEditar}
            onReenviar={accionesHilo.onReenviar}
            onFijar={accionesHilo.onFijar}
            onEliminar={accionesHilo.onEliminar}
          />
        )
      })}
    </div>
  )
}
