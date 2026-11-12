import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { crearFuenteLocal, usarBusqueda } from '../../compartido'
import { estaSinLeer } from './logica_acciones_conversacion'
import { coincidePorNombre } from './logica_busqueda_mensajeria'
import type { ConversacionConEtiqueta } from '@/tipos/mensajeria/contrato_mensajes'
import type { FiltroConversaciones, FiltrosConversaciones, ListaConversacionesProps } from '@/tipos/mensajeria/contrato_lista_conversaciones'

function admiteConversacion(conversacion: ConversacionConEtiqueta, { soloGrupos, filtro }: FiltrosConversaciones): boolean {
  if (soloGrupos) return Boolean(conversacion.esGrupo)
  if (filtro === 'no_leidos') return estaSinLeer(conversacion)
  return filtro === 'favoritos' ? Boolean(conversacion.favorita) : true
}

export function usarListaConversaciones({ conversaciones, fuente, oculta, onSeleccionar }: ListaConversacionesProps) {
  const pistaRef = useRef<HTMLDivElement>(null)
  const scrollGuardado = useRef(0)
  const [ultimaTocada, setUltimaTocada] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<FiltroConversaciones>('todos')
  const [verGrupos, setVerGrupos] = useState(false)
  const [anclaMenu, setAnclaMenu] = useState<HTMLElement | null>(null)
  const [creandoGrupo, setCreandoGrupo] = useState(false)
  const filtros = useMemo<FiltrosConversaciones>(() => ({ soloGrupos: verGrupos, filtro }), [verGrupos, filtro])
  const fuenteLocal = useMemo(() => crearFuenteLocal(conversaciones, coincidePorNombre, admiteConversacion), [conversaciones])
  const busqueda = usarBusqueda(fuente ?? fuenteLocal, { modo: fuente ? 'remota' : 'local', filtros })
  const visibles = busqueda.resultado.elementos
  const buscando = busqueda.estado !== 'inicial'

  useLayoutEffect(() => {
    if (!oculta && pistaRef.current) {
      pistaRef.current.scrollTop = scrollGuardado.current
    }
  }, [oculta])

  function alSeleccionar(id: string) {
    if (pistaRef.current) scrollGuardado.current = pistaRef.current.scrollTop
    onSeleccionar(id)
  }

  return { pistaRef, ultimaTocada, setUltimaTocada, filtro, setFiltro, verGrupos, setVerGrupos, anclaMenu, setAnclaMenu, creandoGrupo, setCreandoGrupo, busqueda, visibles, buscando, alSeleccionar }
}
