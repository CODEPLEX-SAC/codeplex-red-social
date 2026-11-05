import { BotonIcono } from './boton_icono'
import { OndaAudio } from './onda_audio'
import { duracionLegible, picosPorDefecto } from './logica_audio'
import { usarReproductorAudio } from './usar_reproductor_audio'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { ReproductorAudioProps } from '@/tipos/compartido/contrato_audio'

const audio = catalogoCompartido.audio
const clases = audio.clases

export function ReproductorAudio({ url, duracion = 0, picos, semilla, propio, etiquetas }: ReproductorAudioProps) {
  const reproductor = usarReproductorAudio(duracion)
  const sinArchivo = url === undefined
  const progreso = reproductor.duracion > 0 ? reproductor.posicion / reproductor.duracion : 0
  const envoltura = propio === undefined ? clases.reproductor : `${clases.reproductor} ${clases.reproductor_enviado} ${propio ? clases.reproductor_propio : clases.reproductor_ajeno}`
  return (
    <div className={envoltura}>
      <audio ref={reproductor.audio} src={url} preload="metadata" {...reproductor.eventos} />
      <BotonIcono
        icono={reproductor.sonando ? 'pausa' : 'reproducir'}
        type="button"
        aria-label={reproductor.sonando ? etiquetas.pausar : etiquetas.reproducir}
        variant="primario"
        size="default"
        disabled={sinArchivo}
        onClick={reproductor.alternar}
        className={clases.boton_reproducir}
      />
      <span className={clases.onda_contenedor}>
        <OndaAudio picos={picos ?? picosPorDefecto(semilla)} progreso={progreso} tono="primario" />
        <input
          type={audio.tipo_barra}
          min={0}
          max={reproductor.duracion || 1}
          step="any"
          value={reproductor.posicion}
          aria-label={etiquetas.posicion}
          aria-valuetext={etiquetas.progreso.replace(':actual', duracionLegible(reproductor.posicion)).replace(':total', duracionLegible(reproductor.duracion))}
          disabled={sinArchivo}
          onChange={reproductor.buscar}
          className={clases.control_barra}
        />
      </span>
      <span className={clases.tiempo_reproductor}>{duracionLegible(reproductor.sonando || reproductor.posicion > 0 ? reproductor.posicion : reproductor.duracion)}</span>
    </div>
  )
}
