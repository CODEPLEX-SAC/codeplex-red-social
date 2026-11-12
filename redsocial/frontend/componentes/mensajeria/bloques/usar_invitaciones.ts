import { useState } from 'react'
import type { EstadoCopiaEnlace, EstadoInvitacion, PuertoSala } from '@/tipos/mensajeria/contrato_integracion_llamada'

export function usarInvitaciones(puerto: PuertoSala) {
  const [estados, setEstados] = useState<Record<string, EstadoInvitacion>>({})
  const [copia, setCopia] = useState<EstadoCopiaEnlace>('ninguna')

  async function invitar(idContacto: string) {
    const resultado = await puerto.invitar(idContacto)
    const estado: EstadoInvitacion = resultado.exito ? 'enviada' : 'preparada'
    setEstados((actual) => ({ ...actual, [idContacto]: estado }))
  }

  async function copiarEnlace(enlace: string) {
    const resultado = await puerto.copiarEnlace(enlace)
    setCopia(resultado.exito ? 'copiado' : 'error')
  }

  return { estados, copia, invitar, copiarEnlace }
}
