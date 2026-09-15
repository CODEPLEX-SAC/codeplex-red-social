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
import mensajesGlobales from '../../mensajes/globales/textos.json'
import type { EstadoIndicador, ColorEvento } from '@/tipos/actividad/pagina_actividad_sistema'
import { CONTACTOS_SUGERIDOS, GRUPOS_RECOMENDADOS, EVENTOS_PROXIMOS } from '../../datos/compartido/panel_lateral'
import { EVENTOS_SISTEMA } from '../../datos/actividad/eventos_sistema'

const CLASES_ICONO_EVENTO: Record<ColorEvento, string> = {
  verde: 'bg-[#e8f5e9] text-[#2e7d32]',
  azul: 'bg-[#e3f2fd] text-[#1565c0]',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  naranja: 'bg-[#fff3e0] text-[#e65100]',
  rojo: 'bg-[#fdeceb] text-[#dc2626]',
}

const CLASES_INDICADOR: Record<EstadoIndicador, string> = {
  exito: 'bg-[#22c55e]',
  info: 'bg-[#3b82f6]',
  pendiente: 'bg-[#a855f7]',
  advertencia: 'bg-[#f97316]',
  error: 'bg-[#ef4444]',
}

export function PaginaActividadSistema() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">{catalogoActividad.titulos.sistema}</h1>
              <p className="m-0 text-xs text-texto-suave">{catalogoActividad.subtitulos.sistema}</p>
            </div>

            <PestanasActividad activa="08-02-actividad-07-sistema.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              <div className="flex items-start justify-between gap-3 border-b border-borde p-4 pb-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-[#f5f3fa] text-texto-suave">
                    <Icono name="configuracion" className="h-[22px] w-[22px]" />
                  </div>
                  <div>
                    <h2 className="m-0 mb-0.5 text-base font-bold text-texto">{catalogoActividad.secciones.sistema.titulo}</h2>
                    <p className="m-0 text-xs text-texto-suave">{catalogoActividad.secciones.sistema.descripcion}</p>
                  </div>
                </div>
                <button type="button" className="inline-flex h-8 flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto">
                  {catalogoActividad.botones.sistema_todos}
                  <Icono name="flecha-abajo" className="h-3.5 w-3.5 text-texto-suave" />
                </button>
              </div>

              {EVENTOS_SISTEMA.map((e) => (
                <article key={e.titulo} className="flex items-center gap-3 border-b border-[#f0eef5] p-3.5 last:border-b-0 hover:bg-[#fdfcff]">
                  <div className={`grid h-10 w-10 flex-none place-items-center rounded-[10px] ${CLASES_ICONO_EVENTO[e.color]}`}>
                    <Icono name={e.icono} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mb-0.5 block text-[13px] font-bold text-texto">{e.titulo}</span>
                    <span className="mb-0.75 block text-xs text-texto-suave">{e.descripcion}</span>
                    <div className="flex flex-wrap items-center gap-1 text-[11px] text-[#9892a6]">
                      {e.detalles.map((d, i) => (
                        <span key={d} className="flex items-center gap-1">
                          {i > 0 && <span className="text-[#d4d0e0]">·</span>}
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-2">
                    <span className="whitespace-nowrap text-[11px] text-[#aaa7b5]">{e.tiempo}</span>
                    <span className={`h-2 w-2 flex-none rounded-full ${CLASES_INDICADOR[e.estado]}`} />
                    <button type="button" aria-label={mensajesGlobales.MAS_OPCIONES} className="grid h-7 w-7 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-[#f5f3fa] hover:text-texto">
                      <Icono name="puntos" className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}

              <button type="button" className="flex w-full items-center justify-center gap-1.5 border-t border-[#f0eef5] bg-transparent p-3.5 text-[13px] font-semibold text-primario hover:bg-[#fdfcff]">
                {mensajesGlobales.CARGAR_MAS}
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
