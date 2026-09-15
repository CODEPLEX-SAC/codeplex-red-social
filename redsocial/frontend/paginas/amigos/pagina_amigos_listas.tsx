import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { EncabezadoAmigos } from '../../componentes/amigos/bloques/encabezado_amigos'
import { PestanasAmigos } from '../../componentes/amigos/bloques/pestanas_amigos'
import { PanelLateralAmigos, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos/bloques/panel_lateral_amigos'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import { SuperficieColor } from '../../componentes/compartido/interfaz/superficie_color'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import type { MiLista } from '@/tipos/amigos/pagina_amigos_listas'
import { PERSONAS_CONOCER, TUS_LISTAS_LATERAL, ACTIVIDAD_RECIENTE_AMIGOS as ACTIVIDAD_RECIENTE } from '../../datos/amigos/panel_lateral'
import { MIS_LISTAS, LISTAS_SUGERIDAS } from '../../datos/amigos/listas'

const CLASES_ICONO_LISTA: Record<MiLista['color'], string> = {
  morado: 'bg-morado-categoria',
  naranja: 'bg-[#ea580c]',
  azul: 'bg-[#2563eb]',
  verde: 'bg-[#16a34a]',
  rosa: 'bg-[#db2777]',
  'azul-claro': 'bg-azul-categoria',
}

export function PaginaAmigosListas() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white p-[18px_20px]">
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.crear_listas} />
            <PestanasAmigos activa="18-05-amigos-04-web-listas.html" insigniaSolicitudes={3} />

            <div className="mb-5.5 mt-4.5 flex items-start gap-3.5 rounded-[10px] bg-primario-suave p-4.5">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-white/60 text-primario">
                <Icono name="usuarios" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="mb-0.75 block text-[13px] text-texto">{catalogoAmigos.secciones.organiza_contactos_titulo}</strong>
                <p className="m-0 text-xs leading-[1.4] text-texto-suave">{catalogoAmigos.secciones.organiza_contactos_desc}</p>
              </div>
              <button type="button" aria-label={textosRedSocial.CERRAR} className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/[0.06] hover:text-texto-suave">
                <Icono name="cerrar" className="h-3.5 w-3.5" />
              </button>
            </div>

            <h2 className="mb-3.5 text-[15px] font-bold text-texto">{catalogoAmigos.secciones.mis_listas}</h2>
            <div className="mb-4.5 grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {MIS_LISTAS.map((l) => (
                <article key={l.nombre} className="relative flex flex-col rounded-[10px] border border-borde bg-white p-4 pb-4 pt-4.5">
                  <button type="button" aria-label={textosRedSocial.MAS_OPCIONES} className="absolute right-3.5 top-3.5 grid h-6 w-6 place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/[0.06] hover:text-texto-suave">
                    <Icono name="puntos" className="h-3.5 w-3.5" />
                  </button>
                  <div className={`mb-2.5 grid h-10 w-10 flex-none place-items-center rounded-[10px] text-white ${CLASES_ICONO_LISTA[l.color]}`}>
                    <Icono name={l.icono} className="h-5 w-5" />
                  </div>
                  <div className="mb-2.5">
                    <strong className="mb-0.5 block text-sm text-texto">{l.nombre}</strong>
                    <span className="text-[11px] text-texto-suave">{l.cantidad}</span>
                  </div>
                  <div className="mb-3 flex items-center gap-1.5">
                    <div className="flex items-center">
                      {Array.from({ length: l.avatares }).map((_, i) => (
                        <AvatarImagen
                          key={i}
                          src={usuarioImg}
                          className={'h-[22px] w-[22px] rounded-full border-2 border-white bg-primario-suave' + (i > 0 ? ' -ml-2' : '')}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-bold text-texto-suave">{l.masAvatares}</span>
                  </div>
                  <p className="m-0 mt-auto text-[11px] leading-[1.4] text-texto-suave">{l.descripcion}</p>
                </article>
              ))}
            </div>

            <button type="button" className="mb-7 flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-borde bg-transparent p-3.5 text-[13px] font-semibold text-primario hover:bg-[#faf9fc] hover:border-primario">
              <Icono name="mas" className="h-4 w-4" /> {catalogoAmigos.botones.crear_nueva_lista}
            </button>

            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="m-0 text-[15px] font-bold text-texto">{catalogoAmigos.secciones.listas_sugeridas}</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">{textosRedSocial.VER_TODAS}</a>
            </div>
            <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-2 max-[380px]:grid-cols-1">
              {LISTAS_SUGERIDAS.map((l) => (
                <article key={l.nombre} className="flex items-center gap-2.5 rounded-[10px] border border-borde bg-white p-3">
                  <SuperficieColor variante={l.color} className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] text-white">
                    <Icono name={l.icono} className="h-4 w-4" />
                  </SuperficieColor>
                  <div className="min-w-0 flex-1">
                    <strong className="mb-px block text-[11px] text-texto">{l.nombre}</strong>
                    <span className="text-[10px] text-texto-suave">{l.cantidad}</span>
                  </div>
                  <button type="button" aria-label={catalogoAmigos.botones.agregar} className="grid h-7 w-7 flex-none place-items-center rounded-full border border-borde bg-white p-0 text-texto-suave hover:border-[#d0cdd9] hover:bg-[#f7f6fa] hover:text-primario">
                    <Icono name="mas" className="h-3.25 w-3.25" />
                  </button>
                </article>
              ))}
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <PanelLateralAmigos titulo={catalogoAmigos.secciones.personas_conocer}>
              {PERSONAS_CONOCER.map((p) => (
                <FilaPersonaConocer key={p.nombre} nombre={p.nombre} comunes={p.comunes} />
              ))}
            </PanelLateralAmigos>
            <PanelLateralAmigos titulo={catalogoAmigos.secciones.tus_listas}>
              {TUS_LISTAS_LATERAL.map((l) => (
                <FilaListaLateral key={l.nombre} icono={l.icono} color={l.color} nombre={l.nombre} miembros={l.miembros} />
              ))}
            </PanelLateralAmigos>
            <PanelLateralAmigos titulo={catalogoAmigos.secciones.actividad_reciente}>
              {ACTIVIDAD_RECIENTE.map((a) => (
                <FilaActividadReciente key={a.nombre} nombre={a.nombre} accion={a.accion} tiempo={a.tiempo} />
              ))}
            </PanelLateralAmigos>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
