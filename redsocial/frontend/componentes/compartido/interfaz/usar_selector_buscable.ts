import { useEffect, useMemo, useState } from 'react'
import type { FuenteOpcionesBuscables, RespuestaBusqueda, ResultadoBusqueda } from '@/tipos/compartido/contrato_selector_buscable'

const SIN_RESULTADOS: ResultadoBusqueda = { opciones: [], total: 0 }

function esPromesa(valor: RespuestaBusqueda): valor is Promise<ResultadoBusqueda> {
  return typeof (valor as Promise<ResultadoBusqueda>).then === 'function'
}

export function usarSelectorBuscable(fuente: FuenteOpcionesBuscables, limite: number) {
  const [abierto, setAbierto] = useState(false)
  const [texto, setTexto] = useState('')
  const [diferido, setDiferido] = useState<ResultadoBusqueda | null>(null)

  const respuesta = useMemo(() => (abierto ? fuente(texto, limite) : SIN_RESULTADOS), [abierto, fuente, texto, limite])

  useEffect(() => {
    if (!esPromesa(respuesta)) return undefined
    let vigente = true
    const guardar = (resultado: ResultadoBusqueda) => {
      if (vigente) setDiferido(resultado)
    }
    respuesta.then(guardar)
    return () => {
      vigente = false
    }
  }, [respuesta])

  function abrir() {
    setAbierto(true)
  }

  function cerrar() {
    setAbierto(false)
    setTexto('')
  }

  return {
    abierto,
    texto,
    resultado: esPromesa(respuesta) ? (diferido ?? SIN_RESULTADOS) : respuesta,
    abrir,
    cerrar,
    cambiarTexto: setTexto,
    limpiar: () => setTexto(''),
  }
}
