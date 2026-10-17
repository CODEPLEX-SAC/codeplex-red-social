import { useState } from 'react'
import type { FiltrosAvanzadosColaboradores } from '@/tipos/colaboradores/contrato_gestion_colaboradores'
import { crearFiltrosAvanzadosColaboradores } from './logica_filtros_avanzados_colaboradores'

export function usarFiltrosAvanzados(aplicados: FiltrosAvanzadosColaboradores) {
  const [valores, setValores] = useState(aplicados)

  const asignar = Object.fromEntries(
    Object.keys(valores).map((campo) => [campo, (valor: unknown) => setValores((actual) => ({ ...actual, [campo]: valor }))]),
  ) as Record<keyof FiltrosAvanzadosColaboradores, (valor: unknown) => void>

  function cambiarUltimoAcceso(evento: { target: { value: unknown } }) {
    asignar.ultimoAcceso(String(evento.target.value))
  }
  function cambiarAccesoVigente(_: unknown, marcado: boolean) {
    asignar.accesoVigente(marcado)
  }
  function cambiarAccesoVencido(_: unknown, marcado: boolean) {
    asignar.accesoVencido(marcado)
  }
  function cambiarAplicaciones(evento: { target: { value: unknown } }) {
    asignar.aplicaciones(String(evento.target.value))
  }
  function cambiarCuentaCreada(_: unknown, marcado: boolean) {
    asignar.cuentaCreada(marcado)
  }
  function cambiarCuentaInvitada(_: unknown, marcado: boolean) {
    asignar.cuentaInvitada(marcado)
  }
  function cambiarMetodoInvitacion(evento: { target: { value: unknown } }) {
    asignar.metodoInvitacion(String(evento.target.value))
  }

  return {
    valores,
    asignar,
    limpiar: () => setValores(crearFiltrosAvanzadosColaboradores()),
    cambiarUltimoAcceso,
    cambiarAccesoVigente,
    cambiarAccesoVencido,
    cambiarAplicaciones,
    cambiarCuentaCreada,
    cambiarCuentaInvitada,
    cambiarMetodoInvitacion,
  }
}
