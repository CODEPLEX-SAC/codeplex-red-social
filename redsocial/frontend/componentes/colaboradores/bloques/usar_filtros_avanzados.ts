import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'

const textos = catalogoColaboradores.panel_filtros_avanzados

const VALORES_VACIOS = {
  fechaInicio: null as Dayjs | null,
  fechaFin: null as Dayjs | null,
  invitacionDesde: null as Dayjs | null,
  invitacionHasta: null as Dayjs | null,
  ultimoAcceso: textos.ultimo_acceso.opciones[0],
  accesoVigente: false,
  accesoVencido: false,
  aplicaciones: textos.aplicaciones_asignadas.opciones[0],
  cuentaCreada: false,
  cuentaInvitada: false,
  metodoInvitacion: textos.metodo_invitacion.opciones[0],
}

export function usarFiltrosAvanzados() {
  const [valores, setValores] = useState(VALORES_VACIOS)

  const asignar = Object.fromEntries(
    Object.keys(VALORES_VACIOS).map((campo) => [campo, (valor: unknown) => setValores((actual) => ({ ...actual, [campo]: valor }))]),
  ) as Record<keyof typeof VALORES_VACIOS, (valor: unknown) => void>

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
    limpiar: () => setValores(VALORES_VACIOS),
    cambiarUltimoAcceso,
    cambiarAccesoVigente,
    cambiarAccesoVencido,
    cambiarAplicaciones,
    cambiarCuentaCreada,
    cambiarCuentaInvitada,
    cambiarMetodoInvitacion,
  }
}
