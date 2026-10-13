import { BloqueColaborador } from './bloque_colaborador'
import { CeldaPermisoInvitacion } from './celda_permiso_invitacion'
import { CampoResumenInvitacion, FilaCorreoInvitacion, NotaAceptacionInvitacion } from './elementos_resumen_invitacion'
import { SeccionDatosDelColaborador } from './seccion_datos_del_colaborador'
import { SeccionPeriodoDeVigencia } from './seccion_periodo_de_vigencia'
import { SeccionSeleccionarNivelTitulo } from './seccion_seleccionar_nivel_titulo'
import catalogoColaboradores from '../../../catalogos/capacidades/redsocial/colaboradores.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import type { ContenidoPasoInvitacionProps } from '@/tipos/colaboradores/contrato_invitar_colaborador'

const CLAVES_PASOS = ['informacion', 'rol_permisos', 'vigencia', 'resumen'] as const
const MARCA = textosRedSocial.MARCA
const INICIAL_MARCA = MARCA.charAt(0)

export function ContenidoPasoInvitacion({ paso, datos, colaborador, resumen, alCambiarCampo, alEditarPaso }: ContenidoPasoInvitacionProps) {
  const textos = catalogoColaboradores.pasos_invitar[CLAVES_PASOS[paso - 1]]
  const correoPreview = { ...datos.correoPreview, nombrePila: colaborador.nombres.trim().split(' ')[0] }

  const contenidos = {
    1: <SeccionDatosDelColaborador colaborador={colaborador} alCambiarCampo={alCambiarCampo} PASOS_FUNCIONA={datos.pasosFunciona} />,
    2: (
      <SeccionSeleccionarNivelTitulo
        MODULOS={datos.modulos}
        PERFIL_APLICADO={datos.perfilAplicado}
        PERFILES_NIVEL_RAPIDO={datos.perfilesNivelRapido}
        FILAS={datos.filas}
        CeldaPermiso={CeldaPermisoInvitacion}
      />
    ),
    3: (
      <SeccionPeriodoDeVigencia
        VIGENCIA_DEFAULT={datos.vigencia}
        OPCIONES_RECORDATORIO={datos.opcionesRecordatorio}
        OPCIONES_ZONA_HORARIA={datos.opcionesZonaHoraria}
      />
    ),
    4: (
      <>
        <BloqueColaborador
          RESUMEN_COLABORADOR={resumen}
          RESUMEN_ROL={datos.resumenRol}
          CampoResumen={CampoResumenInvitacion}
          RESUMEN_VIGENCIA={datos.resumenVigencia}
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
      <div className="px-7 pt-5 max-768:px-4">
        <h3 className="m-0 mb-1 text-nombre-entidad text-texto">{textos.titulo}</h3>
        <p className="m-0 text-subtitulo leading-texto text-texto-suave">{textos.subtitulo}</p>
      </div>
      {contenidos[paso]}
    </>
  )
}
