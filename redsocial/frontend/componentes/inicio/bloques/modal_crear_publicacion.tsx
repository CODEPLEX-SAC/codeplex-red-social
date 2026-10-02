import { Modal } from '../../compartido/interfaz/modal'
import { EditorPublicacion } from './editor_publicacion'
import { BloqueOpcionesEncuesta } from './bloque_opciones_encuesta'
import { BloquePiePublicacion } from './bloque_pie_publicacion'
import { BloquePrioridadPublicacion } from './bloque_prioridad_publicacion'
import { BloqueUsuarioTipoPublicacion } from './bloque_usuario_tipo_publicacion'
import { usarBorradorPublicacion } from './usar_borrador_publicacion'
import { VistaPreviaMediosPublicacion } from './vista_previa_medios_publicacion'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ModalCrearPublicacionProps } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.modal_crear_publicacion
const primerNombre = catalogoCompartido.sesion_actual.usuario.split(' ')[0]

export function ModalCrearPublicacion({ tipoInicial = 'publicacion', onPublicar, onCerrar }: ModalCrearPublicacionProps) {
  const borrador = usarBorradorPublicacion(tipoInicial)

  function publicar() {
    onPublicar({ tipo: borrador.tipo, texto: borrador.contenido.trim() })
    onCerrar()
  }

  return (
    <Modal titulo={textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className="max-w-130 rounded-2xl max-600:h-full max-600:rounded-none">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
        <BloqueUsuarioTipoPublicacion tipo={borrador.tipo} onCambiar={borrador.setTipo} />

        <EditorPublicacion
          valor={borrador.contenido}
          marcador={textos.marcador_editor.replace(':nombre', primerNombre)}
          etiqueta={textos.etiqueta_editor}
          filasMinimas={textos.filas_minimas}
          onCambiar={borrador.setContenido}
        />

        {borrador.tipo === 'encuesta' && (
          <BloqueOpcionesEncuesta opciones={borrador.opciones} onActualizar={borrador.actualizarOpcion} onAgregar={borrador.agregarOpcion} onQuitar={borrador.quitarOpcion} />
        )}

        {borrador.tipo === 'pregunta' && <BloquePrioridadPublicacion prioridad={borrador.prioridad} onCambiar={borrador.setPrioridad} />}

        <VistaPreviaMediosPublicacion medios={borrador.medios} onQuitar={borrador.quitarMedio} />
      </div>

      <BloquePiePublicacion
        puedeAgregarMedios={borrador.puedeAgregarMedios}
        contenidoValido={borrador.contenidoValido}
        onAgregarMedios={borrador.agregarMedios}
        onPublicar={publicar}
      />
    </Modal>
  )
}
