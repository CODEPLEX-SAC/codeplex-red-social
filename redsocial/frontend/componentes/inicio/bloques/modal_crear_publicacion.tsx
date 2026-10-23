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

export function ModalCrearPublicacion({ modo = 'crear', tipoInicial = 'publicacion', textoInicial = '', mediosIniciales, onPublicar, onCerrar }: ModalCrearPublicacionProps) {
  const borrador = usarBorradorPublicacion(tipoInicial, textoInicial, mediosIniciales)
  const editando = modo === 'editar'

  function publicar() {
    const completas = borrador.opciones.map((opcion) => opcion.texto.trim()).filter((texto) => texto.length > 0)
    const medios = borrador.entregarMedios()
    onPublicar({
      tipo: borrador.tipo,
      texto: borrador.contenido.trim(),
      prioridad: borrador.tipo === 'pregunta' ? borrador.prioridad : undefined,
      opciones: borrador.tipo === 'encuesta' ? completas : undefined,
      medios: medios.length > 0 || editando ? medios : undefined,
    })
    onCerrar()
  }

  return (
    <Modal titulo={editando ? textos.editar.titulo : textos.titulo} etiquetaCerrar={textos.cerrar} onCerrar={onCerrar} className="max-w-130 rounded-2xl max-600:h-full max-600:rounded-none">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
        <BloqueUsuarioTipoPublicacion mostrarTipos={!editando} tipo={borrador.tipo} onCambiar={borrador.setTipo} />

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
        etiquetaPublicar={editando ? textos.editar.guardar : textos.publicar}
        puedeAgregarMedios={borrador.puedeAgregarMedios}
        contenidoValido={borrador.contenidoValido}
        onAgregarMedios={borrador.agregarMedios}
        onPublicar={publicar}
      />
    </Modal>
  )
}
