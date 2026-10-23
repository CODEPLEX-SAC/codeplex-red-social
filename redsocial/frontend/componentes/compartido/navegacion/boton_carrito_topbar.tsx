import { useContext } from 'react'
import { ContextoAccesoCarrito } from '../carrito/contexto_acceso_carrito'
import { BotonIcono } from '../interfaz/boton_icono'
import { Insignia } from '../interfaz/insignia'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { BotonIconoProps } from '@/tipos/compartido/contrato_boton_icono'

const carrito = catalogoCompartido.barra_superior.carrito

export function BotonCarritoTopbar() {
  const acceso = useContext(ContextoAccesoCarrito)
  if (!acceso) return null

  return (
    <Insignia variant="superpuesta" contenido={acceso.cantidad}>
      <BotonIcono icono={carrito.icono as BotonIconoProps['icono']} type="button" aria-label={acceso.etiqueta} variant={carrito.variante as BotonIconoProps['variant']} size={carrito.tamano as BotonIconoProps['size']} onClick={acceso.abrir} />
    </Insignia>
  )
}
