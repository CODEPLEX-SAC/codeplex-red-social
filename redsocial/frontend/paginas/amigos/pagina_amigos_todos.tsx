import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { Boton } from '../../componentes/compartido/interfaz/boton'
import { CampoBusqueda } from '../../componentes/compartido/interfaz/campo_busqueda'
import { EncabezadoAmigos } from '../../componentes/amigos/bloques/encabezado_amigos'
import { PestanasAmigos } from '../../componentes/amigos/bloques/pestanas_amigos'
import type { IconName } from '../../tipos/compartido/icono'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { Amigo } from '@/tipos/amigos/pagina_amigos_todos'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat'
const ESTILO_AVATAR = { backgroundImage: `url(${usuarioImg})` }

const RESUMEN: { icono: IconName; peligro?: boolean; etiqueta: string; valor: string }[] = [
  { icono: 'amigos-todos', etiqueta: 'Todos los amigos', valor: '128' },
  { icono: 'colaboradores', etiqueta: 'En común', valor: '24' },
  { icono: 'solicitudes', etiqueta: 'Pendientes', valor: '3' },
  { icono: 'bloqueado', peligro: true, etiqueta: 'Bloqueados', valor: '2' },
]


const AMIGOS: Amigo[] = [
  { nombre: 'María Fernández', estado: 'En línea', enLinea: true, comunes: '24 amigos en común', masAvatares: '+21' },
  { nombre: 'Luis Rodríguez', estado: 'En línea', enLinea: true, comunes: '18 amigos en común', masAvatares: '+15' },
  { nombre: 'Carmen López', estado: 'En línea', enLinea: true, comunes: '15 amigos en común', masAvatares: '+12' },
  { nombre: 'Diego Mendoza', estado: 'Hace 15 min', comunes: '12 amigos en común', masAvatares: '+9' },
  { nombre: 'Ana García', estado: 'Hace 1 hora', comunes: '10 amigos en común', masAvatares: '+7' },
  { nombre: 'Javier Torres', estado: 'Hace 2 horas', comunes: '8 amigos en común', masAvatares: '+5' },
  { nombre: 'Elena Sánchez', estado: 'Hace 3 horas', comunes: '6 amigos en común', masAvatares: '+3' },
  { nombre: 'Roberto Pérez', estado: 'Hace 5 horas', comunes: '5 amigos en común', masAvatares: '+2' },
]

const SOLICITUDES = [
  { nombre: 'Carlos Ramírez', descripcion: 'Gerente de Proyectos en Constructora ABC' },
  { nombre: 'Valeria Quispe', descripcion: 'Contadora en Estudio Contable Quispe & Asociados' },
  { nombre: 'Andrés Salazar', descripcion: 'Analista de Sistemas en TechSolutions SAC' },
]

const PERSONAS_CONOCER = [
  { nombre: 'Paola Martínez', comunes: '3 amigos en común' },
  { nombre: 'Miguel Angel Vargas', comunes: '2 amigos en común' },
  { nombre: 'Sofía Huamán', comunes: '4 amigos en común' },
  { nombre: 'Ricardo Guerrero', comunes: '1 amigo en común' },
]

const TUS_LISTAS: { icono: IconName; color: string; nombre: string; cantidad: string }[] = [
  { icono: 'guardados', color: '#7a5af4', nombre: 'Mejores amigos', cantidad: '24 amigos' },
  { icono: 'amigos-todos', color: '#e08a1e', nombre: 'Familia', cantidad: '16 amigos' },
  { icono: 'maletin', color: '#3d6bf4', nombre: 'Trabajo', cantidad: '38 amigos' },
  { icono: 'listas', color: '#1e9a68', nombre: 'Universidad', cantidad: '22 amigos' },
]

export function PaginaAmigosTodos() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white p-[18px_20px]">
            <EncabezadoAmigos textoBoton="Agregar amigos" />
            <PestanasAmigos activa="15-05-amigos-01-todos-web.html" />

            <div className="my-4.5 flex gap-3 max-[800px]:flex-col">
              <CampoBusqueda
                placeholder="Buscar amigos..."
                aria-label="Buscar amigos"
                className="min-w-0 flex-1 max-[800px]:w-full max-[800px]:flex-none"
              />
              <button type="button" className="flex h-[34px] min-w-[190px] flex-none items-center justify-between gap-2 whitespace-nowrap rounded-[7px] border border-borde bg-white px-3 text-xs text-texto-suave max-[800px]:w-full">
                Todos los amigos...
                <Icono name="flecha-abajo" className="h-3.25 w-3.25" />
              </button>
            </div>

            <div className="mb-5 grid grid-cols-4 gap-3 max-[900px]:grid-cols-2">
              {RESUMEN.map((r) => (
                <article key={r.etiqueta} className="flex items-center gap-2.5 rounded-[10px] border border-borde bg-white p-3.5">
                  <span className={'grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] ' + (r.peligro ? 'bg-[#fdeceb] text-peligro' : 'bg-primario-suave text-primario')}>
                    <Icono name={r.icono} className="h-[17px] w-[17px]" />
                  </span>
                  <div>
                    <span className="block text-[10px] text-texto-suave">{r.etiqueta}</span>
                    <strong className="mt-0.5 block text-lg text-texto">{r.valor}</strong>
                  </div>
                </article>
              ))}
            </div>

            <h2 className="mb-3.5 text-[15px] font-bold text-texto">Tus amigos (128)</h2>
            <div>
              {AMIGOS.map((a) => (
                <article key={a.nombre} className="flex items-center gap-3.5 border-b border-borde py-3.5 last:border-b-0">
                  <span
                    className="h-12 w-12 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
                    style={ESTILO_AVATAR}
                  />
                  <div className="w-[170px] min-w-0 flex-none max-[900px]:w-[130px]">
                    <strong className="block truncate text-[13px] text-texto">{a.nombre}</strong>
                    <span className={'mt-0.75 flex items-center gap-1.25 text-[10px] before:h-1.5 before:w-1.5 before:flex-none before:rounded-full ' + (a.enLinea ? 'text-exito before:bg-exito' : 'text-texto-suave before:bg-[#c7c4d6]')}>
                      {a.estado}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 items-center gap-2.5 max-[900px]:hidden">
                    <span className="whitespace-nowrap text-[11px] text-texto-suave">{a.comunes}</span>
                    <div className="flex items-center">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className={'h-[22px] w-[22px] rounded-full border-2 border-white bg-primario-suave bg-cover bg-center ' + (i > 0 ? '-ml-2' : '')}
                          style={ESTILO_AVATAR}
                        />
                      ))}
                      <span className="-ml-2 grid h-[22px] w-[22px] place-items-center rounded-full border-2 border-white bg-[#efedf7] text-[8px] font-bold text-texto-suave">{a.masAvatares}</span>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-2">
                    <Boton variant="secundario" size="mini">Mensaje</Boton>
                    <button type="button" aria-label="Más opciones" className="grid h-8 w-8 place-items-center rounded-[7px] border-0 bg-transparent text-[#6d6a7c] hover:bg-[#f2f1f6]">
                      <Icono name="puntos" className="h-[18px] w-[18px]" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <a href="#" className="flex items-center justify-center gap-1.5 border-t border-borde p-3.5 text-xs text-texto-suave no-underline hover:bg-[#faf9fc]">
              Ver más amigos <Icono name="flecha-abajo" className="h-3.25 w-3.25" />
            </a>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">Solicitudes de amistad (3)</h2>
                <a href="#" className="text-[11px] text-primario no-underline">Ver todas</a>
              </div>
              {SOLICITUDES.map((s) => (
                <article key={s.nombre} className="border-b border-borde py-3.5 last:border-b-0">
                  <div className="mb-2.5 flex gap-2.5">
                    <span
                      className="h-12 w-12 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
                      style={ESTILO_AVATAR}
                    />
                    <div>
                      <strong className="block text-xs text-texto">{s.nombre}</strong>
                      <p className="m-0 mt-0.5 text-[10px] leading-[1.4] text-texto-suave">{s.descripcion}</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <Boton variant="primario" size="mini" className="flex-1">Confirmar</Boton>
                    <Boton variant="secundario" size="mini" className="flex-1">Eliminar</Boton>
                  </div>
                </article>
              ))}
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">Personas que quizá conozcas</h2>
                <a href="#" className="text-[11px] text-primario no-underline">Ver todas</a>
              </div>
              {PERSONAS_CONOCER.map((p) => (
                <article key={p.nombre} className="flex items-center gap-2 border-b border-[#f0eef5] py-2 last:border-b-0">
                  <span className={AVATAR} style={ESTILO_AVATAR} />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-[11px] text-texto">{p.nombre}</strong>
                    <span className="block truncate text-[10px] text-texto-suave">{p.comunes}</span>
                  </div>
                  <Boton variant="secundario" size="mini">Agregar</Boton>
                </article>
              ))}
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-[13px] text-texto">Tus listas</h2>
                <a href="#" className="text-[11px] text-primario no-underline">Ver todas</a>
              </div>
              {TUS_LISTAS.map((l) => (
                <a key={l.nombre} href="#" className="flex items-center gap-2.5 border-b border-borde py-2.5 text-inherit no-underline last:border-b-0">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-[9px]" style={{ background: l.color }}>
                    <Icono name={l.icono} className="h-[17px] w-[17px] text-white" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <strong className="block text-xs text-texto">{l.nombre}</strong>
                    <span className="mt-0.5 block text-[10px] text-texto-suave">{l.cantidad}</span>
                  </div>
                  <Icono name="flecha-derecha" className="h-3.25 w-3.25 flex-none text-[#b3b0c2]" />
                </a>
              ))}
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
