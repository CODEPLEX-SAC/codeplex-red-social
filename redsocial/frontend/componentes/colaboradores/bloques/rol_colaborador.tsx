import { Insignia } from '../../compartido/interfaz/insignia'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.listado
const coloresRol: Record<string, string> = catalogoColaboradores.clases.rol_color

export function RolColaborador({ c }: { c: Colaborador }) {
  return (
    <>
      <Insignia variant="status" className={coloresRol[c.rolClase] ?? coloresRol.predeterminado}>{c.rol}</Insignia>
      <span className={clases.descripcion_rol}>{c.descripcionRol}</span>
    </>
  )
}
