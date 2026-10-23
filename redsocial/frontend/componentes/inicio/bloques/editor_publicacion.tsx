import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { EditorPublicacionProps } from '@/tipos/inicio/contrato_crear_publicacion'

export function EditorPublicacion({ valor, marcador, etiqueta, filasMinimas, onCambiar }: EditorPublicacionProps) {
  return (
    <CampoTexto
      multilinea
      filasMinimas={filasMinimas}
      valor={valor}
      alCambiar={onCambiar}
      marcador={marcador}
      className={catalogoCompartido.controles.campo_texto_editor.className}
      sx={catalogoCompartido.controles.campo_texto_editor.sx}
      inputProps={{ 'aria-label': etiqueta, 'data-foco-inicial': true }}
    />
  )
}
