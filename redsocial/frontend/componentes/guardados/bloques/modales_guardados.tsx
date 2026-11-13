import { DialogoCompartirPublicacion } from '../../inicio/bloques/dialogo_compartir_publicacion'
import { ModalAgregarAColeccion } from './modal_agregar_a_coleccion'
import { ModalConfirmacionGuardados } from './modal_confirmacion_guardados'
import { ModalNombreColeccion } from './modal_nombre_coleccion'
import { nombreDisponible } from './logica_colecciones_guardados'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ModalesGuardadosProps } from '@/tipos/guardados/contrato_guardados'

const textos = catalogoGuardados.modales
const botones = catalogoGuardados.botones

export function ModalesGuardados({ control, modal }: ModalesGuardadosProps) {
  const { acciones, colecciones } = control
  const lista = colecciones.colecciones

  if (modal.tipo === 'crear') {
    return <ModalNombreColeccion titulo={textos.crear.titulo} confirmar={textos.crear.confirmar} nombreInicial={String()} esValido={(nombre) => nombreDisponible(lista, nombre)} alConfirmar={acciones.crear} alCerrar={acciones.cerrar} />
  }
  if (modal.tipo === 'renombrar') {
    const actual = lista.find((coleccion) => coleccion.id === modal.coleccionId)
    return <ModalNombreColeccion key={modal.coleccionId} titulo={textos.renombrar.titulo} confirmar={botones.guardar} nombreInicial={actual?.nombre ?? String()} esValido={(nombre) => nombreDisponible(lista, nombre, modal.coleccionId)} alConfirmar={(nombre) => acciones.renombrar(modal.coleccionId, nombre)} alCerrar={acciones.cerrar} />
  }
  if (modal.tipo === 'eliminar') {
    const nombre = lista.find((coleccion) => coleccion.id === modal.coleccionId)?.nombre ?? String()
    return <ModalConfirmacionGuardados titulo={textos.eliminar.titulo} mensaje={textos.eliminar.mensaje.replace(':nombre', nombre)} confirmar={botones.eliminar} alConfirmar={() => acciones.eliminar(modal.coleccionId)} alCerrar={acciones.cerrar} />
  }
  if (modal.tipo === 'quitar') {
    return <ModalConfirmacionGuardados titulo={textos.quitar.titulo} mensaje={textos.quitar.mensaje} confirmar={botones.quitar} alConfirmar={() => acciones.confirmarQuitar(modal.grupoId)} alCerrar={acciones.cerrar} />
  }
  if (modal.tipo === 'agregar') {
    return <ModalAgregarAColeccion grupoId={modal.grupoId} colecciones={lista} alAgregar={(coleccionId) => acciones.agregar(modal.grupoId, coleccionId)} alCerrar={acciones.cerrar} />
  }
  return <DialogoCompartirPublicacion simple titulo={modal.titulo} nombre={modal.nombre} texto={modal.texto} onCompartir={() => undefined} onCerrar={acciones.cerrar} />
}
