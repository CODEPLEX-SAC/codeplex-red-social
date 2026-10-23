import type { ReactNode } from 'react'
import catalogoMarketplace from '../../../catalogos/capacidades/redsocial/marketplace.json'
import { Acordeon } from '../../compartido/interfaz/acordeon'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import { PanelPagoBilletera } from './panel_pago_billetera'
import { SeccionPagoTarjeta } from './seccion_pago_tarjeta'
import type { usarPagoPlanes } from './usar_pago_planes'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const textos = catalogoMarketplace.pago.metodos
const clases = catalogoMarketplace.pago.clases

export function SeccionPagoMetodo({ estado }: { estado: ReturnType<typeof usarPagoPlanes> }) {
  const contenidos: Record<string, ReactNode> = {
    tarjeta: <SeccionPagoTarjeta estado={estado} />,
    billetera: <PanelPagoBilletera estado={estado} />,
  }
  const elementos = textos.opciones.map((opcion) => ({
    id: opcion.id,
    titulo: opcion.titulo,
    icono: opcion.icono as IconName,
    contenido: contenidos[opcion.id],
  }))

  function alCambiar(abiertos: string[]) {
    const ultimo = abiertos[abiertos.length - 1]
    if (ultimo === 'tarjeta' || ultimo === 'billetera') estado.elegirMetodo(ultimo)
  }

  return (
    <section className={clases.tarjeta}>
      <EncabezadoPasoPago numero={1} titulo={textos.titulo} detalle={estado.mejora ? catalogoMarketplace.pago.mejora.metodo_detalle : textos.detalle} />
      <Acordeon elementos={elementos} idsAbiertosInicialmente={textos.abiertos_inicialmente} alCambiar={alCambiar} />
    </section>
  )
}
