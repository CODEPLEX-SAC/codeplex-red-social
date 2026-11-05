import { BotonIcono } from '../interfaz/boton_icono'
import { Icono } from '../icono'
import { Insignia } from '../interfaz/insignia'
import { CLASES_FLUJO_PAGO as clases } from './clases_flujo_pago'
import { detalleTarjeta, tarjetaVencida, tituloTarjeta } from './logica_tarjeta_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { TarjetaPago } from '@/tipos/compartido/contrato_flujo_pago'

export function EtiquetasTarjetaPago({ tarjeta }: { tarjeta: TarjetaPago }) {
  const textos = usarTextosPago().metodo_guardado
  return (
    <>
      {tarjeta.predeterminada && <Insignia variant="status" className={clases.etiqueta_predeterminada}>{textos.predeterminada}</Insignia>}
      {tarjetaVencida(tarjeta.vencimiento) && <Insignia variant="status" className={clases.etiqueta_vencida}>{textos.vencida}</Insignia>}
    </>
  )
}

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
