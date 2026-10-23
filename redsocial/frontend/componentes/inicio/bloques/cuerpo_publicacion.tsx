import { Insignia } from '../../compartido/interfaz/insignia'
import { BloqueMediosPublicacion } from './bloque_medios_publicacion'
import { BloqueVotacionEncuesta } from './bloque_votacion_encuesta'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CuerpoPublicacionProps } from '@/tipos/inicio/contrato_feed_inicio'

const PRIORIDADES = catalogoInicio.modal_crear_publicacion.prioridad.opciones
const CLASES_PRIORIDAD: Record<string, string> = catalogoInicio.publicacion.clases_prioridad

export function CuerpoPublicacion({ publicacion, onVotar }: CuerpoPublicacionProps) {
  const prioridad = PRIORIDADES.find((candidata) => candidata.valor === publicacion.prioridad)
  const estadoPregunta = publicacion.comentarioUtil ? catalogoInicio.pregunta_estado.resuelta : catalogoInicio.pregunta_estado.sin_resolver

  return (
    <>
      {prioridad && (
        <div className={catalogoInicio.feed.clases.prioridad}>
          <Insignia variant="status" className={CLASES_PRIORIDAD[prioridad.valor]}>{prioridad.etiqueta}</Insignia>
          <Insignia variant="status" className={estadoPregunta.clase}>{estadoPregunta.etiqueta}</Insignia>
        </div>
      )}
      {publicacion.texto && <p className="m-0 whitespace-pre-wrap break-words px-4 pb-3 text-cuerpo leading-texto text-texto">{publicacion.texto}</p>}
      {publicacion.opciones.length > 0 && <BloqueVotacionEncuesta opciones={publicacion.opciones} miVoto={publicacion.miVoto} onVotar={onVotar} />}
      {publicacion.medios.length > 0 && <BloqueMediosPublicacion medios={publicacion.medios} />}
    </>
  )
}
