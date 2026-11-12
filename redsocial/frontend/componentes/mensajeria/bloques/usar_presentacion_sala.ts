import { useEffect, useRef, useState } from 'react'
import { liberarAlDesmontar, panelTrasPresentar } from './logica_estado_sala'
import type { MotivoCaptura, PresentacionSala } from '@/tipos/mensajeria/contrato_integracion_llamada'
import type { ParametrosPresentacionSala, PresentacionEnSala } from '@/tipos/mensajeria/contrato_presentacion_sala'

export function usarPresentacionSala({ puerto, simulable, local, setPanel }: ParametrosPresentacionSala): PresentacionEnSala {
  const [presentacion, setPresentacion] = useState<PresentacionSala | null>(null)
  const [errorPresentacion, setErrorPresentacion] = useState<MotivoCaptura | null>(null)
  const liberar = useRef<() => void>(() => undefined)

  useEffect(() => liberarAlDesmontar(liberar, puerto), [puerto])

  function terminarPresentacion() {
    liberar.current()
    liberar.current = () => undefined
    puerto.detenerPantalla()
    setPresentacion(null)
  }

  function vincular(flujo: MediaStream) {
    const pistas = flujo.getVideoTracks()
    pistas.forEach((pista) => pista.addEventListener('ended', terminarPresentacion))
    liberar.current = () => pistas.forEach((pista) => pista.removeEventListener('ended', terminarPresentacion))
  }

  async function iniciarPresentacion() {
    if (local === undefined) return
    setErrorPresentacion(null)
    const resultado = await puerto.compartirPantalla()
    if (resultado.exito) vincular(resultado.flujo)
    const simulada = !resultado.exito && resultado.motivo === 'no_soportado' && simulable
    if (!resultado.exito && !simulada) {
      setErrorPresentacion(resultado.motivo)
      return
    }
    setPresentacion({ idParticipante: local.id, flujo: resultado.exito ? resultado.flujo : null, simulada })
    setPanel(panelTrasPresentar())
  }

  return { presentacion, errorPresentacion, iniciarPresentacion, detenerPresentacion: terminarPresentacion, descartarError: () => setErrorPresentacion(null) }
}
