import datos from './inicio.json'
import type { HistoriaContactoDatos, HistoriaPublicada } from '@/tipos/inicio/modelo_historia'

const ARCHIVOS_IMAGEN = import.meta.glob('../../../recursos/imagenes/*.{jpg,png}', { eager: true, import: 'default' }) as Record<string, string>

function urlDeRecurso(recurso: string): string | null {
  const entrada = Object.entries(ARCHIVOS_IMAGEN).find(([ruta]) => ruta.endsWith(`/${recurso}`))
  return entrada ? entrada[1] : null
}

export function construirHistoria(origen: HistoriaContactoDatos): HistoriaPublicada {
  const { recurso, ...borrador } = origen.borrador
  const url = recurso ? urlDeRecurso(recurso) : null
  return {
    id: origen.id,
    autorId: origen.autorId,
    nombre: origen.nombre,
    tiempo: origen.tiempo,
    borrador: { ...borrador, ajusteMedio: borrador.ajusteMedio ?? 0, medio: url ? { id: `${origen.id}-medio`, url, esVideo: false } : null },
  }
}

export const HISTORIAS_CONTACTOS: HistoriaPublicada[] = (datos.historiasContactos as HistoriaContactoDatos[]).map(construirHistoria)
export const HISTORIAS_PROPIAS: HistoriaPublicada[] = (datos.historiasPropias as HistoriaContactoDatos[]).map(construirHistoria)
