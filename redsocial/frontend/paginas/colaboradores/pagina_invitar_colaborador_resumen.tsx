import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { navegar } from '../../rutas/compartido/navegacion'
import { ARCHIVO_A_RUTA } from '../../rutas/compartido/rutas'
import {
  RESUMEN_COLABORADOR,
  RESUMEN_ROL,
  RESUMEN_VIGENCIA,
  CORREO_PREVIEW,
} from '../../datos/colaboradores/invitacion_resumen'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import type { IconName } from '../../tipos/compartido/icono'

const NOMBRE_MARCA = textosRedSocial.MARCA
const INICIAL_MARCA = NOMBRE_MARCA.charAt(0)

const NAVEGAR_A = (archivo: string) => {
  navegar(ARCHIVO_A_RUTA[archivo] ?? archivo)
}

const STEPPER_INVITAR = catalogoColaboradores.stepper_invitar

function CampoResumen({ etiqueta, valor, ancho }: { etiqueta: string; valor: string; ancho?: 'completo' }) {
  return (
    <div className={'flex flex-col gap-0.5 ' + (ancho === 'completo' ? 'col-span-2' : '')}>
      <span className="text-[0.78rem] text-gris-texto-secundario">{etiqueta}</span>
      <span className="text-[0.82rem] font-semibold text-gris-oscuro-texto">{valor}</span>
    </div>
  )
}

function FilaCorreo({ icono, etiqueta, valor }: { icono: IconName; etiqueta: string; valor: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-[#f3f4f6] py-2 last:border-b-0">
      <Icono name={icono} className="w-[18px] h-[18px] flex-none text-primario" />
      <span className="min-w-[100px] text-[0.82rem] text-gris-texto-secundario">{etiqueta}</span>
      <span className="text-[0.82rem] font-semibold text-gris-oscuro-texto">{valor}</span>
    </div>
  )
}

export function PaginaInvitarColaboradorResumen() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <div className="mx-auto my-5 max-w-[960px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-[960px]:m-3 max-[960px]:rounded-xl max-[480px]:m-1">
        <div className="flex items-start justify-between px-7 pt-6 max-[768px]:px-4 max-[768px]:pt-4 max-[480px]:px-3 max-[480px]:pt-3">
          <div>
            <h1 className="m-0 mb-1 text-[1.35rem] font-bold text-gris-oscuro-texto max-[768px]:text-[1.1rem]">{catalogoColaboradores.titulos.invitar_resumen}</h1>
            <p className="m-0 max-w-[500px] text-[0.85rem] leading-snug text-gris-texto-secundario max-[768px]:text-[0.8rem]">
              {catalogoColaboradores.subtitulos.invitar_asistente}
            </p>
          </div>
          <div className="flex flex-none items-center gap-2 max-[768px]:gap-1">
            <button type="button" title={textosRedSocial.CONFIGURACION} className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name="ajustes-sistema" className="w-5 h-5" />
            </button>
            <button type="button" title={textosRedSocial.APLICACIONES} className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name={'aplicaciones' as IconName} className="w-5 h-5" />
            </button>
            <button type="button" title={textosRedSocial.AVISO_CAMPANA} className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name="campana" className="w-5 h-5" />
            </button>
            <button
              type="button"
              title={textosRedSocial.CERRAR}
              onClick={() => NAVEGAR_A('29-10-colaboradores-todos.html')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8"
            >
              <Icono name="cerrar" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-0 px-7 pt-5 max-[960px]:overflow-x-auto max-[960px]:[scrollbar-width:none] max-[960px]:[&::-webkit-scrollbar]:hidden max-[768px]:px-4 max-[768px]:pt-3.5 max-[480px]:px-3 max-[480px]:pt-2.5">
          {STEPPER_INVITAR.map((paso, i) => (
            <span key={paso} className="contents">
              <span className="flex flex-none items-center gap-2">
                <span
                  className={
                    'flex h-7 w-7 flex-none items-center justify-center rounded-full text-[0.8rem] font-bold transition-all max-[480px]:h-6 max-[480px]:w-6 max-[480px]:text-[0.72rem] ' +
                    (i < 3 ? 'bg-[#d1fae5] text-[#059669]' : 'bg-primario text-white')
                  }
                >
                  {i + 1}
                </span>
                <span
                  className={
                    'whitespace-nowrap text-[0.82rem] max-[480px]:text-xs ' +
                    (i === 3 ? 'font-semibold text-gris-oscuro-texto' : 'font-medium text-gris-texto-secundario')
                  }
                >
                  {paso}
                </span>
              </span>
              {i < 3 && <span className="mx-3 h-0.5 flex-1 bg-primario max-[480px]:mx-2" />}
            </span>
          ))}
        </nav>

        <div className="px-7 pt-5 max-[768px]:px-4">
          <h2 className="m-0 mb-1 text-[1.15rem] font-bold text-gris-oscuro-texto max-[480px]:text-[0.9rem]">{catalogoColaboradores.pasos_invitar.resumen.titulo}</h2>
          <p className="m-0 text-[0.85rem] leading-snug text-gris-texto-secundario">
            {catalogoColaboradores.pasos_invitar.resumen.subtitulo}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 p-7 max-[960px]:grid-cols-1 max-[960px]:p-4">
          <div>
            <div className="mb-4 rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icono name="nuevo-usuario" className="w-5 h-5 text-primario" />
                  <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_resumen.colaborador}</h4>
                </div>
                <button type="button" className="rounded-md border border-[#d1d5db] bg-white px-3 py-[5px] text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                  {catalogoColaboradores.campos_resumen.editar}
                </button>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#ede9fe] text-base font-bold text-primario">{RESUMEN_COLABORADOR.iniciales}</div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[0.95rem] font-bold text-gris-oscuro-texto">{RESUMEN_COLABORADOR.nombreCompleto}</span>
                  <span className="text-[0.82rem] text-gris-texto-secundario">{RESUMEN_COLABORADOR.correo}</span>
                  <span className="flex items-center gap-1 text-[0.82rem] text-gris-texto-secundario">
                    <Icono name="llamada" className="w-[14px] h-[14px] text-[#16a34a]" /> {RESUMEN_COLABORADOR.telefono}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4 rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icono name="escudo" className="w-5 h-5 text-primario" />
                  <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_resumen.rol_y_permisos}</h4>
                </div>
                <button type="button" className="rounded-md border border-[#d1d5db] bg-white px-3 py-[5px] text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                  {catalogoColaboradores.campos_resumen.editar}
                </button>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="min-w-[130px] text-[0.82rem] text-gris-texto-secundario">{catalogoColaboradores.campos_resumen.rol_asignado}</span>
                  <span className="inline-block rounded-md bg-[#ede9fe] px-2.5 py-[3px] text-[0.78rem] font-semibold text-[#5b21b6]">{RESUMEN_ROL.rolAsignado}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="min-w-[130px] text-[0.82rem] text-gris-texto-secundario">{catalogoColaboradores.campos_resumen.modulos_y_permisos}</span>
                  <a href="#" className="text-[0.82rem] font-medium text-primario no-underline hover:underline">{RESUMEN_ROL.modulosTexto}</a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icono name="calendario" className="w-5 h-5 text-primario" />
                  <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_resumen.vigencia}</h4>
                </div>
                <button type="button" className="rounded-md border border-[#d1d5db] bg-white px-3 py-[5px] text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                  {catalogoColaboradores.campos_resumen.editar}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.fecha_de_inicio} valor={RESUMEN_VIGENCIA.fechaInicio} />
                <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.fecha_de_vencimiento} valor={RESUMEN_VIGENCIA.fechaVencimiento} />
                <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.al_vencer_la_vigencia} valor={RESUMEN_VIGENCIA.alVencer} />
                <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.recordatorios} valor={RESUMEN_VIGENCIA.recordatorios} />
                <CampoResumen etiqueta={catalogoColaboradores.campos_resumen.zona_horaria} valor={RESUMEN_VIGENCIA.zonaHoraria} ancho="completo" />
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-xl border border-gris-borde">
              <div className="flex items-center justify-between border-b border-gris-borde px-4.5 py-3.5">
                <div className="flex items-center gap-2">
                  <Icono name="correo" className="w-[18px] h-[18px] text-primario" />
                  <span className="text-[0.82rem] font-semibold text-gris-texto">{catalogoColaboradores.campos_resumen.vista_previa_correo}</span>
                </div>
                <button type="button" className="rounded-md border border-[#d1d5db] bg-white px-3 py-[5px] text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                  {catalogoColaboradores.campos_resumen.cambiar_plantilla}
                </button>
              </div>

              <div className="bg-[#fafafa] px-6 py-7">
                <div className="mb-5 text-center">
                  <span className="mr-1.5 inline-block h-6 w-6 rounded-md bg-primario text-center text-[0.9rem] leading-6 text-white">{INICIAL_MARCA}</span>
                  <span className="text-[1.2rem] font-extrabold tracking-wide text-primario">{textosRedSocial.MARCA}</span>
                </div>

                <p className="mb-4 text-[0.875rem] leading-snug text-gris-texto">{catalogoColaboradores.campos_resumen.hola_saludo.replace('{nombre}', CORREO_PREVIEW.nombrePila)}</p>
                <p className="mb-4 text-[0.875rem] leading-snug text-gris-texto">
                  <strong className="text-gris-oscuro-texto">{CORREO_PREVIEW.invitadoPor}</strong> {catalogoColaboradores.campos_resumen.invitacion_intro}{' '}
                  <strong className="text-gris-oscuro-texto">{CORREO_PREVIEW.empresa}</strong> {catalogoColaboradores.campos_resumen.en_codeplex} <strong className="text-gris-oscuro-texto">{textosRedSocial.MARCA}</strong>.
                </p>

                <div className="mb-5 rounded-lg border border-gris-borde bg-white px-4 py-3.5">
                  <FilaCorreo icono="nuevo-usuario" etiqueta={catalogoColaboradores.campos_resumen.filas_correo.rol_asignado} valor={RESUMEN_ROL.rolAsignado} />
                  <FilaCorreo icono="calendario" etiqueta={catalogoColaboradores.campos_resumen.filas_correo.vigencia} valor={CORREO_PREVIEW.vigenciaTexto} />
                  <FilaCorreo icono="pantalla-compartida" etiqueta={catalogoColaboradores.campos_resumen.filas_correo.modulos} valor={RESUMEN_ROL.modulosTexto} />
                </div>

                <button type="button" className="mb-2 block w-full rounded-lg border-0 bg-primario px-6 py-3 text-center text-[0.95rem] font-bold text-white">
                  {catalogoColaboradores.campos_resumen.aceptar_invitacion}
                </button>
                <p className="mb-5 text-center text-[0.78rem] text-gris-texto-terciario">{CORREO_PREVIEW.expiraEnDias}</p>

                <div className="mb-3 rounded-lg bg-[#f9fafb] p-3.5 text-center">
                  <p className="m-0 mb-1.5 text-[0.78rem] text-gris-texto-secundario">{catalogoColaboradores.campos_resumen.si_boton_no_funciona}</p>
                  <a href="#" className="break-all text-[0.78rem] text-primario no-underline hover:underline">
                    {catalogoColaboradores.campos_resumen.enlace_invitacion_preview}
                  </a>
                </div>
                <p className="m-0 text-center text-[0.75rem] text-gris-texto-terciario">{catalogoColaboradores.campos_resumen.no_esperabas_invitacion}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-7 flex items-start gap-2 rounded-lg border border-[#bfdbfe] bg-[#f0f7ff] px-4 py-3 max-[960px]:mx-4">
          <Icono name="aviso" className="mt-px w-[18px] h-[18px] flex-none text-[#3b82f6]" />
          <p className="m-0 text-[0.82rem] leading-snug text-[#1e40af]">
            {catalogoColaboradores.campos_resumen.nota_aceptacion}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gris-borde px-7 py-4 max-[768px]:flex-col-reverse max-[480px]:px-3 max-[480px]:py-2.5">
          <button
            type="button"
            onClick={() => NAVEGAR_A('32-10-colaboradores-popub-invitar-colaborador-03-vigencia.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d1d5db] bg-white px-6 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            <span>‹</span> {catalogoColaboradores.campos_rol_permisos.anterior}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d1d5db] bg-white px-5 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            <Icono name="guardar" className="w-4 h-4" /> {catalogoColaboradores.campos_resumen.guardar_borrador}
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('29-10-colaboradores-todos.html')}
            className="inline-flex items-center gap-2 rounded-lg border-0 bg-primario px-6 py-2.5 text-[0.875rem] font-semibold text-white hover:bg-[#4a35d4] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            <Icono name="enviar" className="w-4 h-4" />
            <span>
              {catalogoColaboradores.campos_resumen.enviar_invitacion}
              <br />
              <span className="text-[0.72rem] font-normal opacity-85">{catalogoColaboradores.campos_resumen.se_enviara_por_correo}</span>
            </span>
          </button>
        </div>
      </div>
    </EstructuraApp>
  )
}
