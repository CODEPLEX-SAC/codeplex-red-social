import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { Boton } from '../../compartido/interfaz/boton'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { BloqueEditarDatosColaborador } from './bloque_editar_datos_colaborador'
import { BloqueEditarRolPerfil } from './bloque_editar_rol_perfil'
import { BloqueEditarVigenciaAcceso } from './bloque_editar_vigencia_acceso'
import { BloqueEditarAplicaciones } from './bloque_editar_aplicaciones'
import { BloqueEditarEstadoAcceso } from './bloque_editar_estado_acceso'
import { usarEdicionColaborador } from './usar_edicion_colaborador'
import type { Colaborador, Aplicacion } from '@/tipos/colaboradores/modelo_colaboradores'
import type { BorradorColaborador } from '@/tipos/colaboradores/contrato_gestion_colaboradores'

const textos = catalogoColaboradores.editar
const clases = catalogoColaboradores.clases.edicion
const detalle = catalogoColaboradores.clases.detalle

export function SeccionEditarColaborador({
  colaborador,
  colaboradores,
  aplicacionesDisponibles,
  alCerrar,
  alCancelar,
  alGuardar,
}: {
  colaborador: Colaborador
  colaboradores: Colaborador[]
  aplicacionesDisponibles: Aplicacion[]
  alCerrar: () => void
  alCancelar: () => void
  alGuardar: (borrador: BorradorColaborador) => void
}) {
  const { borrador, cambiar, descripcionRol, valido, etiquetaEstado, elegirEstado } = usarEdicionColaborador(colaborador, colaboradores)

  return (
    <aside className={detalle.panel}>
      <div className={clases.cabecera_panel}>
        <h2 className={detalle.titulo_panel}>{textos.titulo}</h2>
        <BotonIcono icono="cerrar" type="button" aria-label={textosRedSocial.CERRAR} onClick={alCerrar} variant="sutil" size="md" />
      </div>
      <p className={clases.subtitulo_panel}>{textos.subtitulo}</p>

      <BloqueEditarDatosColaborador borrador={borrador} alCambiar={cambiar} />
      <BloqueEditarRolPerfil borrador={borrador} descripcionRol={descripcionRol} alCambiar={cambiar} />
      <BloqueEditarVigenciaAcceso colaborador={colaborador} borrador={borrador} alCambiar={cambiar} />
      <BloqueEditarAplicaciones borrador={borrador} disponibles={aplicacionesDisponibles} alCambiar={cambiar} />
      <BloqueEditarEstadoAcceso borrador={borrador} etiquetaEstado={etiquetaEstado} alElegirEstado={elegirEstado} />

      <div className={clases.pie_acciones}>
        <Boton type="button" variant="secundario" size="md" onClick={alCancelar}>{textosRedSocial.CANCELAR}</Boton>
        <Boton type="button" variant="primario" size="md" disabled={!valido} onClick={() => alGuardar(borrador)}>{textos.guardar_cambios}</Boton>
      </div>
    </aside>
  )
}
