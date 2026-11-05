import { useState } from 'react'
import { puedeEditarMensaje } from './logica_mensajeria'
import type { Mensaje, RespuestaMensaje } from '@/tipos/mensajeria/contrato_mensajes'

export function usarContextoComposicion(mensajes: readonly Mensaje[], usuarioId: string, ahora: Date) {
  const [seleccion, setEditando] = useState<{ id: string; texto: string } | null>(null)
  const [respondiendoId, setRespondiendoId] = useState<string | null>(null)
  const respondiendo = mensajes.find((mensaje) => mensaje.id === respondiendoId)
  const referencia: RespuestaMensaje | undefined = respondiendo ? { mensajeId: respondiendo.id, autorId: respondiendo.autorId } : undefined
  const original = seleccion ? mensajes.find((mensaje) => mensaje.id === seleccion.id) : undefined
  const editando = seleccion && original && puedeEditarMensaje(original, usuarioId, ahora) ? seleccion : null

  function iniciarEdicion(mensajeId: string) {
    const mensaje = mensajes.find((candidato) => candidato.id === mensajeId)
    if (mensaje) setEditando({ id: mensajeId, texto: mensaje.contenido ?? String() })
  }

  function iniciarRespuesta(mensajeId: string) {
    setEditando(null)
    setRespondiendoId(mensajeId)
  }

  return {
    editando,
    respondiendo,
    referencia,
    iniciarEdicion,
    iniciarRespuesta,
    cancelarEdicion: () => setEditando(null),
    cancelarRespuesta: () => setRespondiendoId(null),
    terminar: () => {
      setEditando(null)
      setRespondiendoId(null)
    },
  }
}
