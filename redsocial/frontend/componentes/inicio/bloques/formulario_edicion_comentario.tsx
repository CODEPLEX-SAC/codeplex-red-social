import { CajaComentario } from './caja_comentario'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { FormularioEdicionComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios

export function FormularioEdicionComentario({ textoInicial, onGuardar, onCancelar }: FormularioEdicionComentarioProps) {
  return (
    <div className="mt-1">
      <CajaComentario
        autoFoco
        conMedios={false}
        textoInicial={textoInicial}
        marcador={textos.marcador}
        etiqueta={textos.etiqueta_edicion}
        etiquetaEnviar={textos.guardar}
        pista={textos.pista_edicion}
        onEnviar={onGuardar}
        onCancelar={onCancelar}
      />
    </div>
  )
}
