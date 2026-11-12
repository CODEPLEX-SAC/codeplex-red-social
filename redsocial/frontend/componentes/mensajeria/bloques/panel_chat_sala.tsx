import { useState } from 'react'
import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoTexto } from '../../compartido/interfaz/campo_texto'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { PanelChatSalaProps } from '@/tipos/mensajeria/contrato_sala_llamada'

const textos = catalogoMensajeria.videollamada.textos
const chat = textos.chat
const clases = catalogoMensajeria.videollamada.clases.sala

export function PanelChatSala({ onCerrar }: PanelChatSalaProps) {
  const [mensajes, setMensajes] = useState<string[]>([])
  const [texto, setTexto] = useState(String())

  function enviar(evento: React.FormEvent) {
    evento.preventDefault()
    const limpio = texto.trim()
    if (limpio === String()) return
    setMensajes((actual) => [...actual, limpio])
    setTexto(String())
  }

  return (
    <aside aria-label={chat.titulo} className={clases.panel}>
      <div className={clases.panel_cabecera}>
        <h2 className={clases.panel_titulo}>{chat.titulo}</h2>
        <BotonIcono icono="cerrar" type="button" aria-label={chat.cerrar} variant="discreto" size="default" onClick={onCerrar} />
      </div>
      <p className={clases.chat_nota}>{chat.nota}</p>
      <ul aria-label={chat.titulo} className={clases.chat_mensajes}>
        {mensajes.length === 0 && <li className={clases.panel_vacio}>{chat.vacio}</li>}
        {mensajes.map((mensaje, indice) => (
          <li key={`${indice}-${mensaje}`} className={clases.chat_mensaje}>
            <span className={clases.chat_autor}>{textos.tu}</span>
            <span className={clases.chat_texto}>{mensaje}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={enviar} className={clases.chat_pie}>
        <CampoTexto valor={texto} alCambiar={setTexto} marcador={chat.placeholder} inputProps={{ 'aria-label': chat.etiqueta_campo }} anchoCompleto />
        <Boton type="submit" variant="primario" size="default" disabled={texto.trim() === String()}>
          {chat.enviar}
        </Boton>
      </form>
    </aside>
  )
}
