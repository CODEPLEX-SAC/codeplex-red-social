import { Insignia } from '../../compartido/interfaz/insignia'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.listado
const coloresEstado: Record<string, { texto: string; punto: string; insignia: string }> = catalogoColaboradores.clases.estado_color
const etiquetasEstado: Record<string, string> = catalogoColaboradores.estados

export function EstadoColaborador({ estado }: { estado: Colaborador['estado'] }) {
  const colores = coloresEstado[estado]

  return (
    <Insignia variant="status" className={`${clases.estado_insignia} ${colores.texto}`} punto={colores.punto}>
      {etiquetasEstado[estado]}
    </Insignia>
  )
}
