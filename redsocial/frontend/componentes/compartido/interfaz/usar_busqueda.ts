import { useEffect, useMemo, useState } from 'react'
import { asentadaDe, estadoDe, esperarPendiente, llamarFuente, programarDiferido } from './logica_busqueda'
import catalogoCompartido from '../../../catalogos/capacidades/redsocial/compartido.json'
import type { BusquedaEnCurso, FuenteBusqueda, OpcionesBusqueda, ResultadoBusquedaLista } from '@/tipos/compartido/contrato_busqueda'
import type { Asentada, ConsultaDiferida } from '@/tipos/compartido/contrato_estado_interno_busqueda'

const configuracion = catalogoCompartido.busqueda
const SIN_RESULTADOS: ResultadoBusquedaLista<never> = { elementos: [], total: 0 }

export function usarBusqueda<T, F = undefined>(
  fuente: FuenteBusqueda<T, F>,
  opciones: OpcionesBusqueda<F> = {},
): BusquedaEnCurso<T> {
  const { limite, modo = 'local', filtros } = opciones
  const retardo = modo === 'remota' ? configuracion.retardo_remoto_ms : 0
  const [texto, setTexto] = useState(String())
  const [diferido, setDiferido] = useState<ConsultaDiferida<F>>({ texto: String(), filtros })
  const [asentada, setAsentada] = useState<Asentada<T> | null>(null)
  const vigente = retardo === 0 ? { texto, filtros } : diferido
  const consulta = vigente.texto.trim()
  const filtrosActivos = vigente.filtros
  const llamada = useMemo(() => llamarFuente(fuente, consulta, limite, filtrosActivos), [fuente, consulta, limite, filtrosActivos])
  const pendiente = llamada.respuesta instanceof Promise ? llamada.respuesta : null

  useEffect(() => programarDiferido({ retardo, texto, filtros, setDiferido }), [texto, filtros, retardo])
  useEffect(() => esperarPendiente({ pendiente, setAsentada }), [pendiente])

  const asentadaVigente = asentadaDe(asentada, pendiente)
  const error = llamada.error ?? asentadaVigente?.error ?? null
  const inmediata = llamada.respuesta !== null && !(llamada.respuesta instanceof Promise) ? llamada.respuesta : null
  const resultado: ResultadoBusquedaLista<T> = inmediata ?? asentadaVigente?.resultado ?? SIN_RESULTADOS
  const estado = estadoDe({ error, escribiendo: texto.trim() !== consulta || filtros !== filtrosActivos, cargando: pendiente !== null && asentadaVigente === null, consulta, hayElementos: resultado.elementos.length > 0 })

  return {
    texto,
    estado,
    resultado,
    error,
    cambiarTexto: setTexto,
    limpiar: () => {
      setTexto(String())
      setDiferido({ texto: String(), filtros })
    },
  }
}
