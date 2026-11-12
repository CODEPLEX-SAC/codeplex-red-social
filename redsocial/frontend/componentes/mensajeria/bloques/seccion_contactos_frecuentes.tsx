import { useState } from 'react'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { Icono } from '../../compartido/icono'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { PanelLateralMensajeria } from './panel_lateral_mensajeria'
import { BloqueRecientes } from './bloque_recientes'
import { SeccionContactosFrecuentes2 } from './seccion_contactos_frecuentes2'
import type { ReunionProgramada } from '@/tipos/mensajeria/contrato_reunion'
import type { EntradaHistorial, LlamadaReciente } from '@/tipos/mensajeria/contrato_videollamadas'
import { SeccionReunionesProgramadas } from './seccion_reuniones_programadas'
import { Boton } from '../../compartido/interfaz/boton'

const limiteHistorial = catalogoMensajeria.limites_listas.historial

export function SeccionContactosFrecuentes({
  LLAMADAS_RECIENTES,
  carrusel,
  CONTACTOS_FRECUENTES,
  REUNIONES_PROGRAMADAS,
  HISTORIAL,
  CONTACTOS_LINEA_MENSAJERIA,
  GRUPOS_RECIENTES_MENSAJERIA,
  EVENTOS_PROXIMOS_MENSAJERIA,
}: {
  LLAMADAS_RECIENTES: LlamadaReciente[]
  carrusel: { pistaRef: React.RefObject<HTMLDivElement | null>; }
  CONTACTOS_FRECUENTES: { nombre: string; esGrupo?: boolean | undefined; miembros?: string | undefined; }[]
  REUNIONES_PROGRAMADAS: ReunionProgramada[]
  HISTORIAL: EntradaHistorial[]
  CONTACTOS_LINEA_MENSAJERIA: { nombre: string; colaborador: boolean; }[]
  GRUPOS_RECIENTES_MENSAJERIA: { nombre: string; miembros: string; }[]
  EVENTOS_PROXIMOS_MENSAJERIA: { dia: string; mes: string; titulo: string; detalle: string; }[]
}) {
  const [historialCompleto, setHistorialCompleto] = useState(false)
  const historialVisible = historialCompleto ? HISTORIAL : HISTORIAL.slice(0, limiteHistorial)

  return (
    <div className="grid grid-cols-minmax260-300-minmax420-1fr-minmax280-340 items-start gap-10 max-1350:grid-cols-1">
      <BloqueRecientes LLAMADAS_RECIENTES={LLAMADAS_RECIENTES} REUNIONES_PROGRAMADAS={REUNIONES_PROGRAMADAS} />

      <section className="grid min-w-0 gap-4">
        <SeccionContactosFrecuentes2 carrusel={carrusel} CONTACTOS_FRECUENTES={CONTACTOS_FRECUENTES} />

        <SeccionReunionesProgramadas REUNIONES_PROGRAMADAS={REUNIONES_PROGRAMADAS} />

        <section id={catalogoMensajeria.videollamada.ancla_historial} className="min-w-0 scroll-mt-4 rounded-xl border border-borde bg-white p-4">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="m-0 text-titulo-seccion text-texto">{catalogoMensajeria.secciones.historial_reciente}</h2>
          </div>
          <div className="flex flex-col">
            {historialVisible.map((h) => (
              <article key={h.id} className="flex items-center gap-3 border-b border-borde-suave py-3 last:border-b-0">
                {h.esGrupo ? (
                  <AvatarUsuario tamano="sm" icono="grupo" tono="solido" />
                ) : (
                  <AvatarUsuario tamano="sm" imagen={usuarioImg} />
                )}
                <div className="min-w-0 flex-1">
                  <strong className="mb-0.75 block text-nombre-entidad text-texto">{h.nombre}</strong>
                  <p className="m-0 flex items-center gap-1.5 text-auxiliar text-texto-suave">
                    {h.fecha} · <Icono name="reloj" className="h-3 w-3" /> {h.duracion}
                  </p>
                </div>
                <span className="flex flex-none items-center gap-1.25 text-estado text-positivo-kpi">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" /> {catalogoMensajeria.leyendas.completada}
                </span>
              </article>
            ))}
          </div>
          {HISTORIAL.length > limiteHistorial && (
            <div className="pt-3.5 text-center">
              <Boton type="button" variant="enlace" size="enlace_accion" aria-expanded={historialCompleto} onClick={() => setHistorialCompleto((actual) => !actual)}>
                {historialCompleto ? catalogoMensajeria.botones.ver_menos_historial : catalogoMensajeria.botones.ver_todo_el_historial}
              </Boton>
            </div>
          )}
        </section>
      </section>

      <PanelLateralMensajeria contactosLinea={CONTACTOS_LINEA_MENSAJERIA} gruposRecientes={GRUPOS_RECIENTES_MENSAJERIA} eventosProximos={EVENTOS_PROXIMOS_MENSAJERIA} />
    </div>
  )
}
