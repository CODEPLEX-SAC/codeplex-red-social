import { BannerContexto } from './banner_contexto'
import { ComposicionMensaje } from './composicion_mensaje'
import { nombreDeAutor, textoDeMensaje, tituloDeRespuesta } from './logica_presentacion_mensajes'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { ZonaComposicionProps } from '@/tipos/mensajeria/contrato_conversacion'

const textos = catalogoMensajeria.conversacion

export function ZonaComposicion({ conversacion, participantes, usuarioId, editando, respondiendo, onEnviar, onAdjuntar, onCancelarEdicion, onCancelarRespuesta, etiquetaGuardar }: ZonaComposicionProps) {
  return (
    <div>
      {editando && <BannerContexto titulo={textos.editando} cuerpo={editando.texto} etiquetaCancelar={textos.cancelar_edicion} onCancelar={onCancelarEdicion} />}
      {respondiendo && (
        <BannerContexto
          titulo={tituloDeRespuesta(nombreDeAutor(conversacion, participantes, respondiendo.autorId, usuarioId), respondiendo.autorId === usuarioId)}
          cuerpo={textoDeMensaje(respondiendo)}
          etiquetaCancelar={textos.respuesta.cancelar}
          onCancelar={onCancelarRespuesta}
        />
      )}
      <ComposicionMensaje key={editando?.id ?? String()} onEnviar={onEnviar} onAdjuntar={onAdjuntar} textoInicial={editando?.texto} etiquetaEnviar={editando ? etiquetaGuardar : undefined} />
    </div>
  )
}
