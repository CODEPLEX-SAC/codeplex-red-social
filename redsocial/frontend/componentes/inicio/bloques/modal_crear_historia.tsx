import { Modal } from '../../compartido/interfaz/modal'
import { DialogoEliminarPublicacion } from './dialogo_eliminar_publicacion'
import { EditorMedioHistoria } from './editor_medio_historia'
import { EditorTextoHistoria } from './editor_texto_historia'
import { SelectorTipoHistoria } from './selector_tipo_historia'
import { tiposArchivoHistoria } from './logica_historia'
import { usarFlujoHistoria } from './usar_flujo_historia'
import { VistaPreviaHistoria } from './vista_previa_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ModalCrearHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.flujo

export function ModalCrearHistoria({ onPublicar, onCerrar }: ModalCrearHistoriaProps) {
  const flujo = usarFlujoHistoria(onPublicar, onCerrar)
  const ancho = flujo.paso === 'editor' ? 'max-w-215' : 'max-w-120'
  const titulo = flujo.paso === 'vista_previa' ? textos.vista_previa.titulo : flujo.paso === 'editor' ? (flujo.tipo === 'media' ? textos.editor.titulo_media : textos.editor.titulo_texto) : textos.crear.titulo

  return (
    <>
      <Modal titulo={titulo} etiquetaCerrar={textos.crear.cerrar} onCerrar={flujo.pedirCerrar} className={`${ancho} rounded-2xl max-600:h-full max-600:rounded-none`}>
        {flujo.paso === 'tipo' && <SelectorTipoHistoria tipo={flujo.tipo} error={flujo.errorArchivo} onElegir={flujo.elegirTipo} onContinuar={flujo.continuar} onCancelar={flujo.pedirCerrar} />}
        {flujo.paso === 'editor' && (flujo.tipo === 'media' ? <EditorMedioHistoria flujo={flujo} /> : <EditorTextoHistoria flujo={flujo} />)}
        {flujo.paso === 'vista_previa' && <VistaPreviaHistoria flujo={flujo} />}
      </Modal>
      <input ref={flujo.selector} type="file" hidden tabIndex={-1} accept={tiposArchivoHistoria()} aria-label={textos.crear.etiqueta_archivo} onChange={flujo.alElegirArchivo} />
      {flujo.confirmandoDescarte && <DialogoEliminarPublicacion textos={textos.descartar} onConfirmar={flujo.confirmarDescarte} onCerrar={flujo.seguirEditando} />}
    </>
  )
}
