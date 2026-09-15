import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import catalogoGrupos from '../../catalogos/capacidades/redsocial/grupos.json'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasGrupos } from '../../componentes/grupos/bloques/pestanas_grupos'
import { FilaActividadGrupo } from '../../componentes/actividad/bloques/fila_actividad_grupo'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { ColorGrupo } from '@/tipos/grupos/pagina_grupos_invitaciones'
import {
  PENDIENTES,
  ACEPTADAS,
  RESUMEN_INVITACIONES as RESUMEN,
  ACTIVIDAD_INVITACIONES as ACTIVIDAD,
  CONTEO_PESTANAS_INVITACIONES_GRUPO as CONTEO,
} from '../../datos/grupos/invitaciones'

const CLASES_ICONO_INV: Record<ColorGrupo, string> = {
  morado: 'bg-morado-categoria',
  violeta: 'bg-morado-categoria',
  naranja: 'bg-naranja-categoria',
  azul: 'bg-azul-categoria',
  rosa: 'bg-[#ec4899]',
  verde: 'bg-verde-categoria',
}

const CLASES_RESUMEN: Record<'morado' | 'verde' | 'rojo' | 'gris', string> = {
  morado: 'bg-[#ede9fe] text-morado-categoria',
  verde: 'bg-[#dcfce7] text-verde-categoria',
  rojo: 'bg-[#fee2e2] text-[#dc2626]',
  gris: 'bg-[#f1f0f4] text-[#9c99ab]',
}

export function PaginaGruposInvitaciones() {
  return (
    <EstructuraApp paginaActiva="grupos">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-4 flex items-start justify-between gap-5">
              <h1 className="m-0 text-[22px] font-extrabold text-texto">{catalogoGrupos.titulos.invitaciones}</h1>
              <div className="flex flex-none items-center gap-2.5">
                <button type="button" className="inline-flex h-[38px] items-center gap-1.5 whitespace-nowrap rounded-lg border border-borde bg-white px-4.5 text-[13px] font-semibold text-texto hover:border-primario hover:bg-[#f5f3ff] hover:text-primario">
                  <Icono name="mas" className="h-4 w-4" /> {catalogoGrupos.botones.invitar_a_grupo}
                </button>
                <button type="button" aria-label={catalogoGrupos.botones.mas_opciones} className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/6">
                  <Icono name="puntos" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <PestanasGrupos activa="21-06-grupos-03-web-invitaciones.html" />

            <div className="mb-4 flex flex-wrap gap-1.5 max-[600px]:flex-nowrap max-[600px]:overflow-x-auto max-[600px]:[-ms-overflow-style:none] max-[600px]:[scrollbar-width:none] max-[600px]:[&::-webkit-scrollbar]:hidden">
              <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-[20px] border border-primario bg-primario px-3.5 text-xs text-white no-underline">
                {catalogoGrupos.filtros.todas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-white/25 px-1 text-[9px] font-bold">{CONTEO.todas}</span>
              </a>
              <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-[20px] border border-borde bg-white px-3.5 text-xs text-texto-suave no-underline hover:bg-[#f7f6fa]">
                {catalogoGrupos.filtros.pendientes} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-[#efedf7] px-1 text-[9px] font-bold text-texto-suave">{CONTEO.pendientes}</span>
              </a>
              <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-[20px] border border-borde bg-white px-3.5 text-xs text-texto-suave no-underline hover:bg-[#f7f6fa]">
                {catalogoGrupos.filtros.aceptadas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-[#efedf7] px-1 text-[9px] font-bold text-texto-suave">{CONTEO.aceptadas}</span>
              </a>
              <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-[20px] border border-borde bg-white px-3.5 text-xs text-texto-suave no-underline hover:bg-[#f7f6fa]">
                {catalogoGrupos.filtros.rechazadas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-[#efedf7] px-1 text-[9px] font-bold text-texto-suave">{CONTEO.rechazadas}</span>
              </a>
              <a href="#" className="inline-flex h-8 flex-none items-center gap-1.25 whitespace-nowrap rounded-[20px] border border-borde bg-white px-3.5 text-xs text-texto-suave no-underline hover:bg-[#f7f6fa]">
                {catalogoGrupos.filtros.expiradas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-[#efedf7] px-1 text-[9px] font-bold text-texto-suave">{CONTEO.expiradas}</span>
              </a>
            </div>

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-[38px] flex-1 items-center gap-2 rounded-lg border border-borde bg-white px-3.5">
                <Icono name="buscar" className="h-4 w-4 flex-none text-[#b3b0c2]" />
                <input type="search" placeholder={catalogoGrupos.placeholders.buscar_invitaciones} className="min-w-0 flex-1 border-0 bg-transparent text-xs text-texto outline-none placeholder:text-[#b3b0c2]" />
              </div>
              <button type="button" className="flex h-[38px] flex-none items-center gap-1 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto-suave">
                {catalogoGrupos.botones.mas_recientes} <Icono name="flecha-abajo" className="h-3 w-3" />
              </button>
            </div>

            <section className="mb-4 rounded-control border border-borde bg-white p-5">
              <h2 className="m-0 mb-3.5 text-[15px] font-bold text-texto">{catalogoGrupos.filtros.pendientes} ({CONTEO.pendientes})</h2>
              {PENDIENTES.map((p) => (
                <article key={p.nombre} className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-[#f0eef5] py-4 last:border-b-0 max-[900px]:justify-between">
                  <div className="flex min-w-0 flex-[1_1_240px] items-start gap-3">
                    <div className={`grid h-11 w-11 flex-none place-items-center rounded-control text-white ${CLASES_ICONO_INV[p.color]}`}>
                      <Icono name={p.icono} className="h-5.5 w-5.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="m-0 mb-px flex items-center gap-1.5 text-[13px] font-bold text-texto">
                        {p.nombre}
                        {p.privado && <span className="inline-block rounded-[3px] bg-[#ede9fe] px-1.5 py-px text-[9px] font-semibold text-morado-categoria">{catalogoGrupos.leyendas.privado}</span>}
                      </h3>
                      <span className="text-[11px] text-texto-suave">{p.tipo}</span>
                      <div className="mt-1.5 flex items-center">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <AvatarImagen
                            key={i}
                            src={usuarioImg}
                            className={'h-6 w-6 rounded-full border-2 border-white bg-primario-suave' + (i > 0 ? ' -ml-1.5' : '')}
                          />
                        ))}
                        <span className="-ml-1 inline-flex h-6 items-center rounded-xl border-2 border-white bg-[#ede9fe] px-1.5 text-[9px] font-bold text-primario">{p.masAvatares}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex min-w-[140px] flex-none items-center gap-2">
                    <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
                    <div className="min-w-0">
                      <strong className="block text-xs font-semibold text-texto">{p.invitadoPor}</strong>
                      <span className="text-[10px] text-texto-suave">{p.tiempo}</span>
                    </div>
                  </div>
                  <div className="min-w-[90px] flex-none text-center max-[900px]:ml-auto">
                    <span className="flex items-center justify-center gap-1 text-[11px] text-texto-suave">
                      <Icono name="reloj" className="h-3 w-3" /> {catalogoGrupos.leyendas.expira_en}
                    </span>
                    <span className={'text-xs font-bold ' + (p.expiraColor === 'verde' ? 'text-[#16a34a]' : 'text-[#ea580c]')}>{p.expiraTexto}</span>
                  </div>
                  <div className="flex flex-none items-center gap-2 max-[900px]:w-full max-[900px]:justify-between">
                    <button type="button" className="inline-flex h-8 items-center justify-center rounded-md border-0 bg-primario px-4 text-xs font-semibold text-white hover:bg-primario-oscuro max-[900px]:flex-1">{catalogoGrupos.botones.aceptar}</button>
                    <button type="button" className="inline-flex h-8 items-center justify-center rounded-md border border-[#fca5a5] bg-white px-4 text-xs font-semibold text-[#dc2626] hover:border-[#dc2626] hover:bg-[#fef2f2] max-[900px]:flex-1">{catalogoGrupos.botones.rechazar}</button>
                    <button type="button" aria-label={catalogoGrupos.botones.opciones} className="grid h-8 w-8 flex-none place-items-center rounded-md border border-borde bg-white text-[#b3b0c2] hover:border-primario hover:text-primario">
                      <Icono name="puntos" className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <section className="rounded-control border border-borde bg-white p-5">
              <h2 className="m-0 mb-3.5 text-[15px] font-bold text-texto">{catalogoGrupos.filtros.aceptadas} ({CONTEO.aceptadas})</h2>
              {ACEPTADAS.map((a) => (
                <article key={a.nombre} className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-[#f0eef5] py-4 last:border-b-0 max-[900px]:justify-between">
                  <div className="flex min-w-0 flex-[1_1_240px] items-start gap-3">
                    <div className={`grid h-11 w-11 flex-none place-items-center rounded-control text-white ${CLASES_ICONO_INV[a.color]}`}>
                      <Icono name={a.icono} className="h-5.5 w-5.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="m-0 mb-px text-[13px] font-bold text-texto">{a.nombre}</h3>
                      <span className="text-[11px] text-texto-suave">{a.tipo}</span>
                    </div>
                  </div>
                  <div className="flex min-w-[140px] flex-none items-center gap-2">
                    <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
                    <div className="min-w-0">
                      <strong className="block text-xs font-semibold text-texto">{a.invitadoPor}</strong>
                      <span className="text-[10px] text-texto-suave">{a.tiempo}</span>
                    </div>
                  </div>
                  <div className="min-w-[100px] flex-none text-center max-[900px]:ml-auto">
                    <span className="block text-[11px] text-texto-suave">{catalogoGrupos.leyendas.aceptaste_el}</span>
                    <span className="text-xs font-semibold text-texto">{a.fecha}</span>
                  </div>
                  <div className="flex flex-none items-center gap-2 max-[900px]:w-full max-[900px]:justify-between">
                    <span className="inline-flex h-[30px] items-center rounded-md border border-[#bbf7d0] bg-[#f0fdf4] px-3.5 text-xs font-semibold text-[#16a34a]">{catalogoGrupos.leyendas.en_grupo}</span>
                    <button type="button" aria-label={catalogoGrupos.botones.opciones} className="grid h-8 w-8 flex-none place-items-center rounded-md border border-borde bg-white text-[#b3b0c2] hover:border-primario hover:text-primario">
                      <Icono name="puntos" className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
              <a href="#" className="flex items-center justify-center border-t border-[#f0eef5] p-3.5 text-xs font-semibold text-primario no-underline hover:underline">{catalogoGrupos.leyendas.ver_todas_aceptadas}</a>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-[#eee] bg-white p-4">
              <h3 className="m-0 mb-3.5 text-sm font-bold text-texto">{catalogoGrupos.secciones.resumen_invitaciones}</h3>
              <div className="mb-4 grid gap-3">
                {RESUMEN.map((r) => (
                  <div key={r.etiqueta} className="flex items-center gap-2.5">
                    <span className={`grid h-[30px] w-[30px] flex-none place-items-center rounded-full ${CLASES_RESUMEN[r.color]}`}>
                      <Icono name={r.icono} className="h-[15px] w-[15px]" />
                    </span>
                    <span className="flex-1 text-[13px] text-texto">{r.etiqueta}</span>
                    <strong className="text-sm text-texto">{r.valor}</strong>
                  </div>
                ))}
              </div>
              <a href="#" className="block rounded-lg border border-borde bg-white py-2.25 text-center text-xs font-semibold text-primario no-underline hover:bg-[#f7f6fa]">{catalogoGrupos.leyendas.ver_todas_invitaciones}</a>
            </section>

            <section className="rounded-xl border border-[#eee] bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h3 className="m-0 text-sm font-bold text-texto">{catalogoGrupos.secciones.actividad_reciente}</h3>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">{catalogoGrupos.leyendas.ver_toda}</a>
              </div>
              {ACTIVIDAD.map((a) => (
                <FilaActividadGrupo key={a.nombre + a.grupo} nombre={a.nombre} accion={a.accion} grupo={a.grupo} tiempo={a.tiempo} icono={a.icono} colorIcono={a.color} />
              ))}
            </section>

            <section className="rounded-xl border border-[#eee] bg-white p-4.5">
              <span className="mb-2.5 grid h-8 w-8 place-items-center rounded-lg bg-[#dcfce7] text-[#16a34a]">
                <Icono name="amigos" className="h-4 w-4" />
              </span>
              <strong className="mb-1 block text-[13px] text-texto">{catalogoGrupos.ayuda.titulo}</strong>
              <p className="m-0 mb-3 text-[11px] leading-[1.45] text-texto-suave">{catalogoGrupos.ayuda.texto}</p>
              <a href="#" className="flex items-center justify-center gap-1.5 rounded-lg border border-borde bg-white py-2 text-xs font-semibold text-texto no-underline hover:bg-[#f7f6fa]">
                <Icono name="ajustes-sistema" className="h-3.5 w-3.5" /> {catalogoGrupos.botones.ir_a_configuracion}
              </a>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
