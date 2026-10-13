import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Boton } from '../../compartido/interfaz/boton'
import { usarCarrusel } from '../../compartido/usar_carrusel'

const clases = catalogoMarketplace.planes.clases

export function RespuestasRapidasPlanes({ preguntas, alPreguntar }: { preguntas: string[]; alPreguntar: (texto: string) => void }) {
  const { pistaRef } = usarCarrusel()

  return (
    <div ref={pistaRef} role="group" aria-label={catalogoMarketplace.planes.asistente.respuestas_rapidas} className={clases.respuestas_rapidas}>
      {preguntas.map((pregunta) => (
        <Boton key={pregunta} type="button" variant="filtro" size="filtro" className="shrink-0" onClick={() => alPreguntar(pregunta)}>{pregunta}</Boton>
      ))}
    </div>
  )
}
