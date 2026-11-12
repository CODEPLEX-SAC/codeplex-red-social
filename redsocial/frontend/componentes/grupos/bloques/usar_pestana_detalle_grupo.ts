import { useState } from 'react'
import type { PestanaDetalleGrupo, SubpestanaMultimedia } from '@/tipos/grupos/contrato_gestion_grupos'
import type { TipoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

export function usarPestanaDetalleGrupo(contenidoInicial: boolean) {
  const [pestana, setPestana] = useState<PestanaDetalleGrupo>('conversacion')
  const [multimedia, setMultimedia] = useState<SubpestanaMultimedia>('fotos')
  const [aviso, setAviso] = useState(String())
  const [guiaVisible, setGuiaVisible] = useState(true)
  const [publicando, setPublicando] = useState<TipoPublicacion | null>(null)
  const [verContenido, setVerContenido] = useState(contenidoInicial)
  const [modal, setModal] = useState<'invitar' | 'editar' | 'compartir' | null>(null)
  const [buscando, setBuscando] = useState(false)
  const [consulta, setConsulta] = useState(String())

  function irAlGrupo() {
    setVerContenido(false)
    setPestana('conversacion')
  }

  return {
    pestana, multimedia, aviso, guiaVisible, publicando, verContenido, modal, buscando, consulta,
    abrirPublicacion: setPublicando,
    cerrarPublicacion: () => setPublicando(null),
    cambiarPestana: setPestana,
    cambiarMultimedia: setMultimedia,
    mostrarAviso: setAviso,
    cerrarGuia: () => setGuiaVisible(false),
    verTuContenido: () => setVerContenido(true),
    irAlGrupo,
    abrirModal: setModal,
    cerrarModal: () => setModal(null),
    alternarBusqueda: () => setBuscando((actual) => !actual),
    cambiarConsulta: setConsulta,
  }
}
