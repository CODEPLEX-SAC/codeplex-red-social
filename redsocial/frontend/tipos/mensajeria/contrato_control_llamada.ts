import type catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'

export type ControlLlamadaProps = {
  icono: string
  clave: keyof typeof catalogoMensajeria.botones
  onClick?: () => void
  activo?: boolean
  conFlecha?: boolean
  conteo?: number
}
