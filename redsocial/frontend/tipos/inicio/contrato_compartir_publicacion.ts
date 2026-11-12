import type { ReactNode } from 'react'
import type { AlmacenHistorias } from './contrato_almacen_historias'
import type { AlmacenPublicaciones } from './contrato_almacen_publicaciones'
import type { OrigenCompartido } from './modelo_inicio'

export interface DestinoGrupoCompartir {
  id: string
  nombre: string
  imagen: string
  detalle: string
}

export interface DestinoAmigoCompartir {
  id: string
  nombre: string
  imagen: string
}

export interface DestinosCompartir {
  grupos: readonly DestinoGrupoCompartir[]
  amigos: readonly DestinoAmigoCompartir[]
  compartirEnGrupo: (idGrupo: string, origen: OrigenCompartido, comentario: string) => void
  compartirEnHistoria: (origen: OrigenCompartido, comentario: string) => boolean
}

export interface ProveedorDestinosCompartirProps {
  grupos: readonly DestinoGrupoCompartir[]
  amigos: readonly DestinoAmigoCompartir[]
  almacenDeGrupo: (idGrupo: string) => AlmacenPublicaciones
  almacenHistorias?: AlmacenHistorias
  children: ReactNode
}

export type PasoCompartir = 'principal' | 'grupos' | 'amigos' | 'redactar'
export type TipoDestinoCompartir = 'grupo' | 'amigo'

export interface DestinoElegido {
  tipo: TipoDestinoCompartir
  id: string
  nombre: string
}

export interface ParametrosCompartirPublicacion {
  nombre: string
  texto: string
  onCompartir: (comentario: string) => void
}

export interface CabeceraCompartirProps {
  titulo: string
  alVolver?: () => void
  onCerrar: () => void
}

export interface AvisoCompartir {
  mensaje: string
  variante: 'exito' | 'error'
}

export interface DestinosPrincipalesProps {
  alElegir: (clave: string) => void
}

export interface ListaDestinosCompartirProps {
  tipo: TipoDestinoCompartir
  alElegir: (destino: DestinoElegido) => void
}

export interface RedactarCompartirProps {
  destino: DestinoElegido
  comentario: string
  etiquetados: readonly string[]
  alCambiarComentario: (texto: string) => void
  alAlternarEtiqueta: (nombre: string) => void
  alPublicar: () => void
}

export interface ContenidoPrincipalCompartirProps {
  comentario: string
  simple: boolean
  alCambiarComentario: (texto: string) => void
  alElegir: (clave: string) => void
  alCompartir: () => void
}
