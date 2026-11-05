import { BotonIcono } from './boton_icono'
import { OndaAudio } from './onda_audio'
import { duracionLegible, ventanaDeNiveles } from './logica_audio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { AudioGrabandoProps } from '@/tipos/compartido/contrato_audio'

const clases = catalogoCompartido.audio.clases

export function AudioGrabando({ segundos, picos, etiquetas, onCancelar, onDetener, onEnviar }: AudioGrabandoProps) {
  const ventana = ventanaDeNiveles(picos)
  return (
    <div className={clases.grabando} role="status" aria-label={etiquetas.grabando}>
      <BotonIcono icono="cerrar" type="button" aria-label={etiquetas.cancelar} variant="discreto" size="default" className={clases.boton_suave} onClick={onCancelar} />
      <span className={`${clases.punto} ${catalogoCompartido.audio.animacion.pulso}`} />
      <span className={clases.tiempo}>{duracionLegible(segundos)}</span>
      <OndaAudio picos={ventana} progreso={ventana.length / catalogoCompartido.audio.barras} tono="peligro" cursor={false} />
      <BotonIcono icono="detener" type="button" aria-label={etiquetas.detener} variant="discreto" size="default" className={clases.boton_detener} onClick={onDetener} />
      <BotonIcono icono="enviar" type="button" aria-label={etiquetas.enviar} variant="primario" size="default" onClick={onEnviar} />
    </div>
  )
}
