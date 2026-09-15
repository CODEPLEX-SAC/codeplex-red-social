import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'
import { navegar } from '../../rutas/compartido/navegacion'
import { ARCHIVO_A_RUTA } from '../../rutas/compartido/rutas'
import type { IconName } from '../../tipos/compartido/icono'
import mensajesGlobales from '../../mensajes/globales/textos.json'
import { VIGENCIA_DEFAULT, OPCIONES_RECORDATORIO, OPCIONES_ZONA_HORARIA } from '../../datos/colaboradores/vigencia'

const NAVEGAR_A = (archivo: string) => {
  navegar(ARCHIVO_A_RUTA[archivo] ?? archivo)
}

const STEPPER_INVITAR = catalogoColaboradores.stepper_invitar

function RadioVigencia({ nombre, valor, defaultChecked }: { nombre: string; valor: string; defaultChecked?: boolean }) {
  return (
    <input
      type="radio"
      name={nombre}
      value={valor}
      defaultChecked={defaultChecked}
      className="peer sr-only"
    />
  )
}

const circuloRadio =
  'flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 border-[#d1d5db] peer-checked:border-primario'
const puntoRadio = 'hidden h-2.5 w-2.5 rounded-full bg-primario peer-checked:block'

export function PaginaInvitarColaboradorVigencia() {
  return (
    <EstructuraApp paginaActiva="colaboradores">
      <div className="mx-auto my-5 max-w-[960px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-[960px]:m-3 max-[960px]:rounded-xl max-[480px]:m-1">
        <div className="flex items-start justify-between px-7 pt-6 max-[768px]:px-4 max-[768px]:pt-4 max-[480px]:px-3 max-[480px]:pt-3">
          <div>
            <h1 className="m-0 mb-1 text-[1.35rem] font-bold text-gris-oscuro-texto max-[768px]:text-[1.1rem]">{catalogoColaboradores.titulos.invitar_vigencia}</h1>
            <p className="m-0 max-w-[500px] text-[0.85rem] leading-snug text-gris-texto-secundario max-[768px]:text-[0.8rem]">
              {catalogoColaboradores.subtitulos.invitar_asistente}
            </p>
          </div>
          <div className="flex flex-none items-center gap-2 max-[768px]:gap-1">
            <button type="button" title={mensajesGlobales.CONFIGURACION} className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name="ajustes-sistema" className="w-5 h-5" />
            </button>
            <button type="button" title={mensajesGlobales.APLICACIONES} className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name={'aplicaciones' as IconName} className="w-5 h-5" />
            </button>
            <button type="button" title={mensajesGlobales.AVISO_CAMPANA} className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name="campana" className="w-5 h-5" />
            </button>
            <button
              type="button"
              title={mensajesGlobales.CERRAR}
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
                    (i < 2 ? 'bg-[#d1fae5] text-[#059669]' : i === 2 ? 'bg-primario text-white' : '')
                  }
                >
                  {i + 1}
                </span>
                <span
                  className={
                    'whitespace-nowrap text-[0.82rem] max-[480px]:text-xs ' +
                    (i === 2 ? 'font-semibold text-gris-oscuro-texto' : i < 2 ? 'font-medium text-gris-texto-secundario' : 'font-medium text-[#9ca3af]')
                  }
                >
                  {paso}
                </span>
              </span>
              {i < 3 && <span className={'mx-3 h-0.5 flex-1 max-[480px]:mx-2 ' + (i < 2 ? 'bg-primario' : 'bg-gris-borde')} />}
            </span>
          ))}
        </nav>

        <div className="px-7 pt-5 max-[768px]:px-4">
          <h2 className="m-0 mb-1 text-[1.15rem] font-bold text-gris-oscuro-texto max-[480px]:text-[0.9rem]">{catalogoColaboradores.pasos_invitar.vigencia.titulo}</h2>
          <p className="m-0 text-[0.85rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.pasos_invitar.vigencia.subtitulo}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 p-7 max-[960px]:grid-cols-1 max-[960px]:p-4">
          <div>
            <div className="rounded-xl border border-gris-borde p-5">
              <div className="mb-4 flex items-center gap-2">
                <Icono name="calendario" className="w-5 h-5 text-primario" />
                <h3 className="m-0 text-[0.95rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.periodo_de_vigencia}</h3>
              </div>

              <label className="mb-4 flex cursor-pointer items-start gap-2.5 last:mb-0">
                <RadioVigencia nombre="vigencia" valor="periodo" defaultChecked />
                <span className={circuloRadio}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.vigencia_por_periodo}</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.vigencia_por_periodo_detalle}</span>
                </span>
              </label>

              <div className="my-3 grid grid-cols-2 gap-4 max-[960px]:grid-cols-1">
                <div>
                  <label className="mb-1 block text-[0.8rem] font-medium text-gris-texto">
                    {catalogoColaboradores.campos_vigencia.fecha_de_inicio} <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-3 py-[9px]">
                    <Icono name="calendario" className="w-[18px] h-[18px] text-[#9ca3af]" />
                    <input type="text" defaultValue={VIGENCIA_DEFAULT.fechaInicio} readOnly className="flex-1 border-0 bg-transparent text-[0.875rem] text-gris-oscuro-texto outline-none" />
                    <Icono name="calendario" className="w-[18px] h-[18px] text-[#9ca3af]" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[0.8rem] font-medium text-gris-texto">
                    {catalogoColaboradores.campos_vigencia.fecha_de_vencimiento} <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-3 py-[9px]">
                    <Icono name="calendario" className="w-[18px] h-[18px] text-[#9ca3af]" />
                    <input type="text" defaultValue={VIGENCIA_DEFAULT.fechaVencimiento} readOnly className="flex-1 border-0 bg-transparent text-[0.875rem] text-gris-oscuro-texto outline-none" />
                    <Icono name="calendario" className="w-[18px] h-[18px] text-[#9ca3af]" />
                  </div>
                </div>
              </div>
              <span className="mt-2 inline-flex items-center rounded-md bg-[#f3f4f6] px-3 py-1 text-[0.78rem] font-semibold text-gris-texto-secundario">{VIGENCIA_DEFAULT.duracion}</span>

              <label className="mt-4 flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="vigencia" valor="indefinida" />
                <span className={circuloRadio}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.vigencia_indefinida}</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.vigencia_indefinida_detalle}</span>
                </span>
              </label>

              <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#bfdbfe] bg-[#f0f7ff] px-3.5 py-2.5">
                <Icono name="aviso" className="mt-px w-4 h-4 flex-none text-primario" />
                <p className="m-0 text-[0.78rem] leading-snug text-[#1e40af]">{catalogoColaboradores.campos_vigencia.nota_indefinida}</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-gris-borde p-5">
              <div className="mb-1 flex items-center gap-2">
                <Icono name="reloj" className="w-5 h-5 text-primario" />
                <h3 className="m-0 text-[0.95rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.al_vencer_vigencia}</h3>
              </div>
              <p className="-mt-2 mb-4 text-[0.82rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.al_vencer_subtitulo}</p>

              <label className="mb-4 flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="al-vencer" valor="desactivar" defaultChecked />
                <span className={circuloRadio}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.desactivar_automaticamente}</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.desactivar_automaticamente_detalle}</span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="al-vencer" valor="revision" />
                <span className={circuloRadio}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.mantener_con_revision}</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.mantener_con_revision_detalle}</span>
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center gap-2">
                <Icono name="actualizar" className="w-5 h-5 text-primario" />
                <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.renovacion}</h4>
              </div>
              <p className="-mt-2 mb-3.5 text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.renovacion_subtitulo}</p>

              <label className="mb-3 flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="renovacion" valor="permitir" defaultChecked />
                <span className={circuloRadio + ' mt-px'}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.permitir_renovacion}</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.permitir_renovacion_detalle}</span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="renovacion" valor="no-permitir" />
                <span className={circuloRadio + ' mt-px'}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.no_permitir_renovacion}</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.no_permitir_renovacion_detalle}</span>
                </span>
              </label>
            </div>

            <div className="rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center gap-2">
                <Icono name="campana" className="w-5 h-5 text-primario" />
                <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.recordatorios}</h4>
              </div>
              <p className="-mt-2 mb-3.5 text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.recordatorios_subtitulo}</p>

              <label className="mb-3 flex cursor-pointer items-start gap-2.5">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <span className="mt-px flex h-5 w-5 flex-none items-center justify-center rounded-[5px] border-2 border-[#d1d5db] peer-checked:border-primario peer-checked:bg-primario">
                  <svg viewBox="0 0 12 10" className="hidden h-[10px] w-3 peer-checked:block">
                    <path d="M1 5l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" />
                  </svg>
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.enviar_recordatorio_correo}</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.enviar_recordatorio_correo_detalle}</span>
                </span>
              </label>

              <div className="mt-2">
                <label className="mb-1 block text-[0.8rem] font-medium text-gris-texto">
                  {catalogoColaboradores.campos_vigencia.recordar_con_anticipacion} <span className="text-[#dc2626]">*</span>
                </label>
                <select defaultValue={OPCIONES_RECORDATORIO[0]} className="w-full appearance-none rounded-lg border border-[#d1d5db] bg-white px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none">
                  {OPCIONES_RECORDATORIO.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center gap-2">
                <Icono name="mundo" className="w-5 h-5 text-primario" />
                <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">{catalogoColaboradores.campos_vigencia.zona_horaria}</h4>
              </div>
              <p className="-mt-2 mb-3.5 text-[0.78rem] leading-snug text-gris-texto-secundario">{catalogoColaboradores.campos_vigencia.zona_horaria_subtitulo}</p>
              <select defaultValue={OPCIONES_ZONA_HORARIA[0]} className="w-full appearance-none rounded-lg border border-[#d1d5db] bg-white px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none">
                {OPCIONES_ZONA_HORARIA.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gris-borde px-7 py-4 max-[768px]:flex-col-reverse max-[480px]:px-3 max-[480px]:py-2.5">
          <button
            type="button"
            onClick={() => NAVEGAR_A('29-10-colaboradores-todos.html')}
            className="rounded-lg border border-[#d1d5db] bg-white px-6 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            {mensajesGlobales.CANCELAR}
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('31-10-colaboradores-popub-invitar-colaborador-02-asignar-rol-y-permisos.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d1d5db] bg-white px-6 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            <span>‹</span> {catalogoColaboradores.campos_rol_permisos.anterior}
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('33-10-colaboradores-popub-invitar-colaborador-04-resumen.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-primario px-6 py-2.5 text-[0.875rem] font-semibold text-white hover:bg-[#4a35d4] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            {mensajesGlobales.SIGUIENTE} <span>›</span>
          </button>
        </div>
      </div>
    </EstructuraApp>
  )
}
