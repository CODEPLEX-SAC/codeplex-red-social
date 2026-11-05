import { useState } from 'react'
import { agruparPorAutor, anteriorHistoria, siguienteHistoria, ubicacionDe } from './logica_grupos_historias'
import { autoresConHistorias, ordenarHistorias } from './logica_serie_historias'
import type { Historia } from '@/tipos/inicio/modelo_inicio'
import type { HistoriaPublicada } from '@/tipos/inicio/modelo_historia'

export function usarSeccionHistorias(historias: Historia[], publicadas: HistoriaPublicada[], deContactos: HistoriaPublicada[]) {
  const [creando, setCreando] = useState(false)
  const [viendo, setViendo] = useState<HistoriaPublicada | null>(null)
  const grupos = agruparPorAutor(ordenarHistorias(publicadas, deContactos, historias))
  const ubicacion = ubicacionDe(grupos, viendo)
  const abierto = ubicacion.grupo !== -1 && ubicacion.segmento !== -1
  const siguiente = abierto ? siguienteHistoria(grupos, ubicacion.grupo, ubicacion.segmento) : null
  const anterior = abierto ? anteriorHistoria(grupos, ubicacion.grupo, ubicacion.segmento) : null

  return {
    creando,
    grupos,
    abierto,
    indiceGrupo: ubicacion.grupo,
    segmento: ubicacion.segmento,
    hayAnterior: anterior !== null,
    haySiguiente: siguiente !== null,
    autoresConHistorias: autoresConHistorias(deContactos),
    abrirCreador: () => setCreando(true),
    cerrarCreador: () => setCreando(false),
    abrirVisor: setViendo,
    cerrarVisor: () => setViendo(null),
    avanzar: () => setViendo(siguiente),
    retroceder: () => setViendo(anterior),
    seleccionarGrupo: (indice: number) => setViendo(grupos[indice].historias[0]),
  }
}
