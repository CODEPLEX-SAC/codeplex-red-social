import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { TextoColor } from '../../compartido/interfaz/texto_color'
import { Icono } from '../../compartido/icono'
import type { ClavePermiso } from '../../../tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import type { IconName } from '../../../tipos/compartido/contrato_icono'
import type { FilaPermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const COLUMNAS: { clave: ClavePermiso; icono: IconName; color: string; etiqueta: string }[] = catalogoColaboradores.columnas_permisos as { clave: ClavePermiso; icono: IconName; color: string; etiqueta: string }[]

export function BloqueColumnaPermiso({
  FILAS,
  CeldaPermiso,
}: {
  FILAS: FilaPermiso[]
  CeldaPermiso: ({ columna, activa }: { columna: { clave: ClavePermiso; icono: string; color: string; etiqueta: string; }; activa: boolean; }) => React.JSX.Element
}) {
  return (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse text-cuerpo">
        <thead>
          <tr>
            <th className="min-w-45 whitespace-nowrap border-b border-gris-borde py-2 pr-1.5 text-left text-encabezado-tabla font-semibold text-gris-texto-secundario">{catalogoColaboradores.campos_rol_permisos.columna_permiso}</th>
            {COLUMNAS.map((c) => (
              <th key={c.clave} className="whitespace-nowrap border-b border-gris-borde px-1.5 py-2 text-center text-encabezado-tabla font-semibold text-gris-texto-secundario">
                {c.etiqueta} <TextoColor as="span" variante={c.color} className="inline-block align-middle"><Icono name={c.icono} className="inline-block w-4 h-4 align-middle" /></TextoColor>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FILAS.map((fila) => (
            <tr key={fila.nombre}>
              <td className="border-b border-t-f3f4f6 py-2.5 pr-1.5 text-left align-middle">
                <div className="flex flex-col gap-px">
                  <span className="flex items-center gap-1.5 text-campo-formulario font-semibold text-gris-oscuro-texto">
                    <span className="text-r7 text-gris-texto-terciario">›</span> {fila.nombre}
                  </span>
                  <span className="text-auxiliar text-gris-texto-terciario">{fila.descripcion}</span>
                </div>
              </td>
              {COLUMNAS.map((c) => (
                <td key={c.clave} className="border-b border-t-f3f4f6 px-1.5 py-2.5 text-center align-middle">
                  <CeldaPermiso columna={c} activa={fila.activos.includes(c.clave)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
