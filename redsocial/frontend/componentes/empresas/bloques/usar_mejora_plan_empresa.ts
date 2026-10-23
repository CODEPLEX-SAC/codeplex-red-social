import { useState } from 'react'
import { datosDeMejora } from './logica_mejora_plan'
import type { ModalMejoraPlanProps } from '@/tipos/empresas/contrato_mejora_plan'
import type { PlanAplicacion } from '@/tipos/marketplace/modelo_planes'

export function usarMejoraPlanEmpresa({ suscripcion, capacidad, configuracion, alContratar }: ModalMejoraPlanProps) {
  const [elegido, setElegido] = useState<string | null>(null)
  const datos = datosDeMejora(configuracion, suscripcion, capacidad)
  const opcion = datos.opciones.find((candidata) => candidata.plan.id === elegido && candidata.motivoNoDisponible === null)

  function elegir(plan: PlanAplicacion) {
    setElegido(plan.id)
  }

  function volver() {
    setElegido(null)
  }

  function continuar() {
    if (!opcion) return
    alContratar({ aplicacion: suscripcion.aplicacion, tipo: suscripcion.tipo, plan: opcion.plan.id, periodo: suscripcion.periodo })
  }

  return { datos, opcion, elegir, volver, continuar }
}
