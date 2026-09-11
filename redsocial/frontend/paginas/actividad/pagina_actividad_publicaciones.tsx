import { EstructuraApp } from '../../componentes/compartido/estructura/estructura_app'
import { ColumnaPublicidad } from '../../componentes/compartido/bloques/columna_publicidad'
import { EstructuraTresColumnas } from '../../componentes/compartido/estructura/estructura_tres_columnas'
import { PestanasActividad } from '../../componentes/actividad/bloques/pestanas_actividad'
import { TarjetaActividad } from '../../componentes/actividad/bloques/tarjeta_actividad'
import { ContactosPanel } from '../../componentes/compartido/bloques/contactos_panel'
import { GruposRecomendadosPanel } from '../../componentes/compartido/bloques/grupos_recomendados_panel'
import { EventosProximosPanel } from '../../componentes/compartido/bloques/eventos_proximos_panel'
import { BloqueAnuncio } from '../../componentes/compartido/bloques/bloque_anuncio'
import type { Publicacion } from '@/tipos/actividad/pagina_actividad_publicaciones'

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

const PUBLICACIONES: (Publicacion & { nombreGrupo?: string })[] = [
  { nombre: 'Ana Torres', accion: ' publicó una actualización', tiempo: '1 hora', texto: 'Terminamos la primera fase del proyecto Alfa. ¡Gracias a todo el equipo por el esfuerzo! 🚀', conImagen: true, reacciones: 92, comentarios: 18 },
  { nombre: 'Miguel Rojas', accion: ' compartió una publicación', tiempo: '2 horas', texto: 'Excelente artículo sobre las nuevas normas de seguridad en obra. Vale la pena revisarlo con el equipo.', conImagen: false, reacciones: 37, comentarios: 6 },
  { nombre: 'José Castillo', accion: ' publicó en el grupo ', nombreGrupo: 'Tecnología & Innovación', tiempo: '3 horas', texto: 'Ya está disponible la nueva versión del módulo de inventarios. Cualquier duda, escríbanme por aquí.', conImagen: true, reacciones: 64, comentarios: 15 },
  { nombre: 'Laura Pérez', accion: ' publicó una actualización', tiempo: '4 horas', texto: 'Cerramos el mes con un 18% más de ventas respecto al periodo anterior. ¡Buen trabajo equipo comercial! 📈', conImagen: false, reacciones: 110, comentarios: 21 },
  { nombre: 'Sofía Gómez', accion: ' publicó una actualización', tiempo: '5 horas', texto: 'Fotos del taller de capacitación en seguridad de esta semana. ¡Gran participación de todos!', conImagen: true, reacciones: 53, comentarios: 10 },
  { nombre: 'Diego Mendoza', accion: ' publicó una actualización', tiempo: '6 horas', texto: 'Publiqué la guía rápida del nuevo flujo de aprobación de facturas. Cualquier consulta, quedo atento.', conImagen: false, reacciones: 31, comentarios: 7 },
]

export function PaginaActividadPublicaciones() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">Actividad</h1>
              <p className="m-0 text-xs text-texto-suave">Mantente al día con todo lo que ocurre en tu red y en tu empresa</p>
            </div>

            <PestanasActividad activa="03-02-actividad-02-publicaciones.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              {PUBLICACIONES.map((p) => (
                <TarjetaActividad
                  key={p.nombre}
                  nombreUsuario={p.nombre}
                  accion={p.accion}
                  nombreGrupo={p.nombreGrupo}
                  tiempo={p.tiempo}
                  visibilidad
                  interacciones={{ reacciones: p.reacciones, comentarios: p.comentarios }}
                >
                  {p.conImagen ? (
                    <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                      <p className="m-0 flex-1 text-xs leading-[1.45] text-texto">{p.texto}</p>
                      <div className="ml-auto h-[68px] w-[100px] flex-none rounded-md bg-[#e8e5f0]" />
                    </div>
                  ) : (
                    <p className="m-0 mb-1.5 mt-0.5 text-xs leading-[1.45] text-texto">{p.texto}</p>
                  )}
                </TarjetaActividad>
              ))}
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
