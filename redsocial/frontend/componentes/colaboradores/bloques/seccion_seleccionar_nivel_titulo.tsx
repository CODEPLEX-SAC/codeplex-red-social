import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../compartido/icono'
import { SeccionSeleccionarNivelTitulo2 } from './seccion_seleccionar_nivel_titulo2'
import type { Modulo, FilaPermiso, ClavePermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

export function SeccionSeleccionarNivelTitulo({
  MODULOS,
  PERFIL_APLICADO,
  PERFILES_NIVEL_RAPIDO,
  FILAS,
  CeldaPermiso,
}: {
  MODULOS: Modulo[]
  PERFIL_APLICADO: string
  PERFILES_NIVEL_RAPIDO: string[]
  FILAS: FilaPermiso[]
  CeldaPermiso: ({ columna, activa }: { columna: { clave: ClavePermiso; icono: string; color: string; etiqueta: string; }; activa: boolean; }) => React.JSX.Element
}) {
  return (
    <div className="grid grid-cols-240-1fr min-h-100 max-960:grid-cols-1">
      <aside className="border-r border-gris-borde py-6 max-960:flex max-960:gap-1 max-960:overflow-x-auto max-960:border-b max-960:border-r-0 max-960:px-4 max-960:py-3">
        <p className="mb-2 px-5 text-subtitulo font-semibold text-gris-texto max-960:hidden">{catalogoColaboradores.campos_rol_permisos.seleccionar_modulo}</p>
        <ul className="m-0 list-none p-0 max-960:flex max-960:gap-1">
          {MODULOS.map((m) => (
            <li
              key={m.nombre}
              className={
                'relative flex cursor-pointer items-center gap-3 px-5 py-3 hover:bg-t-f9fafb max-960:flex-shrink-0 max-960:px-3 max-960:py-2 ' +
                (m.activo ? 'bg-t-f0f0ff' : '')
              }
            >
              {m.activo && <span className="absolute inset-y-0 left-0 w-0.75 bg-primario" />}
              <div className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ${m.clase}`}>
                <Icono name={m.icono} className="w-4.5 h-4.5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className={'text-nombre-entidad font-semibold ' + (m.activo ? 'text-primario' : 'text-gris-oscuro-texto')}>{m.nombre}</span>
                <span className="truncate text-auxiliar text-gris-texto-terciario max-960:hidden">{m.descripcion}</span>
              </div>
              {m.activo && (
                <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primario">
                  <Icono name="verificado" className="w-3 h-3 text-white" />
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="mx-4 mt-4 rounded-lg border border-t-bfdbfe bg-t-f0f7ff px-3 py-2.5 max-960:hidden">
          <p className="m-0 text-auxiliar leading-snug text-t-1e40af">
            {catalogoColaboradores.campos_rol_permisos.nota_modulo}
          </p>
        </div>
      </aside>

      <SeccionSeleccionarNivelTitulo2
        PERFIL_APLICADO={PERFIL_APLICADO}
        PERFILES_NIVEL_RAPIDO={PERFILES_NIVEL_RAPIDO}
        FILAS={FILAS}
        CeldaPermiso={CeldaPermiso}
      />
    </div>
  )
}
