import { BotonIcono, Boton, EstructuraApp } from '../../componentes/compartido'
import { Fragment } from 'react'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { navegar } from '../../rutas/compartido/navegacion'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { PASOS_FUNCIONA_INVITAR_COLABORADOR, FORM_INFORMACION_DEFAULT } from '../../rutas/colaboradores/rutas_colaboradores'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import { SeccionDatosDelColaborador } from '../../componentes/colaboradores'

const NAVEGAR_A = navegar

const PASOS_FUNCIONA = PASOS_FUNCIONA_INVITAR_COLABORADOR
const STEPPER = catalogoColaboradores.stepper_invitar

export function PaginaInvitarColaboradorInformacion() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <div className="mx-auto my-5 max-w-240 overflow-hidden rounded-2xl bg-white shadow-t13 max-960:m-3 max-960:rounded-xl max-480:m-1">
        <div className="flex items-start justify-between px-7 pt-6 max-768:px-4 max-768:pt-4 max-480:px-3 max-480:pt-3">
          <div>
            <h1 className="m-0 mb-1 text-titulo-pagina font-bold text-gris-oscuro-texto">{catalogoColaboradores.titulos.invitar}</h1>
            <p className="m-0 max-w-125 text-subtitulo leading-snug text-gris-texto-secundario">
              {catalogoColaboradores.subtitulos.invitar_asistente}
            </p>
          </div>
          <div className="flex flex-none items-center gap-2 max-768:gap-1">
            <BotonIcono icono="ajustes-sistema" type="button" title={textosRedSocial.CONFIGURACION} aria-label={textosRedSocial.CONFIGURACION} variant="sutil" size="default" />
            <BotonIcono icono={'aplicaciones' as IconName} type="button" title={textosRedSocial.APLICACIONES} aria-label={textosRedSocial.APLICACIONES} variant="sutil" size="default" />
            <BotonIcono icono="campana" type="button" title={textosRedSocial.AVISO_CAMPANA} aria-label={textosRedSocial.AVISO_CAMPANA} variant="sutil" size="default" />
            <BotonIcono icono="cerrar" type="button" title={textosRedSocial.CERRAR} onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.listado)} aria-label={textosRedSocial.CERRAR} variant="sutil" size="default" />
          </div>
        </div>

        <nav className="flex items-center gap-0 px-7 pt-5 max-960:overflow-x-auto max-960:scrollbar-oculto max-768:px-4 max-768:pt-3.5 max-480:px-3 max-480:pt-2.5">
          {STEPPER.map((paso, i) => (
            <Fragment key={paso}>
              <div className="flex flex-none items-center gap-2">
                <span
                  className={
                    'flex h-7 w-7 flex-none items-center justify-center rounded-full text-contador font-bold transition-all max-480:h-6 max-480:w-6 ' +
                    (i === 0 ? 'bg-primario text-white' : '')
                  }
                >
                  {i + 1}
                </span>
                <span
                  className={
                    'whitespace-nowrap text-navegacion ' +
                    (i === 0 ? 'font-semibold text-gris-oscuro-texto' : 'font-medium text-gris-categoria')
                  }
                >
                  {paso}
                </span>
              </div>
              {i < STEPPER.length - 1 && <span className="mx-3 h-0.5 flex-1 bg-gris-borde max-480:mx-2" />}
            </Fragment>
          ))}
        </nav>

        <div className="px-7 pt-5 max-768:px-4">
          <h2 className="m-0 mb-1 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.pasos_invitar.informacion.titulo}</h2>
          <p className="m-0 text-subtitulo leading-snug text-gris-texto-secundario">{catalogoColaboradores.pasos_invitar.informacion.subtitulo}</p>
        </div>

        <SeccionDatosDelColaborador
          FORM_INFORMACION_DEFAULT={FORM_INFORMACION_DEFAULT}
          PASOS_FUNCIONA={PASOS_FUNCIONA}
        />

        <div className="flex items-center justify-end gap-3 border-t border-gris-borde px-7 py-4 max-480:px-3 max-480:py-2.5">
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.listado)} variant="secundario" size="md" className="max-480:px-3 max-480:py-2.25">
            {textosRedSocial.CANCELAR}
          </Boton>
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.invitar_rol_permisos)} variant="primario" size="md" className="max-480:px-3 max-480:py-2.25">
            {textosRedSocial.SIGUIENTE} <span>›</span>
          </Boton>
        </div>
      </div>
    </EstructuraApp>
  )
}
