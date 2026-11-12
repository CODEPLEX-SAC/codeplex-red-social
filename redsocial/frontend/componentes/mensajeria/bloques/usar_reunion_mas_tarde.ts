import { useState } from 'react'
import type { EstadoCopiaEnlace } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { ParametrosReunionMasTarde } from '@/tipos/mensajeria/contrato_reunion_mas_tarde'

export function usarReunionMasTarde({ crearEnlace, copiarEnlace }: ParametrosReunionMasTarde) {
  const [enlace, setEnlace] = useState<string | null>(null)
  const [copia, setCopia] = useState<EstadoCopiaEnlace>('ninguna')

  function abrir() {
    setCopia('ninguna')
    setEnlace(crearEnlace())
  }

  async function copiar() {
    if (enlace === null) return
    const resultado = await copiarEnlace(enlace)
    setCopia(resultado.exito ? 'copiado' : 'error')
  }

  return { enlace, copia, abrir, cerrar: () => setEnlace(null), copiar }
}
