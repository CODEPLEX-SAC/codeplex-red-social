import type { ReactNode } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { usarCarrusel } from '../../compartido/usar_carrusel'

const clases = catalogoMarketplace.destacados_fila

export function FilaDestacados({ children }: { children: ReactNode }) {
  const { pistaRef } = usarCarrusel()

  function desplazar(direccion: 1 | -1) {
    const pista = pistaRef.current
    if (pista) pista.scrollBy({ left: direccion * pista.clientWidth * clases.avance, behavior: 'smooth' })
  }

  return (
    <div className={clases.contenedor}>
      <BotonIcono icono="flecha-izquierda" type="button" aria-label={catalogoMarketplace.botones.anterior} variant="flotante" size="default" className={clases.flecha_izquierda} onClick={() => desplazar(-1)} />
      <div ref={pistaRef} className={clases.pista}>
        {children}
      </div>
      <BotonIcono icono="flecha-derecha" type="button" aria-label={catalogoMarketplace.botones.siguiente} variant="flotante" size="default" className={clases.flecha_derecha} onClick={() => desplazar(1)} />
    </div>
  )
}
