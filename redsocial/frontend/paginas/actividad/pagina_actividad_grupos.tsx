import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasActividad } from '../../componentes/actividad/bloques/pestanas_actividad'
import { Insignia } from '../../componentes/compartido/interfaz/insignia'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { GruposRecomendadosPanel } from '../../componentes/compartido/bloques/grupos_recomendados_panel'
import { EventosProximosPanel } from '../../componentes/compartido/bloques/eventos_proximos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { GrupoActividad } from '@/tipos/actividad/pagina_actividad_grupos'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../datos/compartido/panel_lateral'
import { GRUPOS_ACTIVIDAD } from '../../datos/actividad/grupos_actividad'

const CLASES_ICONO_GRUPO: Record<GrupoActividad['color'], string> = {
  morado: 'bg-morado-categoria',
  azul: 'bg-azul-categoria',
  naranja: 'bg-naranja-categoria',
  rosa: 'bg-[#ec4899]',
  teal: 'bg-[#14b8a6]',
}

export function PaginaActividadGrupos() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">{catalogoActividad.titulos.grupos}</h1>
              <p className="m-0 text-xs text-texto-suave">{catalogoActividad.subtitulos.grupos}</p>
            </div>

            <PestanasActividad activa="06-02-actividad-05-grupos.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              <div className="flex items-start justify-between gap-3 border-b border-borde p-4 pb-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-[#f5f3fa] text-texto-suave">
                    <Icono name="grupos" className="h-[22px] w-[22px]" />
                  </div>
                  <div>
                    <h2 className="m-0 mb-0.5 text-base font-bold text-texto">{catalogoActividad.secciones.grupos.titulo}</h2>
                    <p className="m-0 text-xs text-texto-suave">{catalogoActividad.secciones.grupos.descripcion}</p>
                  </div>
                </div>
                <button type="button" className="inline-flex h-[34px] flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-primario bg-transparent px-4 text-xs font-semibold text-primario hover:bg-primario hover:text-white">
                  <Icono name="mas" className="h-3.5 w-3.5" /> {catalogoActividad.botones.grupos_crear}
                </button>
              </div>

              {GRUPOS_ACTIVIDAD.map((g) => (
                <article
                  key={g.nombre}
                  className={
                    'grid items-start gap-x-3.5 gap-y-0 border-b border-[#f0eef5] p-4 last:border-b-0 hover:bg-[#fdfcff] ' +
                    '[grid-template-columns:auto_minmax(0,1fr)_auto_auto] ' +
                    '[grid-template-areas:"icon_nombre_actividades_flecha"_"icon_miembros_miembros_miembros"_"icon_actividad_actividad_actividad"] ' +
                    'max-[600px]:gap-y-2 ' +
                    'max-[600px]:[grid-template-columns:auto_minmax(0,1fr)_auto] ' +
                    'max-[600px]:[grid-template-areas:"icon_nombre_flecha"_"icon_badge_badge"_"icon_meta_meta"_"actividad_actividad_actividad"]'
                  }
                >
                  <div className={`grid h-12 w-12 flex-none place-items-center rounded-xl text-white [grid-area:icon] ${CLASES_ICONO_GRUPO[g.color]}`}>
                    <Icono name="grupos" className="h-[26px] w-[26px]" />
                  </div>

                  <div className="mb-0.5 flex flex-wrap items-center gap-2 [grid-area:nombre] max-[600px]:contents">
                    <span className="min-w-0 text-sm font-bold text-texto max-[600px]:[grid-area:nombre]">{g.nombre}</span>
                    <div className="max-[600px]:[grid-area:badge]">
                      <Insignia variant="privacy" tone={g.privacidad}>{g.privacidad === 'publico' ? catalogoActividad.insignias.grupo_publico : catalogoActividad.insignias.grupo_privado}</Insignia>
                    </div>
                  </div>

                  <div className="contents max-[600px]:flex max-[600px]:items-center max-[600px]:gap-1 max-[600px]:[grid-area:meta]">
                    <span className="mb-2 block text-xs text-texto-suave [grid-area:miembros] max-[600px]:mb-0">{g.miembros}</span>
                    <span className="whitespace-nowrap text-xs text-texto-suave [grid-area:actividades] max-[600px]:before:mr-1 max-[600px]:before:content-['·']">{g.actividades}</span>
                  </div>

                  <div className="flex items-center gap-2 [grid-area:actividad]">
                    <AvatarImagen src={usuarioImg} className="h-7 w-7 flex-none rounded-full bg-primario-suave" />
                    <div className="min-w-0 flex-1 text-xs">
                      <span className="font-semibold text-texto">{g.usuario}</span>
                      <span className="text-texto-suave">{g.accion}</span>
                      <span className="mt-0.5 block text-[11px] text-[#aaa7b5]">{g.tiempo}</span>
                    </div>
                  </div>

                  <div className="grid h-5 w-5 place-items-center text-[#c4c0d3] [grid-area:flecha]">
                    <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
                  </div>
                </article>
              ))}

              <button type="button" className="flex w-full items-center justify-center gap-1.5 border-t border-[#f0eef5] bg-transparent p-3.5 text-[13px] font-semibold text-primario hover:bg-[#fdfcff]">
                {catalogoActividad.botones.grupos_ver_mas}
                <Icono name="flecha-abajo" className="h-4 w-4" />
              </button>
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
