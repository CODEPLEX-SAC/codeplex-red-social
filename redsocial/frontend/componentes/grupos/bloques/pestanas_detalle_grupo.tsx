import { Pestanas } from '../../compartido/interfaz/pestanas'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { PestanaDetalleGrupo, PestanasDetalleGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const PESTANAS = { miembro: catalogoGrupos.detalle.pestanas_miembro, visitante: catalogoGrupos.detalle.pestanas_miembro, administrador: catalogoGrupos.detalle.pestanas }

export function PestanasDetalleGrupo({ rol, activa, alCambiar }: PestanasDetalleGrupoProps) {
  return <Pestanas elementos={PESTANAS[rol]} activa={activa} alCambiar={(clave) => alCambiar(clave as PestanaDetalleGrupo)} className="min-w-0" />
}
