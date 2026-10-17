import { Casilla } from '../../compartido/interfaz/casilla'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { CLASES_TABLA, claseEncabezadoTabla } from '../../compartido/clases_tabla'
import { FilaEmpresa } from './fila_empresa'
import type { TablaEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const ENCABEZADOS = Object.values(catalogoEmpresas.tabla)
const encabezado = claseEncabezadoTabla(catalogoEmpresas.clases.relleno_encabezado)

export function TablaEmpresas({ listado, alElegirAccion }: TablaEmpresasProps) {
  return (
    <div className={CLASES_TABLA.contenedor}>
      <table className={CLASES_TABLA.tabla}>
        <thead>
          <tr>
            <th className={`${encabezado} w-10 text-center`}>
              <Casilla
                seleccionado={listado.todasSeleccionadas}
                indeterminado={listado.algunasSeleccionadas}
                alCambiar={(_, marcado) => listado.alternarTodas(marcado)}
                inputProps={{ 'aria-label': catalogoEmpresas.campos.seleccionar_todas }}
              />
            </th>
            {ENCABEZADOS.map((texto) => (
              <th key={texto} className={encabezado}>{texto}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listado.filas.length === 0 ? (
            <tr>
              <td colSpan={ENCABEZADOS.length + 1} className={CLASES_TABLA.mensajeVacio}>{catalogoEmpresas.mensajes.sin_empresas}</td>
            </tr>
          ) : (
            listado.filas.map((empresa) => (
              <FilaEmpresa key={empresa.codigo} empresa={empresa} seleccionada={listado.seleccionadas.includes(empresa.codigo)} alAlternar={listado.alternarFila} alElegirAccion={alElegirAccion} />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
