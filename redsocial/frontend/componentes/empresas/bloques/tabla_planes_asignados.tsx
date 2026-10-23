import { CLASES_TABLA, claseEncabezadoTabla } from '../../compartido/clases_tabla'
import { FilaPlanAsignado } from './fila_plan_asignado'
import { capacidadDeFila, datosDeMejora, puedeMejorar } from './logica_mejora_plan'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { TablaPlanesAsignadosProps } from '@/tipos/empresas/contrato_mejora_plan'

const edicion = catalogoEmpresas.planes_asignados.edicion
const columnas = edicion.columnas
const encabezado = claseEncabezadoTabla()

export function TablaPlanesAsignados({ contratados, activos, totalEmpresas, configuracion, alAlternar, alMejorar }: TablaPlanesAsignadosProps) {
  return (
    <div className={edicion.clases.tabla_envoltorio}>
      <table className={`${CLASES_TABLA.tabla} ${edicion.clases.tabla}`}>
        <thead>
          <tr>
            <th className={encabezado}>{columnas.aplicativo}</th>
            <th className={encabezado}>{columnas.capacidad_uso}</th>
            <th className={encabezado}>{columnas.asignacion}</th>
            <th className={encabezado}>{columnas.acciones}</th>
          </tr>
        </thead>
        <tbody>
          {contratados.map(({ modulo, suscripcion }) => (
            <FilaPlanAsignado
              key={modulo.clave}
              modulo={modulo}
              suscripcion={suscripcion}
              activo={activos.includes(modulo.clave)}
              totalEmpresas={totalEmpresas}
              puedeMejorar={puedeMejorar(datosDeMejora(configuracion(suscripcion.aplicacion), suscripcion, capacidadDeFila(suscripcion, totalEmpresas)))}
              onAlternar={() => alAlternar(modulo.clave)}
              onMejorar={() => alMejorar(suscripcion.aplicacion)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
