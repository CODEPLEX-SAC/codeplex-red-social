import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasActividad } from '../../componentes/actividad/bloques/pestanas_actividad'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { GruposRecomendadosPanel } from '../../componentes/compartido/bloques/grupos_recomendados_panel'
import { EventosProximosPanel } from '../../componentes/compartido/bloques/eventos_proximos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'
import type { ColorModulo, EventoModulo } from '@/tipos/actividad/pagina_actividad_modulos'

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

const CLASES_ICONO: Record<ColorModulo, string> = {
  verde: 'bg-verde-categoria',
  azul: 'bg-azul-categoria',
  naranja: 'bg-naranja-categoria',
  rosa: 'bg-[#ec4899]',
}

const CLASES_REFERENCIA: Record<ColorModulo, string> = {
  verde: 'bg-[#e8f5e9] text-[#2e7d32]',
  azul: 'bg-[#e3f2fd] text-[#1565c0]',
  naranja: 'bg-[#fff3e0] text-[#e65100]',
  rosa: 'bg-[#fce4ec] text-[#c62828]',
}

const EVENTOS_MODULO: EventoModulo[] = [
  { nombre: 'Contabilidad', icono: 'contabilidad', color: 'verde', descripcion: 'María Fernández registró un asiento contable', referencia: 'Asiento: A-006587', colorReferencia: 'verde', detalles: 'Empresa: Constructora del Norte SAC', tiempo: 'Hace 2 horas' },
  { nombre: 'Compras', icono: 'compras', color: 'azul', descripcion: 'Carlos Mendoza aprobó una orden de compra', referencia: 'OC: C-2026-0451', colorReferencia: 'azul', detalles: 'Proveedor: Inversiones Globales SAC', tiempo: 'Hace 3 horas' },
  { nombre: 'Ventas', icono: 'ventas', color: 'naranja', descripcion: 'Lucía Gómez emitió una factura electrónica', referencia: 'Factura: F001-0001523', colorReferencia: 'naranja', detalles: 'Cliente: Servicios Generales SAC', tiempo: 'Hace 4 horas' },
  { nombre: 'Inventario', icono: 'inventario', color: 'azul', descripcion: 'Diego Torres actualizó el stock de un producto', referencia: 'Producto: Cemento Tipo I', colorReferencia: 'rosa', detalles: 'Almacén: Principal', tiempo: 'Hace 5 horas' },
  { nombre: 'Planillas', icono: 'planillas', color: 'naranja', descripcion: 'Sofía Ramírez procesó las planillas de abril 2026', referencia: 'Período: 2026-04', colorReferencia: 'verde', detalles: 'Trabajadores: 52', tiempo: 'Hace 6 horas' },
  { nombre: 'Reportes', icono: 'reportes-barra', color: 'naranja', descripcion: 'Jorge Luis generó el reporte de Estado de Resultados', referencia: 'Reporte: ER_Abril_2026', colorReferencia: 'naranja', detalles: 'Formato: PDF', tiempo: 'Hace 7 horas' },
]

export function PaginaActividadModulos() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">Actividad</h1>
              <p className="m-0 text-xs text-texto-suave">Mantente al día con todo lo que ocurre en tu red y en tu empresa</p>
            </div>

            <PestanasActividad activa="07-02-actividad-06-modulos.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              <div className="flex items-start justify-between gap-3 border-b border-borde p-4 pb-3">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-[#f5f3fa] text-texto-suave">
                    <Icono name="cuadricula" className="h-[22px] w-[22px]" />
                  </div>
                  <div>
                    <h2 className="m-0 mb-0.5 text-base font-bold text-texto">Módulos</h2>
                    <p className="m-0 text-xs text-texto-suave">Actividad reciente en los módulos del sistema</p>
                  </div>
                </div>
                <button type="button" className="inline-flex h-8 flex-none items-center gap-1.5 whitespace-nowrap rounded-lg border border-borde bg-white px-3 text-xs font-medium text-texto">
                  Todos los módulos
                  <Icono name="flecha-abajo" className="h-3.5 w-3.5 text-texto-suave" />
                </button>
              </div>

              {EVENTOS_MODULO.map((m) => (
                <article key={m.nombre} className="flex items-center gap-3 border-b border-[#f0eef5] p-3.5 last:border-b-0 hover:bg-[#fdfcff]">
                  <div className={`grid h-[42px] w-[42px] flex-none place-items-center rounded-xl text-white ${CLASES_ICONO[m.color]}`}>
                    <Icono name={m.icono} className="h-[22px] w-[22px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="mb-0.5 block text-sm font-bold text-texto">{m.nombre}</span>
                    <span className="mb-1.25 block text-xs text-texto-suave">{m.descripcion}</span>
                    <div>
                      <span className={`inline-block whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-semibold ${CLASES_REFERENCIA[m.colorReferencia]}`}>{m.referencia}</span>
                      <span className="ml-2 text-[11px] text-[#9892a6]">{m.detalles}</span>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-2">
                    <span className="whitespace-nowrap text-[11px] text-[#aaa7b5]">{m.tiempo}</span>
                    <span className="h-2 w-2 flex-none rounded-full bg-[#3b82f6]" />
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
