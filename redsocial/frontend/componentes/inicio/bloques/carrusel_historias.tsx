import { Boton } from '../../compartido/interfaz/boton'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { ventanaCarrusel } from './logica_carrusel_historias'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { CarruselHistoriasProps } from '@/tipos/inicio/contrato_carrusel_historias'

const configuracion = catalogoInicio.historias.carrusel

export function CarruselHistorias({ historias, indice, navegacion, etiquetas, onCambiar, renderTarjeta }: CarruselHistoriasProps) {
  if (historias.length === 0) return null

  const ventana = ventanaCarrusel(historias.length, indice, configuracion.radio)
  const esExtremo = (distancia: number) => Math.abs(distancia) === configuracion.radio

  return (
    <div className={configuracion.escenario}>
      {ventana.map(({ indice: posicion, distancia }) => {
        const identificador = historias[posicion].id
        const clases = `${configuracion.tarjeta} ${configuracion.posiciones[distancia + configuracion.radio]} ${esExtremo(distancia) ? configuracion.oculta : String()}`
        if (distancia === 0) {
          return (
            <div key={identificador} data-posicion={distancia} className={clases}>
              <div className={configuracion.contenido}>{renderTarjeta(posicion, distancia)}</div>
            </div>
          )
        }
        if (esExtremo(distancia)) return <div key={identificador} data-posicion={distancia} aria-hidden="true" className={clases} />
        const ir = () => onCambiar(posicion)
        const etiqueta = etiquetas.vecina(posicion, distancia)
        return (
          <div key={identificador} data-posicion={distancia} className={clases}>
            <Boton type="button" variant="fantasma" size="enlace" aria-label={etiqueta} title={etiqueta} onClick={ir} className={configuracion.vecina_boton}>
              {renderTarjeta(posicion, distancia)}
            </Boton>
          </div>
        )
      })}
      <div className={configuracion.guia}>
        <BotonIcono icono="flecha-izquierda" type="button" aria-label={etiquetas.anterior} disabled={!navegacion.hayAnterior} onClick={navegacion.onAnterior} variant="flotante" size="default" className={configuracion.flecha_anterior} />
        <BotonIcono icono="flecha-derecha" type="button" aria-label={etiquetas.siguiente} disabled={!navegacion.haySiguiente} onClick={navegacion.onSiguiente} variant="flotante" size="default" className={configuracion.flecha_siguiente} />
      </div>
    </div>
  )
}
