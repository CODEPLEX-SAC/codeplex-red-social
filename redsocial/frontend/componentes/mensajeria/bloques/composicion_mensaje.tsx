import { useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { BotonesAdjuntar } from './botones_adjuntar'
import { ControlesAudioComposicion } from './controles_audio_composicion'
import { usarGrabacionAudio } from '../../compartido/interfaz/usar_grabacion_audio'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ComposicionMensajeProps } from '@/tipos/mensajeria/contrato_conversacion'

const clases = catalogoMensajeria.clases.chat
const textos = catalogoMensajeria.conversacion

export function ComposicionMensaje({ onEnviar, onAdjuntar, textoInicial = String(), etiquetaEnviar = textosRedSocial.ENVIAR }: ComposicionMensajeProps) {
  const [texto, setTexto] = useState(textoInicial)
  const [avisos, setAvisos] = useState<readonly string[]>([])
  const hayTexto = texto.trim().length > 0
  const grabacion = usarGrabacionAudio({ sinSoporte: textos.grabacion.sin_soporte, sinPermiso: textos.grabacion.sin_permiso, limite: textos.grabacion.limite_duracion })

  function confirmarEnvio() {
    if (!hayTexto) return
    if (onEnviar(texto.trim()) === false) return
    setTexto(String())
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    confirmarEnvio()
  }

  function alPresionarTecla(evento: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (evento.key !== textos.tecla_enviar || evento.shiftKey || evento.nativeEvent.isComposing) return
    evento.preventDefault()
    confirmarEnvio()
  }

  const aviso = grabacion.error ?? avisos.join(' ')
  const campo = (
    <>
      <div className={clases.campo}>
        <CampoTexto
          multilinea
          sx={catalogoCompartido.controles.campo_texto_multilinea.sx}
          filasMinimas={1}
          filasMaximas={textos.filas_maximas}
          valor={texto}
          alCambiar={setTexto}
          alPresionarTecla={alPresionarTecla}
          marcador={catalogoMensajeria.placeholders.escribe_un_mensaje}
          iconoInicio={
            <span className={clases.emoji_campo}>
              <BotonIcono icono="sentimiento" type="button" aria-label={textos.emojis} variant="discreto" size="default" />
            </span>
          }
          inputProps={{ [catalogoCompartido.controles.atributo_accesible]: textos.mensaje }}
        />
      </div>
      {hayTexto ? (
        <BotonIcono icono="enviar" type="submit" aria-label={etiquetaEnviar} variant="primario" size="default" />
      ) : (
        <BotonesAdjuntar onAdjuntar={onAdjuntar} onAviso={setAvisos} onGrabar={grabacion.iniciar} />
      )}
    </>
  )

  return (
    <form onSubmit={enviar} className={clases.composicion}>
      {aviso !== String() && <p role="alert" className={clases.grabacion_error}>{aviso}</p>}
      <ControlesAudioComposicion grabacion={grabacion} onAdjuntar={onAdjuntar} />
      {!grabacion.grabando && !grabacion.borrador && campo}
    </form>
  )
}
