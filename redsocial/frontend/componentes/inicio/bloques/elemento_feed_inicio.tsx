import { TarjetaCompartida } from './tarjeta_compartida'
import { TarjetaPublicacion } from './tarjeta_publicacion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ElementoFeedInicioProps } from '@/tipos/inicio/contrato_feed_inicio'
import type { ComentarioPublicacion } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { ReaccionesPorTipo } from '@/tipos/inicio/contrato_reacciones'

const SIN_REACCIONES: ReaccionesPorTipo = { me_gusta: 0, me_encanta: 0, asombroso: 0 }
const SIN_COMENTARIOS: ComentarioPublicacion[] = []

export function ElementoFeedInicio({ elemento, acciones }: ElementoFeedInicioProps) {
  const { compartidosDe, interaccionesDe, esPropia, onEditar, onEliminar, onCompartir, onVotar } = acciones

  return (
    <div className={catalogoInicio.feed.clases.elemento}>
      {elemento.clase === 'texto' ? (
        <TarjetaPublicacion
          publicacion={elemento}
          compartidos={compartidosDe(elemento.id)}
          interaccion={interaccionesDe(elemento.id, elemento.reaccionesBase, elemento.comentariosBase, { habilitada: elemento.tipo === 'pregunta' && esPropia(elemento.autorId), comentarioUtil: elemento.comentarioUtil })}
          onEditar={onEditar}
          onEliminar={onEliminar}
          onCompartir={(comentario) => onCompartir({ id: elemento.id, nombre: elemento.nombre, tiempo: elemento.tiempo, texto: elemento.texto }, comentario)}
          onVotar={(opcionId) => onVotar(elemento.id, opcionId)}
        />
      ) : (
        <TarjetaCompartida
          publicacion={elemento}
          compartidos={compartidosDe(elemento.id)}
          interaccion={interaccionesDe(elemento.id, SIN_REACCIONES, SIN_COMENTARIOS)}
          puedeCompartir={!esPropia(elemento.autorId)}
          onCompartir={(comentario) => onCompartir({ id: elemento.id, nombre: elemento.nombre, tiempo: elemento.tiempoCompartio, texto: elemento.texto }, comentario)}
        />
      )}
    </div>
  )
}
