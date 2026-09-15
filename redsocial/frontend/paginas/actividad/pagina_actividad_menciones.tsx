import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasActividad } from '../../componentes/actividad/bloques/pestanas_actividad'
import { TarjetaActividad } from '../../componentes/actividad/bloques/tarjeta_actividad'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { GruposRecomendadosPanel } from '../../componentes/compartido/bloques/grupos_recomendados_panel'
import { EventosProximosPanel } from '../../componentes/compartido/bloques/eventos_proximos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../datos/compartido/panel_lateral'
import { MENCIONES } from '../../datos/actividad/menciones'
import { SESION_ACTUAL } from '../../datos/compartido/sesion_actual'

export function PaginaActividadMenciones() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">{catalogoActividad.titulos.menciones}</h1>
              <p className="m-0 text-xs text-texto-suave">{catalogoActividad.subtitulos.menciones}</p>
            </div>

            <PestanasActividad activa="04-02-actividad-03-menciones.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              {MENCIONES.map((m) => (
                <TarjetaActividad
                  key={m.nombre}
                  nombreUsuario={m.nombre}
                  accion={m.accion}
                  nombreGrupo={m.nombreGrupo}
                  tiempo={m.tiempo}
                  visibilidad
                  interacciones={{ reacciones: m.reacciones, comentarios: m.comentarios }}
                >
                  {m.conImagen ? (
                    <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                      <p className="m-0 flex-1 text-xs leading-[1.45] text-texto">
                        <span className="font-semibold text-primario">@{SESION_ACTUAL.usuario}</span> {m.texto}
                      </p>
                      <div className="ml-auto h-[68px] w-[100px] flex-none rounded-md bg-[#e8e5f0]" />
                    </div>
                  ) : (
                    <p className="m-0 mb-1.5 mt-0.5 text-xs leading-[1.45] text-texto">
                      <span className="font-semibold text-primario">@{SESION_ACTUAL.usuario}</span> {m.texto}
                    </p>
                  )}
                </TarjetaActividad>
              ))}
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <ContactosPanel contactos={CONTACTOS_SUGERIDOS} />
            <GruposRecomendadosPanel titulo="Grupos recientes" grupos={GRUPOS_RECOMENDADOS} />
            <EventosProximosPanel eventos={EVENTOS_PROXIMOS} />
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}
