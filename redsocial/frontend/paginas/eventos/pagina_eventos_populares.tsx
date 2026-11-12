import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { BloqueExplorarEventos, SeccionCalendario13, usarFiltrosEventos } from '../../componentes/eventos'
import { DATOS_EXPLORAR_EVENTOS, EVENTOS_POPULARES as EVENTOS, PROXIMAS_FECHAS_POPULARES as PROXIMAS_FECHAS, CATEGORIAS_LATERAL_POPULARES as CATEGORIAS_LATERAL, MES_CALENDARIO_POPULARES, SEMANAS_CALENDARIO_POPULARES } from '../../rutas/eventos/rutas_eventos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'



export function PaginaEventosPopulares() {
  const filtros = usarFiltrosEventos()

  return (
    <EstructuraApp paginaActiva={catalogoEventos.claves.modulo}>
      <EstructuraTresColumnas
        principal={
          <BloqueExplorarEventos
            clave={catalogoEventos.claves.pestanas.populares}
            datos={{ ...filtros, ...DATOS_EXPLORAR_EVENTOS, EVENTOS }}
          />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <SeccionCalendario13
            MES_CALENDARIO_POPULARES={MES_CALENDARIO_POPULARES}
            SEMANAS_CALENDARIO_POPULARES={SEMANAS_CALENDARIO_POPULARES}
            PROXIMAS_FECHAS={PROXIMAS_FECHAS}
            CATEGORIAS_LATERAL={CATEGORIAS_LATERAL}
          />
        }
      />
    </EstructuraApp>
  )
}
