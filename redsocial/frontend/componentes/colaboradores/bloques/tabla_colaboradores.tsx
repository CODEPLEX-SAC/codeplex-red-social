import { CLASES_TABLA, claseEncabezadoTabla } from '../../compartido/clases_tabla'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BloqueReenviar } from './bloque_reenviar'
import type { TablaColaboradoresProps } from '@/tipos/colaboradores/contrato_listado_colaboradores'

const encabezado = claseEncabezadoTabla()

const COLUMNAS = Object.keys(catalogoColaboradores.tabla).length

export function TablaColaboradores({ datos, filas }: TablaColaboradoresProps) {
  const {
    alVerColaborador,
    alEditarColaborador,
    alConfirmarBaja,
    alReenviar,
  } = datos

  return (
    <div className={CLASES_TABLA.contenedor}>
      <table className={CLASES_TABLA.tabla}>
        <thead>
          <tr>
            <th className={encabezado}>{catalogoColaboradores.tabla.colaborador}</th>
            <th className={encabezado}>{catalogoColaboradores.tabla.rol_perfil}</th>
            <th className={encabezado}>{catalogoColaboradores.tabla.aplicaciones}</th>
            <th className={encabezado}>{catalogoColaboradores.tabla.estado}</th>
            <th className={encabezado}>{catalogoColaboradores.tabla.vigencia}</th>
            <th className={`${encabezado} ${CLASES_TABLA.celdaFija}`}>{catalogoColaboradores.tabla.acciones}</th>
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 && (
            <tr>
              <td colSpan={COLUMNAS} className={CLASES_TABLA.mensajeVacio}>{catalogoColaboradores.mensajes.sin_colaboradores}</td>
            </tr>
          )}
          {filas.map((fila) => {
            const c = fila.original
            return (
              <BloqueReenviar key={fila.id}
                datos={{
                  c,
                  alVerColaborador,
                  alEditarColaborador,
                  alConfirmarBaja,
                  alReenviar,
                }}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
