import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, ClipboardEvent, FormEvent, KeyboardEvent } from 'react'
import { liberarMedios, mediosDesdeArchivos, sinMedio } from './logica_caja_comentario'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CajaComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.publicacion.comentarios

export function usarCajaComentario({ textoInicial = String(), onEnviar, onCancelar }: CajaComentarioProps) {
  const [texto, setTexto] = useState(textoInicial)
  const [medios, setMedios] = useState<MedioLocalPublicacion[]>([])
  const [emojis, setEmojis] = useState(false)
  const selectorImagen = useRef<HTMLInputElement>(null)
  const selectorVideo = useRef<HTMLInputElement>(null)
  const contador = useRef(0)
  const vigentes = useRef<MedioLocalPublicacion[]>([])
  const vacio = texto.trim().length === 0 && medios.length === 0

  useEffect(() => {
    vigentes.current = medios
  }, [medios])

  useEffect(() => () => liberarMedios(vigentes.current), [])

  function siguienteId() {
    contador.current += 1
    return String(contador.current)
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    enviarActual()
  }

  function enviarActual() {
    if (vacio) return
    if (medios.length > 0) {
      vigentes.current = []
      onEnviar(texto.trim(), medios)
    } else {
      onEnviar(texto.trim())
    }
    setTexto('')
    setMedios([])
    setEmojis(false)
  }

  function alTeclear(evento: KeyboardEvent) {
    if (evento.key === catalogoCompartido.modal.tecla_cerrar) onCancelar?.()
    if (evento.key === textos.tecla_enviar && !evento.shiftKey) {
      evento.preventDefault()
      enviarActual()
    }
  }

  function alPegar(evento: ClipboardEvent) {
    const archivos = Array.from(evento.clipboardData.files)
    if (archivos.length === 0) return
    evento.preventDefault()
    agregarArchivos(archivos)
  }

  function agregarArchivos(archivos: File[]) {
    const nuevos = mediosDesdeArchivos(archivos, medios.length, siguienteId)
    setMedios((anteriores) => [...anteriores, ...nuevos])
  }

  function alElegirArchivos(evento: ChangeEvent<HTMLInputElement>) {
    agregarArchivos(Array.from(evento.target.files ?? []))
    evento.target.value = ''
  }

  const alternarEmojis = () => setEmojis((abierto) => !abierto)
  const abrirSelectorImagen = () => selectorImagen.current?.click()
  const abrirSelectorVideo = () => selectorVideo.current?.click()
  const quitarMedio = (id: string) => setMedios((anteriores) => sinMedio(anteriores, id))
  const agregarEmoji = (emoji: string) => setTexto((actual) => actual + emoji)

  return { texto, setTexto, medios, emojis, selectorImagen, selectorVideo, vacio, enviar, alTeclear, alPegar, alElegirArchivos, alternarEmojis, abrirSelectorImagen, abrirSelectorVideo, quitarMedio, agregarEmoji }
}
