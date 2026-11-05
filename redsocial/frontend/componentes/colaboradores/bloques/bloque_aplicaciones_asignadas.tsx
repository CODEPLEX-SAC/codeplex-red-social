import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { Insignia } from '../../compartido/interfaz/insignia'
import type { Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.detalle
const chips = catalogoColaboradores.clases.tabla_aplicaciones
const coloresAplicacion: Record<string, string> = catalogoColaboradores.clases.aplicacion_color

export function BloqueAplicacionesAsignadas({ aplicaciones }: { aplicaciones: Aplicacion[] }) {
  return (
    <section className={clases.seccion}>
      <div className={clases.cabecera_seccion_contador}>
        <h4 className={clases.titulo_seccion_en_cabecera}>{catalogoColaboradores.secciones.aplicaciones_titulo}</h4>
        <Insignia variant="counter">{aplicaciones.length}</Insignia>
      </div>
      <ul className={clases.lista_aplicaciones}>
        {aplicaciones.map((app) => (
          <li key={app.nombre} className={clases.aplicacion_fila}>
            <span className={`${chips.icono_caja} ${coloresAplicacion[app.nombre]}`}>
              <Icono name={app.icono} className={chips.glifo} />
            </span>
            <span className={clases.aplicacion_nombre}>{app.nombre}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
