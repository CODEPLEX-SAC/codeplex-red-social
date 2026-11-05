import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, ClipboardEvent, FormEvent, KeyboardEvent } from 'react'
import { liberarMedios, mediosDesdeArchivos, sinMedio } from './logica_caja_comentario'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CajaComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const textos = catalogoInicio.publicacion.comentarios

export function usarCajaComentario({ textoInicial = String(), mediosIniciales, onEnviar, onCancelar }: CajaComentarioProps) {
  const [texto, setTexto] = useState(textoInicial)
  const [medios, setMedios] = useState<MedioLocalPublicacion[]>(mediosIniciales ?? [])
  const [emojis, setEmojis] = useState(false)
  const selector = useRef<HTMLInputElement>(null)
  const contador = useRef(0)
  const propias = useRef(new Set<string>())
  const vigentes = useRef<MedioLocalPublicacion[]>([])
  const vacio = texto.trim().length === 0 && medios.length === 0
  const entregaSiempreMedios = mediosIniciales !== undefined

  useEffect(() => {
    vigentes.current = medios
  }, [medios])

  useEffect(() => {
    const creadas = propias.current
    return () => liberarMedios(vigentes.current, creadas)
  }, [])

  function siguienteId() {
    contador.current += 1
    return String(contador.current)
  }

  function enviarActual() {
    if (vacio) return
    if (medios.length > 0 || entregaSiempreMedios) {
      propias.current.clear()
      onEnviar(texto.trim(), medios)
    } else {
      onEnviar(texto.trim())
    }
    setTexto(String())
    setMedios([])
    setEmojis(false)
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    enviarActual()
  }

  function alTeclear(evento: KeyboardEvent) {
    if (evento.key === catalogoCompartido.modal.tecla_cerrar) onCancelar?.()
    if (evento.key === textos.tecla_enviar && !evento.shiftKey) {
      evento.preventDefault()
      enviarActual()
    }
  }

  function agregarArchivos(archivos: File[]) {
    const nuevos = mediosDesdeArchivos(archivos, medios.length, siguienteId)
    nuevos.forEach((medio) => propias.current.add(medio.url))
    setMedios((anteriores) => [...anteriores, ...nuevos])
  }

  function alPegar(evento: ClipboardEvent) {
    const archivos = Array.from(evento.clipboardData.files)
    if (archivos.length === 0) return
    evento.preventDefault()
    agregarArchivos(archivos)
  }

  function alElegirArchivos(evento: ChangeEvent<HTMLInputElement>) {
    agregarArchivos(Array.from(evento.target.files ?? []))
    evento.target.value = ''
  }

  const alternarEmojis = () => setEmojis((abierto) => !abierto)
  const abrirSelector = () => selector.current?.click()
  const quitarMedio = (id: string) => setMedios((anteriores) => sinMedio(anteriores, id))
  const agregarEmoji = (emoji: string) => setTexto((actual) => actual + emoji)

  return { texto, setTexto, medios, emojis, selector, vacio, enviar, alTeclear, alPegar, alElegirArchivos, alternarEmojis, abrirSelector, quitarMedio, agregarEmoji }
}
