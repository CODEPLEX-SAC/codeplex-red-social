import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const ARCHIVOS = import.meta.glob('../../../recursos/imagenes/*.{jpg,png}', { eager: true, import: 'default' }) as Record<string, string>
const URL_POR_NOMBRE = new Map(Object.entries(ARCHIVOS).map(([ruta, url]) => [ruta.split('/').pop() ?? ruta, url]))

export function mediosDeImagenes(idPublicacion: string, nombres: readonly string[] = []): MedioLocalPublicacion[] {
  return nombres.flatMap((nombre, indice) => {
    const url = URL_POR_NOMBRE.get(nombre)
    return url ? [{ id: `${idPublicacion}-imagen-${indice + 1}`, url, esVideo: false }] : []
  })
}
