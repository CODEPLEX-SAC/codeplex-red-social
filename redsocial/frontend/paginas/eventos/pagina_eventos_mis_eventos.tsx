import { EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { useState } from 'react'
import { PestanasEventos, ModalCrearEvento, EditarEvento, BloqueMisEventos, SeccionEventosOrganizas, SeccionCalendario11 } from '../../componentes/eventos'
import type { FiltroFecha } from '@/tipos/eventos/contrato_filtro_fecha'
import { RESULTADOS_FILTRO_FECHA, EVENTOS_ORGANIZAS, EVENTO_COLABORAS, PROXIMOS_LATERAL_MIS_EVENTOS as PROXIMOS_LATERAL, MES_CALENDARIO_MIS_EVENTOS, RESUMEN_MIS_EVENTOS, SEMANAS_CALENDARIO_MIS_EVENTOS, ESTADO_ESTILO, ESTADO_ETIQUETA } from '../../rutas/eventos/rutas_eventos'
import catalogoEventos from '../../catalogos/capacidades/redsocial/eventos.json'


export function PaginaEventosMisEventos() {
  const [filtroEstadoAbierto, setFiltroEstadoAbierto] = useState(false)
  const [filtroFechaAbierto, setFiltroFechaAbierto] = useState(false)
  const [filtroFecha, setFiltroFecha] = useState<FiltroFecha | null>(null)
  const [menuOrganizasAbierto, setMenuOrganizasAbierto] = useState<string | null>(null)
  const [anclaMenuOrganizas, setAnclaMenuOrganizas] = useState<HTMLElement | null>(null)
  const [creandoEvento, setCreandoEvento] = useState(false)
  const [eventoEditando, setEventoEditando] = useState<string | null>(null)

  function alAbrirMenuOrganizas(evento: { stopPropagation: () => void; currentTarget: HTMLElement }, nombre: string) {
    evento.stopPropagation()
    setMenuOrganizasAbierto(nombre)
    setAnclaMenuOrganizas(evento.currentTarget)
  }

  function cerrarMenuOrganizas() {
    setMenuOrganizasAbierto(null)
    setAnclaMenuOrganizas(null)
  }

  const eventoEnEdicion = EVENTOS_ORGANIZAS.find((ev) => ev.nombre === eventoEditando) ?? null

  return (
    <EstructuraApp paginaActiva={catalogoEventos.claves.modulo}>
      <EstructuraTresColumnas
        principal={
          <section>
            <BloqueMisEventos setCreandoEvento={setCreandoEvento} />

            <PestanasEventos activa={catalogoEventos.claves.pestanas.mis_eventos} insigniaInvitaciones={{ valor: 2, estilo: catalogoEventos.claves.insignia.texto }} />

            {creandoEvento && <ModalCrearEvento onCerrar={() => setCreandoEvento(false)} />}

            {eventoEnEdicion ? (
              <EditarEvento
                evento={eventoEnEdicion}
                estiloInsignia={ESTADO_ESTILO.borrador}
                etiquetaInsignia={ESTADO_ETIQUETA.borrador}
                onVolver={() => setEventoEditando(null)}
              />
            ) : (
              <SeccionEventosOrganizas
                datos={{
                  setFiltroEstadoAbierto,
                  filtroEstadoAbierto,
                  setFiltroFechaAbierto,
                  filtroFechaAbierto,
                  filtroFecha,
                  setFiltroFecha,
                  RESULTADOS_FILTRO_FECHA,
                  EVENTOS_ORGANIZAS,
                  ESTADO_ESTILO,
                  ESTADO_ETIQUETA,
                  alAbrirMenuOrganizas,
                  menuOrganizasAbierto,
                  anclaMenuOrganizas,
                  cerrarMenuOrganizas,
                  setEventoEditando,
                  EVENTO_COLABORAS,
                }}
              />
            )}
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <SeccionCalendario11
            MES_CALENDARIO_MIS_EVENTOS={MES_CALENDARIO_MIS_EVENTOS}
            SEMANAS_CALENDARIO_MIS_EVENTOS={SEMANAS_CALENDARIO_MIS_EVENTOS}
            PROXIMOS_LATERAL={PROXIMOS_LATERAL}
            RESUMEN_MIS_EVENTOS={RESUMEN_MIS_EVENTOS}
          />
        }
      />
    </EstructuraApp>
  )
}
