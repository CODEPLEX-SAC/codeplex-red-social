export type TipoHistorialEmpresa = 'usuario' | 'empresa' | 'plan'

export interface RegistroHistorialBase {
  fecha: string
  hora: string
  usuario: string
  accion: string
  detalle: string
  tipo: TipoHistorialEmpresa
}
