import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { EstadoColaborador } from './estado_colaborador'
import { IconosAplicaciones } from './iconos_aplicaciones'
import { RolColaborador } from './rol_colaborador'
import { VigenciaColaborador } from './vigencia_colaborador'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.listado
const tabla = catalogoColaboradores.tabla

export function DatosTarjetaColaborador({ c }: { c: Colaborador }) {
  return (
    <dl className={clases.tarjeta_datos}>
      <div className={clases.tarjeta_dato}>
        <dt className={clases.tarjeta_dato_titulo}>{tabla.rol_perfil}</dt>
        <dd className={clases.tarjeta_dato_valor}><RolColaborador c={c} /></dd>
      </div>
      <div className={clases.tarjeta_dato}>
        <dt className={clases.tarjeta_dato_titulo}>{tabla.estado}</dt>
        <dd className={clases.tarjeta_dato_valor}><EstadoColaborador estado={c.estado} /></dd>
      </div>
      <div className={clases.tarjeta_dato}>
        <dt className={clases.tarjeta_dato_titulo}>{tabla.vigencia}</dt>
        <dd className={clases.tarjeta_dato_valor}><VigenciaColaborador c={c} /></dd>
      </div>
      <div className={clases.tarjeta_dato}>
        <dt className={clases.tarjeta_dato_titulo}>{tabla.aplicaciones}</dt>
        <dd className={clases.tarjeta_dato_valor}><IconosAplicaciones aplicaciones={c.aplicaciones} /></dd>
      </div>
    </dl>
  )
}
