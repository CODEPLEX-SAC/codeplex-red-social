import { Icono, EstructuraApp } from '../../componentes/compartido'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { SESION_ACTUAL } from '../../rutas/compartido/rutas_compartido'
import { DISPOSITIVOS, CONFIGURACION_LLAMADA, PARTICIPANTES_INICIAR, CONTACTOS_INVITAR, OPCIONES_LLAMADA, DETALLE_REUNION, VOLVER_A_VIDEOLLAMADAS } from '../../rutas/mensajeria/rutas_mensajeria'
import { SeccionVideollamadaIniciar, SeccionParticipantes2 } from '../../componentes/mensajeria'

export function PaginaMensajesVideollamadaIniciar() {
  return (
    <EstructuraApp paginaActiva="mensajes">
      <a href={catalogoMensajeria.rutas.videollamadas} className="mb-4 inline-flex items-center gap-1.5 text-enlace-accion font-semibold text-primario no-underline hover:underline">
        <Icono name="flecha-izquierda" className="h-3.75 w-3.75" /> {VOLVER_A_VIDEOLLAMADAS}
      </a>

      <div className="grid grid-cols-minmax400-720-minmax320-400 items-start gap-10 max-1000:grid-cols-1 max-1000:gap-5">
        <SeccionVideollamadaIniciar
          SESION_ACTUAL={SESION_ACTUAL}
          DISPOSITIVOS={DISPOSITIVOS}
          CONFIGURACION_LLAMADA={CONFIGURACION_LLAMADA}
        />

        <aside className="grid min-w-0 gap-4">
          <SeccionParticipantes2
            PARTICIPANTES_INICIAR={PARTICIPANTES_INICIAR}
            CONTACTOS_INVITAR={CONTACTOS_INVITAR}
          />

          <section className="rounded-xl border border-borde bg-white p-4">
            <h2 className="m-0 mb-2.5 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.secciones.opciones_llamada}</h2>
            {OPCIONES_LLAMADA.map((o) => (
              <button key={o.titulo} type="button" className="flex w-full items-center gap-2.5 border-0 bg-transparent py-2 text-left">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-primario-suave text-primario">
                  <Icono name={o.icono} className="h-3.75 w-3.75" />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-subtitulo text-texto">{o.titulo}</strong>
                  <span className="block text-auxiliar text-texto-suave">{o.detalle}</span>
                </div>
                <Icono name="flecha-derecha" className="h-3.5 w-3.5 flex-none text-texto-suave" />
              </button>
            ))}
          </section>

          <section className="rounded-xl border border-borde bg-white p-4">
            <h2 className="m-0 mb-2.5 text-titulo-seccion font-bold text-texto">{catalogoMensajeria.secciones.detalles_reunion}</h2>
            <strong className="mb-2.5 block text-nombre-entidad text-texto">{DETALLE_REUNION.titulo}</strong>
            <div className="mb-2 flex items-center gap-2 text-campo-formulario text-texto-suave">
              <Icono name="calendario" className="h-3.5 w-3.5 flex-none" /> {DETALLE_REUNION.fecha}
            </div>
            <div className="mb-2 flex items-center gap-2 text-campo-formulario text-texto-suave">
              <Icono name="reloj" className="h-3.5 w-3.5 flex-none" /> {DETALLE_REUNION.horario}
            </div>
            <div className="flex items-center gap-2 text-campo-formulario text-texto-suave">
              <Icono name="usuarios" className="h-3.5 w-3.5 flex-none" /> {DETALLE_REUNION.participantes}
            </div>
          </section>
        </aside>
      </div>
    </EstructuraApp>
  )
}
