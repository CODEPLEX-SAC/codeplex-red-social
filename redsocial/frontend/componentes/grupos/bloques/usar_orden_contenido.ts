import { useState } from 'react'
import type { OrdenContenido } from '@/tipos/grupos/contrato_gestion_grupos'

export function usarOrdenContenido() {
  const [orden, setOrden] = useState<OrdenContenido>('recientes')

  return { orden, cambiarOrden: (valor: string) => setOrden(valor as OrdenContenido) }
}
