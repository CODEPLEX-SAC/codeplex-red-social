import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { EncabezadoAmigos } from '../../componentes/amigos/bloques/encabezado_amigos'
import { PestanasAmigos } from '../../componentes/amigos/bloques/pestanas_amigos'
import { PanelLateralAmigos, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos/bloques/panel_lateral_amigos'
import type { IconName } from '../../tipos/compartido/icono'
import usuarioImg from '../../../recursos/imagenes/usuario.jpg'
import type { Sugerencia } from '@/tipos/amigos/pagina_amigos_sugerencias'

const PERSONAS_CONOCER = [
  { nombre: 'Javier Torres', comunes: '3 amigos en común' },
  { nombre: 'Elena Ramírez', comunes: '4 amigos en común' },
  { nombre: 'Paola Martínez', comunes: '2 amigos en común' },
  { nombre: 'Luis Rodríguez', comunes: '6 amigos en común' },
  { nombre: 'Diego Mendoza', comunes: '3 amigos en común' },
]

const TUS_LISTAS: { icono: IconName; color: string; nombre: string; miembros: string }[] = [
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

const SUGERENCIAS: Sugerencia[] = [
  { nombre: 'Miguel Ángel Vargas', descripcion: 'Desarrollador en Codeplex Tech', comunes: '8 amigos en común', masAvatares: '+5' },
  { nombre: 'Valeria Castañeda', descripcion: 'Analista Contable en Finanzas Plus', comunes: '6 amigos en común', masAvatares: '+3' },
  { nombre: 'Carlos Herrera', descripcion: 'Ingeniero de Software en Innovatech', comunes: '5 amigos en común', masAvatares: '+3' },
  { nombre: 'Daniela Vargas', descripcion: 'Abogada Corporativa en Legal Solutions', comunes: '4 amigos en común', masAvatares: '+2' },
  { nombre: 'Ricardo Guerrero', descripcion: 'Gerente Comercial en Ventas Pro', comunes: '7 amigos en común', masAvatares: '+4' },
  { nombre: 'Sofía Huamán', descripcion: 'Diseñadora UX/UI en Codeplex Studio', comunes: '6 amigos en común', masAvatares: '+3' },
  { nombre: 'Roberto Silva', descripcion: 'Consultor TI en Codeplex Consulting', comunes: '4 amigos en común', masAvatares: '+1' },
  { nombre: 'Ana García', descripcion: 'Jefe de Marketing en Marketing Digital', comunes: '5 amigos en común', masAvatares: '+2' },
]

export function PaginaAmigosSugerencias() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className="rounded-xl border border-borde bg-white p-[18px_20px]">
            <EncabezadoAmigos textoBoton="Agregar amigos" />
            <PestanasAmigos activa="17-05-amigos-03-web-sugerencias.html" />

            <div className="mb-5.5 mt-4.5 flex items-start gap-3.5 rounded-[10px] bg-primario-suave p-4.5">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-white/60 text-primario">
                <Icono name="amigos-todos" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <strong className="mb-0.75 block text-[13px] text-texto">Amplía tu red profesional</strong>
                <p className="m-0 text-xs leading-[1.4] text-texto-suave">Conecta con colegas, clientes y colaboradores que podrían interesarte.</p>
              </div>
              <button type="button" aria-label="Cerrar" className="grid h-6 w-6 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-black/[0.06] hover:text-texto-suave">
                <Icono name="cerrar" className="h-3.5 w-3.5" />
              </button>
            </div>

            <h2 className="mb-4 text-[15px] font-bold text-texto">Personas que quizá conozcas</h2>
            <div className="mb-4.5 grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {SUGERENCIAS.map((s) => (
                <article key={s.nombre} className="flex flex-col items-center rounded-[10px] border border-borde bg-white p-3 pb-3.5 pt-4.5 text-center">
                  <span
                    className="mb-2.5 h-14 w-14 flex-none rounded-full bg-primario-suave bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${usuarioImg})` }}
                  />
                  <div className="mb-2 w-full">
                    <strong className="mb-0.5 block text-xs leading-[1.3] text-texto">{s.nombre}</strong>
                    <p className="m-0 text-[10px] leading-[1.4] text-texto-suave">{s.descripcion}</p>
                  </div>
                  <div className="mb-2 flex w-full items-center justify-center gap-2">
                    <span className="whitespace-nowrap text-[10px] text-texto-suave">{s.comunes}</span>
                  </div>
                  <div className="mb-2.5 flex items-center justify-center">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className={'h-[22px] w-[22px] rounded-full border-2 border-white bg-primario-suave bg-cover bg-center' + (i > 0 ? ' -ml-2' : '')}
                        style={{ backgroundImage: `url(${usuarioImg})` }}
                      />
                    ))}
                    <span className="-ml-2 grid h-[22px] w-[22px] place-items-center rounded-full border-2 border-white bg-[#efedf7] text-[8px] font-bold text-texto-suave">{s.masAvatares}</span>
                  </div>
                  <div className="flex w-full flex-col items-center gap-1.5">
                    <button type="button" className="h-[30px] w-full max-w-[120px] rounded-[7px] border border-borde bg-white text-[11px] font-semibold text-texto hover:border-[#d0cdd9] hover:bg-[#f7f6fa]">Agregar</button>
                    <a href="#" className="text-[11px] font-semibold text-primario no-underline hover:underline">Ver perfil</a>
                  </div>
                </article>
              ))}
            </div>
            <a href="#" className="flex items-center justify-center gap-1.5 border-t border-borde p-3.5 text-xs text-texto-suave no-underline hover:bg-[#faf9fc]">
              Ver más sugerencias <Icono name="flecha-abajo" className="h-3.25 w-3.25" />
            </a>
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
