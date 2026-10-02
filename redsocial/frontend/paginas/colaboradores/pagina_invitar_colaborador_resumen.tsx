import { BotonIcono, Boton, Icono, EstructuraApp } from '../../componentes/compartido'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { navegar } from '../../rutas/compartido/navegacion'
import { RESUMEN_COLABORADOR, RESUMEN_ROL, RESUMEN_VIGENCIA, CORREO_PREVIEW } from '../../rutas/colaboradores/rutas_colaboradores'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import type { IconName } from '../../tipos/compartido/contrato_icono'
import { BloqueInvitarColaboradorResumen1, BloqueColaborador } from '../../componentes/colaboradores'

const NOMBRE_MARCA = textosRedSocial.MARCA
const INICIAL_MARCA = NOMBRE_MARCA.charAt(0)

const NAVEGAR_A = navegar


function CampoResumen({ etiqueta, valor, ancho }: { etiqueta: string; valor: string; ancho?: 'completo' }) {
  return (
    <div className={'flex flex-col gap-0.5 ' + (ancho === 'completo' ? 'col-span-2' : '')}>
      <span className="text-auxiliar text-gris-texto-secundario">{etiqueta}</span>
      <span className="text-campo-formulario font-semibold text-gris-oscuro-texto">{valor}</span>
    </div>
  )
}

function FilaCorreo({ icono, etiqueta, valor }: { icono: IconName; etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-t-f3f4f6 py-2 last:border-b-0">
      <Icono name={icono} className="w-4.5 h-4.5 flex-none text-primario" />
      <span className="min-w-25 text-auxiliar text-gris-texto-secundario">{etiqueta}</span>
      <span className="text-campo-formulario font-semibold text-gris-oscuro-texto">{valor}</span>
    </div>
  )
}

export function PaginaInvitarColaboradorResumen() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <div className="mx-auto my-5 max-w-240 overflow-hidden rounded-2xl bg-white shadow-t13 max-960:m-3 max-960:rounded-xl max-480:m-1">
        <div className="flex items-start justify-between px-7 pt-6 max-768:px-4 max-768:pt-4 max-480:px-3 max-480:pt-3">
          <div>
            <h1 className="m-0 mb-1 text-titulo-pagina font-bold text-gris-oscuro-texto">{catalogoColaboradores.titulos.invitar_resumen}</h1>
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

        <BloqueInvitarColaboradorResumen1 />

        <div className="px-7 pt-5 max-768:px-4">
          <h2 className="m-0 mb-1 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoColaboradores.pasos_invitar.resumen.titulo}</h2>
          <p className="m-0 text-subtitulo leading-snug text-gris-texto-secundario">
            {catalogoColaboradores.pasos_invitar.resumen.subtitulo}
          </p>
        </div>

        <BloqueColaborador
          RESUMEN_COLABORADOR={RESUMEN_COLABORADOR}
          RESUMEN_ROL={RESUMEN_ROL}
          CampoResumen={CampoResumen}
          RESUMEN_VIGENCIA={RESUMEN_VIGENCIA}
          INICIAL_MARCA={INICIAL_MARCA}
          CORREO_PREVIEW={CORREO_PREVIEW}
          FilaCorreo={FilaCorreo}
        />

        <div className="mx-7 flex items-start gap-2 rounded-lg border border-t-bfdbfe bg-t-f0f7ff px-4 py-3 max-960:mx-4">
          <Icono name="aviso" className="mt-px w-4.5 h-4.5 flex-none text-azul-categoria" />
          <p className="m-0 text-auxiliar leading-snug text-t-1e40af">
            {catalogoColaboradores.campos_resumen.nota_aceptacion}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gris-borde px-7 py-4 max-768:flex-col-reverse max-480:px-3 max-480:py-2.5">
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.invitar_vigencia)} variant="secundario" size="md" className="max-768:w-full max-768:justify-center max-480:px-3 max-480:py-2.25">
            <span>‹</span> {catalogoColaboradores.campos_rol_permisos.anterior}
          </Boton>
          <Boton type="button" variant="secundario" size="md" className="max-768:w-full max-768:justify-center">
            <Icono name="guardar" className="w-4 h-4" /> {catalogoColaboradores.campos_resumen.guardar_borrador}
          </Boton>
          <Boton type="button" onClick={() => NAVEGAR_A(catalogoColaboradores.rutas.listado)} variant="primario" size="md" className="max-768:w-full max-768:justify-center max-480:px-3 max-480:py-2.25">
            <Icono name="enviar" className="w-4 h-4" />
            <span>
              {catalogoColaboradores.campos_resumen.enviar_invitacion}
              <br />
              <span className="text-auxiliar font-normal opacity-85">{catalogoColaboradores.campos_resumen.se_enviara_por_correo}</span>
            </span>
          </Boton>
        </div>
      </div>
    </EstructuraApp>
  )
}
