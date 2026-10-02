import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BloqueEditarDatosColaborador } from './bloque_editar_datos_colaborador'
import { BloqueEditarRolPerfil } from './bloque_editar_rol_perfil'
import { BloqueEditarVigenciaAcceso } from './bloque_editar_vigencia_acceso'
import { BloqueEditarAplicaciones } from './bloque_editar_aplicaciones'
import { BloqueEditarEstadoAcceso } from './bloque_editar_estado_acceso'
import type { Colaborador, Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'

const textos = catalogoColaboradores.editar

export function SeccionEditarColaborador({
  colaborador,
  etiquetaEstado,
  aplicacionesDisponibles,
  alCerrar,
  alCancelar,
}: {
  colaborador: Colaborador
  etiquetaEstado: string
  aplicacionesDisponibles: Aplicacion[]
  alCerrar: () => void
  alCancelar: () => void
}) {
  return (
    <aside className="sticky top-22 max-1100:static w-full rounded-xl border border-gris-borde bg-white p-5 area-detalle">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="m-0 text-titulo-banner font-bold text-gris-oscuro-texto">{textos.titulo}</h2>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="sutil" size="md" />
      </div>
      <p className="m-0 mb-4 text-auxiliar text-gris-texto-secundario">{textos.subtitulo}</p>

      <BloqueEditarDatosColaborador colaborador={colaborador} />
      <BloqueEditarRolPerfil colaborador={colaborador} />
      <BloqueEditarVigenciaAcceso colaborador={colaborador} />
      <BloqueEditarAplicaciones colaborador={colaborador} disponibles={aplicacionesDisponibles} />
      <BloqueEditarEstadoAcceso colaborador={colaborador} etiquetaEstado={etiquetaEstado} />

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-t-f3f4f6 pt-4">
        <Boton type="button" variant="secundario" onClick={alCancelar}>{textosRedSocial.CANCELAR}</Boton>
        <Boton type="button" variant="primario" onClick={alCancelar}>{textos.guardar_cambios}</Boton>
      </div>
    </aside>
  )
}
