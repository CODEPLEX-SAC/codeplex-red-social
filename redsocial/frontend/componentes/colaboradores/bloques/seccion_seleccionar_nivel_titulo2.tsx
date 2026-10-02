import { Icono } from '../../compartido/icono'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { Selector } from '../../compartido/interfaz/selector'
import { Boton } from '../../compartido/interfaz/boton'
import { BloqueColumnaPermiso } from './bloque_columna_permiso'
import type { ClavePermiso } from '../../../tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'
import type { IconName } from '../../../tipos/compartido/contrato_icono'
import type { FilaPermiso } from '@/tipos/colaboradores/modelo_invitar_colaborador_rol_permisos'

const COLUMNAS: { clave: ClavePermiso; icono: IconName; color: string; etiqueta: string }[] = catalogoColaboradores.columnas_permisos as { clave: ClavePermiso; icono: IconName; color: string; etiqueta: string }[]
const CLASES_RADIO: Record<ClavePermiso, { bg: string; punto: string }> = {
  'sin-acceso': { bg: 'bg-t-fef2f2 border-rojo-categoria', punto: 'bg-rojo-categoria' },
  ver: { bg: 'bg-t-eff6ff border-azul-categoria', punto: 'bg-azul-categoria' },
  crear: { bg: 'bg-t-ecfdf5 border-t-10b981', punto: 'bg-t-10b981' },
  editar: { bg: 'bg-t-fff7ed border-naranja-categoria', punto: 'bg-naranja-categoria' },
  eliminar: { bg: 'bg-t-fef2f2 border-rojo-categoria', punto: 'bg-rojo-categoria' },
  imprimir: { bg: 'bg-t-f5f3ff border-violeta-categoria', punto: 'bg-violeta-categoria' },
  exportar: { bg: 'bg-t-ecfdf5 border-t-10b981', punto: 'bg-t-10b981' },
}

export function SeccionSeleccionarNivelTitulo2({
  PERFIL_APLICADO,
  PERFILES_NIVEL_RAPIDO,
  FILAS,
  CeldaPermiso,
}: {
  PERFIL_APLICADO: string
  PERFILES_NIVEL_RAPIDO: string[]
  FILAS: FilaPermiso[]
  CeldaPermiso: ({ columna, activa }: { columna: { clave: ClavePermiso; icono: string; color: string; etiqueta: string; }; activa: boolean; }) => React.JSX.Element
}) {
  return (
    <div className="flex flex-col p-7 max-960:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 rounded-control bg-t-f9fafb px-4 py-3.5 max-960:flex-col max-960:items-start">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primario">
            <Icono name="inicio-sesion" className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="m-0 text-titulo-seccion font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_rol_permisos.seleccionar_nivel_titulo}</h3>
            <p className="m-0 mt-0.5 text-auxiliar text-gris-texto-terciario">{catalogoColaboradores.campos_rol_permisos.seleccionar_nivel_subtitulo}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 max-960:w-full max-960:flex-col max-960:items-start">
          <Selector
            variant="colaboradores"
            aria-label={catalogoColaboradores.campos_rol_permisos.seleccionar_nivel_titulo}
            defaultValue={PERFIL_APLICADO}
            className="min-w-50 max-960:w-full"
          >
            {PERFILES_NIVEL_RAPIDO.map((p) => <option key={p}>{p}</option>)}
          </Selector>
          <a href="#" className="flex items-center gap-1 whitespace-nowrap text-enlace-accion font-medium text-primario no-underline hover:underline">
            {catalogoColaboradores.campos_rol_permisos.ver_perfiles} <Icono name="aviso" className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-2 rounded-lg border border-t-a7f3d0 bg-t-ecfdf5 px-3.5 py-2.5 max-960:flex-col max-960:items-start">
        <div className="flex items-center gap-2">
          <Icono name="verificado" className="w-4.5 h-4.5 text-t-059669" />
          <span className="text-etiqueta-estado font-semibold text-t-065f46">
            {catalogoColaboradores.campos_rol_permisos.perfil_aplicado_prefijo} <strong className="font-bold">{PERFIL_APLICADO}</strong>
          </span>
        </div>
        <span className="text-auxiliar text-t-059669">{catalogoColaboradores.campos_rol_permisos.perfil_aplicado_nota}</span>
      </div>

      <BloqueColumnaPermiso FILAS={FILAS} CeldaPermiso={CeldaPermiso} />

      <div className="mt-2 flex items-center justify-between gap-3 max-960:flex-col max-960:items-start">
        <Boton type="button" variant="secundario" size="default">
          <Icono name="configuracion" className="w-3.5 h-3.5" /> {catalogoColaboradores.campos_rol_permisos.restablecer_permisos}
        </Boton>
        <div className="flex flex-wrap items-center gap-3.5">
          {COLUMNAS.map((c) => (
            <span key={c.clave} className="flex items-center gap-1.5 text-campo-formulario text-gris-texto-secundario">
              <span className={'h-2 w-2 rounded-full ' + CLASES_RADIO[c.clave].punto} /> {c.etiqueta}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
