import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { BloqueExplorarEventos, SeccionCalendario13, usarFiltrosEventos } from '../../componentes/eventos'
import { RESULTADOS_FILTRO_FECHA, EVENTOS_POPULARES as EVENTOS, PROXIMAS_FECHAS_POPULARES as PROXIMAS_FECHAS, CATEGORIAS_LATERAL_POPULARES as CATEGORIAS_LATERAL, MES_CALENDARIO_POPULARES, SEMANAS_CALENDARIO_POPULARES, CATEGORIAS_FILTRO_PARA_TI, CIUDADES_FILTRO_PARA_TI, MARCADORES_MAPA_PARA_TI, CIUDADES_CON_EVENTOS } from '../../rutas/eventos/rutas_eventos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'



export function PaginaEventosPopulares() {
  const {
    filtroFechaAbierto,
    setFiltroFechaAbierto,
    filtroFecha,
    setFiltroFecha,
    filtroCategoriaAbierto,
    setFiltroCategoriaAbierto,
    filtroUbicacionAbierto,
    setFiltroUbicacionAbierto,
    filtroUbicacion,
    setFiltroUbicacion,
  } = usarFiltrosEventos()

  return (
    <EstructuraApp paginaActiva={catalogoEventos.claves.modulo}>
      <EstructuraTresColumnas
        principal={
          <BloqueExplorarEventos
            clave={catalogoEventos.claves.pestanas.populares}
            datos={{
              setFiltroFechaAbierto,
              filtroFechaAbierto,
              filtroFecha,
              setFiltroFecha,
              setFiltroCategoriaAbierto,
              filtroCategoriaAbierto,
              CATEGORIAS_FILTRO_PARA_TI,
              setFiltroUbicacionAbierto,
              filtroUbicacionAbierto,
              filtroUbicacion,
              setFiltroUbicacion,
              CIUDADES_FILTRO_PARA_TI,
              MARCADORES_MAPA_PARA_TI,
              CIUDADES_CON_EVENTOS,
              RESULTADOS_FILTRO_FECHA,
              EVENTOS,
            }}
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
