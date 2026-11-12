import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, MensajeVacio, MensajeEstadoBusqueda } from '../../componentes/compartido'
import { useRef, useState } from 'react'
import { PestanasEventos, ModalCrearEvento, DetalleEvento, SeccionParaTi, BloqueBuscar, SeccionProximos2, BloqueCategoria, SinEventosUbicacion, ResultadosFiltroFecha, SeccionDestacados2, usarFiltrosEventos, usarEventosParaTi } from '../../componentes/eventos'
import { DATOS_EXPLORAR_EVENTOS, BUSQUEDA_EVENTOS_PARA_TI, PROXIMOS, PROXIMOS_LATERAL_PARA_TI as PROXIMOS_LATERAL, CATEGORIAS_LATERAL_PARA_TI as CATEGORIAS_LATERAL } from '../../rutas/eventos/rutas_eventos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'

export function PaginaEventosParaTi() {
  const [detalleAbierto, setDetalleAbierto] = useState(false)
  const [creandoEvento, setCreandoEvento] = useState(false)
  const filtros = usarFiltrosEventos()
  const { filtroFecha, filtroUbicacion } = filtros
  const pistaProximosRef = useRef<HTMLDivElement>(null)
  const { ubicacion, setUbicacion, busquedaEvento, estadoParaTi, destacadosVisibles, proximosVisibles, indiceVisible, destacado, setIndiceDestacado, alCambiarDestacado } = usarEventosParaTi({
    configuracionBusqueda: BUSQUEDA_EVENTOS_PARA_TI,
    proximos: PROXIMOS,
    categoriasSeleccionadas: filtros.categoriasSeleccionadas,
  })

  function alDesplazarProximos(direccion: -1 | 1) {
    const pista = pistaProximosRef.current
    if (!pista) return
    pista.scrollBy({ left: direccion * pista.clientWidth * 0.9, behavior: catalogoEventos.claves.desplazamiento_suave as ScrollBehavior })
  }

  function cerrarCreacion() {
    setCreandoEvento(false)
  }

  function cerrarDetalle() {
    setDetalleAbierto(false)
  }

  function abrirFiltroUbicacion() {
    filtros.setFiltroUbicacionAbierto(true)
  }

  function quitarFiltroUbicacion() {
    filtros.setFiltroUbicacion(null)
  }

  function quitarFiltroFecha() {
    filtros.setFiltroFecha(null)
  }

  return (
    <EstructuraApp paginaActiva={catalogoEventos.claves.modulo}>
      <EstructuraTresColumnas
        principal={
          <section>
            <SeccionParaTi setCreandoEvento={setCreandoEvento} />

            <BloqueBuscar evento={busquedaEvento.texto} ubicacion={ubicacion} alCambiarEvento={busquedaEvento.cambiarTexto} alCambiarUbicacion={setUbicacion} />

            <PestanasEventos activa={catalogoEventos.claves.pestanas.para_ti} insigniaInvitaciones={{ valor: 7, estilo: catalogoEventos.claves.insignia.pill }} />

            {creandoEvento && <ModalCrearEvento onCerrar={cerrarCreacion} />}
            {detalleAbierto && destacado ? (
              <DetalleEvento evento={destacado} onVolver={cerrarDetalle} />
            ) : (
              <>
              <BloqueCategoria
                datos={{ ...filtros, ...DATOS_EXPLORAR_EVENTOS }}
              />

              {filtroUbicacion !== null && !DATOS_EXPLORAR_EVENTOS.CIUDADES_CON_EVENTOS.includes(filtroUbicacion) ? (
                <SinEventosUbicacion ciudad={filtroUbicacion} onCambiar={abrirFiltroUbicacion} onVerTodos={quitarFiltroUbicacion} />
              ) : filtroFecha !== null ? (
                <ResultadosFiltroFecha filtro={filtroFecha} resultados={DATOS_EXPLORAR_EVENTOS.RESULTADOS_FILTRO_FECHA} onExplorar={quitarFiltroFecha} />
              ) : destacado === undefined && proximosVisibles.length === 0 ? (
                <MensajeVacio texto={catalogoEventos.mensajes.sin_eventos} className="py-10" />
              ) : (
                <>
                <MensajeEstadoBusqueda estado={estadoParaTi} error={busquedaEvento.error} className="mb-5" />
                <SeccionDestacados2
                  destacado={destacado}
                  alCambiarDestacado={alCambiarDestacado}
                  setDetalleAbierto={setDetalleAbierto}
                  DESTACADOS={destacadosVisibles}
                  setIndiceDestacado={setIndiceDestacado}
                  indiceDestacado={indiceVisible}
                  alDesplazarProximos={alDesplazarProximos}
                  pistaProximosRef={pistaProximosRef}
                  PROXIMOS={proximosVisibles}
                />
                </>
              )}
                </>
            )}
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <SeccionProximos2 PROXIMOS_LATERAL={PROXIMOS_LATERAL} CATEGORIAS_LATERAL={CATEGORIAS_LATERAL} />
        }
      />
    </EstructuraApp>
  )
}
