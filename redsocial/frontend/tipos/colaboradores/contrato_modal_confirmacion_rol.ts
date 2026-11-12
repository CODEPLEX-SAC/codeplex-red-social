export interface ModalConfirmacionRolProps {
  titulo: string
  mensaje: string
  detalle?: string
  etiquetaCancelar: string
  etiquetaConfirmar: string
  peligro?: boolean
  alCancelar: () => void
  alConfirmar: () => void
}
