import { BotonIcono } from './boton_icono'
import { ReproductorAudio } from './reproductor_audio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { AudioVistaPreviaProps } from '@/tipos/compartido/contrato_audio'

const clases = catalogoCompartido.audio.clases

export function AudioVistaPrevia({ url, duracion, picos, semilla, etiquetas, onDescartar, onEnviar }: AudioVistaPreviaProps) {
  return (
    <div className={clases.vista_previa} role="group" aria-label={etiquetas.grupo}>
      <BotonIcono icono="eliminar" type="button" aria-label={etiquetas.descartar} variant="discreto" size="default" className={clases.boton_suave} onClick={onDescartar} />
      <ReproductorAudio url={url} duracion={duracion} picos={picos} semilla={semilla} etiquetas={etiquetas} />
      <span className={clases.separador} />
      <BotonIcono icono="enviar" type="button" aria-label={etiquetas.enviar} variant="primario" size="default" onClick={onEnviar} />
    </div>
  )
}
