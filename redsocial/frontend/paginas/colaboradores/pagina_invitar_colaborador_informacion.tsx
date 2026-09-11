import { Fragment } from 'react'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { Icono } from '../../componentes/compartido/icono'
import { navegar } from '../../enrutamiento/navegacion'
import { ARCHIVO_A_RUTA } from '../../enrutamiento/rutas'
import type { IconName } from '../../tipos/compartido/icono'

const NAVEGAR_A = (archivo: string) => {
  navegar(ARCHIVO_A_RUTA[archivo] ?? archivo)
}

const PASOS_FUNCIONA = [
  { icono: 'mensaje' as IconName, nombre: '1. Invitación', descripcion: 'Envías una invitación al colaborador por correo o WhatsApp.' },
  { icono: 'inicio-sesion' as IconName, nombre: '2. Registro / Acceso', descripcion: 'El colaborador acepta la invitación y crea su cuenta o inicia sesión.' },
  { icono: 'ajustes-sistema' as IconName, nombre: '3. Asignación', descripcion: 'Se le asigna el rol y permisos según lo que hayas configurado.' },
  { icono: 'verificado' as IconName, nombre: '4. Listo', descripcion: 'El colaborador aparecerá en tu lista y podrá usar los sistemas.' },
]

const STEPPER = ['Información', 'Rol y permisos', 'Vigencia', 'Resumen']

export function PaginaInvitarColaboradorInformacion() {
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
          <h2 className="m-0 mb-1 text-[1.15rem] font-bold text-gris-oscuro-texto max-[480px]:text-[0.9rem]">1. Información</h2>
          <p className="m-0 text-[0.85rem] leading-snug text-gris-texto-secundario">Completa los datos del colaborador que deseas invitar.</p>
        </div>

        <div className="grid grid-cols-[1fr_300px] max-[960px]:grid-cols-1">
          <div className="border-r border-[#f3f4f6] px-7 pb-7 pt-6 max-[960px]:border-b max-[960px]:border-r-0 max-[960px]:px-6 max-[960px]:py-5 max-[768px]:p-4 max-[480px]:p-3">
            <div className="mb-6">
              <div className="mb-1 flex items-center gap-2">
                <Icono name="usuarios" className="w-5 h-5 text-primario" />
                <h2 className="m-0 text-base font-bold text-gris-oscuro-texto max-[480px]:text-[0.9rem]">Datos del colaborador</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1 max-[768px]:gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">
                    Nombres <span className="ml-0.5 text-[#dc2626]">*</span>
                  </label>
                  <input type="text" defaultValue="Juan Pérez" className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">
                    Apellidos <span className="ml-0.5 text-[#dc2626]">*</span>
                  </label>
                  <input type="text" defaultValue="Martinez" className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">
                    Correo electrónico <span className="ml-0.5 text-[#dc2626]">*</span>
                  </label>
                  <input type="email" defaultValue="juan.perez@email.com" className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                  <span className="text-xs text-gris-texto-terciario">Se enviará la invitación a este correo.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">Teléfono / WhatsApp</label>
                  <div className="flex max-[768px]:flex-col">
                    <div className="flex items-center gap-1 whitespace-nowrap rounded-l-lg border border-r-0 border-[#d1d5db] bg-[#f9fafb] px-2.5 py-[9px] text-[0.85rem] text-gris-texto max-[768px]:rounded-b-none max-[768px]:rounded-t-lg max-[768px]:border-b-0 max-[768px]:border-r max-[768px]:border-[#d1d5db]">
                      <span className="h-[13px] w-[18px] rounded-sm" style={{ background: 'linear-gradient(180deg, #d92228 33%, #fff 33% 66%, #d92228 66%)' }} />
                      <select defaultValue="+51" className="w-auto border-0 bg-transparent p-0 text-[0.85rem] text-gris-texto outline-none">
                        <option>+51</option>
                        <option>+52</option>
                        <option>+54</option>
                        <option>+57</option>
                        <option>+56</option>
                      </select>
                    </div>
                    <input type="tel" defaultValue="987 654 321" className="flex-1 rounded-r-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario max-[768px]:rounded-t-none max-[768px]:rounded-b-lg" />
                  </div>
                  <span className="text-xs text-gris-texto-terciario">Opcional. Se puede invitar por WhatsApp.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">Documento de identidad</label>
                  <div className="flex gap-2">
                    <select defaultValue="DNI" className="w-auto min-w-20 rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario">
                      <option>DNI</option>
                      <option>RUC</option>
                      <option>C.E.</option>
                    </select>
                    <input type="text" defaultValue="45678912" className="flex-1 rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">Cargo / Puesto</label>
                  <input type="text" defaultValue="Analista Contable" className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario" />
                  <span className="text-xs text-gris-texto-terciario">Opcional. Ej: Contador, Analista, Asistente, etc.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">Empresa</label>
                  <select defaultValue="AI Robotics Peru SAC" className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario">
                    <option>AI Robotics Peru SAC</option>
                    <option>Otra empresa</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-medium text-gris-texto">Área / Departamento</label>
                  <select defaultValue="Contabilidad" className="rounded-lg border border-[#d1d5db] px-3 py-[9px] text-[0.875rem] text-gris-oscuro-texto outline-none focus:border-primario">
                    <option>Contabilidad</option>
                    <option>Ventas</option>
                    <option>Tecnología</option>
                    <option>Recursos Humanos</option>
                    <option>Marketing</option>
                  </select>
                  <span className="text-xs text-gris-texto-terciario">Opcional.</span>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="mb-3 flex items-center gap-2">
                <Icono name="mensaje" className="w-[18px] h-[18px] text-primario" />
                <span className="text-[0.82rem] font-semibold text-gris-texto">Método de invitación</span>
              </div>
              <p className="mb-3 text-[0.78rem] text-gris-texto-terciario">Elige cómo deseas enviar la invitación al colaborador.</p>
              <div className="mb-3 flex gap-4 max-[480px]:flex-col">
                <label className="flex cursor-pointer items-start gap-2">
                  <input type="radio" name="metodo-inv" defaultChecked className="mt-0.5 h-4 w-4 accent-primario" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.82rem] font-semibold text-gris-oscuro-texto">Enviar por correo electrónico</span>
                    <span className="text-xs text-gris-texto-terciario">Se enviará un correo con el enlace de invitación.</span>
                  </div>
                </label>
                <label className="flex cursor-pointer items-start gap-2">
                  <input type="radio" name="metodo-inv" className="mt-0.5 h-4 w-4 accent-primario" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.82rem] font-semibold text-gris-oscuro-texto">Enviar por WhatsApp</span>
                    <span className="text-xs text-gris-texto-terciario">Se enviará un mensaje con el enlace de invitación.</span>
                  </div>
                </label>
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-[#e0e0ff] bg-[#f0f0ff] px-3.5 py-2.5">
                <Icono name="alerta" className="mt-px w-4 h-4 flex-none text-primario" />
                <p className="m-0 text-[0.78rem] leading-snug text-gris-texto-secundario">
                  Si el colaborador aún no tiene una cuenta en CODEPLEX, podrá registrarse al aceptar la invitación.
                </p>
              </div>
            </div>
          </div>

          <aside className="bg-[#fafafa] px-6 py-7 max-[960px]:px-6 max-[960px]:py-5 max-[768px]:p-4 max-[480px]:p-3">
            <div>
              <h3 className="m-0 mb-5 flex items-center gap-2 text-base font-bold text-gris-oscuro-texto">
                <Icono name="alerta" className="w-5 h-5 text-primario" /> ¿Cómo funciona?
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
                <span className="text-[0.85rem] font-semibold text-gris-oscuro-texto">Seguridad</span>
              </div>
              <p className="m-0 text-[0.78rem] leading-snug text-gris-texto-secundario">
                El colaborador solo tendrá acceso a los sistemas y módulos que le asignes.
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
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('31-10-colaboradores-popub-invitar-colaborador-02-asignar-rol-y-permisos.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-primario px-6 py-2.5 text-[0.875rem] font-semibold text-white hover:bg-[#4a35d4] max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            Siguiente <span>›</span>
          </button>
        </div>
      </div>
    </EstructuraApp>
  )
}
