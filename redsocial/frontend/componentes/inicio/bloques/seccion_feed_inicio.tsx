import { useState } from 'react'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { BloqueMeGusta } from './bloque_me_gusta'
import { filtrarFeed, visibleEnInicio } from './logica_feed_inicio'
import { PestanasFeedInicio } from './pestanas_feed_inicio'
import { ElementoFeedInicio } from './elemento_feed_inicio'
import { TarjetaCompartida } from './tarjeta_compartida'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { SeccionFeedInicioProps } from '@/tipos/inicio/contrato_feed_inicio'
import type { ComentarioPublicacion } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { ReaccionesPorTipo } from '@/tipos/inicio/contrato_reacciones'
import type { PestanaFeed } from '@/tipos/inicio/modelo_inicio'

const textos = catalogoInicio.feed
const SIN_REACCIONES: ReaccionesPorTipo = { me_gusta: 0, me_encanta: 0, asombroso: 0 }
const SIN_COMENTARIOS: ComentarioPublicacion[] = []

export function SeccionFeedInicio({ feed, publicacionDemostracion, compartidaDemostracion, acciones }: SeccionFeedInicioProps) {
  const { compartidosDe, interaccionesDe, esPropia, onCompartir } = acciones
  const [pestana, setPestana] = useState<PestanaFeed>('inicio')
  const visibles = filtrarFeed(feed.filter((elemento) => visibleEnInicio(elemento, esPropia)), pestana)
  const enInicio = pestana === 'inicio'
  const vacio = textos.vacio[pestana]

  return (
    <>
      <PestanasFeedInicio activa={pestana} onCambiar={setPestana} />
      {visibles.map((elemento) => (
        <ElementoFeedInicio key={elemento.id} elemento={elemento} acciones={acciones} />
      ))}
      {enInicio && (
        <>
          <BloqueMeGusta
            PUBLICACION_INICIO={publicacionDemostracion}
            compartidos={compartidosDe(publicacionDemostracion.id)}
            interaccion={interaccionesDe(publicacionDemostracion.id, publicacionDemostracion.reaccionesPorTipo, publicacionDemostracion.comentarios)}
            puedeCompartir={!esPropia(publicacionDemostracion.autorId)}
            onCompartir={(comentario) => onCompartir({ id: publicacionDemostracion.id, nombre: publicacionDemostracion.nombre, tiempo: publicacionDemostracion.tiempo, texto: publicacionDemostracion.texto }, comentario)}
          />
          <TarjetaCompartida
            publicacion={compartidaDemostracion}
            compartidos={compartidosDe(compartidaDemostracion.id)}
            interaccion={interaccionesDe(compartidaDemostracion.id, SIN_REACCIONES, SIN_COMENTARIOS)}
            puedeCompartir={!esPropia(compartidaDemostracion.autorId)}
            onCompartir={(comentario) => onCompartir({ id: compartidaDemostracion.id, nombre: compartidaDemostracion.nombre, tiempo: compartidaDemostracion.tiempoCompartio, texto: compartidaDemostracion.texto }, comentario)}
          />
        </>
      )}
      {!enInicio && visibles.length === 0 && <MensajeVacio titulo={vacio.titulo} texto={vacio.texto} className={textos.clases.vacio} />}
    </>
  )
}
