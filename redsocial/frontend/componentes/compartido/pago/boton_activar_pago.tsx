import { Boton } from '../interfaz/boton'
import { IndicadorCarga } from '../interfaz/indicador_carga'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { usarTextosPago } from './usar_textos_pago'
import type { usarFlujoPago } from './usar_flujo_pago'

const clases = catalogoCompartido.flujo_pago.clases

export function BotonActivarPago({ estado, accion }: { estado: ReturnType<typeof usarFlujoPago>; accion: string }) {
  const textos = usarTextosPago()
  return (
    <>
      <Boton type="button" variant="primario" size="cta" className={clases.boton_ancho} disabled={!estado.puedeActivar} aria-busy={estado.procesando} onClick={estado.activar}>
        {estado.procesando ? <IndicadorCarga tamano="xs" color="blanco" etiqueta={textos.resumen.procesando} /> : accion}
      </Boton>
      {estado.facturacion.modo === 'edicion' && <p className={clases.ayuda_accion}>{textos.perfiles.edicion_pendiente}</p>}
    </>
  )
}
