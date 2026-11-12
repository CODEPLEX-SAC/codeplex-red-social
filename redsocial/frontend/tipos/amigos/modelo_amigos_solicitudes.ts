export interface SolicitudEnviada {
  nombre: string
  estado: string
  descripcion: string
  comunes: string
}
export type CategoriaSolicitud = 'recibidas' | 'enviadas'
export interface SolicitudRecibida {
  nombre: string
  tiempo: string
  descripcion: string
  comunes: string
  masAvatares: string
}
