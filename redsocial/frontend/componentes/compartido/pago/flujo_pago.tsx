import { useMemo } from 'react'
import { ContenidoFlujoPago } from './contenido_flujo_pago'
import { ContextoTextosPago } from './contexto_textos_pago'
import { combinarTextos } from './logica_textos_pago'
import type { FlujoPagoProps } from '@/tipos/compartido/contrato_flujo_pago'

export function FlujoPago(props: FlujoPagoProps) {
  const textos = useMemo(() => combinarTextos(props.configuracion.textos), [props.configuracion.textos])

  return (
    <ContextoTextosPago.Provider value={textos}>
      <ContenidoFlujoPago {...props} />
    </ContextoTextosPago.Provider>
  )
}
