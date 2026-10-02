import { PestanasEventos } from './pestanas_eventos'
import { PestanasFiltroInvitaciones } from './pestanas_filtro_invitaciones'
import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { Icono } from '../../compartido/icono'
import { TarjetaInvitacion } from './tarjeta_invitacion'
import { BloqueInvitaciones } from './bloque_invitaciones'
import type { Invitacion } from '@/tipos/eventos/modelo_eventos_invitaciones'

export function SeccionTodasLasInvitaciones({
  CONTEO_PESTANAS_INVITACIONES,
  PENDIENTES,
  ACEPTADAS,
  RECHAZADAS,
}: {
  CONTEO_PESTANAS_INVITACIONES: { todas: number; pendientes: number; aceptadas: number; rechazadas: number; }
  PENDIENTES: Invitacion[]
  ACEPTADAS: Invitacion[]
  RECHAZADAS: Invitacion[]
}) {
  return (
    <section>
      <BloqueInvitaciones />

      <PestanasEventos activa="invitaciones" insigniaInvitaciones={{ valor: 2, estilo: 'pill' }} />

      <PestanasFiltroInvitaciones activa="todas" conteos={CONTEO_PESTANAS_INVITACIONES} />

      <div className="mb-6">
        <h2 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoEventos.titulos.todas_las_invitaciones}</h2>
        <p className="m-0 mt-0.5 text-cuerpo text-texto-suave">{catalogoEventos.subtitulos.todas_las_invitaciones}</p>
      </div>

      <section className="mb-7">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoEventos.secciones.invitaciones_pendientes} ({PENDIENTES.length})</h2>
          <a href={catalogoEventos.rutas.invitaciones_pendientes} className="flex items-center gap-1 text-enlace-accion font-semibold text-primario no-underline hover:underline">
            {catalogoEventos.botones.ver_todas} <Icono name="flecha-derecha" className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex flex-col gap-4">
          {PENDIENTES.map((inv) => (
            <TarjetaInvitacion key={inv.nombre} inv={inv} />
          ))}
        </div>
      </section>

      <section className="mb-7">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoEventos.secciones.invitaciones_aceptadas} ({ACEPTADAS.length})</h2>
          <a href={catalogoEventos.rutas.invitaciones_aceptadas} className="flex items-center gap-1 text-enlace-accion font-semibold text-primario no-underline hover:underline">
            {catalogoEventos.botones.ver_todas} <Icono name="flecha-derecha" className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex flex-col gap-4">
          {ACEPTADAS.map((inv) => (
            <TarjetaInvitacion key={inv.nombre} inv={inv} />
          ))}
        </div>
      </section>

      <section className="mb-7">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoEventos.secciones.invitaciones_rechazadas} ({RECHAZADAS.length})</h2>
          <a href={catalogoEventos.rutas.invitaciones_rechazadas} className="flex items-center gap-1 text-enlace-accion font-semibold text-primario no-underline hover:underline">
            {catalogoEventos.botones.ver_todas} <Icono name="flecha-derecha" className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex flex-col gap-4">
          {RECHAZADAS.map((inv) => (
            <TarjetaInvitacion key={inv.nombre} inv={inv} />
          ))}
        </div>
      </section>
    </section>
  )
}
