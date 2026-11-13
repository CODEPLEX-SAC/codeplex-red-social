import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { TarjetaMasParticipantesProps } from '@/tipos/mensajeria/contrato_disposicion_movil'

const clases = catalogoMensajeria.videollamada.clases.sala

export function TarjetaMasParticipantes({ muestra, restantes, alAbrir }: TarjetaMasParticipantesProps) {
  return (
    <button type="button" aria-haspopup="dialog" className={clases.movil_mas} onClick={alAbrir}>
      <div className={clases.movil_mas_avatares}>
        {muestra.map((participante) => (
          <img key={participante.id} src={participante.fotografia} alt={participante.nombre} className={clases.movil_mas_avatar} />
        ))}
      </div>
      <span className={clases.movil_mas_texto}>{catalogoMensajeria.videollamada.textos.sala.mas_participantes.replace(':n', String(restantes))}</span>
    </button>
  )
}
