import { FilaUsuarioEmpresa } from './fila_usuario_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { TablaUsuariosEmpresaProps } from '@/tipos/empresas/contrato_usuarios_empresa'

const textos = catalogoEmpresas.usuarios_empresa
const ENCABEZADOS = Object.values(textos.tabla)
const encabezado = catalogoEmpresas.clases.encabezado

const mensajeVacio = catalogoEmpresas.clases.mensaje_vacio

export function TablaUsuariosEmpresa({ listado, editable, edicionUsuarios }: TablaUsuariosEmpresaProps) {
  const mensaje = listado.hayUsuarios ? textos.sin_resultados : textos.vacio
  const columnas = ENCABEZADOS.length + (editable ? 1 : 0)

  return (
    <div className="overflow-x-auto rounded-xl border border-borde bg-white">
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
              <td colSpan={columnas} className={mensajeVacio}>{mensaje}</td>
            </tr>
          ) : (
            listado.filas.map((usuario) => <FilaUsuarioEmpresa key={usuario.correo} usuario={usuario} editable={editable} edicionUsuarios={edicionUsuarios} />)
          )}
        </tbody>
      </table>
    </div>
  )
}
