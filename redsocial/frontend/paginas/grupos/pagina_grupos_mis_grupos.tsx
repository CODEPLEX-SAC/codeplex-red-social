import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { Boton } from '../../componentes/compartido/interfaz/boton'
import { PestanasGrupos } from '../../componentes/grupos/bloques/pestanas_grupos'
import { FilaActividadGrupo } from '../../componentes/actividad/bloques/fila_actividad_grupo'
import type { IconName } from '../../tipos/compartido/icono'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { GrupoAdmin, GrupoMis } from '@/tipos/grupos/pagina_grupos_mis_grupos'

const GRUPOS_ADMIN: GrupoAdmin[] = [
  { nombre: 'Equipo Codeplex', icono: 'amigos', color: 'morado', tipo: 'Grupo privado · 25 miembros', descripcion: 'Equipo interno de Codeplex para coordinar proyectos, compartir información y mantenernos alineados.', masAvatares: '+18' },
  { nombre: 'Proyecto Alfa', icono: 'maletin', color: 'naranja', tipo: 'Grupo privado · 12 miembros', descripcion: 'Colaboración y seguimiento del proyecto Alfa para su implementación y crecimiento.', masAvatares: '+5' },
]

const CLASES_ICONO_ADMIN: Record<GrupoAdmin['color'], string> = {
  morado: 'bg-morado-categoria',
  naranja: 'bg-naranja-categoria',
}

const CLASES_ICONO_MIS: Record<GrupoMis['color'], string> = {
  morado: 'bg-morado-categoria',
  azul: 'bg-azul-categoria',
  rosa: 'bg-[#ec4899]',
  verde: 'bg-verde-categoria',
  amarillo: 'bg-[#eab308]',
}

const MIS_GRUPOS: GrupoMis[] = [
  { nombre: 'Programación Go', icono: 'cuadricula', color: 'morado', tipo: 'Grupo privado · 85 miembros', descripcion: 'Comunidad para desarrolladores que usan Go en sus proyectos.', masAvatares: '+62' },
  { nombre: 'Ideas y Feedback', icono: 'sentimiento', color: 'azul', tipo: 'Grupo privado · 34 miembros', descripcion: 'Comparte tus ideas y mejora nuestros productos.', masAvatares: '+21' },
  { nombre: 'Contadores Perú', icono: 'estadisticas', color: 'morado', tipo: 'Grupo público · 1.2K miembros', descripcion: 'Comunidad de contadores y asesores de todo el Perú.', masAvatares: '+342' },
  { nombre: 'Marketing Digital LATAM', icono: 'campana', color: 'rosa', tipo: 'Grupo público · 9.5K miembros', descripcion: 'Estrategias, herramientas y tendencias de marketing digital en LATAM.', masAvatares: '+2.4K' },
  { nombre: 'Desarrollo Personal', icono: 'me-gusta', color: 'verde', tipo: 'Grupo privado · 25 miembros', descripcion: 'Crecimiento personal, hábitos y mejores prácticas.', masAvatares: '+8' },
  { nombre: 'Viajes y Aventuras', icono: 'video', color: 'amarillo', tipo: 'Grupo privado · 18 miembros', descripcion: 'Comparte experiencias, consejos y destinos increíbles.', masAvatares: '+3' },
]

const ACTIVIDAD: { nombre: string; accion: string; grupo: string; tiempo: string; icono: IconName; color: 'morado' | 'rosa' | 'azul' | 'naranja' | 'verde' }[] = [
  { nombre: 'Carlos Herrera', accion: 'publicó en', grupo: 'Equipo Codeplex', tiempo: 'Hace 1 hora', icono: 'grupos', color: 'morado' },
  { nombre: 'María Fernández', accion: 'publicó en', grupo: 'Marketing Digital LATAM', tiempo: 'Hace 3 horas', icono: 'campana', color: 'rosa' },
  { nombre: 'Luis Rodríguez', accion: 'comentó en', grupo: 'Programación Go', tiempo: 'Hace 5 horas', icono: 'comentario', color: 'azul' },
  { nombre: 'Ana García', accion: 'publicó en', grupo: 'Proyecto Alfa', tiempo: 'Hace 1 día', icono: 'maletin', color: 'naranja' },
  { nombre: 'Diego Mendoza', accion: 'se unió a', grupo: 'Ideas y Feedback', tiempo: 'Hace 2 días', icono: 'grupos', color: 'verde' },
]

const GRUPOS_POPULARES: { nombre: string; color: 'morado' | 'rosa' | 'verde' | 'azul'; tipo: string }[] = [
  { nombre: 'Emprendedores Perú', color: 'morado', tipo: 'Público · 12.4K miembros' },
  { nombre: 'Diseño UI/UX', color: 'rosa', tipo: 'Público · 8.7K miembros' },
  { nombre: 'Finanzas Personales', color: 'verde', tipo: 'Público · 15.2K miembros' },
  { nombre: 'Inteligencia Artificial', color: 'azul', tipo: 'Público · 22.1K miembros' },
]

const CLASES_ICONO_LATERAL: Record<'morado' | 'rosa' | 'verde' | 'azul', string> = {
  morado: 'bg-morado-categoria',
  rosa: 'bg-[#ec4899]',
  verde: 'bg-verde-categoria',
  azul: 'bg-azul-categoria',
}

export function PaginaGruposMisGrupos() {
  return (
    <EstructuraApp paginaActiva="grupos">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-4 flex items-start justify-between gap-5">
              <h1 className="m-0 text-[22px] font-extrabold text-texto">Mis grupos</h1>
              <div className="flex flex-none items-center gap-2.5">
                <Boton variant="primario" size="md">
                  <Icono name="mas" className="h-4 w-4" /> Crear grupo
                </Boton>
                <button type="button" aria-label="Más opciones" className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/[0.06]">
                  <Icono name="puntos" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <PestanasGrupos activa="19-06-grupos-01-web-misgrupos.html" />

            <div className="mb-6 flex items-start gap-3.5 rounded-[10px] border border-[#e4dfff] bg-[#f3f0ff] p-5">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-[10px] bg-primario text-white">
                <Icono name="amigos" className="h-[22px] w-[22px]" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="mb-0.75 block text-sm text-texto">Conecta, colabora y comparte en grupos</strong>
                <p className="m-0 text-xs leading-[1.4] text-texto-suave">Únete a grupos que te interesan o crea los tuyos para colaborar con personas que comparten tus objetivos.</p>
              </div>
              <button type="button" aria-label="Cerrar" className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#9892a6] hover:bg-black/[0.06]">
                <Icono name="cerrar" className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="m-0 text-[15px] font-bold text-texto">Grupos que administro (2)</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todos</a>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-5 max-[900px]:grid-cols-1">
              {GRUPOS_ADMIN.map((g) => (
                <article key={g.nombre} className="flex min-w-0 gap-3.5 rounded-[10px] border border-borde bg-white p-5">
                  <div className={`grid h-13 w-13 flex-none place-items-center rounded-xl text-white ${CLASES_ICONO_ADMIN[g.color]}`}>
                    <Icono name={g.icono} className="h-[26px] w-[26px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <h3 className="m-0 text-sm font-bold text-texto">{g.nombre}</h3>
                      <span className="inline-block whitespace-nowrap rounded bg-[#ede9fe] px-2 py-px text-[10px] font-semibold text-morado-categoria">Admin</span>
                      <button type="button" aria-label="Opciones" className="ml-auto grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/[0.06]">
                        <Icono name="puntos" className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mb-1.5 text-xs text-texto-suave">{g.tipo}</div>
                    <p className="m-0 mb-2.5 text-xs leading-[1.5] text-texto-suave">{g.descripcion}</p>
                    <div className="mb-0 flex items-center">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <span
                          key={i}
                          className={'h-7 w-7 rounded-full border-2 border-white bg-primario-suave bg-cover bg-center' + (i > 0 ? ' -ml-2' : '')}
                          style={{ backgroundImage: `url(${usuarioImg})` }}
                        />
                      ))}
                      <span className="-ml-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#ede9fe] text-[9px] font-bold text-primario">{g.masAvatares}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="m-0 text-[15px] font-bold text-texto">Mis grupos (6)</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todos</a>
            </div>
            <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {MIS_GRUPOS.map((g) => (
                <article key={g.nombre} className="min-w-0 rounded-[10px] border border-borde bg-white p-5">
                  <div className="mb-1 flex items-center gap-3">
                    <div className={`grid h-11 w-11 flex-none place-items-center rounded-[10px] text-white ${CLASES_ICONO_MIS[g.color]}`}>
                      <Icono name={g.icono} className="h-[22px] w-[22px]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="m-0 text-[13px] font-bold text-texto">{g.nombre}</h3>
                      <span className="text-[11px] text-texto-suave">{g.tipo}</span>
                    </div>
                    <button type="button" aria-label="Opciones" className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/[0.06]">
                      <Icono name="puntos" className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="my-2 text-xs leading-[1.5] text-texto-suave">{g.descripcion}</p>
                  <div className="mb-3 flex items-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className={'h-7 w-7 rounded-full border-2 border-white bg-primario-suave bg-cover bg-center' + (i > 0 ? ' -ml-2' : '')}
                        style={{ backgroundImage: `url(${usuarioImg})` }}
                      />
                    ))}
                    <span className="-ml-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-[#ede9fe] text-[9px] font-bold text-primario">{g.masAvatares}</span>
                  </div>
                  <button type="button" className="inline-flex h-8 items-center justify-center rounded-md border border-primario bg-transparent px-4 text-xs font-semibold text-primario hover:bg-[#f5f3ff]">Ver grupo</button>
                </article>
              ))}
            </div>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-[#eee] bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h3 className="m-0 text-sm font-bold text-texto">Actividad reciente en tus grupos</h3>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver toda</a>
              </div>
              {ACTIVIDAD.map((a) => (
                <FilaActividadGrupo key={a.nombre + a.grupo} nombre={a.nombre} accion={a.accion} grupo={a.grupo} tiempo={a.tiempo} icono={a.icono} colorIcono={a.color} />
              ))}
            </section>

            <section className="rounded-xl border border-[#eee] bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h3 className="m-0 text-sm font-bold text-texto">Grupos populares</h3>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todos</a>
              </div>
              {GRUPOS_POPULARES.map((g) => (
                <article key={g.nombre} className="flex items-center gap-2.5 border-b border-[#f5f5f5] py-2.25 last:border-b-0">
                  <div className={`grid h-9 w-9 flex-none place-items-center rounded-[10px] text-white ${CLASES_ICONO_LATERAL[g.color]}`}>
                    <Icono name="grupos" className="h-[18px] w-[18px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold text-texto">{g.nombre}</span>
                    <span className="text-[11px] text-texto-suave">{g.tipo}</span>
                  </div>
                  <a href="#" className="flex-none whitespace-nowrap rounded-lg border border-primario bg-white px-3 py-1.5 text-[11px] font-semibold text-primario no-underline hover:bg-primario hover:text-white">Unirse</a>
                </article>
              ))}
            </section>

            <section className="flex items-start gap-3 rounded-xl bg-[#f0fdf4] p-5">
              <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-[rgba(22,163,74,0.12)] text-[#16a34a]">
                <Icono name="idea" className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <strong className="mb-1 block text-[13px] text-texto">Consejo</strong>
                <p className="m-0 text-[11px] leading-[1.45] text-texto-suave">Explora grupos que se alineen con tus intereses para aprender, compartir y hacer crecer tu red.</p>
                <a href="../paginas/20-06-grupos-02-web-descubrir.html" className="mt-2.5 inline-block rounded-lg border border-[#bbf7d0] bg-white px-3.5 py-1.75 text-[11px] font-semibold text-[#16a34a] no-underline hover:bg-[#dcfce7]">Explorar grupos</a>
              </div>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
