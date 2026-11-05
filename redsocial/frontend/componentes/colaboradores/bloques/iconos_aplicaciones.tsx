import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { usarAplicacionesVisibles } from './usar_aplicaciones_visibles'
import type { Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.tabla_aplicaciones
const coloresAplicacion: Record<string, string> = catalogoColaboradores.clases.aplicacion_color
const SEPARADOR = catalogoColaboradores.dialogos_permisos.perfiles.separador

export function IconosAplicaciones({ aplicaciones }: { aplicaciones: Aplicacion[] }) {
  const { fila, insignia, ocultas } = usarAplicacionesVisibles(aplicaciones.length)
  const nombresOcultos = aplicaciones.slice(aplicaciones.length - ocultas).map((app) => app.nombre).join(SEPARADOR)

  return (
    <div className={clases.contenedor}>
      <div ref={fila} className={clases.fila_iconos}>
        {aplicaciones.map((app) => (
          <span key={app.nombre} title={app.nombre} className={`${clases.icono_caja} ${coloresAplicacion[app.nombre]}`}>
            <Icono name={app.icono} className={clases.glifo} />
          </span>
        ))}
      </div>
      {ocultas > 0 && <span ref={insignia} title={nombresOcultos} className={clases.mas}>+{ocultas}</span>}
    </div>
  )
}
