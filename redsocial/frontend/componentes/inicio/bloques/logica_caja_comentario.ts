import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'

const medios = catalogoInicio.modal_crear_publicacion.medios

export function mediosDesdeArchivos(archivos: File[], actuales: number, siguienteId: () => string): MedioLocalPublicacion[] {
  const cupo = Math.max(medios.maximo_archivos - actuales, 0)
  const validos = archivos.filter((archivo) => medios.prefijos_aceptados.some((prefijo) => archivo.type.startsWith(prefijo)) && medios.tamano_maximo >= archivo.size)
  return validos.slice(0, cupo).map((archivo) => ({ id: siguienteId(), url: URL.createObjectURL(archivo), esVideo: archivo.type.startsWith(medios.prefijo_video) }))
}

export function sinMedio(lista: MedioLocalPublicacion[], id: string) {
  const quitado = lista.find((medio) => medio.id === id)
  if (quitado) URL.revokeObjectURL(quitado.url)
  return lista.filter((medio) => medio.id !== id)
}

export function liberarMedios(lista: MedioLocalPublicacion[]) {
  lista.forEach((medio) => URL.revokeObjectURL(medio.url))
}

export function respuestaPara(nombre: string, plantilla: string) {
  return plantilla.replace(':nombre', nombre)
}
