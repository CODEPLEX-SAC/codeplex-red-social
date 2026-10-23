import { useState } from 'react'
import { BotonIcono, BotonPieLista, Selector, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, ContactosPanel, GruposRecomendadosPanel, EventosProximosPanel, BloqueAnuncio } from '../../componentes/compartido'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { PestanasActividad } from '../../componentes/actividad'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../rutas/compartido/rutas_compartido'
import { EVENTOS_MODULO, CLASES_ICONO, CLASES_REFERENCIA } from '../../rutas/actividad/rutas_actividad'

const TODOS = 'todos'

export function PaginaActividadModulos() {
  const [modulo, setModulo] = useState(TODOS)
  const nombres = [...new Set(EVENTOS_MODULO.map((m) => m.nombre))]
  const eventos = EVENTOS_MODULO.filter((m) => modulo === TODOS || m.nombre === modulo)

  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-titulo-pagina text-texto">{catalogoActividad.titulos.modulos}</h1>
              <p className="m-0 text-subtitulo text-texto-suave">{catalogoActividad.subtitulos.modulos}</p>
            </div>

            <PestanasActividad activa="modulos" />

            <section className="rounded-control border border-borde bg-white">
              <div className="flex items-start justify-between gap-3 border-b border-borde p-4 pb-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-control bg-fondo-hover-discreto text-texto-suave">
                    <Icono name="cuadricula-oficial" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="m-0 mb-0.5 text-titulo-seccion text-texto">{catalogoActividad.secciones.modulos.titulo}</h2>
                    <p className="m-0 text-auxiliar text-texto-suave">{catalogoActividad.secciones.modulos.descripcion}</p>
                  </div>
                </div>
                <Selector variant="mini" value={modulo} onChange={(evento) => setModulo(evento.target.value)} aria-label={catalogoActividad.botones.modulos_filtro} className="flex-none">
                  <option value={TODOS}>{catalogoActividad.botones.modulos_todos}</option>
                  {nombres.map((nombre) => (
                    <option key={nombre} value={nombre}>{nombre}</option>
                  ))}
                </Selector>
              </div>

              {eventos.map((m) => (
                <article key={m.nombre} className="flex items-center gap-3 border-b border-borde-suave p-3.5 last:border-b-0 hover:bg-fondo">
                  <div className={`grid h-10.5 w-10.5 flex-none place-items-center rounded-xl text-white ${CLASES_ICONO[m.color]}`}>
                    <Icono name={m.icono} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mb-0.5 block text-nombre-entidad text-texto">{m.nombre}</span>
                    <span className="mb-1.25 block text-auxiliar text-texto-suave">{m.descripcion}</span>
                    <div>
                      <span className={`inline-block whitespace-nowrap rounded px-2 py-0.5 text-badge ${CLASES_REFERENCIA[m.colorReferencia]}`}>{m.referencia}</span>
                      <span className="ml-2 text-auxiliar text-texto-suave">{m.detalles}</span>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-2">
                    <span className="whitespace-nowrap text-fecha-abreviada text-texto-suave">{m.tiempo}</span>
                    <span className="h-2 w-2 flex-none rounded-full bg-azul-categoria" />
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
