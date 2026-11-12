import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { BloqueInvitaciones, PestanasEventos, PestanasFiltroInvitaciones, TarjetaInvitacion, SeccionCalendario3 } from '../../componentes/eventos'
import { ACEPTADAS, PROXIMOS_LATERAL_INVITACIONES as PROXIMOS_LATERAL, MES_CALENDARIO_INVITACIONES, RESUMEN_INVITACIONES, CONTEO_PESTANAS_INVITACIONES, SEMANAS_CALENDARIO_INVITACIONES } from '../../rutas/eventos/rutas_eventos'


export function PaginaEventosInvitacionesAceptadas() {
  return (
    <EstructuraApp paginaActiva="eventos">
      <EstructuraTresColumnas
        principal={
        <section>
          <BloqueInvitaciones />

          <PestanasEventos activa="invitaciones" insigniaInvitaciones={{ valor: 2, estilo: 'pill' }} />

          <PestanasFiltroInvitaciones activa="aceptadas" conteos={CONTEO_PESTANAS_INVITACIONES} />

          <div className="mb-6">
            <h2 className="m-0 text-titulo-seccion text-texto">{catalogoEventos.titulos.invitaciones_aceptadas}</h2>
            <p className="m-0 mt-0.5 text-cuerpo text-texto-suave">{catalogoEventos.subtitulos.invitaciones_aceptadas}</p>
          </div>

          <div className="flex flex-col gap-4">
            {ACEPTADAS.map((inv) => (
              <TarjetaInvitacion key={inv.nombre} inv={inv} />
            ))}
          </div>
        </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
        <SeccionCalendario3
          MES_CALENDARIO_INVITACIONES={MES_CALENDARIO_INVITACIONES}
          SEMANAS_CALENDARIO_INVITACIONES={SEMANAS_CALENDARIO_INVITACIONES}
          PROXIMOS_LATERAL={PROXIMOS_LATERAL}
          RESUMEN_INVITACIONES={RESUMEN_INVITACIONES}
        />
        }
      />
    </EstructuraApp>
  )
}
