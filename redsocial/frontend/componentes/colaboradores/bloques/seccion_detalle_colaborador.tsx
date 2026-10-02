import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BloqueIdentidadColaborador } from './bloque_identidad_colaborador'
import { BloqueRolYPermisos } from './bloque_rol_ypermisos'
import { BloqueInformacionGeneral } from './bloque_informacion_general'
import { BloqueAplicacionesAsignadas } from './bloque_aplicaciones_asignadas'
import { BloqueHistorialColaborador } from './bloque_historial_colaborador'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

export function SeccionDetalleColaborador({
  colaborador,
  estado,
  alCerrar,
  alEditar,
}: {
  colaborador: Colaborador
  estado: { insignia: string; etiqueta: string }
  alCerrar: () => void
  alEditar: () => void
}) {
  return (
    <aside className="sticky top-22 max-1100:static w-full rounded-xl border border-gris-borde bg-white p-5 area-detalle">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="m-0 text-titulo-banner font-bold text-gris-oscuro-texto">{catalogoColaboradores.secciones.detalle_colaborador}</h2>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="sutil" size="md" />
      </div>

      <BloqueIdentidadColaborador colaborador={colaborador} estado={estado} alEditar={alEditar} />
      <BloqueRolYPermisos colaborador={colaborador} />
      <BloqueInformacionGeneral colaborador={colaborador} />
      <BloqueAplicacionesAsignadas aplicaciones={colaborador.aplicaciones} masApps={colaborador.masApps} />
      {colaborador.historial && <BloqueHistorialColaborador historial={colaborador.historial} />}
    </aside>
  )
}
