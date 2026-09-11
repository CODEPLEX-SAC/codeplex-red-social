import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { CampoBusqueda } from '../../componentes/compartido/interfaz/campo_busqueda'
import { EncabezadoAmigos } from '../../componentes/amigos/bloques/encabezado_amigos'
import { PestanasAmigos } from '../../componentes/amigos/bloques/pestanas_amigos'
import { PanelLateralAmigos, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos/bloques/panel_lateral_amigos'
import type { IconName } from '../../tipos/compartido/icono'
import type { SolicitudRecibida } from '@/tipos/amigos/pagina_amigos_solicitudes'

const AMIGOS_COMUNES = 'h-[22px] w-[22px] rounded-full border-2 border-white bg-primario-suave bg-[url(/imagenes/usuario.jpg)] bg-cover bg-center'

const RECIBIDAS: SolicitudRecibida[] = [
  { nombre: 'Valeria Quispe', tiempo: 'Hace 2 horas', descripcion: 'Contadora en Estudio Contable Quispe & Asociados', comunes: '5 amigos en común', masAvatares: '+3' },
  { nombre: 'Andrés Salazar', tiempo: 'Ayer', descripcion: 'Analista de Sistemas en TechSolutions SAC', comunes: '7 amigos en común', masAvatares: '+5' },
  { nombre: 'Paola Martínez', tiempo: 'Hace 2 días', descripcion: 'Abogada en Legal Solutions', comunes: '3 amigos en común', masAvatares: '' },
]

const PERSONAS_CONOCER = [
  { nombre: 'Sofía Huamán', comunes: '4 amigos en común' },
  { nombre: 'Ricardo Guerrero', comunes: '3 amigos en común' },
  { nombre: 'Daniela Vargas', comunes: '6 amigos en común' },
  { nombre: 'Roberto Silva', comunes: '2 amigos en común' },
]

const TUS_LISTAS: { icono: IconName; color: string; nombre: string; miembros: string }[] = [
  { icono: 'amigos', color: '#7c3aed', nombre: 'Mejores amigos', miembros: '24 amigos' },
  { icono: 'amigos', color: '#f97316', nombre: 'Familia', miembros: '16 amigos' },
  { icono: 'colaborador', color: '#3b82f6', nombre: 'Trabajo', miembros: '38 amigos' },
  { icono: 'inicio', color: '#22c55e', nombre: 'Universidad', miembros: '22 amigos' },
]

const ACTIVIDAD_RECIENTE = [
  { nombre: 'Valeria Quispe', accion: 'te envió una solicitud de amistad.', tiempo: 'Hace 2 horas' },
  { nombre: 'Andrés Salazar', accion: 'te envió una solicitud de amistad.', tiempo: 'Ayer' },
  { nombre: 'Paola Martínez', accion: 'te envió una solicitud de amistad.', tiempo: 'Hace 2 días' },
]

export function PaginaAmigosSolicitudes() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white p-[18px_20px]">
            <EncabezadoAmigos textoBoton="Agregar amigos" />
            <PestanasAmigos activa="16-05-amigos-02-solicitudes-web.html" />

            <h2 className="mb-3.5 mt-4.5 text-[15px] font-bold text-texto">Solicitudes de amistad</h2>

            <div className="mb-4.5 flex items-center gap-2">
              <a href="#" className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border border-primario bg-primario px-2.5 text-[11px] text-white no-underline">
                Recibidas <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-white/25 px-1 text-[9px] font-bold">3</span>
              </a>
              <a href="#" className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border border-borde bg-white px-2.5 text-[11px] text-texto-suave no-underline hover:bg-[#f7f6fa]">
                Enviadas <span className="grid h-4 min-w-4 place-items-center rounded-lg bg-[#efedf7] px-1 text-[9px] font-bold text-texto-suave">1</span>
              </a>
              <a href="#" className="inline-flex h-7 flex-none items-center gap-1 whitespace-nowrap rounded-[20px] border border-borde bg-white px-2.5 text-[11px] text-texto-suave no-underline hover:bg-[#f7f6fa]">
                Ignoradas
              </a>
              <CampoBusqueda
                placeholder="Buscar solicitudes..."
                aria-label="Buscar solicitudes"
                className="ml-auto min-w-0 flex-1"
              />
            </div>

            {RECIBIDAS.map((s) => (
              <article key={s.nombre} className="relative mb-3 flex items-start gap-4 rounded-xl border border-borde bg-white p-4.5 last:mb-0 max-[600px]:flex-wrap max-[600px]:p-3.5">
                <span className="h-14 w-14 flex-none rounded-full bg-primario-suave bg-[url('/imagenes/usuario.jpg')] bg-cover bg-center bg-no-repeat" />
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
                        <span key={i} className={AMIGOS_COMUNES + (i > 0 ? ' -ml-2' : '')} />
                      ))}
                      {s.masAvatares && (
                        <span className="-ml-2 grid h-[22px] w-[22px] place-items-center rounded-full border-2 border-white bg-[#efedf7] text-[8px] font-bold text-texto-suave">{s.masAvatares}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-none items-center gap-2 self-center max-[900px]:flex-col max-[900px]:self-start max-[900px]:mt-1 max-[600px]:w-full max-[600px]:flex-row max-[600px]:self-stretch max-[600px]:ml-0 max-[600px]:mt-3">
                  <button type="button" className="inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-primario bg-primario px-4.5 text-xs font-semibold text-white hover:bg-primario-oscuro max-[600px]:flex-1">Aceptar</button>
                  <button type="button" className="inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-borde bg-white px-3.5 text-xs text-texto-suave hover:bg-[#f7f6fa] max-[600px]:flex-1">Eliminar</button>
                  <button type="button" className="inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-borde bg-white px-3.5 text-xs text-texto-suave hover:bg-[#f7f6fa] max-[600px]:flex-1">Ignorar</button>
                </div>
              </article>
            ))}
            <a href="#" className="flex items-center justify-center p-3.5 text-xs text-primario no-underline hover:bg-[#faf9fc]">Ver más solicitudes recibidas</a>

            <section className="mt-4">
              <h2 className="mb-3.5 text-[15px] font-bold text-texto">Solicitudes enviadas</h2>
              <article className="relative mb-3 flex items-start gap-4 rounded-xl border border-borde bg-white p-4.5 max-[600px]:flex-wrap max-[600px]:p-3.5">
                <span className="h-14 w-14 flex-none rounded-full bg-primario-suave bg-[url('/imagenes/usuario.jpg')] bg-cover bg-center bg-no-repeat" />
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-baseline gap-2 pr-[90px]">
                    <strong className="text-sm text-texto">Miguel Ángel Vargas</strong>
                  </div>
                  <span className="absolute right-4.5 top-4.5 whitespace-nowrap text-xs font-semibold text-[#e08a1e]">Pendiente</span>
                  <p className="m-0 mb-1.5 text-xs leading-[1.4] text-texto-suave">Desarrollador en Codeplex Tech</p>
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="text-xs text-texto-suave">2 amigos en común</span>
                    <div className="flex items-center">
                      <span className={AMIGOS_COMUNES} />
                      <span className={AMIGOS_COMUNES + ' -ml-2'} />
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-none items-center gap-2 self-center max-[900px]:flex-col max-[900px]:self-start max-[900px]:mt-1 max-[600px]:w-full max-[600px]:flex-row max-[600px]:self-stretch max-[600px]:ml-0 max-[600px]:mt-3">
                  <button type="button" className="inline-flex min-h-8 items-center justify-center whitespace-nowrap rounded-[7px] border border-borde bg-white px-3.5 text-xs text-texto-suave hover:bg-[#f7f6fa] max-[600px]:flex-1">Cancelar solicitud</button>
                </div>
              </article>
              <a href="#" className="flex items-center justify-center p-3.5 text-xs text-primario no-underline hover:bg-[#faf9fc]">Ver todas las solicitudes enviadas</a>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <PanelLateralAmigos titulo="Personas que quizá conozcas">
              {PERSONAS_CONOCER.map((p) => (
                <FilaPersonaConocer key={p.nombre} nombre={p.nombre} comunes={p.comunes} />
              ))}
            </PanelLateralAmigos>
            <PanelLateralAmigos titulo="Tus listas">
              {TUS_LISTAS.map((l) => (
                <FilaListaLateral key={l.nombre} icono={l.icono} color={l.color} nombre={l.nombre} miembros={l.miembros} />
              ))}
            </PanelLateralAmigos>
            <PanelLateralAmigos titulo="Actividad reciente">
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
