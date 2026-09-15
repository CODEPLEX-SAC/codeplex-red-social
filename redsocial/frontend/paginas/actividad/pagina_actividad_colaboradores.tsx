import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoActividad from '../../catalogos/capacidades/redsocial/actividad.json'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasActividad } from '../../componentes/actividad/bloques/pestanas_actividad'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { GruposRecomendadosPanel } from '../../componentes/compartido/bloques/grupos_recomendados_panel'
import { EventosProximosPanel } from '../../componentes/compartido/bloques/eventos_proximos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { EventoColaborador } from '@/tipos/actividad/pagina_actividad_colaboradores'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../datos/compartido/panel_lateral'
import { EVENTOS_COLABORADOR } from '../../datos/actividad/eventos_colaboradores'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { navegar } from '../../rutas/compartido/navegacion'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import catalogoColaboradores from '../../catalogos/capacidades/redsocial/colaboradores.json'

const CLASES_BADGE: Record<EventoColaborador['color'], string> = {
  verde: 'bg-[#22c55e]',
  azul: 'bg-[#3b82f6]',
  rojo: 'bg-[#ef4444]',
}

export function PaginaActividadColaboradores() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">{catalogoActividad.titulos.colaboradores}</h1>
              <p className="m-0 text-xs text-texto-suave">{catalogoActividad.subtitulos.colaboradores}</p>
            </div>

            <PestanasActividad activa="05-02-actividad-04-colaboradores.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              {EVENTOS_COLABORADOR.map((e) => (
                <article key={e.nombre} className="flex items-start gap-3.5 border-b border-[#f0eef5] p-3.5 last:border-b-0 hover:bg-[#fdfcff]">
                  <div className="relative h-11 w-11 flex-none">
                    <AvatarImagen src={usuarioImg} className="block h-11 w-11 rounded-full bg-primario-suave" />
                    <span className={`absolute -bottom-0.5 -right-0.5 grid h-[22px] w-[22px] place-items-center rounded-full border-2 border-white text-white ${CLASES_BADGE[e.color]}`}>
                      <Icono name={e.icono} className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 text-[13px]">
                    <span className="font-bold text-texto">{e.nombre}</span>
                    <span className="text-texto-suave">{e.accion}</span>
                    {e.destino && <span className="font-bold text-texto">{e.destino}</span>}
                    {e.detalle && <span className="mt-0.5 block text-xs text-texto-suave">{e.detalle}</span>}
                  </div>
                  <div className="flex flex-none items-center gap-3">
                    <span className="whitespace-nowrap text-[11px] text-[#aaa7b5]">{e.tiempo}</span>
                    <button
                      type="button"
                      onClick={() => navegar(e.irAGrupos ? catalogoGrupos.rutas.mis_grupos : catalogoColaboradores.rutas.perfil)}
                      className="inline-flex h-[30px] flex-none items-center whitespace-nowrap rounded-md border border-primario bg-transparent px-3.5 text-xs font-semibold text-primario hover:bg-primario hover:text-white"
                    >
                      {e.boton}
                    </button>
                  </div>
                </article>
              ))}
              <button type="button" className="flex w-full items-center justify-center gap-1.5 border-t border-[#f0eef5] bg-transparent p-3.5 text-[13px] font-semibold text-primario hover:bg-[#fdfcff]">
                {textosRedSocial.CARGAR_MAS}
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
