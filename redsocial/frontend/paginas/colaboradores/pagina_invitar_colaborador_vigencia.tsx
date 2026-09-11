import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { navegar } from '../../enrutamiento/navegacion'
import { ARCHIVO_A_RUTA } from '../../enrutamiento/rutas'
import type { IconName } from '../../tipos/compartido/icono'

const NAVEGAR_A = (archivo: string) => {
  navegar(ARCHIVO_A_RUTA[archivo] ?? archivo)
}

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
            <h1 className="m-0 mb-1 text-[1.35rem] font-bold text-gris-oscuro-texto max-[768px]:text-[1.1rem]">Invitar colaborador</h1>
            <p className="m-0 max-w-[500px] text-[0.85rem] leading-snug text-gris-texto-secundario max-[768px]:text-[0.8rem]">
              Envía una invitación para que sea una a tu equipo y pueda usar los sistemas según el rol asignado.
            </p>
          </div>
          <div className="flex flex-none items-center gap-2 max-[768px]:gap-1">
            <button type="button" title="Configuración" className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name="ajustes-sistema" className="w-5 h-5" />
            </button>
            <button type="button" title="Aplicaciones" className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name={'aplicaciones' as IconName} className="w-5 h-5" />
            </button>
            <button type="button" title="Notificaciones" className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8">
              <Icono name="notificaciones" className="w-5 h-5" />
            </button>
            <button
              type="button"
              title="Cerrar"
              onClick={() => NAVEGAR_A('29-10-colaboradores-todos.html')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border-0 bg-transparent text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#374151] max-[768px]:h-8 max-[768px]:w-8"
            >
              <Icono name="cerrar" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-0 px-7 pt-5 max-[960px]:overflow-x-auto max-[960px]:[scrollbar-width:none] max-[960px]:[&::-webkit-scrollbar]:hidden max-[768px]:px-4 max-[768px]:pt-3.5 max-[480px]:px-3 max-[480px]:pt-2.5">
          {['Información', 'Rol y permisos', 'Vigencia', 'Resumen'].map((paso, i) => (
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
          <h2 className="m-0 mb-1 text-[1.15rem] font-bold text-gris-oscuro-texto max-[480px]:text-[0.9rem]">3. Vigencia</h2>
          <p className="m-0 text-[0.85rem] leading-snug text-gris-texto-secundario">Define el período de acceso del colaborador y qué ocurrirá al finalizar la vigencia.</p>
        </div>

        <div className="grid grid-cols-2 gap-6 p-7 max-[960px]:grid-cols-1 max-[960px]:p-4">
          <div>
            <div className="rounded-xl border border-gris-borde p-5">
              <div className="mb-4 flex items-center gap-2">
                <Icono name="calendario" className="w-5 h-5 text-primario" />
                <h3 className="m-0 text-[0.95rem] font-bold text-gris-oscuro-texto">Período de vigencia</h3>
              </div>

              <label className="mb-4 flex cursor-pointer items-start gap-2.5 last:mb-0">
                <RadioVigencia nombre="vigencia" valor="periodo" defaultChecked />
                <span className={circuloRadio}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">Vigencia por período</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">Establece una fecha de inicio y fin para esta invitación.</span>
                </span>
              </label>

              <div className="my-3 grid grid-cols-2 gap-4 max-[960px]:grid-cols-1">
                <div>
                  <label className="mb-1 block text-[0.8rem] font-medium text-gris-texto">
                    Fecha de inicio <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-3 py-[9px]">
                    <Icono name="calendario" className="w-[18px] h-[18px] text-[#9ca3af]" />
                    <input type="text" defaultValue="13/08/2026" readOnly className="flex-1 border-0 bg-transparent text-[0.875rem] text-gris-oscuro-texto outline-none" />
                    <Icono name="calendario" className="w-[18px] h-[18px] text-[#9ca3af]" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[0.8rem] font-medium text-gris-texto">
                    Fecha de vencimiento <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-[#d1d5db] bg-white px-3 py-[9px]">
                    <Icono name="calendario" className="w-[18px] h-[18px] text-[#9ca3af]" />
                    <input type="text" defaultValue="13/08/2027" readOnly className="flex-1 border-0 bg-transparent text-[0.875rem] text-gris-oscuro-texto outline-none" />
                    <Icono name="calendario" className="w-[18px] h-[18px] text-[#9ca3af]" />
                  </div>
                </div>
              </div>
              <span className="mt-2 inline-flex items-center rounded-md bg-[#f3f4f6] px-3 py-1 text-[0.78rem] font-semibold text-gris-texto-secundario">Duración: 1 año</span>

              <label className="mt-4 flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="vigencia" valor="indefinida" />
                <span className={circuloRadio}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">Vigencia indefinida</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">El colaborador tendrá acceso sin fecha de vencimiento.</span>
                </span>
              </label>

              <div className="mt-3 flex items-start gap-2 rounded-lg border border-[#bfdbfe] bg-[#f0f7ff] px-3.5 py-2.5">
                <Icono name="alerta" className="mt-px w-4 h-4 flex-none text-primario" />
                <p className="m-0 text-[0.78rem] leading-snug text-[#1e40af]">Recomendado para colaboradores permanentes en tu equipo.</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-gris-borde p-5">
              <div className="mb-1 flex items-center gap-2">
                <Icono name="reloj" className="w-5 h-5 text-primario" />
                <h3 className="m-0 text-[0.95rem] font-bold text-gris-oscuro-texto">Al vencer la vigencia</h3>
              </div>
              <p className="-mt-2 mb-4 text-[0.82rem] leading-snug text-gris-texto-secundario">Selecciona qué ocurrirá cuando finalice el período de acceso.</p>

              <label className="mb-4 flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="al-vencer" valor="desactivar" defaultChecked />
                <span className={circuloRadio}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">Desactivar acceso automáticamente</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">El colaborador perderá el acceso a los sistemas al vencer.</span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="al-vencer" valor="revision" />
                <span className={circuloRadio}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">Mantener acceso con revisión</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">El acceso no se desactivará automáticamente. Se requerirá revisión manual.</span>
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center gap-2">
                <Icono name="actualizar" className="w-5 h-5 text-primario" />
                <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">Renovación</h4>
              </div>
              <p className="-mt-2 mb-3.5 text-[0.78rem] leading-snug text-gris-texto-secundario">Configura si esta invitación puede ser renovada.</p>

              <label className="mb-3 flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="renovacion" valor="permitir" defaultChecked />
                <span className={circuloRadio + ' mt-px'}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">Permitir renovación</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">Podrás renovar la invitación antes de que venza.</span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5">
                <RadioVigencia nombre="renovacion" valor="no-permitir" />
                <span className={circuloRadio + ' mt-px'}>
                  <span className={puntoRadio} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">No permitir renovación</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">Cuando venza, deberás enviar una nueva invitación.</span>
                </span>
              </label>
            </div>

            <div className="rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center gap-2">
                <Icono name="campana" className="w-5 h-5 text-primario" />
                <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">Recordatorios</h4>
              </div>
              <p className="-mt-2 mb-3.5 text-[0.78rem] leading-snug text-gris-texto-secundario">Recibe recordatorios antes de que venza la invitación.</p>

              <label className="mb-3 flex cursor-pointer items-start gap-2.5">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <span className="mt-px flex h-5 w-5 flex-none items-center justify-center rounded-[5px] border-2 border-[#d1d5db] peer-checked:border-primario peer-checked:bg-primario">
                  <svg viewBox="0 0 12 10" className="hidden h-[10px] w-3 peer-checked:block">
                    <path d="M1 5l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" />
                  </svg>
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">Enviar recordatorio por correo</span>
                  <span className="text-[0.78rem] leading-snug text-gris-texto-secundario">Te notificaremos antes de la fecha de vencimiento.</span>
                </span>
              </label>

              <div className="mt-2">
                <label className="mb-1 block text-[0.8rem] font-medium text-gris-texto">
                  Recordar con anticipación <span className="text-[#dc2626]">*</span>
                </label>
                <select defaultValue="7 días antes" className="w-full appearance-none rounded-lg border border-[#d1d5db] bg-white px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none">
                  <option>7 días antes</option>
                  <option>14 días antes</option>
                  <option>30 días antes</option>
                  <option>60 días antes</option>
                  <option>90 días antes</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center gap-2">
                <Icono name="mundo" className="w-5 h-5 text-primario" />
                <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">Zona horaria</h4>
              </div>
              <p className="-mt-2 mb-3.5 text-[0.78rem] leading-snug text-gris-texto-secundario">La vigencia se aplicará según la siguiente zona horaria.</p>
              <select defaultValue="(GMT-05:00) Lima, Bogotá, Quito" className="w-full appearance-none rounded-lg border border-[#d1d5db] bg-white px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none">
                <option>(GMT-05:00) Lima, Bogotá, Quito</option>
                <option>(GMT-06:00) Ciudad de México, Guatemala</option>
                <option>(GMT-03:00) Buenos Aires, São Paulo</option>
                <option>(GMT+01:00) Madrid, Barcelona</option>
                <option>(GMT+00:00) Londres, Lisboa</option>
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
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('31-10-colaboradores-popub-invitar-colaborador-02-asignar-rol-y-permisos.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d1d5db] bg-white px-6 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            <span>‹</span> Anterior
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('33-10-colaboradores-popub-invitar-colaborador-04-resumen.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-primario px-6 py-2.5 text-[0.875rem] font-semibold text-white hover:bg-[#4a35d4] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            Siguiente <span>›</span>
          </button>
        </div>
      </div>
    </EstructuraApp>
  )
}
