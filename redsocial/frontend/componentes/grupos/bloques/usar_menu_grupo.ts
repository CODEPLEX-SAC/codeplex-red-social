import { useState } from 'react'
import type { MouseEvent } from 'react'
import { irARuta } from '../../compartido/interfaz/menu'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { ClaveAccionGrupo, ParametrosMenuGrupo, TipoModalGrupo } from '@/tipos/grupos/contrato_gestion_grupos'

const menu = catalogoGrupos.menu
const CLAVE_MODAL: Record<string, TipoModalGrupo> = { ver_solicitudes: 'solicitudes', estado: 'estado', novedades: 'novedades', abandonar: 'abandonar', eliminar: 'eliminar', editar: 'editar' }

export function usarMenuGrupo({ grupo, enlace, puerto, alTuContenido }: ParametrosMenuGrupo) {
  const [ancla, setAncla] = useState<HTMLElement | null>(null)
  const [aviso, setAviso] = useState(String())
  const [modal, setModal] = useState<TipoModalGrupo | null>(null)

  function abrir(evento: MouseEvent<HTMLElement>) {
    setAviso(String())
    setAncla(evento.currentTarget)
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(enlace)
      setAviso(menu.enlace_copiado)
    } catch {
      setAviso(menu.error_copia)
    }
  }

  function irATuContenido() {
    if (alTuContenido) {
      alTuContenido()
      return
    }
    const consulta = new URLSearchParams({ [catalogoGrupos.parametros_ruta.vista]: catalogoGrupos.parametros_ruta.vista_contenido })
    irARuta([grupo.ruta, consulta.toString()].join('&'))
  }

  function alternarFijado() {
    puerto.alternarFijado(grupo.id)
    setAviso(grupo.fijado ? menu.desfijado : menu.fijado)
  }

  function alternarSeguimiento() {
    puerto.alternarSeguimiento(grupo.id)
    setAviso(grupo.siguiendo ? catalogoGrupos.detalle.membresia.sin_seguir : catalogoGrupos.detalle.membresia.siguiendo)
  }

  function ejecutar(clave: ClaveAccionGrupo | 'editar' | 'desfijar') {
    const acciones: Record<string, () => void> = { compartir: () => void copiar(), seguir: alternarSeguimiento, dejar_seguir: alternarSeguimiento, tu_contenido: irATuContenido, fijar: alternarFijado, desfijar: alternarFijado }
    const modalDeLaClave = CLAVE_MODAL[clave]
    if (acciones[clave]) acciones[clave]()
    else if (modalDeLaClave) setModal(modalDeLaClave)
  }

  return { ancla, aviso, modal, abrir, cerrar: () => setAncla(null), cerrarModal: () => setModal(null), ejecutar }
}
