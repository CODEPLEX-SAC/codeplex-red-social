import type { ReactNode } from 'react'
import { Acordeon } from '../interfaz/acordeon'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import { EncabezadoPasoPago } from './encabezado_paso_pago'
import { PanelBilleteraPago } from './panel_billetera_pago'
import { SeccionTarjetaPago } from './seccion_tarjeta_pago'
import { usarTextosPago } from './usar_textos_pago'
import type { usarFlujoPago } from './usar_flujo_pago'
import type { ConfiguracionFlujoPago, ControlTarjetasPago, MetodoPagoId } from '@/tipos/compartido/contrato_flujo_pago'
import type { IconName } from '@/tipos/compartido/contrato_icono'

const clases = catalogoCompartido.flujo_pago.clases

export function SeccionMetodoPago({ estado, tarjetas, configuracion, total, numero }: { estado: ReturnType<typeof usarFlujoPago>; tarjetas: ControlTarjetasPago; configuracion: ConfiguracionFlujoPago; total: string; numero: number }) {
  const textos = usarTextosPago().metodos
  const contenidos: Record<MetodoPagoId, ReactNode> = {
    tarjeta: <SeccionTarjetaPago estado={estado} tarjetas={tarjetas} avisoRenovacion={configuracion.avisoRenovacion} demostracion={configuracion.demostracion?.tarjetas} />,
    billetera: <PanelBilleteraPago billeteras={configuracion.billeteras} elegida={estado.billetera} total={total} alElegir={estado.elegirBilletera} />,
  }
  const habilitados = new Set<string>(configuracion.metodos)
  const elementos = textos.opciones
    .filter((opcion) => habilitados.has(opcion.id))
    .map((opcion) => ({ id: opcion.id, titulo: opcion.titulo, icono: opcion.icono as IconName, contenido: contenidos[opcion.id as MetodoPagoId] }))

  function alCambiar(abiertos: string[]) {
    const ultimo = abiertos[abiertos.length - 1] as MetodoPagoId | undefined
    if (ultimo && configuracion.metodos.includes(ultimo)) estado.elegirMetodo(ultimo)
  }

  return (
    <section className={clases.seccion}>
      <EncabezadoPasoPago numero={numero} titulo={textos.titulo} detalle={textos.detalle} />
      <Acordeon elementos={elementos} idsAbiertosInicialmente={[estado.metodo]} alCambiar={alCambiar} />
    </section>
  )
}
