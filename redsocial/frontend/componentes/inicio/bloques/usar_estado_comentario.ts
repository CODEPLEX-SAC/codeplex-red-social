import { useState } from 'react'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import type { ItemComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { ClaveReaccion } from '@/tipos/inicio/contrato_reacciones'

export function usarEstadoComentario({ comentario, idRaiz, onResponder, onEditar, onEliminar, onReaccionar }: ItemComentarioProps) {
  const { usuario } = usarSesionDemostracion()
  const [editando, setEditando] = useState(false)
  const [respondiendo, setRespondiendo] = useState(false)
  const [confirmando, setConfirmando] = useState(false)

  function abrirEdicion() {
    setEditando(true)
  }

  function cerrarEdicion() {
    setEditando(false)
  }

  function guardarEdicion(texto: string) {
    onEditar(comentario.id, texto)
    setEditando(false)
  }

  function alternarRespuesta() {
    setRespondiendo((abierto) => !abierto)
  }

  function cerrarRespuesta() {
    setRespondiendo(false)
  }

  const mencion = { autorId: comentario.autorId, nombre: comentario.autor }

  function enviarRespuesta(texto: string, medios?: MedioLocalPublicacion[]) {
    onResponder(idRaiz, texto, medios, mencion)
    setRespondiendo(false)
  }

  function pedirConfirmacion() {
    setConfirmando(true)
  }

  function cerrarConfirmacion() {
    setConfirmando(false)
  }

  function confirmarEliminacion() {
    onEliminar(comentario.id)
  }

  function reaccionar(clave: ClaveReaccion) {
    onReaccionar(comentario.id, clave)
  }

  return {
    esPropio: comentario.autorId === usuario?.id,
    editando,
    respondiendo,
    confirmando,
    abrirEdicion,
    cerrarEdicion,
    guardarEdicion,
    alternarRespuesta,
    cerrarRespuesta,
    enviarRespuesta,
    pedirConfirmacion,
    cerrarConfirmacion,
    confirmarEliminacion,
    reaccionar,
    mencion,
  }
}
