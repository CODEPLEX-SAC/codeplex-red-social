import { imagenUsuarioPredeterminada } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { CajaComentario } from './caja_comentario'
import { respuestaPara } from './logica_caja_comentario'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { FormularioRespuestaComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios

export function FormularioRespuestaComentario({ mencion, onEnviar, onCancelar }: FormularioRespuestaComentarioProps) {
  return (
    <div className={textos.clases.formulario}>
      <AvatarUsuario tamano="sm" imagen={imagenUsuarioPredeterminada} />
      <CajaComentario
        autoFoco
        marcador={respuestaPara(mencion.nombre, textos.marcador_respuesta)}
        mencion={`${textos.prefijo_mencion}${mencion.nombre}`}
        etiqueta={textos.etiqueta_respuesta}
        etiquetaEnviar={textos.enviar_respuesta}
        onEnviar={onEnviar}
        onCancelar={onCancelar}
      />
    </div>
  )
}
