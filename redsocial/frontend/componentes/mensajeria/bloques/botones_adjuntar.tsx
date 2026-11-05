import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { ACEPTA_DOCUMENTOS, ACEPTA_IMAGENES, prepararAdjuntos } from './logica_adjuntos'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { BotonesAdjuntarProps } from '@/tipos/mensajeria/contrato_conversacion'

const textos = catalogoMensajeria.conversacion
const etiquetas = textos.adjuntos.etiquetas

export function BotonesAdjuntar({ onAdjuntar, onAviso, onGrabar }: BotonesAdjuntarProps) {
  const documentos = useRef<HTMLInputElement>(null)
  const imagenes = useRef<HTMLInputElement>(null)

  function alElegir(evento: ChangeEvent<HTMLInputElement>) {
    const archivos = Array.from(evento.target.files ?? [])
    evento.target.value = String()
    if (archivos.length === 0) return
    const { adjuntos, errores } = prepararAdjuntos(archivos)
    onAviso?.(errores)
    if (adjuntos.length > 0) onAdjuntar?.(adjuntos)
  }

  return (
    <>
      <BotonIcono icono="microfono" type="button" aria-label={textos.grabar_audio} variant="discreto" size="default" onClick={onGrabar} />
      <BotonIcono icono="adjuntar" type="button" aria-label={etiquetas.adjuntar_documento} variant="discreto" size="default" onClick={() => documentos.current?.click()} />
      <BotonIcono icono="imagen" type="button" aria-label={textos.adjuntar_archivo} variant="discreto" size="default" onClick={() => imagenes.current?.click()} />
      <input ref={documentos} type={textos.adjuntos.tipo_entrada} accept={ACEPTA_DOCUMENTOS} multiple hidden onChange={alElegir} data-entrada-documentos />
      <input ref={imagenes} type={textos.adjuntos.tipo_entrada} accept={ACEPTA_IMAGENES} multiple hidden onChange={alElegir} data-entrada-archivos />
    </>
  )
}
