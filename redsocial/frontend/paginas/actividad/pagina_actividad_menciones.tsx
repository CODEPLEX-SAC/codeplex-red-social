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

const MENCIONES: { nombre: string; accion: string; nombreGrupo?: string; tiempo: string; texto: string; conImagen: boolean; reacciones: number; comentarios: number }[] = [
  { nombre: 'Ana Torres', accion: ' te mencionó en una publicación', tiempo: '1 hora', texto: 'gracias por el apoyo con el cierre del proyecto Alfa, quedó excelente el resultado.', conImagen: false, reacciones: 40, comentarios: 8 },
  { nombre: 'Miguel Rojas', accion: ' te mencionó en un comentario', tiempo: '2 horas', texto: '¿puedes revisar el reporte de gastos antes de que cierre el mes?', conImagen: false, reacciones: 12, comentarios: 3 },
  { nombre: 'José Castillo', accion: ' te mencionó en el grupo ', nombreGrupo: 'Tecnología & Innovación', tiempo: '3 horas', texto: 'mira este avance del módulo de inventarios, creo que te va a interesar.', conImagen: true, reacciones: 25, comentarios: 5 },
  { nombre: 'Laura Pérez', accion: ' te mencionó en una publicación', tiempo: '4 horas', texto: 'felicitaciones al equipo comercial, y gracias por el seguimiento constante este mes.', conImagen: false, reacciones: 31, comentarios: 4 },
  { nombre: 'Sofía Gómez', accion: ' te mencionó en un comentario', tiempo: '5 horas', texto: 'quedaron geniales las fotos del taller, gracias por coordinar todo.', conImagen: false, reacciones: 19, comentarios: 2 },
  { nombre: 'Diego Mendoza', accion: ' te mencionó en una publicación', tiempo: '6 horas', texto: '¿me confirmas si el nuevo flujo de aprobación de facturas ya quedó listo?', conImagen: false, reacciones: 9, comentarios: 1 },
]

export function PaginaActividadMenciones() {
  return (
    <EstructuraApp paginaActiva="actividad">
      <EstructuraTresColumnas
        principal={
          <section>
            <div className="mb-5">
              <h1 className="m-0 mb-1 text-xl font-extrabold text-texto">Actividad</h1>
              <p className="m-0 text-xs text-texto-suave">Mantente al día con todo lo que ocurre en tu red y en tu empresa</p>
            </div>

            <PestanasActividad activa="04-02-actividad-03-menciones.html" />

            <section className="rounded-[10px] border border-borde bg-white">
              {MENCIONES.map((m) => (
                <TarjetaActividad
                  key={m.nombre}
                  nombreUsuario={m.nombre}
                  accion={m.accion}
                  nombreGrupo={m.nombreGrupo}
                  tiempo={m.tiempo}
                  visibilidad
                  interacciones={{ reacciones: m.reacciones, comentarios: m.comentarios }}
                >
                  {m.conImagen ? (
                    <div className="mb-1.5 mt-0.5 flex items-start gap-3">
                      <p className="m-0 flex-1 text-xs leading-[1.45] text-texto">
                        <span className="font-semibold text-primario">@Pedro Lozano</span> {m.texto}
                      </p>
                      <div className="ml-auto h-[68px] w-[100px] flex-none rounded-md bg-[#e8e5f0]" />
                    </div>
                  ) : (
                    <p className="m-0 mb-1.5 mt-0.5 text-xs leading-[1.45] text-texto">
                      <span className="font-semibold text-primario">@Pedro Lozano</span> {m.texto}
                    </p>
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
