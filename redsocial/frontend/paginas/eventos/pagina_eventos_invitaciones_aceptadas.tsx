import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, Icono } from '../../componentes/compartido'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'
import { PestanasEventos, PestanasFiltroInvitaciones, TarjetaInvitacion, SeccionCalendario3 } from '../../componentes/eventos'
import { ACEPTADAS, PROXIMOS_LATERAL_INVITACIONES as PROXIMOS_LATERAL, MES_CALENDARIO_INVITACIONES, RESUMEN_INVITACIONES, CONTEO_PESTANAS_INVITACIONES, SEMANAS_CALENDARIO_INVITACIONES } from '../../rutas/eventos/rutas_eventos'


export function PaginaEventosInvitacionesAceptadas() {
  return (
    <EstructuraApp paginaActiva="eventos">
      <EstructuraTresColumnas
        principal={
        <section>
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 flex-none place-items-center rounded-control bg-primario-suave text-primario">
                <Icono name="calendario" className="w-5.5 h-5.5" />
              </div>
              <div>
                <h1 className="m-0 text-titulo-pagina font-extrabold text-texto">
                  {catalogoEventos.titulos.seccion} <span className="text-primario">/ {catalogoEventos.titulos.invitaciones}</span>
                </h1>
                <p className="m-0 mt-0.5 text-subtitulo text-texto-suave">{catalogoEventos.subtitulos.invitaciones}</p>
              </div>
            </div>
          </div>

          <PestanasEventos activa="invitaciones" insigniaInvitaciones={{ valor: 2, estilo: 'pill' }} />

          <PestanasFiltroInvitaciones activa="aceptadas" conteos={CONTEO_PESTANAS_INVITACIONES} />

          <div className="mb-6">
            <h2 className="m-0 text-titulo-seccion font-bold text-gris-oscuro-texto">{catalogoEventos.titulos.invitaciones_aceptadas}</h2>
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
