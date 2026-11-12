import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { BloqueExplorarEventos, SeccionCalendario13, usarFiltrosEventos } from '../../componentes/eventos'
import { DATOS_EXPLORAR_EVENTOS, EVENTOS_PROXIMOS as EVENTOS, PROXIMAS_FECHAS_EVENTOS_PROXIMOS as PROXIMAS_FECHAS, CATEGORIAS_LATERAL_EVENTOS_PROXIMOS as CATEGORIAS_LATERAL, MES_CALENDARIO_PROXIMOS, SEMANAS_CALENDARIO_PROXIMOS } from '../../rutas/eventos/rutas_eventos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'



export function PaginaEventosProximos() {
  const filtros = usarFiltrosEventos()

  return (
    <EstructuraApp paginaActiva={catalogoEventos.claves.modulo}>
      <EstructuraTresColumnas
        principal={
          <BloqueExplorarEventos
            clave={catalogoEventos.claves.pestanas.proximos}
            datos={{ ...filtros, ...DATOS_EXPLORAR_EVENTOS, EVENTOS }}
          />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <SeccionCalendario13
            MES_CALENDARIO_POPULARES={MES_CALENDARIO_PROXIMOS}
            SEMANAS_CALENDARIO_POPULARES={SEMANAS_CALENDARIO_PROXIMOS}
            PROXIMAS_FECHAS={PROXIMAS_FECHAS}
            CATEGORIAS_LATERAL={CATEGORIAS_LATERAL}
            conEnlaceVerTodas={false}
          />
        }
      />
    </EstructuraApp>
  )
}
