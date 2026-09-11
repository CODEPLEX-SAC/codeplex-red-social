import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { navegar } from '../../enrutamiento/navegacion'
import { ARCHIVO_A_RUTA } from '../../enrutamiento/rutas'
import type { IconName } from '../../tipos/compartido/icono'

const NAVEGAR_A = (archivo: string) => {
  navegar(ARCHIVO_A_RUTA[archivo] ?? archivo)
}

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
          <h2 className="m-0 mb-1 text-[1.15rem] font-bold text-gris-oscuro-texto max-[480px]:text-[0.9rem]">4. Resumen</h2>
          <p className="m-0 text-[0.85rem] leading-snug text-gris-texto-secundario">
            Revisa la información de la invitación. El colaborador recibirá un correo con los detalles y el acceso para unirse al equipo.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 p-7 max-[960px]:grid-cols-1 max-[960px]:p-4">
          <div>
            <div className="mb-4 rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icono name="nuevo-usuario" className="w-5 h-5 text-primario" />
                  <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">Colaborador</h4>
                </div>
                <button type="button" className="rounded-md border border-[#d1d5db] bg-white px-3 py-[5px] text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                  Editar
                </button>
              </div>
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#ede9fe] text-base font-bold text-primario">JM</div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-[0.95rem] font-bold text-gris-oscuro-texto">Juan Pérez Martínez</span>
                  <span className="text-[0.82rem] text-gris-texto-secundario">juan.perez@email.com</span>
                  <span className="flex items-center gap-1 text-[0.82rem] text-gris-texto-secundario">
                    <Icono name="llamada" className="w-[14px] h-[14px] text-[#16a34a]" /> +51 987 654 321
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4 rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icono name="escudo" className="w-5 h-5 text-primario" />
                  <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">Rol y permisos</h4>
                </div>
                <button type="button" className="rounded-md border border-[#d1d5db] bg-white px-3 py-[5px] text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                  Editar
                </button>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="min-w-[130px] text-[0.82rem] text-gris-texto-secundario">Rol asignado</span>
                  <span className="inline-block rounded-md bg-[#ede9fe] px-2.5 py-[3px] text-[0.78rem] font-semibold text-[#5b21b6]">Analista Contable</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="min-w-[130px] text-[0.82rem] text-gris-texto-secundario">Módulos y permisos</span>
                  <a href="#" className="text-[0.82rem] font-medium text-primario no-underline hover:underline">4 módulos con permisos asignados</a>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gris-borde px-5 py-[18px]">
              <div className="mb-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icono name="calendario" className="w-5 h-5 text-primario" />
                  <h4 className="m-0 text-[0.9rem] font-bold text-gris-oscuro-texto">Vigencia</h4>
                </div>
                <button type="button" className="rounded-md border border-[#d1d5db] bg-white px-3 py-[5px] text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                  Editar
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <CampoResumen etiqueta="Fecha de inicio" valor="13 de agosto de 2026" />
                <CampoResumen etiqueta="Fecha de vencimiento" valor="13 de agosto de 2027" />
                <CampoResumen etiqueta="Al vencer la vigencia" valor="Desactivar acceso automáticamente" />
                <CampoResumen etiqueta="Recordatorios" valor="7 días antes del vencimiento" />
                <CampoResumen etiqueta="Zona horaria" valor="(GMT-05:00) Lima, Bogotá, Quito" ancho="completo" />
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-xl border border-gris-borde">
              <div className="flex items-center justify-between border-b border-gris-borde px-4.5 py-3.5">
                <div className="flex items-center gap-2">
                  <Icono name="correo" className="w-[18px] h-[18px] text-primario" />
                  <span className="text-[0.82rem] font-semibold text-gris-texto">Vista previa del correo que recibirá el colaborador</span>
                </div>
                <button type="button" className="rounded-md border border-[#d1d5db] bg-white px-3 py-[5px] text-[0.78rem] font-medium text-gris-texto hover:bg-[#f9fafb]">
                  Cambiar plantilla
                </button>
              </div>

              <div className="bg-[#fafafa] px-6 py-7">
                <div className="mb-5 text-center">
                  <span className="mr-1.5 inline-block h-6 w-6 rounded-md bg-primario text-center text-[0.9rem] leading-6 text-white">C</span>
                  <span className="text-[1.2rem] font-extrabold tracking-wide text-primario">CODEPLEX</span>
                </div>

                <p className="mb-4 text-[0.875rem] leading-snug text-gris-texto">Hola Juan,</p>
                <p className="mb-4 text-[0.875rem] leading-snug text-gris-texto">
                  <strong className="text-gris-oscuro-texto">Pedro Rafael</strong> te ha invitado a formar parte del equipo de{' '}
                  <strong className="text-gris-oscuro-texto">Ai Robotics Peru SAC</strong> en <strong className="text-gris-oscuro-texto">CODEPLEX</strong>.
                </p>

                <div className="mb-5 rounded-lg border border-gris-borde bg-white px-4 py-3.5">
                  <FilaCorreo icono="nuevo-usuario" etiqueta="Rol asignado" valor="Analista Contable" />
                  <FilaCorreo icono="calendario" etiqueta="Vigencia" valor="13/08/2026 al 13/08/2027" />
                  <FilaCorreo icono="pantalla-compartida" etiqueta="Módulos" valor="4 módulos con permisos asignados" />
                </div>

                <button type="button" className="mb-2 block w-full rounded-lg border-0 bg-primario px-6 py-3 text-center text-[0.95rem] font-bold text-white">
                  Aceptar invitación
                </button>
                <p className="mb-5 text-center text-[0.78rem] text-gris-texto-terciario">Este enlace expirará en 7 días.</p>

                <div className="mb-3 rounded-lg bg-[#f9fafb] p-3.5 text-center">
                  <p className="m-0 mb-1.5 text-[0.78rem] text-gris-texto-secundario">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
                  <a href="#" className="break-all text-[0.78rem] text-primario no-underline hover:underline">
                    https://codeplex.com/invitacion/abc123def456
                  </a>
                </div>
                <p className="m-0 text-center text-[0.75rem] text-gris-texto-terciario">¿No esperabas esta invitación? Puedes ignorar este correo.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-7 flex items-start gap-2 rounded-lg border border-[#bfdbfe] bg-[#f0f7ff] px-4 py-3 max-[960px]:mx-4">
          <Icono name="alerta" className="mt-px w-[18px] h-[18px] flex-none text-[#3b82f6]" />
          <p className="m-0 text-[0.82rem] leading-snug text-[#1e40af]">
            El colaborador deberá aceptar la invitación para poder acceder a los sistemas según los permisos asignados.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gris-borde px-7 py-4 max-[768px]:flex-col-reverse max-[480px]:px-3 max-[480px]:py-2.5">
          <button
            type="button"
            onClick={() => NAVEGAR_A('32-10-colaboradores-popub-invitar-colaborador-03-vigencia.html')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d1d5db] bg-white px-6 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            <span>‹</span> Anterior
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d1d5db] bg-white px-5 py-2.5 text-[0.875rem] font-medium text-gris-texto hover:bg-[#f9fafb] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            <Icono name="guardar" className="w-4 h-4" /> Guardar borrador
          </button>
          <button
            type="button"
            onClick={() => NAVEGAR_A('29-10-colaboradores-todos.html')}
            className="inline-flex items-center gap-2 rounded-lg border-0 bg-primario px-6 py-2.5 text-[0.875rem] font-semibold text-white hover:bg-[#4a35d4] max-[768px]:w-full max-[768px]:justify-center max-[480px]:px-3 max-[480px]:py-[9px] max-[480px]:text-[0.78rem]"
          >
            <Icono name="enviar" className="w-4 h-4" />
            <span>
              Enviar invitación
              <br />
              <span className="text-[0.72rem] font-normal opacity-85">Se enviará por correo</span>
            </span>
          </button>
        </div>
      </div>
    </EstructuraApp>
  )
}
