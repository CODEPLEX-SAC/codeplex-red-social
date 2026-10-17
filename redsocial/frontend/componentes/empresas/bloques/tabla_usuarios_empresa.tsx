import { CLASES_TABLA, claseEncabezadoTabla } from '../../compartido/clases_tabla'
import { FilaUsuarioEmpresa } from './fila_usuario_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { TablaUsuariosEmpresaProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const textos = catalogoEmpresas.usuarios_empresa
const ENCABEZADOS = Object.values(textos.tabla)
const encabezado = claseEncabezadoTabla(catalogoEmpresas.clases.relleno_encabezado)

export function TablaUsuariosEmpresa({ listado, editable, edicionUsuarios }: TablaUsuariosEmpresaProps) {
  const mensaje = listado.hayUsuarios ? textos.sin_resultados : textos.vacio
  const columnas = ENCABEZADOS.length + (editable ? 1 : 0)

  return (
    <div className={CLASES_TABLA.contenedor}>
      <table className={textos.clases.tabla}>
        <thead>
          <tr>
            {ENCABEZADOS.map((texto) => (
              <th key={texto} className={encabezado}>{texto}</th>
            ))}
            {editable ? <th className={encabezado}>{textos.columna_acciones}</th> : null}
          </tr>
        </thead>
        <tbody>
          {listado.filas.length === 0 ? (
            <tr>
              <td colSpan={columnas} className={CLASES_TABLA.mensajeVacio}>{mensaje}</td>
            </tr>
          ) : (
            listado.filas.map((usuario) => <FilaUsuarioEmpresa key={usuario.correo} usuario={usuario} editable={editable} edicionUsuarios={edicionUsuarios} />)
          )}
        </tbody>
      </table>
    </div>
  )
}
