import { Icono } from '../../compartido/icono'
import { EventosProximosPanel } from '../../compartido/bloques/eventos_proximos_panel'

const CONTACTOS_LINEA = [
  { nombre: 'Ana García', colaborador: true },
  { nombre: 'Luis Rodríguez', colaborador: true },
  { nombre: 'Carmen López', colaborador: true },
  { nombre: 'Diego Mendoza', colaborador: false },
  { nombre: 'María Fernández', colaborador: false },
] as const

const GRUPOS_RECIENTES = [
  { nombre: 'Ingenieros Civiles', miembros: '12.4 mil miembros' },
  { nombre: 'Emprendedores Perú', miembros: '8.7 mil miembros' },
  { nombre: 'Tecnología & Innovación', miembros: '5.3 mil miembros' },
] as const

const EVENTOS_PROXIMOS = [
  { dia: '15', mes: 'JUN', titulo: 'Reunión de Proyectos', detalle: 'Lun, 15 jun · 10:00 AM · Oficina Principal' },
  { dia: '22', mes: 'JUN', titulo: 'Capacitación en Seguridad', detalle: 'Lun, 22 jun · 2:00 PM · Virtual' },
  { dia: '30', mes: 'JUN', titulo: 'Cumpleaños: Juan Pérez', detalle: 'Mar, 30 jun · Todo el día' },
] as const

const AVATAR = "h-8 w-8 flex-none rounded-full bg-primario-suave bg-[url('/imagenes/usuario.jpg')] bg-cover bg-center bg-no-repeat"

export function PanelLateralMensajeria() {
  return (
    <aside className="grid gap-4">
      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-[13px] text-texto">Contactos en línea</h2>
          <a href="#" className="text-[11px] text-primario no-underline">Ver todos</a>
        </div>
        {CONTACTOS_LINEA.map((c) => (
          <article key={c.nombre} className="flex items-center gap-2 border-b border-[#f0eef5] py-2">
            <span className={AVATAR} />
            <div className="min-w-0 flex-1">
              <strong className="block text-[11px] text-texto">
                {c.nombre}{' '}
                {c.colaborador && <span className="ml-1 text-[9px] font-bold text-exito">(COLABORADOR)</span>}
              </strong>
            </div>
            <span className="ml-auto h-2 w-2 flex-none rounded-full bg-exito" />
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-borde bg-white p-4">
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="m-0 text-[13px] text-texto">Grupos recientes</h2>
          <a href="#" className="text-[11px] text-primario no-underline">Ver todos</a>
        </div>
        {GRUPOS_RECIENTES.map((g) => (
          <div key={g.nombre} className="flex items-center gap-2.5 py-2">
            <span className="h-[38px] w-[38px] flex-none rounded-[9px] bg-primario-suave" />
            <div className="min-w-0 flex-1">
              <strong className="block truncate text-[11.5px] text-texto">{g.nombre}</strong>
              <span className="mt-0.5 block truncate text-[9.5px] text-texto-suave">{g.miembros}</span>
            </div>
            <button type="button" aria-label="Unirse" className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full border border-borde bg-white text-primario">
              <Icono name="mas" className="h-[13px] w-[13px]" />
            </button>
          </div>
        ))}
      </section>

      <EventosProximosPanel eventos={EVENTOS_PROXIMOS} />
    </aside>
  )
}
