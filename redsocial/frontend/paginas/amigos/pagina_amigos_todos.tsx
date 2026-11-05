import { PanelLateral, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, SuperficieColor } from '../../componentes/compartido'
import { SeccionTusAmigos, SeccionSolicitudesAmistadLateral, FilaPersonaConocer, insigniaDePendientes, resumenConPendientes, rutaDeMensajeAmigo } from '../../componentes/amigos'
import { navegar } from '../../rutas/compartido/navegacion'
import catalogoMensajeria from '../../catalogos/capacidades/redsocial/mensajeria.json'
import { ALMACEN_MENSAJERIA, rutasMensajeria } from '../../rutas/mensajeria/rutas_mensajeria'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { RESUMEN_AMIGOS as RESUMEN, AMIGOS, RECIBIDAS, PERSONAS_CONOCER_TODOS as PERSONAS_CONOCER, TUS_LISTAS_TODOS as TUS_LISTAS } from '../../rutas/amigos/rutas_amigos'


function abrirMensaje(nombre: string) {
  navegar(rutaDeMensajeAmigo(nombre, ALMACEN_MENSAJERIA.leer().conversaciones, rutasMensajeria.todos, catalogoMensajeria.parametros_ruta.conversacion))
}

export function PaginaAmigosTodos() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <SeccionTusAmigos RESUMEN={resumenConPendientes(RESUMEN, RECIBIDAS.length)} AMIGOS={AMIGOS} insigniaSolicitudes={insigniaDePendientes(RECIBIDAS.length)} alMensaje={abrirMensaje} />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <SeccionSolicitudesAmistadLateral SOLICITUDES={RECIBIDAS} />

            <PanelLateral titulo={catalogoAmigos.secciones.personas_conocer} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.sugerencias}>
              {PERSONAS_CONOCER.map((p) => (
                <FilaPersonaConocer key={p.nombre} nombre={p.nombre} comunes={p.comunes} />
              ))}
</PanelLateral>

            <PanelLateral titulo={catalogoAmigos.secciones.tus_listas} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.listas}>
              {TUS_LISTAS.map((l) => (
                <a key={l.nombre} href={catalogoAmigos.rutas.listas} className="flex items-center gap-2.5 border-b border-borde py-2.5 text-inherit no-underline last:border-b-0">
                  <SuperficieColor as="span" variante={l.color} className="grid h-9 w-9 flex-none place-items-center rounded-9">
                    <Icono name={l.icono} className="h-4 w-4 text-white" />
                  </SuperficieColor>
                  <div className="min-w-0 flex-1">
                    <strong className="block text-nombre-fila text-texto">{l.nombre}</strong>
                    <span className="mt-0.5 block text-auxiliar text-texto-suave">{l.cantidad}</span>
                  </div>
                  <Icono name="flecha-derecha" className="h-3.5 w-3.5 flex-none text-texto-icono-discreto" />
                </a>
              ))}
</PanelLateral>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
