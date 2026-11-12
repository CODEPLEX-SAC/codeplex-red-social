import { useState } from 'react'
import type { OrdenTusGrupos } from '@/tipos/grupos/contrato_tus_grupos'

export function usarTusGrupos() {
  const [texto, setTexto] = useState(String())
  const [orden, setOrden] = useState<OrdenTusGrupos>('recientes')
  const [pagina, setPagina] = useState(1)

  function cambiarTexto(valor: string) {
    setTexto(valor)
    setPagina(1)
  }

  function cambiarOrden(valor: string) {
    setOrden(valor as OrdenTusGrupos)
    setPagina(1)
  }

  function alternarOrden() {
    setOrden((actual) => (actual === 'recientes' ? 'antiguos' : 'recientes'))
    setPagina(1)
  }

  return { texto, orden, pagina, cambiarTexto, cambiarOrden, alternarOrden, cambiarPagina: setPagina }
}
