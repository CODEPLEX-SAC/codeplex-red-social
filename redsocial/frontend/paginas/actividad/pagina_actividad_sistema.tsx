import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasActividad } from '../../componentes/actividad/bloques/pestanas_actividad'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { GruposRecomendadosPanel } from '../../componentes/compartido/bloques/grupos_recomendados_panel'
import { EventosProximosPanel } from '../../componentes/compartido/bloques/eventos_proximos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'
import type { EstadoIndicador, ColorEvento, EventoSistema } from '@/tipos/actividad/pagina_actividad_sistema'

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

const CLASES_ICONO_EVENTO: Record<ColorEvento, string> = {
  verde: 'bg-[#e8f5e9] text-[#2e7d32]',
  azul: 'bg-[#e3f2fd] text-[#1565c0]',
  morado: 'bg-[#f3e8ff] text-morado-categoria',
  naranja: 'bg-[#fff3e0] text-[#e65100]',
  rojo: 'bg-[#fdeceb] text-[#dc2626]',
}

const CLASES_INDICADOR: Record<EstadoIndicador, string> = {
  exito: 'bg-[#22c55e]',
  info: 'bg-[#3b82f6]',
  pendiente: 'bg-[#a855f7]',
  advertencia: 'bg-[#f97316]',
  error: 'bg-[#ef4444]',
}

const EVENTOS_SISTEMA: EventoSistema[] = [
  { titulo: 'Inicio de sesión', icono: 'inicio-sesion', color: 'verde', descripcion: 'Juan Pérez inició sesión en el sistema', detalles: ['IP: 190.123.45.67', 'Dispositivo: Chrome en Windows'], tiempo: 'Hace 15 min', estado: 'exito' },
  { titulo: 'Nuevo usuario registrado', icono: 'nuevo-usuario', color: 'azul', descripcion: 'María Fernández fue registrado como nuevo usuario', detalles: ['Rol: Contador', 'Empresa: Constructora del Norte SAC'], tiempo: 'Hace 1 hora', estado: 'info' },
  { titulo: 'Cambio de contraseña', icono: 'clave', color: 'morado', descripcion: 'Carlos Mendoza cambió su contraseña', detalles: ['IP: 181.65.23.90'], tiempo: 'Hace 2 horas', estado: 'pendiente' },
  { titulo: 'Configuración actualizada', icono: 'ajustes-sistema', color: 'naranja', descripcion: 'Se actualizó la configuración de notificaciones del sistema', detalles: ['Por: Sofía Ramirez'], tiempo: 'Hace 3 horas', estado: 'advertencia' },
  { titulo: 'Respaldo automático completado', icono: 'respaldo', color: 'azul', descripcion: 'Se completó el respaldo automático de la base de datos', detalles: ['Tamaño: 2.45 GB', 'Estado: Exitoso'], tiempo: 'Hace 5 horas', estado: 'exito' },
  { titulo: 'Intento de inicio de sesión fallido', icono: 'alerta-roja', color: 'rojo', descripcion: 'Intento fallido de inicio de sesión con contraseña incorrecta', detalles: ['IP: 190.123.45.67', 'Usuario: admin'], tiempo: 'Hace 6 horas', estado: 'error' },
  { titulo: 'Mantenimiento del sistema', icono: 'mantenimiento', color: 'verde', descripcion: 'Mantenimiento programado del sistema completado', detalles: ['Duración: 12 min', 'Estado: Exitoso'], tiempo: 'Ayer, 11:30 p. m.', estado: 'exito' },
]

export function PaginaActividadSistema() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">Actividad</h1>
              <p className="m-0 text-xs text-texto-suave">Mantente al día con todo lo que ocurre en tu red y en tu empresa</p>
            </div>

            <PestanasActividad activa="08-02-actividad-07-sistema.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              <div className="flex items-start justify-between gap-3 border-b border-borde p-4 pb-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-[#f5f3fa] text-texto-suave">
                    <Icono name="configuracion" className="h-[22px] w-[22px]" />
                  </div>
                  <div>
                    <h2 className="m-0 mb-0.5 text-base font-bold text-texto">Sistema</h2>
                    <p className="m-0 text-xs text-texto-suave">Actividad del sistema y administración de la plataforma</p>
                  </div>
                </div>
                <button type="button" className="inline-flex h-8 flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto">
                  Todos los eventos
                  <Icono name="flecha-abajo" className="h-3.5 w-3.5 text-texto-suave" />
                </button>
              </div>

              {EVENTOS_SISTEMA.map((e) => (
                <article key={e.titulo} className="flex items-center gap-3 border-b border-[#f0eef5] p-3.5 last:border-b-0 hover:bg-[#fdfcff]">
                  <div className={`grid h-10 w-10 flex-none place-items-center rounded-[10px] ${CLASES_ICONO_EVENTO[e.color]}`}>
                    <Icono name={e.icono} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mb-0.5 block text-[13px] font-bold text-texto">{e.titulo}</span>
                    <span className="mb-0.75 block text-xs text-texto-suave">{e.descripcion}</span>
                    <div className="flex flex-wrap items-center gap-1 text-[11px] text-[#9892a6]">
                      {e.detalles.map((d, i) => (
                        <span key={d} className="flex items-center gap-1">
                          {i > 0 && <span className="text-[#d4d0e0]">·</span>}
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-2">
                    <span className="whitespace-nowrap text-[11px] text-[#aaa7b5]">{e.tiempo}</span>
                    <span className={`h-2 w-2 flex-none rounded-full ${CLASES_INDICADOR[e.estado]}`} />
                    <button type="button" aria-label="Más opciones" className="grid h-7 w-7 flex-none place-items-center rounded-full border-0 bg-transparent p-0 text-[#b3b0c2] hover:bg-[#f5f3fa] hover:text-texto">
                      <Icono name="puntos" className="h-4 w-4" />
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
