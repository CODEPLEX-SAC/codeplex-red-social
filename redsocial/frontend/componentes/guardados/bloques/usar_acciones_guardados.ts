import { useState } from 'react'
import catalogoGuardados from '../../../catalogos/capacidades/redsocial/guardados.json'
import type { ControlAccionesGuardados, ControlColeccionesGuardados, ControlNavegacionGuardados } from '@/tipos/guardados/contrato_control_guardados'
import type { ModalGuardados } from '@/tipos/guardados/modelo_guardados'

const avisos = catalogoGuardados.avisos

export function usarAccionesGuardados(colecciones: ControlColeccionesGuardados, navegacion: ControlNavegacionGuardados): ControlAccionesGuardados {
  const [modal, setModal] = useState<ModalGuardados | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [quitados, setQuitados] = useState<string[]>([])

  function terminar(mensaje: string) {
    setModal(null)
    setAviso(mensaje)
  }

  function confirmarQuitar(grupoId: string) {
    setQuitados((actual) => [...actual, grupoId])
    colecciones.quitarGrupoDeTodas(grupoId)
    terminar(avisos.quitado)
  }

  function eliminar(id: string) {
    colecciones.eliminar(id)
    if (navegacion.abiertaId === id) navegacion.cerrarColeccion()
    terminar(avisos.coleccion_eliminada)
  }

  function crear(nombre: string) {
    colecciones.crear(nombre)
    terminar(avisos.coleccion_creada)
  }

  function renombrar(id: string, nombre: string) {
    colecciones.renombrar(id, nombre)
    terminar(avisos.coleccion_renombrada)
  }

  function agregar(grupoId: string, coleccionId: string) {
    colecciones.agregarGrupo(coleccionId, grupoId)
    terminar(avisos.grupo_agregado)
  }

  function quitarDeColeccion(coleccionId: string, grupoId: string) {
    colecciones.quitarGrupo(coleccionId, grupoId)
    terminar(avisos.grupo_quitado_de_coleccion)
  }

  return { modal, aviso, quitados, abrir: setModal, cerrar: () => setModal(null), cerrarAviso: () => setAviso(null), confirmarQuitar, crear, renombrar, eliminar, agregar, quitarDeColeccion }
}
