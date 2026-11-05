import { BloqueColaborador } from './bloque_colaborador'
import { CampoResumenInvitacion, FilaCorreoInvitacion, NotaAceptacionInvitacion } from './elementos_resumen_invitacion'
import { contarModulosConAcceso } from './logica_permisos_invitacion'
import { fechasDeVigencia } from './logica_vigencia_invitacion'
import { SeccionDatosDelColaborador } from './seccion_datos_del_colaborador'
import { SeccionPeriodoDeVigencia } from './seccion_periodo_de_vigencia'
import { SeccionSeleccionarNivelTitulo } from './seccion_seleccionar_nivel_titulo'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ContenidoPasoInvitacionProps } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const clases = catalogoColaboradores.clases.invitar_comun
const resumenTextos = catalogoColaboradores.campos_resumen
const CLAVES_PASOS = ['informacion', 'rol_permisos', 'vigencia', 'resumen'] as const
const MARCA = textosRedSocial.MARCA
const INICIAL_MARCA = MARCA.charAt(0)

export function ContenidoPasoInvitacion({ paso, datos, colaborador, resumen, alCambiarCampo, alEditarPaso, permisos, vigencia }: ContenidoPasoInvitacionProps) {
  const textos = catalogoColaboradores.pasos_invitar[CLAVES_PASOS[paso - 1]]
  const modulosConAcceso = contarModulosConAcceso(permisos.porModulo)
  const resumenRol = { ...datos.resumenRol, modulosTexto: modulosConAcceso === 1 ? resumenTextos.modulos_asignados_uno : resumenTextos.modulos_asignados_otros.replace(':cantidad', String(modulosConAcceso)) }
  const fechas = fechasDeVigencia(vigencia)
  const resumenVigencia = { ...datos.resumenVigencia, fechaInicio: fechas.inicio, fechaVencimiento: fechas.vencimiento }
  const correoPreview = { ...datos.correoPreview, nombrePila: colaborador.nombres.trim().split(' ')[0], vigenciaTexto: fechas.rango }

  const contenidos = {
    1: <SeccionDatosDelColaborador colaborador={colaborador} alCambiarCampo={alCambiarCampo} PASOS_FUNCIONA={datos.pasosFunciona} />,
    2: (
      <SeccionSeleccionarNivelTitulo MODULOS={datos.modulos} PERMISOS={permisos} />
    ),
    3: (
      <SeccionPeriodoDeVigencia
        VIGENCIA={vigencia}
        OPCIONES_RECORDATORIO={datos.opcionesRecordatorio}
        OPCIONES_ZONA_HORARIA={datos.opcionesZonaHoraria}
      />
    ),
    4: (
      <>
        <BloqueColaborador
          RESUMEN_COLABORADOR={resumen}
          RESUMEN_ROL={resumenRol}
          CampoResumen={CampoResumenInvitacion}
          RESUMEN_VIGENCIA={resumenVigencia}
          INICIAL_MARCA={INICIAL_MARCA}
          CORREO_PREVIEW={correoPreview}
          FilaCorreo={FilaCorreoInvitacion}
          alEditar={alEditarPaso}
        />
        <NotaAceptacionInvitacion />
      </>
    ),
  }

  return (
    <>
      <div className={clases.encabezado}>
        <h3 className={clases.encabezado_titulo}>{textos.titulo}</h3>
        <p className={clases.encabezado_subtitulo}>{textos.subtitulo}</p>
      </div>
      {contenidos[paso]}
    </>
  )
}
