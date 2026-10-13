import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import { crearFiltrosAvanzados } from './logica_listado_empresas'
import type { CambioSelectorEmpresas, FiltrosAvanzadosEmpresas, ListadoEmpresas } from '@/tipos/empresas/contrato_listado_empresas'

export function usarFiltrosAvanzadosEmpresas(listado: ListadoEmpresas, alCerrar: () => void) {
  const [borrador, setBorrador] = useState<FiltrosAvanzadosEmpresas>({ rubro: listado.rubro, plan: listado.plan, desde: listado.desde, hasta: listado.hasta })

  function cambiarRubro(evento: CambioSelectorEmpresas) {
    setBorrador((actual) => ({ ...actual, rubro: String(evento.target.value) }))
  }

  function cambiarPlan(evento: CambioSelectorEmpresas) {
    setBorrador((actual) => ({ ...actual, plan: String(evento.target.value) }))
  }

  function cambiarDesde(valor: Dayjs | null) {
    setBorrador((actual) => ({ ...actual, desde: valor }))
  }

  function cambiarHasta(valor: Dayjs | null) {
    setBorrador((actual) => ({ ...actual, hasta: valor }))
  }

  function limpiar() {
    setBorrador(crearFiltrosAvanzados())
    listado.limpiarAvanzados()
  }

  function aplicar() {
    listado.aplicarAvanzados(borrador)
    alCerrar()
  }

  return { borrador, cambiarRubro, cambiarPlan, cambiarDesde, cambiarHasta, limpiar, aplicar }
}
