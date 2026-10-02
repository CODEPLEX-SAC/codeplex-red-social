import { useEffect, useRef, useState } from 'react'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MedioLocalPublicacion, OpcionEncuestaPublicacion, PrioridadPublicacion, TipoPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.modal_crear_publicacion

function esMedioValido(archivo: File) {
  const tipoAceptado = textos.medios.prefijos_aceptados.some((prefijo) => archivo.type.startsWith(prefijo))
  return tipoAceptado && textos.medios.tamano_maximo >= archivo.size
}

export function usarBorradorPublicacion(tipoInicial: TipoPublicacion) {
  const contadorIds = useRef(0)
  const urlsActivas = useRef(new Set<string>())
  const [tipo, setTipo] = useState<TipoPublicacion>(tipoInicial)
  const [contenido, setContenido] = useState('')
  const [opciones, setOpciones] = useState<OpcionEncuestaPublicacion[]>(() => Array.from({ length: textos.encuesta.opciones_iniciales }, () => nuevaOpcion()))
  const [prioridad, setPrioridad] = useState<PrioridadPublicacion>(textos.prioridad.inicial as PrioridadPublicacion)
  const [medios, setMedios] = useState<MedioLocalPublicacion[]>([])

  function nuevoId() {
    contadorIds.current += 1
    return String(contadorIds.current)
  }

  function nuevaOpcion(): OpcionEncuestaPublicacion {
    return { id: nuevoId(), texto: '' }
  }

  function agregarMedios(archivos: File[]) {
    const disponibles = textos.medios.maximo_archivos - medios.length
    const validos = archivos.filter((archivo) => esMedioValido(archivo))
    const aceptados = validos.slice(0, Math.max(disponibles, 0))
    const creados = aceptados.map((archivo) => {
      const url = URL.createObjectURL(archivo)
      urlsActivas.current.add(url)
      return { id: nuevoId(), url, esVideo: archivo.type.startsWith(textos.medios.prefijo_video) }
    })
    setMedios((anteriores) => [...anteriores, ...creados])
  }

  function quitarMedio(id: string) {
    const medio = medios.find((candidato) => candidato.id === id)
    if (medio) {
      URL.revokeObjectURL(medio.url)
      urlsActivas.current.delete(medio.url)
    }
    setMedios((anteriores) => anteriores.filter((candidato) => candidato.id !== id))
  }

  function actualizarOpcion(id: string, texto: string) {
    setOpciones((anteriores) => anteriores.map((opcion) => (opcion.id === id ? { ...opcion, texto } : opcion)))
  }

  function agregarOpcion() {
    if (opciones.length >= textos.encuesta.opciones_maximas) return
    setOpciones((anteriores) => [...anteriores, nuevaOpcion()])
  }

  function quitarOpcion(id: string) {
    if (opciones.length <= textos.encuesta.opciones_minimas) return
    setOpciones((anteriores) => anteriores.filter((opcion) => opcion.id !== id))
  }

  function calcularContenidoValido() {
    const hayTexto = contenido.trim().length > 0
    if (tipo !== 'encuesta') return hayTexto || medios.length > 0
    const completas = opciones.filter((opcion) => opcion.texto.trim().length > 0)
    return hayTexto && completas.length >= textos.encuesta.opciones_minimas
  }

  useEffect(() => {
    const urls = urlsActivas.current
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
      urls.clear()
    }
  }, [])

  return {
    tipo,
    setTipo,
    contenido,
    setContenido,
    opciones,
    prioridad,
    setPrioridad,
    medios,
    puedeAgregarMedios: medios.length < textos.medios.maximo_archivos,
    contenidoValido: calcularContenidoValido(),
    agregarMedios,
    quitarMedio,
    actualizarOpcion,
    agregarOpcion,
    quitarOpcion,
  }
}
