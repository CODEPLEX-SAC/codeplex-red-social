import { useState } from 'react'
import { siguienteIdLista } from './logica_listas_amigos'
import type { ControlListasAmigos, ModalListaAmigos } from '@/tipos/amigos/contrato_listas'
import type { ListaAmigos } from '@/tipos/amigos/modelo_amigos_listas'

export function usarListasAmigos(iniciales: readonly ListaAmigos[]): ControlListasAmigos {
  const [listas, setListas] = useState<ListaAmigos[]>([...iniciales])
  const [modal, setModal] = useState<ModalListaAmigos | null>(null)

  function cambiar(id: string, cambio: Partial<ListaAmigos>) {
    setListas((actuales) => actuales.map((lista) => (lista.id === id ? { ...lista, ...cambio } : lista)))
  }

  function crear(nombre: string) {
    setListas((actuales) => [...actuales, { id: siguienteIdLista(actuales), nombre: nombre.trim(), descripcion: String(), miembros: [] }])
    setModal(null)
  }

  function renombrar(id: string, nombre: string) {
    cambiar(id, { nombre: nombre.trim() })
    setModal(null)
  }

  function eliminar(id: string) {
    setListas((actuales) => actuales.filter((lista) => lista.id !== id))
    setModal(null)
  }

  function guardarMiembros(id: string, miembros: string[]) {
    cambiar(id, { miembros })
    setModal(null)
  }

  return {
    listas,
    modal,
    abrirCrear: () => setModal({ tipo: 'crear' }),
    abrirEditar: (id) => setModal({ tipo: 'editar', id }),
    abrirEliminar: (id) => setModal({ tipo: 'eliminar', id }),
    abrirMiembros: (id) => setModal({ tipo: 'miembros', id }),
    cerrar: () => setModal(null),
    crear,
    renombrar,
    eliminar,
    guardarMiembros,
  }
}
