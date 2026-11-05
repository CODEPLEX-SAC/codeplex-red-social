import { imagenDeRecurso } from './imagenes_historia'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { MedioLocalPublicacion } from '@/tipos/inicio/contrato_crear_publicacion'
import type { BorradorHistoria, ElementoSuperpuestoHistoria, EstiloTextoHistoria, FondoHistoria, HistoriaPublicada, PosicionHistoria, TipoHistoria, VistaLienzoHistoria } from '@/tipos/inicio/modelo_historia'
import type { EstadoHistorias } from '@/tipos/inicio/contrato_almacen_historias'

const catalogoHistorias = catalogoInicio.historias

const catalogoMedios = catalogoInicio.modal_crear_publicacion.medios

export const FONDOS_HISTORIA = catalogoHistorias.fondos as FondoHistoria[]
export const ESTILOS_TEXTO_HISTORIA = catalogoHistorias.estilos_texto as EstiloTextoHistoria[]
export const POSICIONES_HISTORIA = catalogoHistorias.posiciones as PosicionHistoria[]

export function fondoDe(id: string): FondoHistoria {
  return FONDOS_HISTORIA.find((fondo) => fondo.id === id) ?? FONDOS_HISTORIA[0]
}

export function estiloTextoDe(id: string): EstiloTextoHistoria {
  return ESTILOS_TEXTO_HISTORIA.find((estilo) => estilo.id === id) ?? ESTILOS_TEXTO_HISTORIA[0]
}

export function posicionDe(id: string): PosicionHistoria {
  return POSICIONES_HISTORIA.find((posicion) => posicion.id === id) ?? POSICIONES_HISTORIA[0]
}

export function borradorInicial(tipo: TipoHistoria = catalogoHistorias.borrador.tipo_inicial as TipoHistoria): BorradorHistoria {
  return { tipo, fondoId: catalogoHistorias.borrador.fondo_inicial, texto: String(), estiloTextoId: catalogoHistorias.borrador.estilo_texto_inicial, medio: null, ajusteMedio: 0, elementos: [] }
}

export function conTipo(borrador: BorradorHistoria, tipo: TipoHistoria): BorradorHistoria {
  return { ...borrador, tipo, medio: tipo === 'media' ? borrador.medio : null }
}

export function conFondo(borrador: BorradorHistoria, fondoId: string): BorradorHistoria {
  return { ...borrador, fondoId: fondoDe(fondoId).id }
}

export const LIMITE_TEXTO_HISTORIA = catalogoHistorias.borrador.limite_texto

const UMBRALES_TEXTO = catalogoHistorias.texto_adaptable.umbrales
const REDUCCION_TEXTO = catalogoHistorias.texto_adaptable.reduccion as Record<string, string[]>

export function recortarTexto(texto: string): string {
  return texto.slice(0, LIMITE_TEXTO_HISTORIA)
}

export function claseTextoAdaptada(clases: string, longitud: number): string {
  const nivel = UMBRALES_TEXTO.filter((umbral) => longitud > umbral).length
  if (nivel === 0) return clases
  return clases
    .split(/\s+/)
    .map((clase) => REDUCCION_TEXTO[clase]?.[nivel - 1] ?? clase)
    .join(' ')
}

export function contadorTexto(texto: string): string {
  return catalogoHistorias.flujo.editor.contador.replace(':usados', String(texto.length)).replace(':maximo', String(LIMITE_TEXTO_HISTORIA))
}

export function conTexto(borrador: BorradorHistoria, texto: string): BorradorHistoria {
  return { ...borrador, texto: recortarTexto(texto) }
}

export function conEstiloTexto(borrador: BorradorHistoria, estiloTextoId: string): BorradorHistoria {
  return { ...borrador, estiloTextoId: estiloTextoDe(estiloTextoId).id }
}

export function conMedio(borrador: BorradorHistoria, medio: MedioLocalPublicacion | null): BorradorHistoria {
  return { ...borrador, tipo: medio ? 'media' : borrador.tipo, medio, ajusteMedio: 0 }
}

export const NIVELES_AJUSTE_MEDIO = catalogoHistorias.ajuste_medio.niveles

export function conAjusteMedio(borrador: BorradorHistoria, nivel: number): BorradorHistoria {
  return { ...borrador, ajusteMedio: Math.min(Math.max(Math.round(nivel), 0), NIVELES_AJUSTE_MEDIO.length - 1) }
}

export function conElemento(borrador: BorradorHistoria, elemento: ElementoSuperpuestoHistoria): BorradorHistoria {
  return { ...borrador, elementos: [...borrador.elementos, elemento] }
}

export function sinElemento(borrador: BorradorHistoria, id: string): BorradorHistoria {
  return { ...borrador, elementos: borrador.elementos.filter((elemento) => elemento.id !== id) }
}

export function puedePublicarHistoria(borrador: BorradorHistoria): boolean {
  if (borrador.tipo === 'media') return borrador.medio !== null
  return borrador.texto.trim().length > 0 || borrador.elementos.some((elemento) => elemento.contenido.trim().length > 0)
}

export function vistaDeBorrador(borrador: BorradorHistoria): VistaLienzoHistoria {
  const fondo = fondoDe(borrador.fondoId)
  const imagenFondo = fondo.recurso ? imagenDeRecurso(fondo.recurso) : null
  const mostrarMedio = borrador.tipo === 'media' && borrador.medio !== null
  return {
    claseFondo: fondo.clase,
    claseAjusteMedio: NIVELES_AJUSTE_MEDIO[borrador.ajusteMedio]?.clase ?? NIVELES_AJUSTE_MEDIO[0].clase,
    claseTexto: `${claseTextoAdaptada(estiloTextoDe(borrador.estiloTextoId).clases, borrador.texto.length)} ${fondo.texto}`,
    imagenFondo: mostrarMedio ? null : imagenFondo,
    superponer: !mostrarMedio && imagenFondo !== null,
    medio: mostrarMedio ? borrador.medio : null,
    texto: borrador.texto,
    elementos: borrador.elementos.map((elemento) => ({ id: elemento.id, contenido: elemento.contenido, clases: `${posicionDe(elemento.posicionId).clase} ${estiloTextoDe(elemento.estiloTextoId).clases} ${fondo.texto}` })),
  }
}

export function nuevoElemento(id: string, contenido: string, estiloTextoId: string = catalogoHistorias.borrador.estilo_texto_inicial): ElementoSuperpuestoHistoria {
  return { id, contenido, estiloTextoId: estiloTextoDe(estiloTextoId).id, posicionId: catalogoHistorias.borrador.posicion_inicial }
}

export function conPosicionElemento(borrador: BorradorHistoria, id: string, posicionId: string): BorradorHistoria {
  return { ...borrador, elementos: borrador.elementos.map((elemento) => (elemento.id === id ? { ...elemento, posicionId: posicionDe(posicionId).id } : elemento)) }
}

export function conTextoAnadido(borrador: BorradorHistoria, texto: string): BorradorHistoria {
  return { ...borrador, texto: recortarTexto(borrador.texto + texto) }
}

export function hayContenidoHistoria(borrador: BorradorHistoria): boolean {
  return borrador.texto.trim().length > 0 || borrador.elementos.length > 0 || borrador.medio !== null
}

export function historiaDesdeBorrador(estado: EstadoHistorias, borrador: BorradorHistoria, autor: { id: string; nombre: string }, tiempo: string): HistoriaPublicada {
  return { id: `historia-${estado.secuencia + 1}`, autorId: autor.id, nombre: autor.nombre, tiempo, borrador }
}

export function conHistoria(estado: EstadoHistorias, historia: HistoriaPublicada): EstadoHistorias {
  const delAutor = estado.historias.filter((existente) => existente.autorId === historia.autorId)
  if (delAutor.length >= catalogoHistorias.maximo_segmentos) return estado
  return { ...estado, historias: [...estado.historias, historia], secuencia: estado.secuencia + 1 }
}

export function esMedioHistoriaValido(archivo: File): boolean {
  return catalogoMedios.prefijos_aceptados.some((prefijo) => archivo.type.startsWith(prefijo)) && catalogoMedios.tamano_maximo >= archivo.size
}

export function medioDesdeArchivo(archivo: File, id: string): MedioLocalPublicacion {
  return { id, url: URL.createObjectURL(archivo), esVideo: archivo.type.startsWith(catalogoMedios.prefijo_video) }
}

export function sinHistoria(estado: EstadoHistorias, id: string): EstadoHistorias {
  return { ...estado, historias: estado.historias.filter((historia) => historia.id !== id) }
}

export function tiposArchivoHistoria(): string {
  return catalogoMedios.tipos_aceptados
}

export function conContenidoElemento(borrador: BorradorHistoria, id: string, contenido: string): BorradorHistoria {
  return { ...borrador, elementos: borrador.elementos.map((elemento) => (elemento.id === id ? { ...elemento, contenido } : elemento)) }
}
