import { imagenUsuarioPredeterminada } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { DialogoEliminarPublicacion } from './dialogo_eliminar_publicacion'
import { FormularioEdicionComentario } from './formulario_edicion_comentario'
import { FormularioRespuestaComentario } from './formulario_respuesta_comentario'
import { MediosComentario } from './medios_comentario'
import { MenuComentario } from './menu_comentario'
import { MetaComentario } from './meta_comentario'
import { usarEstadoComentario } from './usar_estado_comentario'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ItemComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios
const clases = textos.clases

export function ItemComentario(props: ItemComentarioProps) {
  const { comentario, idRaiz, onResponder, onEditar, onEliminar, onReaccionar } = props
  const estado = usarEstadoComentario(props)

  return (
    <li className={clases.item}>
      <EnlacePerfilUsuario autorId={comentario.autorId} nombre={comentario.autor} className="flex-none">
        <AvatarUsuario tamano="sm" imagen={imagenUsuarioPredeterminada} />
      </EnlacePerfilUsuario>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-1">
          <div className={clases.burbuja}>
            <EnlacePerfilUsuario autorId={comentario.autorId} className="block text-auxiliar text-texto">
              <strong>{comentario.autor}</strong>
            </EnlacePerfilUsuario>
            {estado.editando ? (
              <FormularioEdicionComentario textoInicial={comentario.texto} onGuardar={estado.guardarEdicion} onCancelar={estado.cerrarEdicion} />
            ) : (
              <p className="m-0 whitespace-pre-wrap break-words text-subtitulo text-texto">
                {comentario.mencion && (
                  <EnlacePerfilUsuario autorId={comentario.mencion.autorId} className={clases.mencion}>
                    <strong>
                      {textos.prefijo_mencion}
                      {comentario.mencion.nombre}
                    </strong>
                  </EnlacePerfilUsuario>
                )}
                {comentario.texto}
              </p>
            )}
            {comentario.medios && comentario.medios.length > 0 && <MediosComentario medios={comentario.medios} />}
          </div>
          {estado.esPropio && !estado.editando && <MenuComentario onEditar={estado.abrirEdicion} onEliminar={estado.pedirConfirmacion} />}
        </div>
        <MetaComentario comentario={comentario} respondiendo={estado.respondiendo} onReaccionar={estado.reaccionar} onAlternarRespuesta={estado.alternarRespuesta} />
        {comentario.respuestas.length !== 0 && (
          <ul aria-label={textos.etiqueta_respuestas} className={clases.respuestas}>
            {comentario.respuestas.map((respuesta) => (
              <ItemComentario key={respuesta.id} comentario={respuesta} idRaiz={idRaiz} onResponder={onResponder} onEditar={onEditar} onEliminar={onEliminar} onReaccionar={onReaccionar} />
            ))}
          </ul>
        )}
        {estado.respondiendo && <FormularioRespuestaComentario mencion={estado.mencion} onEnviar={estado.enviarRespuesta} onCancelar={estado.cerrarRespuesta} />}
      </div>
      {estado.confirmando && <DialogoEliminarPublicacion textos={textos.eliminar} onConfirmar={estado.confirmarEliminacion} onCerrar={estado.cerrarConfirmacion} />}
    </li>
  )
}
