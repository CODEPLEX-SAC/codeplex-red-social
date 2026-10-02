import catalogoEventos from '../../../catalogos/capacidades/redsocial/eventos.json'
import { PestanasEventos } from './pestanas_eventos'
import { ResultadosFiltroFecha } from './resultados_filtro_fecha'
import { SinEventosUbicacion } from './sin_eventos_ubicacion'
import { BloqueCategoria } from './bloque_categoria'
import { EncabezadoEventosExplorar } from './encabezado_eventos_explorar'
import { ListaEventosExplorar } from './lista_eventos_explorar'
import type { DatosExplorarEventos } from '@/tipos/eventos/contrato_explorar_eventos'

export function BloqueExplorarEventos({ datos, clave }: { datos: DatosExplorarEventos; clave: string }) {
  const { CIUDADES_CON_EVENTOS, RESULTADOS_FILTRO_FECHA, EVENTOS, ...filtros } = datos
  const { filtroUbicacion, filtroFecha, setFiltroUbicacionAbierto, setFiltroUbicacion, setFiltroFecha } = filtros

  function abrirFiltroUbicacion() {
    setFiltroUbicacionAbierto(true)
  }

  function quitarFiltroUbicacion() {
    setFiltroUbicacion(null)
  }

  function quitarFiltroFecha() {
    setFiltroFecha(null)
  }

  return (
    <section>
      <EncabezadoEventosExplorar clave={clave} />

      <PestanasEventos activa={clave} insigniaInvitaciones={{ valor: 2, estilo: catalogoEventos.claves.insignia.pill }} />

      <BloqueCategoria datos={filtros} />

      {filtroUbicacion !== null && !CIUDADES_CON_EVENTOS.includes(filtroUbicacion) ? (
        <SinEventosUbicacion ciudad={filtroUbicacion} onCambiar={abrirFiltroUbicacion} onVerTodos={quitarFiltroUbicacion} />
      ) : filtroFecha !== null ? (
        <ResultadosFiltroFecha filtro={filtroFecha} resultados={RESULTADOS_FILTRO_FECHA} onExplorar={quitarFiltroFecha} />
      ) : (
        <ListaEventosExplorar EVENTOS={EVENTOS} />
      )}
    </section>
  )
}
