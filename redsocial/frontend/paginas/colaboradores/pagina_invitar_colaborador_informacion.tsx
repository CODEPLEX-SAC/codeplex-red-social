import { Fragment } from 'react'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { Icono } from '../../componentes/compartido/icono'
import { navegar } from '../../rutas/compartido/navegacion'
import { ARCHIVO_A_RUTA } from '../../rutas/compartido/rutas'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { PASOS_FUNCIONA_INVITAR_COLABORADOR, FORM_INFORMACION_DEFAULT } from '../../datos/colaboradores/invitar_colaborador'
import type { IconName } from '../../tipos/compartido/icono'

const NAVEGAR_A = (archivo: string) => {
  navegar(ARCHIVO_A_RUTA[archivo] ?? archivo)
}

const PASOS_FUNCIONA = PASOS_FUNCIONA_INVITAR_COLABORADOR
const STEPPER = catalogoColaboradores.stepper_invitar

export function PaginaInvitarColaboradorInformacion() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <div className="mx-auto my-5 max-w-[960px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-[960px]:m-3 max-[960px]:rounded-xl max-[480px]:m-1">
        <div className="flex items-start justify-between px-7 pt-6 max-[768px]:px-4 max-[768px]:pt-4 max-[480px]:px-3 max-[480px]:pt-3">
          <div>
            <h1 className="m-0 mb-1 text-[1.35rem] font-bold text-gris-oscuro-texto max-[768px]:text-[1.1rem]">{catalogoColaboradores.titulos.invitar}</h1>
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
          {STEPPER.map((paso, i) => (
            <Fragment key={paso}>
              <div className="flex flex-none items-center gap-2">
                <span
                  className={
                    'flex h-7 w-7 flex-none items-center justify-center rounded-full text-[0.8rem] font-bold transition-all max-[480px]:h-6 max-[480px]:w-6 max-[480px]:text-[0.72rem] ' +
                    (i === 0 ? 'bg-primario text-white' : '')
                  }
                >
                  {i + 1}
                </span>
                <span
                  className={
                    'whitespace-nowrap text-[0.82rem] max-[480px]:text-xs ' +
                    (i === 0 ? 'font-semibold text-gris-oscuro-texto' : 'font-medium text-[#9ca3af]')
                  }
                >
                  {paso}
                </span>
              </div>
              {i < STEPPER.length - 1 && <span className="mx-3 h-0.5 flex-1 bg-gris-borde max-[480px]:mx-2" />}
            </Fragment>
          ))}
        </nav>

        <div className="px-7 pt-5 max-[768px]:px-4">
          <h2 className="m-0 mb-1 text-[1.15rem] font-bold text-gris-oscuro-texto max-[480px]:text-[0.9rem]">{catalogoColaboradores.pasos_invitar.informacion.titulo}</h2>
          <p className="m-0 text-[0.85rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.pasos_invitar.informacion.subtitulo}</p>
        </div>

        <div className="grid grid-cols-[1fr_300px] max-[960px]:grid-cols-1">
          <div className="border-r border-[#f3f4f6] px-7 pb-7 pt-6 max-[960px]:border-b max-[960px]:border-r-0 max-[960px]:px-6 max-[960px]:py-5 max-[768px]:p-4 max-[480px]:p-3">
            <div className="mb-6">
              <div className="mb-1 flex items-center gap-2">
                <Icono name="usuarios" className="w-5 h-5 text-primario" />
                <h2 className="m-0 text-base font-bold text-gris-oscuro-texto max-[480px]:text-[0.9rem]">{catalogoColaboradores.secciones.datos_del_colaborador}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1 max-[768px]:gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">
                    {catalogoColaboradores.campos_informacion.nombres} <span className="ml-0.5 text-[#dc2626]">*</span>
                  </label>
                  <input type="text" defaultValue={FORM_INFORMACION_DEFAULT.nombres} className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">
                    {catalogoColaboradores.campos_informacion.apellidos} <span className="ml-0.5 text-[#dc2626]">*</span>
                  </label>
                  <input type="text" defaultValue={FORM_INFORMACION_DEFAULT.apellidos} className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">
                    {catalogoColaboradores.campos_informacion.correo_electronico} <span className="ml-0.5 text-[#dc2626]">*</span>
                  </label>
                  <input type="email" defaultValue={FORM_INFORMACION_DEFAULT.correo} className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                  <span className="text-xs text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.correo_ayuda}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.telefono_whatsapp}</label>
                  <div className="flex max-[768px]:flex-col">
                    <div className="flex items-center gap-1 whitespace-nowrap rounded-l-lg border border-r-0 border-[#d1d5db] bg-[#f9fafb] px-2.5 py-[9px] text-[0.85rem] text-gris-texto max-[768px]:rounded-b-none max-[768px]:rounded-t-lg max-[768px]:border-b-0 max-[768px]:border-r max-[768px]:border-[#d1d5db]">
                      <span className="h-[13px] w-[18px] rounded-sm bg-[linear-gradient(180deg,#d92228_33%,#fff_33%_66%,#d92228_66%)]" />
                      <select defaultValue={catalogoColaboradores.selectores.codigo_pais.opciones[0]} className="w-auto border-0 bg-transparent p-0 text-[0.85rem] text-gris-texto outline-none">
                        {catalogoColaboradores.selectores.codigo_pais.opciones.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <input type="tel" defaultValue={FORM_INFORMACION_DEFAULT.telefono} className="flex-1 rounded-r-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario max-[768px]:rounded-t-none max-[768px]:rounded-b-lg" />
                  </div>
                  <span className="text-xs text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.telefono_ayuda}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.documento_identidad}</label>
                  <div className="flex gap-2">
                    <select defaultValue={catalogoColaboradores.selectores.tipo_documento.opciones[0]} className="w-auto min-w-20 rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario">
                      {catalogoColaboradores.selectores.tipo_documento.opciones.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <input type="text" defaultValue={FORM_INFORMACION_DEFAULT.documentoNumero} className="flex-1 rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.cargo_puesto}</label>
                  <input type="text" defaultValue={FORM_INFORMACION_DEFAULT.cargo} className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                  <span className="text-xs text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.cargo_ayuda}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.empresa}</label>
                  <select defaultValue={catalogoColaboradores.selectores.empresa_colaborador.opciones[0]} className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario">
                    {catalogoColaboradores.selectores.empresa_colaborador.opciones.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">{catalogoColaboradores.campos_informacion.area_departamento}</label>
                  <select defaultValue={catalogoColaboradores.selectores.area_departamento.opciones[0]} className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario">
                    {catalogoColaboradores.selectores.area_departamento.opciones.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <span className="text-xs text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.area_ayuda}</span>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="mb-3 flex items-center gap-2">
                <Icono name="mensaje" className="w-[18px] h-[18px] text-primario" />
                <span className="text-[0.82rem] font-semibold text-gris-texto">{catalogoColaboradores.secciones.metodo_de_invitacion}</span>
              </div>
              <p className="mb-3 text-[0.78rem] text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.metodo_invitacion_ayuda}</p>
              <div className="mb-3 flex gap-4 max-[480px]:flex-col">
                <label className="flex cursor-pointer items-start gap-2">
                  <input type="radio" name="metodo-inv" defaultChecked className="mt-0.5 h-4 w-4 accent-primario" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.82rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_informacion.enviar_correo}</span>
                    <span className="text-xs text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.enviar_correo_ayuda}</span>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-2">
                  <input type="radio" name="metodo-inv" className="mt-0.5 h-4 w-4 accent-primario" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.82rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_informacion.enviar_whatsapp}</span>
                    <span className="text-xs text-gris-texto-terciario">{catalogoColaboradores.campos_informacion.enviar_whatsapp_ayuda}</span>
                  </div>
                </label>
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-[#e0e0ff] bg-[#f0f0ff] px-3.5 py-2.5">
                <Icono name="aviso" className="mt-px w-4 h-4 flex-none text-primario" />
                <p className="m-0 text-[0.78rem] leading-snug text-gris-texto-secundario">
                  {catalogoColaboradores.campos_informacion.nota_registro}
                </p>
              </div>
            </div>
          </div>

          <aside className="bg-[#fafafa] px-6 py-7 max-[960px]:px-6 max-[960px]:py-5 max-[768px]:p-4 max-[480px]:p-3">
            <div>
              <h3 className="m-0 mb-5 flex items-center gap-2 text-base font-bold text-gris-oscuro-texto">
                <Icono name="aviso" className="w-5 h-5 text-primario" /> {catalogoColaboradores.secciones.como_funciona}
              </h3>
              <div className="flex flex-col gap-5">
                {PASOS_FUNCIONA.map((paso) => (
                  <article key={paso.nombre} className="flex gap-3">
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-[#ede9fe]">
                      <Icono name={paso.icono} className="w-[18px] h-[18px] text-primario" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">{paso.nombre}</span>
                      <p className="m-0 text-[0.78rem] leading-snug text-gris-texto-secundario">{paso.descripcion}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-[10px] border border-gris-borde bg-white p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <Icono name="verificado" className="w-[18px] h-[18px] text-[#16a34a]" />
                <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.secciones.seguridad}</span>
              </div>
              <p className="m-0 text-[0.78rem] leading-snug text-gris-texto-secundario">
                {catalogoColaboradores.campos_informacion.nota_seguridad}
              </p>
            </div>
          </aside>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gris-borde px-7 py-4 max-[480px]:px-3 max-[480px]:py-2.5">
          <button
            type="button"
            onClick={() => NAVEGAR_A('29-10-colaboradores-todos.html')}
            className="rounded-lg border border-[#d1d5db] bg-white px-6 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            {textosRedSocial.CANCELAR}
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('31-10-colaboradores-popub-invitar-colaborador-02-asignar-rol-y-permisos.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-primario px-6 py-2.5 text-[0.875rem] font-semibold text-white hover:bg-[#4a35d4] max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            {textosRedSocial.SIGUIENTE} <span>›</span>
          </button>
        </div>
      </div>
    </EstructuraApp>
  )
}
