export interface ComentarioDetalleAviso {
  nombre: string
  texto: string
  tiempo: string
}

export interface PublicacionDetalleAviso {
  titulo: string
  descripcion: string
}

export interface DetalleAviso {
  autor: string
  tiempo: string
  comentario: string
  publicacion: PublicacionDetalleAviso
  comentarios: readonly ComentarioDetalleAviso[]
}

export interface PanelDetalleAvisoProps {
  detalle: DetalleAviso
}
