import { Icono } from '../../componentes/compartido/icono'
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
import {
  PUBLICACION_GRUPO_TODAS,
  MENCION_TODAS,
  COMENTARIO_TODAS,
  EVENTO_SISTEMA_TODAS,
  ARCHIVOS_MODULO_TODAS,
  GRUPO_UNIDO_TODAS,
} from '../../datos/actividad/todas'
import { SESION_ACTUAL } from '../../datos/compartido/sesion_actual'

export function PaginaActividadTodas() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">{catalogoActividad.titulos.todas}</h1>
              <p className="m-0 text-xs text-texto-suave">{catalogoActividad.subtitulos.todas}</p>
            </div>

            <PestanasActividad activa="02-02-actividad-01-todas-web.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              <TarjetaActividad
                nombreUsuario={PUBLICACION_GRUPO_TODAS.nombreUsuario}
                accion={PUBLICACION_GRUPO_TODAS.accion}
                nombreGrupo={PUBLICACION_GRUPO_TODAS.nombreGrupo}
                tiempo={PUBLICACION_GRUPO_TODAS.tiempo}
                visibilidad
                interacciones={{ reacciones: 128, comentarios: 24 }}
              >
                <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                  <p className="m-0 flex-1 text-xs leading-[1.45] text-texto">{PUBLICACION_GRUPO_TODAS.texto}</p>
                  <div className="ml-auto h-[68px] w-[100px] flex-none rounded-md bg-[#e8e5f0]" />
                </div>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario={MENCION_TODAS.nombreUsuario}
                accion={MENCION_TODAS.accion}
                tiempo={MENCION_TODAS.tiempo}
                visibilidad
                interacciones={{ reacciones: 45, comentarios: 12 }}
              >
                <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                  <p className="m-0 flex-1 text-xs leading-[1.45] text-texto">
                    <span className="font-semibold text-primario">@{SESION_ACTUAL.usuario}</span> {MENCION_TODAS.texto}
                  </p>
                  <div className="ml-auto h-[68px] w-[100px] flex-none rounded-md bg-[#e8e5f0]" />
                </div>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario={COMENTARIO_TODAS.nombreUsuario}
                accion={COMENTARIO_TODAS.accion}
                tiempo={COMENTARIO_TODAS.tiempo}
                visibilidad
                interacciones={{ reacciones: 28, comentarios: 9 }}
              >
                <p className="m-0 mb-1.5 mt-0.5 text-xs leading-[1.45] text-texto">{COMENTARIO_TODAS.texto}</p>
              </TarjetaActividad>

              <TarjetaActividad iconoSistema="sistema" nombreUsuario={EVENTO_SISTEMA_TODAS.nombreUsuario} tiempo={EVENTO_SISTEMA_TODAS.tiempo}>
                <p className="m-0 mb-1.5 mt-0.5 text-xs leading-[1.45] text-texto">{EVENTO_SISTEMA_TODAS.texto}</p>
                <span className="inline-block rounded-[10px] bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-semibold text-[#2e7d32]">{EVENTO_SISTEMA_TODAS.estado}</span>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario={ARCHIVOS_MODULO_TODAS.nombreUsuario}
                accion={ARCHIVOS_MODULO_TODAS.accion}
                nombreModulo={ARCHIVOS_MODULO_TODAS.nombreModulo}
                tiempo={ARCHIVOS_MODULO_TODAS.tiempo}
              >
                <div className="my-1 overflow-hidden rounded-lg border border-borde">
                  {ARCHIVOS_MODULO_TODAS.archivos.map((f) => (
                    <div key={f.nombre} className="flex items-center gap-2 border-b border-[#f5f3fa] px-2.5 py-1.75 last:border-b-0 hover:bg-[#fdfcff]">
                      <div className={'grid h-[30px] w-[30px] flex-none place-items-center rounded-md ' + (f.tipo === 'pdf' ? 'bg-[#fdeceb] text-[#dc2626]' : 'bg-[#e8f5e9] text-[#2e7d32]')}>
                        <Icono name={f.tipo === 'pdf' ? 'archivo-pdf' : 'archivo-hoja'} className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-[11px] font-semibold text-texto">{f.nombre}</span>
                        <span className="block text-[10px] text-texto-suave">{f.tamano}</span>
                      </div>
                      <div className="grid h-6 w-6 flex-none place-items-center text-[#c4c0d3]">
                        <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario={GRUPO_UNIDO_TODAS.nombreUsuario}
                accion={GRUPO_UNIDO_TODAS.accion}
                nombreGrupo={GRUPO_UNIDO_TODAS.nombreGrupo}
                tiempo={GRUPO_UNIDO_TODAS.tiempo}
              >
                <div className="mt-1 flex items-center gap-2.5 rounded-lg border border-borde bg-[#f9f8fc] px-3 py-2">
                  <div className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-naranja-categoria text-white">
                    <Icono name="grupos" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold text-texto">{GRUPO_UNIDO_TODAS.nombreGrupo}</span>
                    <span className="block text-[11px] text-texto-suave">{GRUPO_UNIDO_TODAS.miembros}</span>
                  </div>
                  <button type="button" className="inline-flex h-[30px] flex-none items-center rounded-md border border-primario bg-transparent px-3.5 text-xs font-semibold text-primario hover:bg-primario hover:text-white">
                    {catalogoActividad.botones.todas_ver_grupo}
                  </button>
                </div>
              </TarjetaActividad>
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
