import { Icono } from '../../componentes/compartido/icono'
import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasActividad } from '../../componentes/actividad/bloques/pestanas_actividad'
import { TarjetaActividad } from '../../componentes/actividad/bloques/tarjeta_actividad'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { GruposRecomendadosPanel } from '../../componentes/compartido/bloques/grupos_recomendados_panel'
import { EventosProximosPanel } from '../../componentes/compartido/bloques/eventos_proximos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'

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

export function PaginaActividadTodas() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">Actividad</h1>
              <p className="m-0 text-xs text-texto-suave">Mantente al día con todo lo que ocurre en tu red y en tu empresa</p>
            </div>

            <PestanasActividad activa="02-02-actividad-01-todas-web.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              <TarjetaActividad
                nombreUsuario="María Fernández"
                accion=" publicó en el grupo "
                nombreGrupo="Ingenierios Civiles"
                tiempo="2 horas"
                visibilidad
                interacciones={{ reacciones: 128, comentarios: 24 }}
              >
                <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                  <p className="m-0 flex-1 text-xs leading-[1.45] text-texto">Excelente avance en el proyecto del puente en la Av. Central. ¡Gran trabajo equipo! 💪🎆</p>
                  <div className="ml-auto h-[68px] w-[100px] flex-none rounded-md bg-[#e8e5f0]" />
                </div>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario="Luis Rodríguez"
                accion=" te mencionó en una publicación"
                tiempo="3 horas"
                visibilidad
                interacciones={{ reacciones: 45, comentarios: 12 }}
              >
                <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                  <p className="m-0 flex-1 text-xs leading-[1.45] text-texto">
                    <span className="font-semibold text-primario">@Pedro Lozano</span> revisa porfa el informe de costos del proyecto. ¡Gracias!
                  </p>
                  <div className="ml-auto h-[68px] w-[100px] flex-none rounded-md bg-[#e8e5f0]" />
                </div>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario="Carmen López"
                accion=" comentó tu publicación"
                tiempo="5 horas"
                visibilidad
                interacciones={{ reacciones: 28, comentarios: 9 }}
              >
                <p className="m-0 mb-1.5 mt-0.5 text-xs leading-[1.45] text-texto">Muy buen trabajo Pedro, los resultados se ven increibles. ¡Sigue así! 👏</p>
              </TarjetaActividad>

              <TarjetaActividad iconoSistema="sistema" nombreUsuario="Sistema Codeplex" tiempo="6 horas">
                <p className="m-0 mb-1.5 mt-0.5 text-xs leading-[1.45] text-texto">Se ha completado el respaldo automático de tu empresa Construcciones Lozano SAC.</p>
                <span className="inline-block rounded-[10px] bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-semibold text-[#2e7d32]">Completado</span>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario="Diego Mendoza"
                accion=" agregó 3 nuevos archivos en el módulo "
                nombreModulo="Contabilidad"
                tiempo="7 horas"
              >
                <div className="my-1 overflow-hidden rounded-lg border border-borde">
                  {[
                    { tipo: 'pdf' as const, nombre: 'Balance General - Julio 2026.pdf', tamano: '2.4 MB' },
                    { tipo: 'hoja' as const, nombre: 'Estado de Resultados - Julio 2026.xlsx', tamano: '1.6 MB' },
                    { tipo: 'hoja' as const, nombre: 'Libro Diario - Julio 2026.xlsx', tamano: '1.4 MB' },
                  ].map((f) => (
                    <div key={f.nombre} className="flex items-center gap-2 border-b border-[#f5f3fa] px-2.5 py-1.75 last:border-b-0 hover:bg-[#fdfcff]">
                      <div className={'grid h-[30px] w-[30px] flex-none place-items-center rounded-md ' + (f.tipo === 'pdf' ? 'bg-[#fdeceb] text-[#dc2626]' : 'bg-[#e8f5e9] text-[#2e7d32]')}>
                        <Icono name={f.tipo === 'pdf' ? 'archivo-pdf' : 'archivo-hoja'} className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-[11px] font-semibold text-texto">{f.nombre}</span>
                        <span className="block text-[10px] text-texto-suave">{f.tamano}</span>
                      </div>
                      <div className="grid h-6 w-6 flex-none place-items-center text-[#c4c0d3]">
                        <Icono name="flecha-derecha" className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </TarjetaActividad>

              <TarjetaActividad
                nombreUsuario="Ana García"
                accion=" se unió al grupo "
                nombreGrupo="Emprendedores Perú"
                tiempo="8 horas"
              >
                <div className="mt-1 flex items-center gap-2.5 rounded-lg border border-borde bg-[#f9f8fc] px-3 py-2">
                  <div className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-naranja-categoria text-white">
                    <Icono name="grupos" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[13px] font-bold text-texto">Emprendedores Perú</span>
                    <span className="block text-[11px] text-texto-suave">8.7 mil miembros</span>
                  </div>
                  <button type="button" className="inline-flex h-[30px] flex-none items-center rounded-md border border-primario bg-transparent px-3.5 text-xs font-semibold text-primario hover:bg-primario hover:text-white">
                    Ver grupo
                  </button>
                </div>
              </TarjetaActividad>
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
