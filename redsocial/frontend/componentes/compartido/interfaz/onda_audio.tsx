import { barrasDeOnda } from './logica_audio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { OndaAudioProps } from '@/tipos/compartido/contrato_audio'

const clases = catalogoCompartido.audio.clases

export function OndaAudio({ picos, progreso, tono, cursor = true }: OndaAudioProps) {
  return (
    <span aria-hidden="true" className={clases.onda}>
      {barrasDeOnda(picos, progreso, cursor).map((barra) => (
        <span key={barra.id} className={clases.barra_envoltura}>
          {barra.cursor && <span className={clases.cursor[tono]} />}
          <span className={`${clases.barra} ${barra.altura} ${barra.hecha ? clases.barra_hecha[tono] : clases.barra_pendiente}`} />
        </span>
      ))}
    </span>
  )
}
