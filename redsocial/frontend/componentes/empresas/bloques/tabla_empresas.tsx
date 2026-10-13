import { Casilla } from '../../compartido/interfaz/casilla'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import { FilaEmpresa } from './fila_empresa'
import type { TablaEmpresasProps } from '@/tipos/empresas/contrato_listado_empresas'

const ENCABEZADOS = Object.values(catalogoEmpresas.tabla)
const encabezado = catalogoEmpresas.clases.encabezado

const mensajeVacio = catalogoEmpresas.clases.mensaje_vacio

export function TablaEmpresas({ listado, alElegirAccion }: TablaEmpresasProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gris-borde bg-white">
      <table className="w-full border-collapse text-cuerpo">
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
              <td colSpan={ENCABEZADOS.length + 1} className={mensajeVacio}>{catalogoEmpresas.mensajes.sin_empresas}</td>
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
