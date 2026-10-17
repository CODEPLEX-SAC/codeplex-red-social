import { Casilla } from '../../compartido/interfaz/casilla'
import { CLASES_TABLA, claseEncabezadoTabla } from '../../compartido/clases_tabla'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BloqueReenviar } from './bloque_reenviar'
import type { TablaColaboradoresProps } from '@/tipos/colaboradores/contrato_listado_colaboradores'

const encabezado = claseEncabezadoTabla(catalogoColaboradores.clases_tabla.relleno_encabezado)

export function TablaColaboradores({ datos, tabla, filas }: TablaColaboradoresProps) {
  const {
    ESTADO_CLASES,
    ROL_CLASES,
    setMenuAbierto,
    setAnclaMenu,
    menuAbierto,
    anclaMenu,
    cerrarMenus,
    alVerColaborador,
    alEditarColaborador,
    alConfirmarBaja,
    alReenviar,
  } = datos

  return (
    <div className={CLASES_TABLA.contenedor}>
      <table className={CLASES_TABLA.tabla}>
        <thead className="bg-fondo">
          <tr>
            <th className={`${encabezado} w-10 text-center`}>
              <Casilla
                seleccionado={tabla.getIsAllPageRowsSelected()}
                indeterminado={tabla.getIsSomePageRowsSelected() && !tabla.getIsAllPageRowsSelected()}
                alCambiar={(_, marcado) => tabla.toggleAllPageRowsSelected(marcado)}
                inputProps={{ 'aria-label': catalogoColaboradores.botones.seleccionar_todos }}
              />
            </th>
            <th className={encabezado}>{catalogoColaboradores.tabla.colaborador}</th>
            <th className={encabezado}>{catalogoColaboradores.tabla.rol_perfil}</th>
            <th className={encabezado}>{catalogoColaboradores.tabla.aplicaciones}</th>
            <th className={encabezado}>{catalogoColaboradores.tabla.estado}</th>
            <th className={encabezado}>{catalogoColaboradores.tabla.vigencia}</th>
            <th className={encabezado}>{catalogoColaboradores.tabla.acciones}</th>
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 && (
            <tr>
              <td colSpan={7} className={CLASES_TABLA.mensajeVacio}>{catalogoColaboradores.mensajes.sin_colaboradores}</td>
            </tr>
          )}
          {filas.map((fila, i) => {
            const c = fila.original
            const estado = ESTADO_CLASES[c.estado]
            return (
              <BloqueReenviar key={fila.id}
                datos={{
                  c,
                  ROL_CLASES,
                  estado,
                  setMenuAbierto,
                  i,
                  setAnclaMenu,
                  menuAbierto,
                  anclaMenu,
                  cerrarMenus,
                  alVerColaborador,
                  alEditarColaborador,
                  alConfirmarBaja,
                  alReenviar,
                  seleccionado: fila.getIsSelected(),
                  alCambiarSeleccion: (_, marcado) => fila.toggleSelected(marcado),
                }}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
