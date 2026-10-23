import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MediosComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios
const alternativo = catalogoInicio.modal_crear_publicacion.medios.texto_alternativo

export function MediosComentario({ medios }: MediosComentarioProps) {
  return (
    <ul aria-label={textos.etiqueta_medios} className={textos.clases.medios}>
      {medios.map((medio, indice) => (
        <li key={medio.id}>
          {medio.esVideo ? (
            <video src={medio.url} controls preload="metadata" aria-label={alternativo.replace(':numero', String(indice + 1))} className={textos.clases.medio} />
          ) : (
            <AvatarImagen src={medio.url} alt={alternativo.replace(':numero', String(indice + 1))} className={textos.clases.medio} />
          )}
        </li>
      ))}
    </ul>
  )
}
