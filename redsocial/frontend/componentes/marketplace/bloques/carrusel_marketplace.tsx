import { useState } from 'react'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import type { CarruselMarketplaceProps } from '@/tipos/marketplace/modelo_marketplace'

const textos = catalogoMarketplace.carrusel
const clases = textos.clases

export function CarruselMarketplace({ imagenes }: CarruselMarketplaceProps) {
  const [indice, setIndice] = useState(0)
  const total = imagenes.length
  if (total === 0) return null

  return (
    <section aria-roledescription="carousel" aria-label={textos.etiqueta} className={clases.contenedor}>
      <img src={imagenes[indice]} alt={textos.imagen.replace(':n', String(indice + 1)).replace(':total', String(total))} className={clases.imagen} />
      {total > 1 && (
        <>
          <BotonIcono icono="flecha-izquierda" type="button" aria-label={textos.anterior} variant="flotante" size="md" className={clases.anterior} onClick={() => setIndice((actual) => (actual - 1 + total) % total)} />
          <BotonIcono icono="flecha-derecha" type="button" aria-label={textos.siguiente} variant="flotante" size="md" className={clases.siguiente} onClick={() => setIndice((actual) => (actual + 1) % total)} />
          <div role="group" aria-label={textos.indicadores} className={clases.indicadores}>
            {imagenes.map((url, posicion) => (
              <button key={url} type="button" aria-label={textos.indicador.replace(':n', String(posicion + 1))} aria-current={posicion === indice} className={posicion === indice ? clases.indicador_activo : clases.indicador} onClick={() => setIndice(posicion)} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
