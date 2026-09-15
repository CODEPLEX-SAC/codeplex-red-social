import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { EncabezadoAmigos } from '../../componentes/amigos/bloques/encabezado_amigos'
import { PestanasAmigos } from '../../componentes/amigos/bloques/pestanas_amigos'
import { PanelLateralAmigos, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos/bloques/panel_lateral_amigos'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import mensajesGlobales from '../../mensajes/globales/textos.json'
import { PERSONAS_CONOCER, TUS_LISTAS_LATERAL as TUS_LISTAS, ACTIVIDAD_RECIENTE_AMIGOS as ACTIVIDAD_RECIENTE } from '../../datos/amigos/panel_lateral'
import { SUGERENCIAS } from '../../datos/amigos/sugerencias'

export function PaginaAmigosSugerencias() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white p-[18px_20px]">
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.agregar_amigos} />
            <PestanasAmigos activa="17-05-amigos-03-web-sugerencias.html" />

            <div className="mb-5.5 mt-4.5 flex items-start gap-3.5 rounded-[10px] bg-primario-suave p-4.5">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-white/60 text-primario">
                <Icono name="amigos-todos" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="mb-0.75 block text-[13px] text-texto">{catalogoAmigos.secciones.amplia_tu_red_titulo}</strong>
                <p className="m-0 text-xs leading-[1.4] text-texto-suave">{catalogoAmigos.secciones.amplia_tu_red_desc}</p>
              </div>
              <button type="button" aria-label={mensajesGlobales.CERRAR} className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/[0.06] hover:text-texto-suave">
                <Icono name="cerrar" className="h-3.5 w-3.5" />
              </button>
            </div>

            <h2 className="mb-4 text-[15px] font-bold text-texto">{catalogoAmigos.secciones.personas_conocer}</h2>
            <div className="mb-4.5 grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {SUGERENCIAS.map((s) => (
                <article key={s.nombre} className="flex flex-col items-center rounded-[10px] border border-borde bg-white p-3 pb-3.5 pt-4.5 text-center">
                  <AvatarImagen src={usuarioImg} className="mb-2.5 h-14 w-14 flex-none rounded-full bg-primario-suave" />
                  <div className="mb-2 w-full">
                    <strong className="mb-0.5 block text-xs leading-[1.3] text-texto">{s.nombre}</strong>
                    <p className="m-0 text-[10px] leading-[1.4] text-texto-suave">{s.descripcion}</p>
                  </div>
                  <div className="mb-2 flex w-full items-center justify-center gap-2">
                    <span className="whitespace-nowrap text-[10px] text-texto-suave">{s.comunes}</span>
                  </div>
                  <div className="mb-2.5 flex items-center justify-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <AvatarImagen
                        key={i}
                        src={usuarioImg}
                        className={'h-[22px] w-[22px] rounded-full border-2 border-white bg-primario-suave' + (i > 0 ? ' -ml-2' : '')}
                      />
                    ))}
                    <span className="-ml-2 grid h-[22px] w-[22px] place-items-center rounded-full border-2 border-white bg-[#efedf7] text-[8px] font-bold text-texto-suave">{s.masAvatares}</span>
                  </div>
                  <div className="flex w-full flex-col items-center gap-1.5">
                    <button type="button" className="h-[30px] w-full max-w-[120px] rounded-[7px] border border-borde bg-white text-[11px] font-semibold text-texto hover:border-[#d0cdd9] hover:bg-[#f7f6fa]">{catalogoAmigos.botones.agregar}</button>
                    <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">{catalogoAmigos.botones.ver_perfil}</a>
                  </div>
                </article>
              ))}
            </div>
            <a href="#" className="flex items-center justify-center gap-1.5 border-t border-borde p-3.5 text-xs text-texto-suave no-underline hover:bg-[#faf9fc]">
              {catalogoAmigos.botones.ver_mas_sugerencias} <Icono name="flecha-abajo" className="h-3.25 w-3.25" />
            </a>
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
              {TUS_LISTAS.map((l) => (
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
