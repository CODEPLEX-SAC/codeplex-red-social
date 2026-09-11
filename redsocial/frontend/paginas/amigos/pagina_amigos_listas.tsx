import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { EncabezadoAmigos } from '../../componentes/amigos/bloques/encabezado_amigos'
import { PestanasAmigos } from '../../componentes/amigos/bloques/pestanas_amigos'
import { PanelLateralAmigos, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos/bloques/panel_lateral_amigos'
import type { IconName } from '../../tipos/compartido/icono'
import type { MiLista } from '@/tipos/amigos/pagina_amigos_listas'

const PERSONAS_CONOCER = [
  { nombre: 'Javier Torres', comunes: '3 amigos en común' },
  { nombre: 'Elena Ramírez', comunes: '4 amigos en común' },
  { nombre: 'Paola Martínez', comunes: '2 amigos en común' },
  { nombre: 'Luis Rodríguez', comunes: '6 amigos en común' },
  { nombre: 'Diego Mendoza', comunes: '3 amigos en común' },
]

const TUS_LISTAS_LATERAL: { icono: IconName; color: string; nombre: string; miembros: string }[] = [
  { icono: 'amigos', color: '#7c3aed', nombre: 'Mejores amigos', miembros: '24 amigos' },
  { icono: 'amigos', color: '#f97316', nombre: 'Familia', miembros: '16 amigos' },
  { icono: 'maletin', color: '#3b82f6', nombre: 'Trabajo', miembros: '38 amigos' },
  { icono: 'panel', color: '#22c55e', nombre: 'Universidad', miembros: '22 amigos' },
]

const ACTIVIDAD_RECIENTE = [
  { nombre: 'Sofía Huamán', accion: 'se unió a Codeplex', tiempo: 'Hace 2 horas' },
  { nombre: 'Miguel Ángel Vargas', accion: 'aceptó tu solicitud de amistad.', tiempo: 'Hace 1 día' },
  { nombre: 'Carlos Herrera', accion: 'te envió una solicitud de amistad.', tiempo: 'Hace 2 días' },
]


const CLASES_ICONO_LISTA: Record<MiLista['color'], string> = {
  morado: 'bg-morado-categoria',
  naranja: 'bg-[#ea580c]',
  azul: 'bg-[#2563eb]',
  verde: 'bg-[#16a34a]',
  rosa: 'bg-[#db2777]',
  'azul-claro': 'bg-azul-categoria',
}

const MIS_LISTAS: MiLista[] = [
  { icono: 'amigos', color: 'morado', nombre: 'Mejores amigos', cantidad: '24 amigos', avatares: 4, masAvatares: '+16', descripcion: 'Personas más cercanas con las que tengo mi confianza y comparto más.' },
  { icono: 'amigos', color: 'naranja', nombre: 'Familia', cantidad: '16 amigos', avatares: 3, masAvatares: '+8', descripcion: 'Mis familiares y personas de mi entorno familiar.' },
  { icono: 'maletin', color: 'azul', nombre: 'Trabajo', cantidad: '38 amigos', avatares: 3, masAvatares: '+30', descripcion: 'Compañeros de trabajo, colegas y contactos profesionales.' },
  { icono: 'panel', color: 'verde', nombre: 'Universidad', cantidad: '22 amigos', avatares: 4, masAvatares: '+14', descripcion: 'Personas con las que estudié y compañeros de la universidad.' },
  { icono: 'empresa', color: 'rosa', nombre: 'Clientes importantes', cantidad: '18 amigos', avatares: 3, masAvatares: '+10', descripcion: 'Clientes y contactos clave para mi negocio.' },
  { icono: 'calendario', color: 'azul-claro', nombre: 'Eventos 2024', cantidad: '31 amigos', avatares: 3, masAvatares: '+23', descripcion: 'Contactos que conocí en eventos, conferencias y reuniones.' },
]

const LISTAS_SUGERIDAS: { icono: IconName; color: string; nombre: string; cantidad: string }[] = [
  { icono: 'maletin', color: '#7c3aed', nombre: 'Emprendedores', cantidad: '12 amigos' },
  { icono: 'mensaje', color: '#ea580c', nombre: 'Marketing Digital', cantidad: '15 amigos' },
  { icono: 'actividad', color: '#16a34a', nombre: 'Deportes', cantidad: '19 amigos' },
  { icono: 'compartir', color: '#2563eb', nombre: 'Viajes', cantidad: '11 amigos' },
]

export function PaginaAmigosListas() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white p-[18px_20px]">
            <EncabezadoAmigos textoBoton="Crear listas" />
            <PestanasAmigos activa="18-05-amigos-04-web-listas.html" insigniaSolicitudes={3} />

            <div className="mb-5.5 mt-4.5 flex items-start gap-3.5 rounded-[10px] bg-primario-suave p-4.5">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-white/60 text-primario">
                <Icono name="usuarios" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="mb-0.75 block text-[13px] text-texto">Organiza a tus contactos en listas personalizadas</strong>
                <p className="m-0 text-xs leading-[1.4] text-texto-suave">Crea listas para mantener mejor contacto con las personas que más te importan.</p>
              </div>
              <button type="button" aria-label="Cerrar" className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/[0.06] hover:text-texto-suave">
                <Icono name="cerrar" className="h-3.5 w-3.5" />
              </button>
            </div>

            <h2 className="mb-3.5 text-[15px] font-bold text-texto">Mis listas (6)</h2>
            <div className="mb-4.5 grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {MIS_LISTAS.map((l) => (
                <article key={l.nombre} className="relative flex flex-col rounded-[10px] border border-borde bg-white p-4 pb-4 pt-4.5">
                  <button type="button" aria-label="Más opciones" className="absolute right-3.5 top-3.5 grid h-6 w-6 place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/[0.06] hover:text-texto-suave">
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
                        <span key={i} className={'h-[22px] w-[22px] rounded-full border-2 border-white bg-primario-suave bg-[url(/imagenes/usuario.jpg)] bg-cover bg-center' + (i > 0 ? ' -ml-2' : '')} />
                      ))}
                    </div>
                    <span className="text-[8px] font-bold text-texto-suave">{l.masAvatares}</span>
                  </div>
                  <p className="m-0 mt-auto text-[11px] leading-[1.4] text-texto-suave">{l.descripcion}</p>
                </article>
              ))}
            </div>

            <button type="button" className="mb-7 flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-dashed border-borde bg-transparent p-3.5 text-[13px] font-semibold text-primario hover:bg-[#faf9fc] hover:border-primario">
              <Icono name="mas" className="h-4 w-4" /> Crear nueva lista
            </button>

            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="m-0 text-[15px] font-bold text-texto">Listas sugeridas</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todas</a>
            </div>
            <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-2 max-[380px]:grid-cols-1">
              {LISTAS_SUGERIDAS.map((l) => (
                <article key={l.nombre} className="flex items-center gap-2.5 rounded-[10px] border border-borde bg-white p-3">
                  <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] text-white" style={{ background: l.color }}>
                    <Icono name={l.icono} className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <strong className="mb-px block text-[11px] text-texto">{l.nombre}</strong>
                    <span className="text-[10px] text-texto-suave">{l.cantidad}</span>
                  </div>
                  <button type="button" aria-label="Agregar" className="grid h-7 w-7 flex-none place-items-center rounded-full border border-borde bg-white p-0 text-texto-suave hover:border-[#d0cdd9] hover:bg-[#f7f6fa] hover:text-primario">
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
            <PanelLateralAmigos titulo="Personas que quizá conozcas">
              {PERSONAS_CONOCER.map((p) => (
                <FilaPersonaConocer key={p.nombre} nombre={p.nombre} comunes={p.comunes} />
              ))}
            </PanelLateralAmigos>
            <PanelLateralAmigos titulo="Tus listas">
              {TUS_LISTAS_LATERAL.map((l) => (
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
