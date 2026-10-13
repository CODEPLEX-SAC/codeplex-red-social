import { useRef, useState } from 'react'
import { usarSesionDemostracion } from '../../compartido/sesion/usar_sesion_demostracion'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { ContenidoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { PublicacionTextoInicio } from '@/tipos/inicio/modelo_inicio'

export function usarPublicacionesInicio() {
  const { usuario } = usarSesionDemostracion()
  const contadorIds = useRef(0)
  const [publicaciones, setPublicaciones] = useState<PublicacionTextoInicio[]>([])

  function publicar(contenido: ContenidoPublicacion) {
    if (!usuario || contenido.tipo !== 'publicacion' || !contenido.texto) return
    contadorIds.current += 1
    const nueva: PublicacionTextoInicio = {
      id: String(contadorIds.current),
      autorId: usuario.id,
      nombre: usuario.usuario,
      tiempo: catalogoInicio.publicacion.tiempo_ahora,
      texto: contenido.texto,
      reacciones: 0,
      comentarios: 0,
    }
    setPublicaciones((anteriores) => [nueva, ...anteriores])
  }

  function editar(id: string, texto: string) {
    setPublicaciones((anteriores) => anteriores.map((publicacion) => (publicacion.id === id ? { ...publicacion, texto } : publicacion)))
  }

  function eliminar(id: string) {
    setPublicaciones((anteriores) => anteriores.filter((publicacion) => publicacion.id !== id))
  }

  return { publicaciones, publicar, editar, eliminar }
}
