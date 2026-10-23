import { imagenUsuarioPredeterminada } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import { CajaComentario } from './caja_comentario'
import { ItemComentario } from './item_comentario'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { SeccionComentariosPublicacionProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios

export function SeccionComentariosPublicacion({ id, comentarios, total, onComentar, onResponder, onEditar, onEliminar, onReaccionar }: SeccionComentariosPublicacionProps) {
  return (
    <section id={id} aria-label={textos.etiqueta_seccion} className="border-t border-borde-suave px-4 py-3">
      {total === 0 && <MensajeVacio texto={textos.vacio} className="mb-3" />}
      {comentarios.length > 0 && (
        <ul aria-label={textos.etiqueta_lista} className="m-0 mb-3 flex list-none flex-col gap-3 p-0">
          {comentarios.map((comentario) => (
            <ItemComentario
              key={comentario.id}
              comentario={comentario}
              idRaiz={comentario.id}
              onResponder={onResponder}
              onEditar={onEditar}
              onEliminar={onEliminar}
              onReaccionar={onReaccionar}
            />
          ))}
        </ul>
      )}
      <div className="flex items-start gap-2">
        <AvatarUsuario tamano="sm" imagen={imagenUsuarioPredeterminada} />
        <CajaComentario marcador={textos.marcador} etiqueta={textos.etiqueta_campo} etiquetaEnviar={textos.publicar} onEnviar={onComentar} />
      </div>
    </section>
  )
}
