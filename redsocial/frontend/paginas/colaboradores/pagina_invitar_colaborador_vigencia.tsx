import { BotonIcono, Boton, EstructuraApp } from '../../componentes/compartido'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { navegar } from '../../rutas/compartido/navegacion'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { VIGENCIA_DEFAULT, OPCIONES_RECORDATORIO, OPCIONES_ZONA_HORARIA } from '../../rutas/colaboradores/rutas_colaboradores'
import { BloqueInvitarColaboradorVigencia1, SeccionPeriodoDeVigencia } from '../../componentes/colaboradores'

const NAVEGAR_A = navegar


export function PaginaInvitarColaboradorVigencia() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <div className="mx-auto my-5 max-w-240 overflow-hidden rounded-2xl bg-white shadow-t13 max-960:m-3 max-960:rounded-xl max-480:m-1">
        <div className="flex items-start justify-between px-7 pt-6 max-768:px-4 max-768:pt-4 max-480:px-3 max-480:pt-3">
          <div>
            <h1 className="m-0 mb-1 text-titulo-pagina font-bold text-gris-oscuro-texto">{catalogoColaboradores.titulos.invitar_vigencia}</h1>
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

        <BloqueInvitarColaboradorVigencia1 />

        <div className="px-7 pt-5 max-768:px-4">
          <h2 className="m-0 mb-1 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.pasos_invitar.vigencia.titulo}</h2>
          <p className="m-0 text-subtitulo leading-snug text-gris-texto-secundario">{catalogoColaboradores.pasos_invitar.vigencia.subtitulo}</p>
        </div>

        <SeccionPeriodoDeVigencia
          VIGENCIA_DEFAULT={VIGENCIA_DEFAULT}
          OPCIONES_RECORDATORIO={OPCIONES_RECORDATORIO}
          OPCIONES_ZONA_HORARIA={OPCIONES_ZONA_HORARIA}
        />

        <div className="flex items-center justify-end gap-3 border-t border-gris-borde px-7 py-4 max-768:flex-col-reverse max-480:px-3 max-480:py-2.5">
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.listado)} variant="secundario" size="md" className="max-768:w-full max-768:justify-center max-480:px-3 max-480:py-2.25">
            {textosRedSocial.CANCELAR}
          </Boton>
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.invitar_rol_permisos)} variant="secundario" size="md" className="max-768:w-full max-768:justify-center max-480:px-3 max-480:py-2.25">
            <span>‹</span> {catalogoColaboradores.campos_rol_permisos.anterior}
          </Boton>
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.invitar_resumen)} variant="primario" size="md" className="max-768:w-full max-768:justify-center max-480:px-3 max-480:py-2.25">
            {textosRedSocial.SIGUIENTE} <span>›</span>
          </Boton>
        </div>
      </div>
    </EstructuraApp>
  )
}
