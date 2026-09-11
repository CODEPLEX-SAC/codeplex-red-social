import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { CampoBusqueda } from '../../componentes/compartido/interfaz/campo_busqueda'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'

export function PaginaMensajesVideollamadaIniciar() {
  return (
    <EstructuraApp paginaActiva="mensajes">
      <a href="12-04-mensajes-04-videollamadas.html" className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primario no-underline hover:underline">
        <Icono name="flecha-izquierda" className="h-[15px] w-[15px]" /> Volver a Videollamadas
      </a>

      <div className="grid grid-cols-[minmax(400px,720px)_minmax(320px,400px)] items-start gap-10 max-[1000px]:grid-cols-1 max-[1000px]:gap-5">
        <section className="min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="m-0 text-[23px] font-extrabold tracking-[-0.02em] text-texto">Iniciar videollamada</h1>
              <p className="m-0 mt-1 text-[13px] text-texto-suave">Revisa tu configuración antes de ingresar a la llamada</p>
            </div>
          </div>

          <div className="relative my-5 h-[420px] overflow-hidden rounded-[14px] max-[900px]:h-[320px]" style={{ background: 'linear-gradient(135deg, #2c2059, #4630d7)' }}>
            <button type="button" aria-label="Cambiar cámara" className="absolute right-3.5 top-3.5 grid h-8.5 w-8.5 place-items-center rounded-lg border-0 bg-[rgba(15,12,30,.45)] text-white">
              <Icono name="video" className="h-4 w-4" />
            </button>
            <span className="absolute bottom-3.5 left-3.5 rounded-lg bg-[rgba(15,12,30,.55)] px-3 py-1.25 text-xs font-semibold text-white">Pedro Lozano</span>
            <div className="absolute bottom-3.5 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
              <button type="button" aria-label="Silenciar micrófono" className="grid h-[42px] w-[42px] place-items-center rounded-full border-0 bg-white text-texto">
                <Icono name="microfono" className="h-4.5 w-4.5" />
              </button>
              <button type="button" aria-label="Apagar cámara" className="grid h-[42px] w-[42px] place-items-center rounded-full border-0 bg-white text-texto">
                <Icono name="video" className="h-4.5 w-4.5" />
              </button>
              <button type="button" aria-label="Configuración" className="grid h-[42px] w-[42px] place-items-center rounded-full border-0 bg-[rgba(15,12,30,.55)] text-white">
                <Icono name="ajustes-sistema" className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 items-start gap-4 max-[900px]:grid-cols-1">
            <section className="rounded-xl border border-borde bg-white p-4">
              <h2 className="m-0 mb-3 text-sm font-bold text-texto">Dispositivos</h2>
              {[
                { icono: 'video' as const, titulo: 'Cámara', detalle: 'Logitech C920 Pro HD' },
                { icono: 'microfono' as const, titulo: 'Micrófono', detalle: 'Micrófono (Realtek High Definition Audio)' },
                { icono: 'altavoz' as const, titulo: 'Altavoces', detalle: 'Altavoces (Realtek High Definition Audio)' },
              ].map((d, i, arr) => (
                <div key={d.titulo} className={'flex items-center gap-2.5 py-2.5 ' + (i < arr.length - 1 ? 'border-b border-borde' : '')}>
                  <Icono name={d.icono} className="h-[17px] w-[17px] flex-none text-texto-suave" />
                  <div className="min-w-0 flex-1">
                    <strong className="block text-[12.5px] text-texto">{d.titulo}</strong>
                    <span className="block truncate text-[11px] text-texto-suave">{d.detalle}</span>
                  </div>
                  <Icono name="flecha-abajo" className="h-3.5 w-3.5 flex-none text-texto-suave" />
                </div>
              ))}
              <a href="#" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primario no-underline">
                <Icono name="actualizar" className="h-3.5 w-3.5" /> Probar dispositivos
              </a>
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <h2 className="m-0 mb-3 text-sm font-bold text-texto">Configuración de la llamada</h2>
              {[
                { icono: 'video' as const, titulo: 'Fondo virtual', detalle: 'Desenfocar mi fondo' },
                { icono: 'sentimiento' as const, titulo: 'Mejorar iluminación', detalle: 'Ajustar automáticamente' },
                { icono: 'microfono' as const, titulo: 'Reducir ruido', detalle: 'Filtrar sonidos de fondo' },
              ].map((c, i, arr) => (
                <div key={c.titulo} className={'flex items-center gap-2.5 py-2.5 ' + (i < arr.length - 1 ? 'border-b border-borde' : '')}>
                  <Icono name={c.icono} className="h-[17px] w-[17px] flex-none text-texto-suave" />
                  <div className="min-w-0 flex-1">
                    <strong className="block text-[12.5px] text-texto">{c.titulo}</strong>
                    <span className="block truncate text-[11px] text-texto-suave">{c.detalle}</span>
                  </div>
                  <label className="relative inline-block h-[22px] w-[38px] flex-none">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <span className="absolute inset-0 rounded-full bg-borde transition-colors peer-checked:bg-primario before:absolute before:left-[3px] before:top-[3px] before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform before:content-[''] peer-checked:before:translate-x-4" />
                  </label>
                </div>
              ))}
            </section>
          </div>

          <a href="14-04-mensajes-04-videollamadas-iniciar-encurso.html" className="mt-5 flex w-full items-center justify-center gap-2 rounded-[7px] border border-transparent bg-primario py-3.25 text-sm font-medium text-white no-underline hover:bg-primario-oscuro">
            <Icono name="video" className="h-[17px] w-[17px]" /> Iniciar videollamada
          </a>
          <a href="12-04-mensajes-04-videollamadas.html" className="mt-2.5 block text-center text-[13px] text-texto-suave no-underline hover:underline">Cancelar</a>
        </section>

        <aside className="grid min-w-0 gap-4">
          <section className="rounded-xl border border-borde bg-white p-4">
            <div className="mb-2.5 flex items-center justify-between">
              <h2 className="m-0 text-sm font-bold text-texto">Participantes (2)</h2>
              <Icono name="flecha-abajo" className="h-[15px] w-[15px] text-texto-suave" />
            </div>
            {[
              { nombre: 'Pedro Lozano (Tú)', rol: 'Organizador' },
              { nombre: 'María Fernández', rol: 'En línea' },
            ].map((p) => (
              <article key={p.nombre} className="flex items-center gap-2.5 py-2">
                <span
                  className="h-8 w-8 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${usuarioImg})` }}
                />
                <div className="min-w-0 flex-1">
                  <strong className="block truncate text-[12.5px] text-texto">{p.nombre}</strong>
                  <span className="block text-[11px] text-exito">{p.rol}</span>
                </div>
                <Icono name="microfono" className="h-[15px] w-[15px] flex-none text-exito" />
              </article>
            ))}

            <h3 className="mb-2 mt-3.5 text-[12.5px] font-bold text-texto">Invitar a más personas</h3>
            <CampoBusqueda placeholder="Buscar contactos o ingresar correo..." className="mb-1.5 w-full" />

            <div className="flex flex-col">
              {['Luis Rodríguez', 'Carmen López', 'Diego Mendoza', 'Ana García'].map((nombre) => (
                <article key={nombre} className="flex items-center gap-2.5 py-2">
                  <span
                  className="h-8 w-8 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${usuarioImg})` }}
                />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-[12.5px] text-texto">{nombre}</strong>
                    <span className="block text-[11px] text-texto-suave">Colaborador</span>
                  </div>
                  <button type="button" className="flex-none whitespace-nowrap rounded-lg border border-borde bg-white px-3 py-1 text-[11.5px] font-medium text-texto hover:border-primario hover:text-primario">Invitar</button>
                </article>
              ))}
            </div>

            <button type="button" className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-borde bg-white px-4 py-2 text-[13px] font-medium text-texto hover:border-primario hover:text-primario">
              <Icono name="enlace" className="h-3.5 w-3.5" /> Copiar enlace de la reunión
            </button>
          </section>

          <section className="rounded-xl border border-borde bg-white p-4">
            <h2 className="m-0 mb-2.5 text-sm font-bold text-texto">Opciones de llamada</h2>
            {[
              { icono: 'nuevo-usuario' as const, titulo: 'Agregar participante', detalle: 'Invita a alguien a la llamada' },
              { icono: 'usuarios' as const, titulo: 'Llamada en grupo', detalle: 'Crea o gestiona una llamada grupal' },
            ].map((o) => (
              <button key={o.titulo} type="button" className="flex w-full items-center gap-2.5 border-0 bg-transparent py-2 text-left">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-primario-suave text-primario">
                  <Icono name={o.icono} className="h-[15px] w-[15px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-[12.5px] text-texto">{o.titulo}</strong>
                  <span className="block text-[11px] text-texto-suave">{o.detalle}</span>
                </div>
                <Icono name="flecha-derecha" className="h-3.5 w-3.5 flex-none text-texto-suave" />
              </button>
            ))}
          </section>

          <section className="rounded-xl border border-borde bg-white p-4">
            <h2 className="m-0 mb-2.5 text-sm font-bold text-texto">Detalles de la reunión</h2>
            <strong className="mb-2.5 block text-[12.5px] text-texto">Reunión de seguimiento del proyecto Puente Central</strong>
            <div className="mb-2 flex items-center gap-2 text-xs text-texto-suave">
              <Icono name="calendario" className="h-3.5 w-3.5 flex-none" /> Viernes, 15 de agosto de 2026
            </div>
            <div className="mb-2 flex items-center gap-2 text-xs text-texto-suave">
              <Icono name="reloj" className="h-3.5 w-3.5 flex-none" /> 10:00 AM - 11:00 AM (1h)
            </div>
            <div className="flex items-center gap-2 text-xs text-texto-suave">
              <Icono name="usuarios" className="h-3.5 w-3.5 flex-none" /> 4 participantes
            </div>
          </section>
        </aside>
      </div>
    </EstructuraApp>
  )
}
