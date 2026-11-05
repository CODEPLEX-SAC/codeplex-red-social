import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { ControlesEstiloHistoria } from './controles_estilo_historia'
import { PanelEmojisComentario } from './panel_emojis_comentario'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { FlujoHistoriaProps } from '@/tipos/inicio/contrato_historia'

const textos = catalogoInicio.historias.flujo.editor
const clases = catalogoInicio.historias.flujo.clases

export function HerramientaTextoHistoria({ flujo }: FlujoHistoriaProps) {
  const [emojis, setEmojis] = useState(false)
  const alternarEmojis = () => setEmojis((abierto) => !abierto)

  return (
    <>
      <ControlesEstiloHistoria estiloId={flujo.borrador.estiloTextoId} onCambiar={flujo.cambiarEstilo} />
      <section className={clases.seccion_control}>
        <h3 className={clases.titulo_control}>{textos.etiqueta_emojis}</h3>
        <BotonIcono icono="sentimiento" type="button" aria-label={catalogoInicio.publicacion.comentarios.etiqueta_emojis} aria-expanded={emojis} onClick={alternarEmojis} variant="discreto" size="default" />
        {emojis && <PanelEmojisComentario onElegir={flujo.agregarEmoji} />}
      </section>
    </>
  )
}
