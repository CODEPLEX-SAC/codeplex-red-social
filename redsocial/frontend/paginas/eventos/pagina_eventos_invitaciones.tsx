import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { SeccionTodasLasInvitaciones, SeccionCalendario3 } from '../../componentes/eventos'
import { PENDIENTES, ACEPTADAS, RECHAZADAS, PROXIMOS_LATERAL_INVITACIONES as PROXIMOS_LATERAL, MES_CALENDARIO_INVITACIONES, RESUMEN_INVITACIONES, CONTEO_PESTANAS_INVITACIONES, SEMANAS_CALENDARIO_INVITACIONES } from '../../rutas/eventos/rutas_eventos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'


export function PaginaEventosInvitaciones() {
  return (
    <EstructuraApp paginaActiva={catalogoEventos.claves.modulo}>
      <EstructuraTresColumnas
        principal={
        <SeccionTodasLasInvitaciones
          CONTEO_PESTANAS_INVITACIONES={CONTEO_PESTANAS_INVITACIONES}
          PENDIENTES={PENDIENTES}
          ACEPTADAS={ACEPTADAS}
          RECHAZADAS={RECHAZADAS}
        />
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
