import { useContext } from 'react'
import { ContextoAccesoCarrito } from '../carrito/contexto_acceso_carrito'
import { BotonIcono } from '../interfaz/boton_icono'
import { Insignia } from '../interfaz/insignia'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'

const clases = catalogoCompartido.barra_superior.carrito

export function BotonCarritoTopbar() {
  const acceso = useContext(ContextoAccesoCarrito)
  if (!acceso) return null

  return (
    <div className={clases.contenedor}>
      <BotonIcono icono="carrito" type="button" aria-label={acceso.etiqueta} variant="sutil" size="default" onClick={acceso.abrir} />
      {acceso.cantidad > 0 && (
        <span className={clases.insignia}>
          <Insignia variant="counter">{acceso.cantidad}</Insignia>
        </span>
      )}
    </div>
  )
}
