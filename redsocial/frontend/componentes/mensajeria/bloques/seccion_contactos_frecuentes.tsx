import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import { Icono } from '../../compartido/icono'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import type { IconName } from '../../../tipos/compartido/contrato_icono'
import { PanelLateralMensajeria } from './panel_lateral_mensajeria'
import { BloqueRecientes } from './bloque_recientes'
import { SeccionContactosFrecuentes2 } from './seccion_contactos_frecuentes2'
import { SeccionReunionesProgramadas } from './seccion_reuniones_programadas'

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
  LLAMADAS_RECIENTES: { nombre: string; direccion?: 'entrante' | 'saliente' | undefined; esGrupo?: boolean | undefined; miembros?: string | undefined; hora: string; }[]
  carrusel: { pistaRef: React.RefObject<HTMLDivElement | null>; }
  CONTACTOS_FRECUENTES: { nombre: string; esGrupo?: boolean | undefined; miembros?: string | undefined; }[]
  REUNIONES_PROGRAMADAS: { dia: string; mes: string; titulo: string; hora: string; participantes: string; avatares: number; extra: string; }[]
  HISTORIAL: { nombre: string; esGrupo?: boolean | undefined; fecha: string; duracion: string; }[]
  CONTACTOS_LINEA_MENSAJERIA: { nombre: string; colaborador: boolean; }[]
  GRUPOS_RECIENTES_MENSAJERIA: { nombre: string; miembros: string; }[]
  EVENTOS_PROXIMOS_MENSAJERIA: { dia: string; mes: string; titulo: string; detalle: string; }[]
}) {
  return (
    <div className="grid grid-cols-minmax260-300-minmax420-1fr-minmax280-340 items-start gap-10 max-1350:grid-cols-1">
      <BloqueRecientes LLAMADAS_RECIENTES={LLAMADAS_RECIENTES} />

      <section className="grid min-w-0 gap-4">
        <SeccionContactosFrecuentes2 carrusel={carrusel} CONTACTOS_FRECUENTES={CONTACTOS_FRECUENTES} />

        <SeccionReunionesProgramadas REUNIONES_PROGRAMADAS={REUNIONES_PROGRAMADAS} />

        <section className="min-w-0 rounded-xl border border-borde bg-white p-4">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="m-0 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.secciones.historial_reciente}</h2>
          </div>
          <div className="flex flex-col">
            {HISTORIAL.map((h) => (
              <article key={h.nombre} className="flex items-center gap-3 border-b border-t-f0eef5 py-3 last:border-b-0">
                {h.esGrupo ? (
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-primario text-white">
                    <Icono name="usuarios" className="h-4 w-4" />
                  </span>
                ) : (
                  <AvatarImagen src={usuarioImg} className="h-8 w-8 flex-none rounded-full bg-primario-suave" />
                )}
                <div className="min-w-0 flex-1">
                  <strong className="mb-0.75 block text-nombre-entidad text-texto">{h.nombre}</strong>
                  <p className="m-0 flex items-center gap-1.5 text-auxiliar text-texto-suave">
                    {h.fecha} · <Icono name="reloj" className="h-3 w-3" /> {h.duracion}
                  </p>
                </div>
                <span className="flex flex-none items-center gap-1.25 text-etiqueta-estado font-medium text-positivo-kpi">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" /> {catalogoMensajeria.leyendas.completada}
                </span>
                <BotonIcono icono={'puntos' as IconName} type="button" aria-label={catalogoMensajeria.botones.mas_opciones} variant="sutil" size="md" className="flex-none" />
              </article>
            ))}
          </div>
          <div className="pt-3.5 text-center">
            <a href="#" className="text-enlace-accion font-medium text-primario no-underline hover:underline">{catalogoMensajeria.botones.ver_todo_el_historial}</a>
          </div>
        </section>
      </section>

      <PanelLateralMensajeria contactosLinea={CONTACTOS_LINEA_MENSAJERIA} gruposRecientes={GRUPOS_RECIENTES_MENSAJERIA} eventosProximos={EVENTOS_PROXIMOS_MENSAJERIA} />
    </div>
  )
}
