import { Boton } from '../../compartido/interfaz/boton'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { PanelEmojisComentarioProps } from '@/tipos/inicio/contrato_interacciones_publicacion'

const textos = catalogoInicio.publicacion.comentarios

function BotonEmoji({ emoji, onElegir }: { emoji: string; onElegir: (emoji: string) => void }) {
  const elegir = () => onElegir(emoji)

  return (
    <li>
      <Boton type="button" variant="fantasma" size="mini" onClick={elegir} aria-label={emoji} className="w-full">
        {emoji}
      </Boton>
    </li>
  )
}

export function PanelEmojisComentario({ onElegir }: PanelEmojisComentarioProps) {
  return (
    <ul aria-label={textos.etiqueta_emojis} className={textos.clases.panel_emojis}>
      {textos.emojis.map((emoji) => (
        <BotonEmoji key={emoji} emoji={emoji} onElegir={onElegir} />
      ))}
    </ul>
  )
}
