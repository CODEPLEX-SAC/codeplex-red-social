import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { useRef, useState } from 'react'
import { PestanasEventos, ModalCrearEvento, DetalleEvento, SeccionParaTi, BloqueBuscar, SeccionProximos2, BloqueCategoria, SinEventosUbicacion, ResultadosFiltroFecha, SeccionDestacados2, usarFiltrosEventos } from '../../componentes/eventos'
import { RESULTADOS_FILTRO_FECHA, DESTACADOS, PROXIMOS, PROXIMOS_LATERAL_PARA_TI as PROXIMOS_LATERAL, CATEGORIAS_LATERAL_PARA_TI as CATEGORIAS_LATERAL, CATEGORIAS_FILTRO_PARA_TI, CIUDADES_FILTRO_PARA_TI, MARCADORES_MAPA_PARA_TI, CIUDADES_CON_EVENTOS } from '../../rutas/eventos/rutas_eventos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'

export function PaginaEventosParaTi() {
  const [indiceDestacado, setIndiceDestacado] = useState(0)
  const [detalleAbierto, setDetalleAbierto] = useState(false)
  const [creandoEvento, setCreandoEvento] = useState(false)
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
  const pistaProximosRef = useRef<HTMLDivElement>(null)

  function alCambiarDestacado(direccion: -1 | 1) {
    setIndiceDestacado((actual) => (actual + direccion + DESTACADOS.length) % DESTACADOS.length)
  }

  function alDesplazarProximos(direccion: -1 | 1) {
    const pista = pistaProximosRef.current
    if (!pista) return
    pista.scrollBy({ left: direccion * pista.clientWidth * 0.9, behavior: catalogoEventos.claves.desplazamiento_suave as ScrollBehavior })
  }

  const destacado = DESTACADOS[indiceDestacado]

  function cerrarCreacion() {
    setCreandoEvento(false)
  }

  function cerrarDetalle() {
    setDetalleAbierto(false)
  }

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
    <EstructuraApp paginaActiva={catalogoEventos.claves.modulo}>
      <EstructuraTresColumnas
        principal={
          <section>
            <SeccionParaTi setCreandoEvento={setCreandoEvento} />

            <BloqueBuscar />

            <PestanasEventos activa={catalogoEventos.claves.pestanas.para_ti} insigniaInvitaciones={{ valor: 7, estilo: catalogoEventos.claves.insignia.pill }} />

            {creandoEvento && <ModalCrearEvento onCerrar={cerrarCreacion} />}
            {detalleAbierto ? (
              <DetalleEvento evento={destacado} onVolver={cerrarDetalle} />
            ) : (
              <>
              <BloqueCategoria
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
                }}
              />

              {filtroUbicacion !== null && !CIUDADES_CON_EVENTOS.includes(filtroUbicacion) ? (
                <SinEventosUbicacion ciudad={filtroUbicacion} onCambiar={abrirFiltroUbicacion} onVerTodos={quitarFiltroUbicacion} />
              ) : filtroFecha !== null ? (
                <ResultadosFiltroFecha filtro={filtroFecha} resultados={RESULTADOS_FILTRO_FECHA} onExplorar={quitarFiltroFecha} />
              ) : (
                <SeccionDestacados2
                  destacado={destacado}
                  alCambiarDestacado={alCambiarDestacado}
                  setDetalleAbierto={setDetalleAbierto}
                  DESTACADOS={DESTACADOS}
                  setIndiceDestacado={setIndiceDestacado}
                  indiceDestacado={indiceDestacado}
                  alDesplazarProximos={alDesplazarProximos}
                  pistaProximosRef={pistaProximosRef}
                  PROXIMOS={PROXIMOS}
                />
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
