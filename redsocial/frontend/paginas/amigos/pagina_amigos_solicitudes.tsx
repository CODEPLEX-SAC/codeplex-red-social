import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { CampoBusqueda } from '../../componentes/compartido/interfaz/campo_busqueda'
import { EncabezadoAmigos } from '../../componentes/amigos/bloques/encabezado_amigos'
import { PestanasAmigos } from '../../componentes/amigos/bloques/pestanas_amigos'
import { PanelLateralAmigos, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos/bloques/panel_lateral_amigos'
import { AvatarImagen } from '../../componentes/compartido/interfaz/avatar_imagen'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import {
  RECIBIDAS,
  PERSONAS_CONOCER_SOLICITUDES as PERSONAS_CONOCER,
  TUS_LISTAS_SOLICITUDES as TUS_LISTAS,
  ACTIVIDAD_RECIENTE_SOLICITUDES as ACTIVIDAD_RECIENTE,
  SOLICITUD_ENVIADA_EJEMPLO,
} from '../../datos/amigos/solicitudes'

const AMIGOS_COMUNES = 'h-[22px] w-[22px] rounded-full border-2 border-white bg-primario-suave'

export function PaginaAmigosSolicitudes() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white p-[18px_20px]">
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.agregar_amigos} />
            <PestanasAmigos activa="16-05-amigos-02-solicitudes-web.html" />

            <h2 className="mb-3.5 mt-4.5 text-[15px] font-bold text-texto">{catalogoAmigos.secciones.solicitudes_amistad}</h2>

            <div className="mb-4.5 flex items-center gap-2">
              <a href="#" className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border border-primario bg-primario px-2.5 text-[11px] text-white no-underline">
                {catalogoAmigos.pestanas_solicitudes.recibidas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-white/25 px-1 text-[9px] font-bold">3</span>
              </a>
              <a href="#" className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border border-borde bg-white px-2.5 text-[11px] text-texto-suave no-underline hover:bg-[#f7f6fa]">
                {catalogoAmigos.pestanas_solicitudes.enviadas} <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-[#efedf7] px-1 text-[9px] font-bold text-texto-suave">1</span>
              </a>
              <a href="#" className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border border-borde bg-white px-2.5 text-[11px] text-texto-suave no-underline hover:bg-[#f7f6fa]">
                {catalogoAmigos.pestanas_solicitudes.ignoradas}
              </a>
              <CampoBusqueda
                placeholder={catalogoAmigos.placeholders.buscar_solicitudes}
                aria-label={catalogoAmigos.placeholders.buscar_solicitudes}
                className="ml-auto min-w-0 flex-1"
              />
            </div>

            {RECIBIDAS.map((s) => (
              <article key={s.nombre} className="relative mb-3 flex items-start gap-4 rounded-xl border border-borde bg-white p-4.5 last:mb-0 max-[600px]:flex-wrap max-[600px]:p-3.5">
                <AvatarImagen src={usuarioImg} className="h-14 w-14 flex-none rounded-full bg-primario-suave" />
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-baseline gap-2 pr-[90px]">
                    <strong className="text-sm text-texto">{s.nombre}</strong>
                  </div>
                  <span className="absolute right-4.5 top-4.5 whitespace-nowrap text-[11px] text-texto-suave">{s.tiempo}</span>
                  <p className="m-0 mb-1.5 text-xs leading-[1.4] text-texto-suave">{s.descripcion}</p>
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="text-xs text-texto-suave">{s.comunes}</span>
                    <div className="flex items-center">
                      {Array.from({ length: s.masAvatares ? 4 : 3 }).map((_, i) => (
                        <AvatarImagen key={i} src={usuarioImg} className={AMIGOS_COMUNES + (i > 0 ? ' -ml-2' : '')} />
                      ))}
                      {s.masAvatares && (
                        <span className="-ml-2 grid h-[22px] w-[22px] place-items-center rounded-full border-2 border-white bg-[#efedf7] text-[8px] font-bold text-texto-suave">{s.masAvatares}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-none items-center gap-2 self-center max-[900px]:flex-col max-[900px]:self-start max-[900px]:mt-1 max-[600px]:w-full max-[600px]:flex-row max-[600px]:self-stretch max-[600px]:ml-0 max-[600px]:mt-3">
                  <button type="button" className="inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-primario bg-primario px-4.5 text-xs font-semibold text-white hover:bg-primario-oscuro max-[600px]:flex-1">{catalogoAmigos.botones.aceptar}</button>
                  <button type="button" className="inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-borde bg-white px-3.5 text-xs text-texto-suave hover:bg-[#f7f6fa] max-[600px]:flex-1">{catalogoAmigos.botones.eliminar}</button>
                  <button type="button" className="inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-borde bg-white px-3.5 text-xs text-texto-suave hover:bg-[#f7f6fa] max-[600px]:flex-1">{catalogoAmigos.botones.ignorar}</button>
                </div>
              </article>
            ))}
            <a href="#" className="flex items-center justify-center p-3.5 text-xs text-primario no-underline hover:bg-[#faf9fc]">{catalogoAmigos.botones.ver_mas_solicitudes_recibidas}</a>

            <section className="mt-4">
              <h2 className="mb-3.5 text-[15px] font-bold text-texto">{catalogoAmigos.secciones.solicitudes_enviadas}</h2>
              <article className="relative mb-3 flex items-start gap-4 rounded-xl border border-borde bg-white p-4.5 max-[600px]:flex-wrap max-[600px]:p-3.5">
                <AvatarImagen src={usuarioImg} className="h-14 w-14 flex-none rounded-full bg-primario-suave" />
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-baseline gap-2 pr-[90px]">
                    <strong className="text-sm text-texto">{SOLICITUD_ENVIADA_EJEMPLO.nombre}</strong>
                  </div>
                  <span className="absolute right-4.5 top-4.5 whitespace-nowrap text-xs font-semibold text-[#e08a1e]">{SOLICITUD_ENVIADA_EJEMPLO.estado}</span>
                  <p className="m-0 mb-1.5 text-xs leading-[1.4] text-texto-suave">{SOLICITUD_ENVIADA_EJEMPLO.descripcion}</p>
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="text-xs text-texto-suave">{SOLICITUD_ENVIADA_EJEMPLO.comunes}</span>
                    <div className="flex items-center">
                      <AvatarImagen src={usuarioImg} className={AMIGOS_COMUNES} />
                      <AvatarImagen src={usuarioImg} className={AMIGOS_COMUNES + ' -ml-2'} />
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-none items-center gap-2 self-center max-[900px]:flex-col max-[900px]:self-start max-[900px]:mt-1 max-[600px]:w-full max-[600px]:flex-row max-[600px]:self-stretch max-[600px]:ml-0 max-[600px]:mt-3">
                  <button type="button" className="inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-borde bg-white px-3.5 text-xs text-texto-suave hover:bg-[#f7f6fa] max-[600px]:flex-1">{catalogoAmigos.botones.cancelar_solicitud}</button>
                </div>
              </article>
              <a href="#" className="flex items-center justify-center p-3.5 text-xs text-primario no-underline hover:bg-[#faf9fc]">{catalogoAmigos.botones.ver_todas_solicitudes_enviadas}</a>
            </section>
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
