import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import { Icono } from '../../compartido/icono'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import type { IconName } from '../../../tipos/compartido/contrato_icono'

const clases = catalogoAmigos.clases.lateral

export function FilaListaLateral({ icono, color, nombre, miembros }: { icono: IconName; color: string; nombre: string; miembros: string }) {
  return (
    <article className={clases.fila}>
      <SuperficieColor variante={color} className={clases.icono_caja}>
        <Icono name={icono} className={clases.icono} />
      </SuperficieColor>
      <div className={clases.cuerpo}>
        <span className={clases.nombre}>{nombre}</span>
        <span className={clases.auxiliar}>{miembros}</span>
      </div>
    </article>
  )
}
