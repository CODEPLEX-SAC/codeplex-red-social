import { useRef, useState } from 'react'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ComentarioPublicacion } from '@/tipos/inicio/contrato_interacciones_publicacion'

export function usarInteraccionesPublicacion(reaccionesIniciales: number, comentariosIniciales: number) {
  const { usuario } = usarSesionDemostracion()
  const contadorComentarios = useRef(0)
  const [meGusta, setMeGusta] = useState(false)
  const [comentariosAbiertos, setComentariosAbiertos] = useState(false)
  const [comentarios, setComentarios] = useState<ComentarioPublicacion[]>([])
  const [compartidos, setCompartidos] = useState(0)

  function alternarMeGusta() {
    setMeGusta((activo) => !activo)
  }

  function alternarComentarios() {
    setComentariosAbiertos((abiertos) => !abiertos)
  }

  function comentar(texto: string) {
    if (!usuario || texto.length === 0) return
    contadorComentarios.current += 1
    const nuevo = { id: String(contadorComentarios.current), autor: usuario.usuario, texto, tiempo: catalogoInicio.publicacion.tiempo_ahora }
    setComentarios((anteriores) => [...anteriores, nuevo])
  }

  function compartir() {
    setCompartidos((total) => total + 1)
  }

  return {
    meGusta,
    reacciones: reaccionesIniciales + (meGusta ? 1 : 0),
    comentariosAbiertos,
    comentarios,
    totalComentarios: comentariosIniciales + comentarios.length,
    compartidos,
    alternarMeGusta,
    alternarComentarios,
    comentar,
    compartir,
  }
}
