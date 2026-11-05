import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BloqueIdentidadColaborador } from './bloque_identidad_colaborador'
import { BloqueRolYPermisos } from './bloque_rol_ypermisos'
import { BloqueInformacionGeneral } from './bloque_informacion_general'
import { BloqueAplicacionesAsignadas } from './bloque_aplicaciones_asignadas'
import { BloqueHistorialColaborador } from './bloque_historial_colaborador'
import type { Colaborador } from '@/tipos/colaboradores/modelo_colaboradores'

const clases = catalogoColaboradores.clases.detalle

export function SeccionDetalleColaborador({
  colaborador,
  alCerrar,
  alEditar,
}: {
  colaborador: Colaborador
  alCerrar: () => void
  alEditar: () => void
}) {
  return (
    <aside className={clases.panel}>
      <div className={clases.cabecera_panel}>
        <h2 className={clases.titulo_panel}>{catalogoColaboradores.secciones.detalle_colaborador}</h2>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="sutil" size="md" />
      </div>

      <BloqueIdentidadColaborador colaborador={colaborador} alEditar={alEditar} />
      <BloqueRolYPermisos colaborador={colaborador} />
      <BloqueInformacionGeneral colaborador={colaborador} />
      <BloqueAplicacionesAsignadas aplicaciones={colaborador.aplicaciones} />
      {colaborador.historial && <BloqueHistorialColaborador historial={colaborador.historial} />}
    </aside>
  )
}
