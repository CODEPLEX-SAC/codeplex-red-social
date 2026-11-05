import { PanelLateral, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas } from '../../componentes/compartido'
import { EncabezadoAmigos, PestanasAmigos, SeccionSolicitudes, insigniaDePendientes, FilaPersonaConocer, FilaListaLateral, FilaActividadReciente } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { RECIBIDAS, ENVIADAS, PERSONAS_CONOCER_SOLICITUDES as PERSONAS_CONOCER, TUS_LISTAS_SOLICITUDES as TUS_LISTAS, ACTIVIDAD_RECIENTE_SOLICITUDES as ACTIVIDAD_RECIENTE } from '../../rutas/amigos/rutas_amigos'

const clases = catalogoAmigos.clases

export function PaginaAmigosSolicitudes() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <section className={clases.tarjeta_pagina}>
            <EncabezadoAmigos textoBoton={catalogoAmigos.botones.agregar_amigos} />
            <PestanasAmigos activa="solicitudes" insigniaSolicitudes={insigniaDePendientes(RECIBIDAS.length)} />

            <h2 className={clases.titulo_seccion_con_aire}>{catalogoAmigos.secciones.solicitudes_amistad}</h2>

            <SeccionSolicitudes recibidas={RECIBIDAS} enviadas={ENVIADAS} />
          </section>
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <PanelLateral titulo={catalogoAmigos.secciones.personas_conocer} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.sugerencias}>
              {PERSONAS_CONOCER.map((p) => (
                <FilaPersonaConocer key={p.nombre} nombre={p.nombre} comunes={p.comunes} />
              ))}
            </PanelLateral>
            <PanelLateral titulo={catalogoAmigos.secciones.tus_listas} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.listas}>
              {TUS_LISTAS.map((l) => (
                <FilaListaLateral key={l.nombre} icono={l.icono} color={l.color} nombre={l.nombre} miembros={l.miembros} />
              ))}
            </PanelLateral>
            <PanelLateral titulo={catalogoAmigos.secciones.actividad_reciente} enlace={textosRedSocial.VER_TODAS}>
              {ACTIVIDAD_RECIENTE.map((a) => (
                <FilaActividadReciente key={a.nombre} nombre={a.nombre} accion={a.accion} tiempo={a.tiempo} />
              ))}
            </PanelLateral>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
