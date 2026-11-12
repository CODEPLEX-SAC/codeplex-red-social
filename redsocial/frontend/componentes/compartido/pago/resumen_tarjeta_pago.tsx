import { BotonIcono } from '../interfaz/boton_icono'
import { Icono } from '../icono'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { detalleTarjeta, tituloTarjeta } from './logica_tarjeta_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { TarjetaPago } from '@/tipos/compartido/contrato_flujo_pago'
import { EtiquetasTarjetaPago } from './etiquetas_tarjeta_pago'

const clases = catalogoCompartido.flujo_pago.clases

export function ResumenTarjetaPago({ tarjeta, alEditar, deshabilitado }: { tarjeta: TarjetaPago; alEditar: () => void; deshabilitado: boolean }) {
  const textos = usarTextosPago()
  return (
    <div className={clases.tarjeta_guardada}>
      <Icono name="tarjeta-pago" className={clases.icono} />
      <div className={clases.texto}>
        <div className={clases.linea_principal}>
          <span>{tituloTarjeta(tarjeta, textos)}</span>
          <EtiquetasTarjetaPago tarjeta={tarjeta} />
        </div>
        <div className={clases.linea_secundaria}>{detalleTarjeta(tarjeta, textos)}</div>
      </div>
      <BotonIcono icono="editar-oficial" type="button" variant="sutil" aria-label={textos.metodo_guardado.editar_etiqueta} disabled={deshabilitado} onClick={alEditar} />
    </div>
  )
}
