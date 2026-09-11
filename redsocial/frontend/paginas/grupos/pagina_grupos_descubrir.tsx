import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { Boton } from '../../componentes/compartido/interfaz/boton'
import { PestanasGrupos } from '../../componentes/grupos/bloques/pestanas_grupos'
import { FilaActividadGrupo } from '../../componentes/actividad/bloques/fila_actividad_grupo'
import type { IconName } from '../../tipos/compartido/icono'
import type { GrupoDestacado, ColorCategoria } from '@/tipos/grupos/pagina_grupos_descubrir'

const CLASES_FONDO: Record<GrupoDestacado['fondo'], string> = {
  'azul-oscuro': 'bg-[linear-gradient(135deg,#1e3a5f,#2563eb)]',
  naranja: 'bg-[linear-gradient(135deg,#c2410c,#f97316)]',
  violeta: 'bg-[linear-gradient(135deg,#4c1d95,#7c3aed)]',
  'rosa-oscuro': 'bg-[linear-gradient(135deg,#9f1239,#ec4899)]',
}

const CLASES_OVERLAY: Record<GrupoDestacado['overlay'], string> = {
  morado: 'bg-morado-categoria',
  violeta: 'bg-morado-categoria',
  naranja: 'bg-naranja-categoria',
  rosa: 'bg-[#ec4899]',
}

const DESTACADOS: GrupoDestacado[] = [
  { nombre: 'Emprendedores Perú', icono: 'amigos', fondo: 'azul-oscuro', overlay: 'morado', tipo: 'Público · 12.4K miembros', descripcion: 'Comunidad para emprendedores y dueños de negocio en Perú.' },
  { nombre: 'Construcción e Ingeniería', icono: 'maletin', fondo: 'naranja', overlay: 'naranja', tipo: 'Público · 8.7K miembros', descripcion: 'Profesionales del sector construcción compartiendo conocimiento.' },
  { nombre: 'Desarrolladores Codeplex', icono: 'cuadricula', fondo: 'violeta', overlay: 'violeta', tipo: 'Privado · 3.2K miembros', descripcion: 'Grupo para desarrolladores que usan Codeplex y comparten soluciones.' },
  { nombre: 'Marketing Digital LATAM', icono: 'campana', fondo: 'rosa-oscuro', overlay: 'rosa', tipo: 'Público · 9.5K miembros', descripcion: 'Estrategias, herramientas y tendencias de marketing digital en LATAM.' },
]

const CLASES_CATEGORIA: Record<ColorCategoria, string> = {
  morado: 'bg-morado-categoria',
  azul: 'bg-azul-categoria',
  verde: 'bg-verde-categoria',
  rosa: 'bg-[#ec4899]',
  naranja: 'bg-naranja-categoria',
  rojo: 'bg-[#ef4444]',
  cyan: 'bg-[#06b6d4]',
}

const CATEGORIAS: { icono: IconName; color: ColorCategoria; nombre: string; cantidad: string }[] = [
  { icono: 'maletin', color: 'morado', nombre: 'Negocios', cantidad: '124 grupos' },
  { icono: 'cuadricula', color: 'azul', nombre: 'Tecnología', cantidad: '98 grupos' },
  { icono: 'amigos', color: 'verde', nombre: 'Educación', cantidad: '76 grupos' },
  { icono: 'campana', color: 'rosa', nombre: 'Marketing', cantidad: '65 grupos' },
  { icono: 'estadisticas', color: 'naranja', nombre: 'Finanzas', cantidad: '58 grupos' },
  { icono: 'usuarios', color: 'rojo', nombre: 'Recursos Humanos', cantidad: '42 grupos' },
  { icono: 'me-gusta', color: 'verde', nombre: 'Salud y Bienestar', cantidad: '38 grupos' },
  { icono: 'sentimiento', color: 'rosa', nombre: 'Diseño', cantidad: '33 grupos' },
  { icono: 'moneda', color: 'cyan', nombre: 'Ventas', cantidad: '29 grupos' },
  { icono: 'panel', color: 'azul', nombre: 'Legal', cantidad: '27 grupos' },
  { icono: 'me-gusta', color: 'morado', nombre: 'Desarrollo Personal', cantidad: '25 grupos' },
  { icono: 'puntos', color: 'naranja', nombre: 'Otros', cantidad: '50+ grupos' },
]

const MIS_GRUPOS_LATERAL: { nombre: string; color: 'morado' | 'naranja' | 'verde' | 'azul' | 'rosa'; admin?: boolean; miembros: string }[] = [
  { nombre: 'Equipo Codeplex', color: 'morado', admin: true, miembros: '25 miembros' },
  { nombre: 'Proyecto Alfa', color: 'naranja', miembros: '12 miembros' },
  { nombre: 'Programación Go', color: 'verde', miembros: '85 miembros' },
  { nombre: 'Ideas y Feedback', color: 'azul', miembros: '34 miembros' },
  { nombre: 'Contadores Perú', color: 'rosa', miembros: '1.2K miembros' },
]

const CLASES_LATERAL: Record<'morado' | 'naranja' | 'verde' | 'azul' | 'rosa', string> = {
  morado: 'bg-morado-categoria',
  naranja: 'bg-naranja-categoria',
  verde: 'bg-verde-categoria',
  azul: 'bg-azul-categoria',
  rosa: 'bg-[#ec4899]',
}

const ACTIVIDAD = [
  { nombre: 'Carlos Herrera', accion: 'publicó en', grupo: 'Emprendedores Perú', tiempo: 'Hace 1 hora' },
  { nombre: 'María Fernández', accion: 'publicó en', grupo: 'Construcción e Ingeniería', tiempo: 'Hace 3 horas' },
  { nombre: 'Luis Rodríguez', accion: 'comentó en', grupo: 'Desarrolladores Codeplex', tiempo: 'Hace 5 horas' },
  { nombre: 'Ana García', accion: 'se unió a', grupo: 'Marketing Digital LATAM', tiempo: 'Hace 1 día' },
]

export function PaginaGruposDescubrir() {
  return (
    <EstructuraApp paginaActiva="grupos">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-4 flex items-start justify-between gap-5">
              <h1 className="m-0 text-[22px] font-extrabold text-texto">Grupos</h1>
              <div className="flex flex-none items-center gap-2.5">
                <Boton variant="primario" size="md">
                  <Icono name="mas" className="h-4 w-4" /> Crear grupo
                </Boton>
                <button type="button" aria-label="Más opciones" className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/6">
                  <Icono name="puntos" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <PestanasGrupos activa="20-06-grupos-02-web-descubrir.html" />

            <div className="mb-6 flex items-start gap-3.5 rounded-control border border-[#e4dfff] bg-[#f3f0ff] p-5">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-control bg-primario text-white">
                <Icono name="amigos" className="h-5.5 w-5.5" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="mb-0.75 block text-sm text-texto">Conecta, colabora y comparte en grupos</strong>
                <p className="m-0 text-xs leading-[1.4] text-texto-suave">Únete a grupos de tu interés o crea los tuyos propios.</p>
              </div>
              <button type="button" aria-label="Cerrar" className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#9892a6] hover:bg-black/6">
                <Icono name="cerrar" className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="m-0 text-[15px] font-bold text-texto">Grupos destacados</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todos</a>
            </div>
            <div className="mb-7 grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[900px]:grid-cols-1">
              {DESTACADOS.map((g) => (
                <article key={g.nombre} className="min-w-0 overflow-hidden rounded-control border border-borde bg-white">
                  <div className="relative h-[120px] overflow-hidden">
                    <div className={`flex h-full w-full items-center justify-center ${CLASES_FONDO[g.fondo]}`}>
                      <span className="grid h-11 w-11 place-items-center rounded-control bg-white/20">
                        <Icono name={g.icono} className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <span className={`absolute -bottom-4.5 left-3.5 grid h-10 w-10 place-items-center rounded-control border-2 border-white text-white shadow-[0_2px_8px_rgba(0,0,0,.15)] ${CLASES_OVERLAY[g.overlay]}`}>
                      <Icono name={g.icono} className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-3.5 pb-3.5 pt-6">
                    <h3 className="m-0 mb-0.5 text-[13px] font-bold text-texto">{g.nombre}</h3>
                    <div className="mb-2 text-[11px] text-texto-suave">{g.tipo}</div>
                    <p className="m-0 mb-3.5 text-xs leading-[1.5] text-texto-suave">{g.descripcion}</p>
                    <button type="button" className="flex h-[34px] w-full items-center justify-center gap-1.5 rounded-lg border border-borde bg-white text-xs font-semibold text-texto hover:border-primario hover:bg-[#f5f3ff] hover:text-primario">
                      <Icono name="mas" className="h-3.5 w-3.5" /> Unirse
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="m-0 text-[15px] font-bold text-texto">Todas las categorías</h2>
              <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todos</a>
            </div>
            <div className="grid grid-cols-4 gap-3 max-[1100px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {CATEGORIAS.map((c) => (
                <article key={c.nombre} className="flex min-w-0 items-center gap-3 rounded-control border border-borde bg-white p-3.5 hover:border-primario hover:bg-[#f9f8fc]">
                  <div className={`grid h-[38px] w-[38px] flex-none place-items-center rounded-lg text-white ${CLASES_CATEGORIA[c.color]}`}>
                    <Icono name={c.icono} className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="m-0 text-[13px] font-semibold text-texto">{c.nombre}</h4>
                    <span className="text-[11px] text-texto-suave">{c.cantidad}</span>
                  </div>
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
                <h3 className="m-0 text-sm font-bold text-texto">Mis grupos</h3>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver todos</a>
              </div>
              {MIS_GRUPOS_LATERAL.map((g) => (
                <article key={g.nombre} className="flex items-center gap-2.5 border-b border-[#f5f5f5] py-2.25 last:border-b-0">
                  <div className={`grid h-9 w-9 flex-none place-items-center rounded-control text-white ${CLASES_LATERAL[g.color]}`}>
                    <Icono name="grupos" className="h-[18px] w-[18px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-texto">{g.nombre}</span>
                      {g.admin && <span className="rounded px-1.5 py-px text-[9px] font-semibold text-morado-categoria" style={{ background: '#ede9fe' }}>Admin</span>}
                    </div>
                    <span className="text-[11px] text-texto-suave">{g.miembros}</span>
                  </div>
                </article>
              ))}
            </section>

            <section className="rounded-xl border border-[#eee] bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h3 className="m-0 text-sm font-bold text-texto">Actividad reciente</h3>
                <a href="#" className="text-xs font-semibold text-primario no-underline hover:underline">Ver toda</a>
              </div>
              {ACTIVIDAD.map((a) => (
                <FilaActividadGrupo key={a.nombre + a.grupo} nombre={a.nombre} accion={a.accion} grupo={a.grupo} tiempo={a.tiempo} />
              ))}
            </section>

            <section className="flex items-start gap-3 rounded-xl p-5" style={{ background: 'linear-gradient(135deg, #f3f0ff 0%, #e8e0ff 100%)' }}>
              <span className="grid h-8 w-8 flex-none place-items-center rounded-lg text-primario" style={{ background: 'rgba(77,60,197,0.12)' }}>
                <Icono name="amigos" className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <strong className="mb-1 block text-[13px] text-texto">Consejo</strong>
                <p className="m-0 text-[11px] leading-[1.45] text-texto-suave">Únete a grupos relacionados con tus intereses para aprender, compartir y hacer crecer tu red profesional.</p>
              </div>
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
