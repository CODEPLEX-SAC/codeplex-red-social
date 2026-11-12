import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import type { GrabacionAudio } from '@/tipos/compartido/contrato_audio'
import type { ClasificacionArchivo, ClaveFormato } from '@/tipos/mensajeria/contrato_adjuntos'
import type { AdjuntoMensaje, TipoAdjunto } from '@/tipos/mensajeria/contrato_mensajes'

const formato = catalogoMensajeria.conversacion.adjuntos

export { duracionLegible } from '../../compartido/interfaz/logica_audio'
const formatos = formato.formatos
const PUNTO = '.'
const SEPARADOR_LISTA = ','

export const ACEPTA_IMAGENES = formato.tipos_imagen.join(SEPARADOR_LISTA)
export const ACEPTA_DOCUMENTOS = Object.values(formatos)
  .flatMap((definicion) => definicion.extensiones)
  .map((extension) => `${PUNTO}${extension}`)
  .join(SEPARADOR_LISTA)

function exponenteDePeso(bytes: number) {
  if (bytes <= 0) return 0
  return Math.min(Math.floor(Math.log(bytes) / Math.log(formato.base)), formato.unidades.length - 1)
}

export function pesoLegible(bytes: number): string {
  const exponente = exponenteDePeso(bytes)
  const valor = bytes / formato.base ** exponente
  const texto = exponente === 0 ? String(bytes) : valor.toFixed(formato.decimales)
  return [texto, formato.unidades[exponente]].join(formato.separador)
}

export function extensionDe(nombre: string): string {
  const posicion = nombre.lastIndexOf(PUNTO)
  return posicion < 0 ? String() : nombre.slice(posicion + 1).toLowerCase()
}

function formatoDeDocumento(nombre: string, mime: string): ClaveFormato | undefined {
  const extension = extensionDe(nombre)
  const claves = Object.keys(formatos) as ClaveFormato[]
  return claves.find((clave) => formatos[clave].extensiones.includes(extension) || (mime !== String() && (formatos[clave].mimes as string[]).includes(mime)))
}

export function clasificarArchivo(archivo: { name?: string; type: string }): ClasificacionArchivo {
  const extension = extensionDe(archivo.name ?? String())
  if (archivo.type.startsWith(formato.prefijo_imagen)) return { tipo: 'imagen', extension }
  if (archivo.type.startsWith(formato.prefijo_audio)) return { tipo: 'audio', extension }
  return { tipo: 'documento', formato: formatoDeDocumento(archivo.name ?? String(), archivo.type), extension }
}

export function tipoDeArchivo(archivo: { name?: string; type: string }): TipoAdjunto {
  return clasificarArchivo(archivo).tipo
}

export function formatoDeAdjunto(adjunto: Pick<AdjuntoMensaje, 'nombre' | 'formato'>): ClaveFormato {
  return (adjunto.formato as ClaveFormato | undefined) ?? formatoDeDocumento(adjunto.nombre, String()) ?? 'otro'
}

export function errorDeArchivo(archivo: Pick<File, 'name' | 'type' | 'size'>): string | null {
  const clasificacion = clasificarArchivo(archivo)
  const permitido = clasificacion.tipo === 'audio' || (clasificacion.tipo === 'imagen' ? formato.tipos_imagen.includes(archivo.type) : clasificacion.formato !== undefined)
  if (!permitido) return formato.errores.tipo.replace(':nombre', archivo.name)
  if (formato.tamano_maximo_bytes !== null && archivo.size > formato.tamano_maximo_bytes) return formato.errores.tamano.replace(':nombre', archivo.name)
  return null
}

export function adjuntoDeGrabacion(grabacion: GrabacionAudio): AdjuntoMensaje {
  return { nombre: formato.etiquetas.audio, peso: pesoLegible(grabacion.bytes), tipo: 'audio', mime: grabacion.tipo, bytes: grabacion.bytes, url: grabacion.url, duracion: grabacion.duracion, picos: grabacion.picos }
}

function crearAdjunto(archivo: File): AdjuntoMensaje {
  const clasificacion = clasificarArchivo(archivo)
  return { nombre: archivo.name, peso: pesoLegible(archivo.size), tipo: clasificacion.tipo, formato: clasificacion.formato, extension: clasificacion.extension, mime: archivo.type, bytes: archivo.size, url: URL.createObjectURL(archivo) }
}

export function prepararAdjuntos(archivos: readonly File[]): { adjuntos: AdjuntoMensaje[]; errores: string[] } {
  const evaluados = archivos.map((archivo) => ({ archivo, error: errorDeArchivo(archivo) }))
  const errores = evaluados.flatMap(({ error }) => (error === null ? [] : [error]))
  const adjuntos = evaluados.flatMap(({ archivo, error }) => (error === null ? [crearAdjunto(archivo)] : []))
  return { adjuntos, errores }
}
