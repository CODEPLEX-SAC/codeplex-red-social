import { useState } from 'react'
import { BotonIcono, BotonPieLista, Selector, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, ContactosPanel, GruposRecomendadosPanel, EventosProximosPanel, BloqueAnuncio } from '../../componentes/compartido'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { PestanasActividad } from '../../componentes/actividad'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../rutas/compartido/rutas_compartido'
import { EVENTOS_SISTEMA, CLASES_ICONO_EVENTO, CLASES_INDICADOR } from '../../rutas/actividad/rutas_actividad'

const TODOS = 'todos'

export function PaginaActividadSistema() {
  const [estado, setEstado] = useState(TODOS)
  const estados = [...new Set(EVENTOS_SISTEMA.map((e) => e.estado))]
  const eventos = EVENTOS_SISTEMA.filter((e) => estado === TODOS || e.estado === estado)
  const nombresEstado = catalogoActividad.estados_sistema as Record<string, string>

  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-titulo-pagina text-texto">{catalogoActividad.titulos.sistema}</h1>
              <p className="m-0 text-subtitulo text-texto-suave">{catalogoActividad.subtitulos.sistema}</p>
            </div>

            <PestanasActividad activa="sistema" />

            <section className="rounded-control border border-borde bg-white">
              <div className="flex items-start justify-between gap-3 border-b border-borde p-4 pb-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-control bg-fondo-hover-discreto text-texto-suave">
                    <Icono name="configuracion" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="m-0 mb-0.5 text-titulo-seccion text-texto">{catalogoActividad.secciones.sistema.titulo}</h2>
                    <p className="m-0 text-auxiliar text-texto-suave">{catalogoActividad.secciones.sistema.descripcion}</p>
                  </div>
                </div>
                <Selector variant="mini" value={estado} onChange={(evento) => setEstado(evento.target.value)} aria-label={catalogoActividad.botones.sistema_filtro} className="flex-none">
                  <option value={TODOS}>{catalogoActividad.botones.sistema_todos}</option>
                  {estados.map((clave) => (
                    <option key={clave} value={clave}>{nombresEstado[clave] ?? clave}</option>
                  ))}
                </Selector>
              </div>

              {eventos.map((e) => (
                <article key={e.titulo} className="flex items-center gap-3 border-b border-borde-suave p-3.5 last:border-b-0 hover:bg-fondo">
                  <div className={`grid h-10 w-10 flex-none place-items-center rounded-control ${CLASES_ICONO_EVENTO[e.color]}`}>
                    <Icono name={e.icono} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mb-0.5 block text-titulo-subseccion text-texto">{e.titulo}</span>
                    <span className="mb-0.75 block text-auxiliar text-texto-suave">{e.descripcion}</span>
                    <div className="flex flex-wrap items-center gap-1 text-auxiliar text-texto-suave">
                      {e.detalles.map((d, i) => (
                        <span key={d} className="flex items-center gap-1">
                          {i > 0 && <span aria-hidden="true">·</span>}
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-2">
                    <span className="whitespace-nowrap text-fecha-abreviada text-texto-suave">{e.tiempo}</span>
                    <span className={`h-2 w-2 flex-none rounded-full ${CLASES_INDICADOR[e.estado]}`} />
                    <BotonIcono icono="puntos" type="button" aria-label={textosRedSocial.MAS_OPCIONES} variant="discreto" size="md" className="flex-none" />
                  </div>
                </article>
              ))}

              <BotonPieLista>{textosRedSocial.CARGAR_MAS}</BotonPieLista>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <ContactosPanel contactos={CONTACTOS_SUGERIDOS} />
            <GruposRecomendadosPanel grupos={GRUPOS_RECOMENDADOS} />
            <EventosProximosPanel eventos={EVENTOS_PROXIMOS} />
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}
