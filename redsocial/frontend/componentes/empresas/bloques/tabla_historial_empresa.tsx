import { Insignia } from '../../compartido/interfaz/insignia'
import { AvatarUsuarioEmpresa } from './avatar_usuario_empresa'
import catalogoEmpresas from '../../../catalogos/capacidades/redsocial/empresas.json'
import type { ListadoHistorialProps } from '@/tipos/empresas/contrato_historial_empresa'

const textos = catalogoEmpresas.historial_empresa
const ENCABEZADOS = Object.values(textos.tabla)
const ETIQUETAS_TIPO: Record<string, string> = textos.tipos
const CLASES_TIPO: Record<string, string> = textos.clases.tipo
const encabezado = catalogoEmpresas.clases.encabezado
const celda = catalogoEmpresas.clases.celda

const mensajeVacio = catalogoEmpresas.clases.mensaje_vacio
const textoAuxiliar = catalogoEmpresas.clases.texto_auxiliar
const textoCelda = catalogoEmpresas.clases.texto_celda
const nombreFila = catalogoEmpresas.clases.nombre_fila

export function TablaHistorialEmpresa({ listado }: ListadoHistorialProps) {
  const mensaje = listado.hayRegistros ? textos.sin_resultados : textos.vacio

  return (
    <div className="overflow-x-auto rounded-xl border border-borde bg-white">
      <table className="w-full border-collapse text-cuerpo">
        <thead className={textos.clases.encabezado}>
          <tr>
            {ENCABEZADOS.map((texto) => (
              <th key={texto} className={encabezado}>{texto}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listado.filas.length === 0 ? (
            <tr>
              <td colSpan={ENCABEZADOS.length} className={mensajeVacio}>{mensaje}</td>
            </tr>
          ) : (
            listado.filas.map((registro) => (
              <tr key={registro.fecha + registro.hora + registro.accion} className={catalogoEmpresas.clases.fila}>
                <td className={`${celda} whitespace-nowrap`}>
                  <span className={`block ${textoCelda}`}>{registro.fecha}</span>
                  <span className={`block ${textoAuxiliar}`}>{registro.hora}</span>
                </td>
                <td className={celda}>
                  <div className="flex items-center gap-3">
                    <AvatarUsuarioEmpresa usuario={{ nombre: registro.usuario }} />
                    <span className={nombreFila}>{registro.usuario}</span>
                  </div>
                </td>
                <td className={`${celda} min-w-40 ${textoCelda}`}>{registro.accion}</td>
                <td className={`${celda} min-w-52 ${textoCelda}`}>{registro.detalle}</td>
                <td className={celda}>
                  <Insignia variant="status" className={CLASES_TIPO[registro.tipo]}>{ETIQUETAS_TIPO[registro.tipo]}</Insignia>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
