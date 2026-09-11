import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasActividad } from '../../componentes/actividad/bloques/pestanas_actividad'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { GruposRecomendadosPanel } from '../../componentes/compartido/bloques/grupos_recomendados_panel'
import { EventosProximosPanel } from '../../componentes/compartido/bloques/eventos_proximos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'
import type { EventoColaborador } from '@/tipos/actividad/pagina_actividad_colaboradores'

const CONTACTOS = ['Ana Torres', 'Miguel Rojas', 'José Castillo', 'Laura Pérez', 'Sofía Gómez'].map((nombre) => ({
  nombre,
  subtitulo: 'Conexión profesional',
}))

const GRUPOS = [
  { nombre: 'Ingenieros Civiles', miembros: '12.4 mil miembros' },
  { nombre: 'Emprendedores Perú', miembros: '8.7 mil miembros' },
  { nombre: 'Tecnología & Innovación', miembros: '5.3 mil miembros' },
]

const EVENTOS = [
  { dia: '15', mes: 'JUN', titulo: 'Reunión de Proyectos', detalle: 'Lun, 15 jun · 10:00 AM · Oficina Principal' },
  { dia: '22', mes: 'JUN', titulo: 'Capacitación en Seguridad', detalle: 'Lun, 22 jun · 2:00 PM · Virtual' },
  { dia: '30', mes: 'JUN', titulo: 'Cumpleaños: Juan Pérez', detalle: 'Mar, 30 jun · Todo el día' },
]

const CLASES_BADGE: Record<EventoColaborador['color'], string> = {
  verde: 'bg-[#22c55e]',
  azul: 'bg-[#3b82f6]',
  rojo: 'bg-[#ef4444]',
}

const EVENTOS_COLABORADOR: EventoColaborador[] = [
  { nombre: 'María Fernández', icono: 'nuevo-usuario', color: 'verde', accion: ' se unió a la empresa ', destino: 'Constructora del Norte SAC', tiempo: '2 horas', boton: 'Ver perfil' },
  { nombre: 'Carlos Mendoza', icono: 'estrella', color: 'azul', accion: ' fue promovido a ', destino: 'Gerente de Proyectos', detalle: 'antes fue Jefe de Proyectos', tiempo: '5 horas', boton: 'Ver perfil' },
  { nombre: 'Lucía Gómez', icono: 'intercambio', color: 'verde', accion: ' cambió de rol', detalle: 'ahora es Analista Senior de Marketing', tiempo: '1 día', boton: 'Ver perfil' },
  { nombre: 'Diego Torres', icono: 'despedida', color: 'rojo', accion: ' dejó la empresa', detalle: 'hasta ayer fue Soporte Técnico', tiempo: '2 días', boton: 'Ver perfil' },
  { nombre: 'Sofía Ramírez', icono: 'nuevo-usuario', color: 'verde', accion: ' se unió a tu grupo ', destino: 'Ingeniería Civil', tiempo: '3 días', boton: 'Ver grupo' },
  { nombre: 'Jorge Luis', icono: 'estrella', color: 'azul', accion: ' fue promovido a ', destino: 'Líder de Desarrollo', detalle: 'antes fue Desarrollador Senior', tiempo: '4 días', boton: 'Ver perfil' },
]

export function PaginaActividadColaboradores() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">Actividad</h1>
              <p className="m-0 text-xs text-texto-suave">Mantente al día con todo lo que ocurre en tu red y en tu empresa</p>
            </div>

            <PestanasActividad activa="05-02-actividad-04-colaboradores.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              {EVENTOS_COLABORADOR.map((e) => (
                <article key={e.nombre} className="flex items-start gap-3.5 border-b border-[#f0eef5] p-3.5 last:border-b-0 hover:bg-[#fdfcff]">
                  <div className="relative h-11 w-11 flex-none">
                    <span className="block h-11 w-11 rounded-full bg-primario-suave bg-[url('/imagenes/usuario.jpg')] bg-cover bg-center bg-no-repeat" />
                    <span className={`absolute -bottom-0.5 -right-0.5 grid h-[22px] w-[22px] place-items-center rounded-full border-2 border-white text-white ${CLASES_BADGE[e.color]}`}>
                      <Icono name={e.icono} className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 text-[13px]">
                    <span className="font-bold text-texto">{e.nombre}</span>
                    <span className="text-texto-suave">{e.accion}</span>
                    {e.destino && <span className="font-bold text-texto">{e.destino}</span>}
                    {e.detalle && <span className="mt-0.5 block text-xs text-texto-suave">{e.detalle}</span>}
                  </div>
                  <div className="flex flex-none items-center gap-3">
                    <span className="whitespace-nowrap text-[11px] text-[#aaa7b5]">{e.tiempo}</span>
                    <button type="button" className="inline-flex h-[30px] flex-none items-center whitespace-nowrap rounded-md border border-primario bg-transparent px-3.5 text-xs font-semibold text-primario hover:bg-primario hover:text-white">
                      {e.boton}
                    </button>
                  </div>
                </article>
              ))}
              <button type="button" className="flex w-full items-center justify-center gap-1.5 border-t border-[#f0eef5] bg-transparent p-3.5 text-[13px] font-semibold text-primario hover:bg-[#fdfcff]">
                Cargar más
                <Icono name="flecha-abajo" className="h-4 w-4" />
              </button>
            </section>
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <ContactosPanel contactos={CONTACTOS} />
            <GruposRecomendadosPanel titulo="Grupos recientes" grupos={GRUPOS} />
            <EventosProximosPanel eventos={EVENTOS} />
            <BloqueAnuncio />
          </aside>
        }
      />
    </EstructuraApp>
  )
}
