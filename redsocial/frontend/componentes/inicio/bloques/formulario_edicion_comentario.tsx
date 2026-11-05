import { Boton } from '../../compartido/interfaz/boton'
import { CajaComentario } from './caja_comentario'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { FormularioEdicionComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios

export function FormularioEdicionComentario({ textoInicial, mediosIniciales, onGuardar, onCancelar }: FormularioEdicionComentarioProps) {
  return (
    <div className="mt-1 flex flex-col gap-1">
      <CajaComentario
        autoFoco
        textoInicial={textoInicial}
        mediosIniciales={mediosIniciales}
        marcador={textos.marcador}
        etiqueta={textos.etiqueta_edicion}
        etiquetaEnviar={textos.guardar}
        onEnviar={onGuardar}
        onCancelar={onCancelar}
      />
      <span className={textos.clases.pista}>
        {textos.pista_edicion}
        <Boton type="button" variant="fantasma" size="enlace_accion" onClick={onCancelar}>
          {textos.cancelar}
        </Boton>
      </span>
    </div>
  )
}
