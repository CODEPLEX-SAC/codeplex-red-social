import { Boton } from '../../compartido/interfaz/boton'
import { porcentajeDeVotos, totalVotos } from './logica_feed_inicio'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { VotacionEncuestaProps } from '@/tipos/inicio/contrato_feed_inicio'

const textos = catalogoInicio.encuesta
const clases = textos.clases

export function BloqueVotacionEncuesta({ opciones, miVoto, onVotar }: VotacionEncuestaProps) {
  const total = totalVotos(opciones)
  const yaVoto = miVoto !== null

  return (
    <>
      <ul aria-label={textos.etiqueta} className={clases.lista}>
        {opciones.map((opcion) => {
          const porcentaje = porcentajeDeVotos(opcion.votos, total, textos.porcentaje_maximo)
          const etiqueta = textos.etiqueta_opcion.replace(':opcion', opcion.texto).replace(':porcentaje', String(porcentaje))
          return (
            <li key={opcion.id}>
              <Boton type="button" variant="fantasma" size="default" aria-pressed={miVoto === opcion.id} aria-label={yaVoto ? etiqueta : opcion.texto} onClick={() => onVotar(opcion.id)} className={`${clases.opcion} ${miVoto === opcion.id ? clases.opcion_elegida : ''}`}>
                <span className={clases.fila}>
                  <span className={clases.texto}>{opcion.texto}</span>
                  {yaVoto && <span className={clases.porcentaje}>{porcentaje}%</span>}
                </span>
                {yaVoto && <progress value={porcentaje} max={textos.porcentaje_maximo} aria-hidden="true" className={clases.barra} />}
              </Boton>
            </li>
          )
        })}
      </ul>
      {yaVoto && <p className={clases.total}>{textos.total.replace(':total', String(total)).replace(':votos', total === 1 ? textos.votos_singular : textos.votos_plural)}</p>}
    </>
  )
}
