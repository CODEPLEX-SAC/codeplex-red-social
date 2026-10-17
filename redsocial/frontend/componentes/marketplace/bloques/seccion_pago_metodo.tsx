import type { ReactNode } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Acordeon } from '../../compartido/interfaz/acordeon'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import { PanelPagoBilletera } from './panel_pago_billetera'
import { PanelPagoTransferencia } from './panel_pago_transferencia'
import { SeccionPagoTarjeta } from './seccion_pago_tarjeta'
import type { usarPagoPlanes } from './usar_pago_planes'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ConfiguracionPago } from '@/tipos/marketplace/modelo_pago'

const textos = catalogoMarketplace.pago.metodos
const clases = catalogoMarketplace.pago.clases

export function SeccionPagoMetodo({ estado, pago, cantidadGuardadas }: { estado: ReturnType<typeof usarPagoPlanes>; pago: ConfiguracionPago; cantidadGuardadas: number }) {
  const contenidos: Record<string, ReactNode> = {
    tarjeta: <SeccionPagoTarjeta estado={estado} cantidadGuardadas={cantidadGuardadas} />,
    transferencia: <PanelPagoTransferencia datos={pago.transferencia} total={estado.total} />,
    billetera: <PanelPagoBilletera estado={estado} />,
  }
  const elementos = textos.opciones.map((opcion) => ({
    id: opcion.id,
    titulo: opcion.titulo,
    icono: opcion.icono as IconName,
    contenido: contenidos[opcion.id],
  }))

  return (
    <section className={clases.tarjeta}>
      <EncabezadoPasoPago numero={1} titulo={textos.titulo} detalle={textos.detalle} />
      <Acordeon elementos={elementos} />
    </section>
  )
}
