import { useEffect, useState, useSyncExternalStore } from 'react'
import { agruparPorAutor, anteriorHistoria, siguienteHistoria, ubicacionDe } from '../../inicio'
import type { AlmacenHistoriasVistas } from '@/tipos/inicio/contrato_almacen_historias'
import type { HistoriaPublicada } from '@/tipos/inicio/modelo_historia'
import type { HistoriasDeParticipante } from '@/tipos/mensajeria/contrato_acciones_conversacion'

export function usarHistoriasConversacion(historias: HistoriaPublicada[], almacenVistas: AlmacenHistoriasVistas) {
  const vistas = useSyncExternalStore(almacenVistas.suscribir, almacenVistas.leer)
  const [viendo, setViendo] = useState<HistoriaPublicada | null>(null)
  const grupos = agruparPorAutor(historias)
  const ubicacion = ubicacionDe(grupos, viendo)
  const abierto = ubicacion.grupo !== -1 && ubicacion.segmento !== -1
  const siguiente = abierto ? siguienteHistoria(grupos, ubicacion.grupo, ubicacion.segmento) : null
  const anterior = abierto ? anteriorHistoria(grupos, ubicacion.grupo, ubicacion.segmento) : null
  const idVista = viendo?.id

  useEffect(() => {
    if (idVista) almacenVistas.modificar((actual) => (actual.has(idVista) ? actual : new Set([...actual, idVista])))
  }, [idVista, almacenVistas])

  const porParticipante: Record<string, HistoriasDeParticipante> = Object.fromEntries(
    grupos.map((grupo) => [grupo.autorId, { participantId: grupo.autorId, storyIds: grupo.historias.map((historia) => historia.id), estado: grupo.historias.every((historia) => vistas.has(historia.id)) ? 'vista' : 'nueva' }]),
  )

  function abrir(participantId: string) {
    const grupo = grupos.find((candidato) => candidato.autorId === participantId)
    if (!grupo) return
    setViendo(grupo.historias.find((historia) => !vistas.has(historia.id)) ?? grupo.historias[0])
  }

  return {
    porParticipante,
    cantidad: Object.fromEntries(grupos.map((grupo) => [grupo.autorId, grupo.historias.length])),
    abrir,
    visor: {
      grupos,
      abierto,
      indiceGrupo: ubicacion.grupo,
      segmento: ubicacion.segmento,
      hayAnterior: anterior !== null,
      haySiguiente: siguiente !== null,
      onSeleccionarGrupo: (indice: number) => setViendo(grupos[indice].historias[0]),
      onAnterior: () => setViendo(anterior),
      onSiguiente: () => setViendo(siguiente),
      onCerrar: () => setViendo(null),
    },
  }
}
