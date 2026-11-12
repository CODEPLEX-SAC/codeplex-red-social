import { useState } from 'react'
import { alternarEtiquetaEn, pasoDeRetorno, textoFinalCompartido } from './logica_compartir_publicacion'
import { usarDestinosCompartir } from './usar_destinos_compartir'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { AvisoCompartir, DestinoElegido, ParametrosCompartirPublicacion, PasoCompartir } from '@/tipos/inicio/contrato_compartir_publicacion'

const textos = catalogoInicio.publicacion.compartir
const ID_ORIGEN = 'origen-compartido'

export function usarCompartirPublicacion({ nombre, texto, onCompartir }: ParametrosCompartirPublicacion) {
  const destinos = usarDestinosCompartir()
  const [paso, setPaso] = useState<PasoCompartir>('principal')
  const [destino, setDestino] = useState<DestinoElegido | null>(null)
  const [comentario, setComentario] = useState(String())
  const [etiquetados, setEtiquetados] = useState<string[]>([])
  const [aviso, setAviso] = useState<AvisoCompartir | null>(null)
  const [terminado, setTerminado] = useState(false)

  function terminar(mensaje: string) {
    setAviso({ mensaje, variante: 'exito' })
    setTerminado(true)
  }

  async function copiarEnlace() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setAviso({ mensaje: textos.enlace_copiado, variante: 'exito' })
    } catch {
      setAviso({ mensaje: textos.error_copia, variante: 'error' })
    }
  }

  function elegirPrincipal(clave: string) {
    const acciones: Record<string, () => void> = { historia: compartirEnHistoria, enlace: () => void copiarEnlace(), grupo: () => setPaso('grupos'), amigo: () => setPaso('amigos') }
    acciones[clave]?.()
  }

  function elegirDestino(elegido: DestinoElegido) {
    setDestino(elegido)
    setComentario(String())
    setEtiquetados([])
    setPaso('redactar')
  }

  function volver() {
    setPaso(pasoDeRetorno(paso, destino))
  }

  function alternarEtiqueta(persona: string) {
    setEtiquetados((actuales) => alternarEtiquetaEn(actuales, persona))
  }

  function compartirEnHistoria() {
    const origen = {
      id: ID_ORIGEN,
      nombre,
      tiempo: catalogoInicio.publicacion.tiempo_ahora,
      texto,
    }
    if (destinos.compartirEnHistoria(origen, comentario.trim())) {
      terminar(textos.exito_historia)
      return
    }
    onCompartir(comentario.trim())
    terminar(textos.exito_mensaje)
  }

  function publicar() {
    if (!destino) return
    const textoFinal = textoFinalCompartido(comentario, etiquetados)
    if (destino.tipo === 'grupo') {
      destinos.compartirEnGrupo(
        destino.id,
        {
          id: ID_ORIGEN,
          nombre,
          tiempo: catalogoInicio.publicacion.tiempo_ahora,
          texto,
        },
        textoFinal,
      )
      terminar(textos.exito_grupo.replace(':destino', destino.nombre))
      return
    }
    terminar(textos.exito_amigo.replace(':destino', destino.nombre))
  }

  return {
    paso,
    destino,
    comentario,
    etiquetados,
    aviso,
    terminado,
    cerrarAviso: () => setAviso(null),
    elegirPrincipal,
    elegirDestino,
    volver,
    alternarEtiqueta,
    compartirEnHistoria,
    publicar,
    cambiarComentario: setComentario,
  }
}
