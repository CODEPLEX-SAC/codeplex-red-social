import { PanelLateral, Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, Boton, AvatarUsuario, SuperficieColor, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
import { SeccionTusAmigos, SeccionSolicitudesAmistadLateral } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { RESUMEN_AMIGOS as RESUMEN, AMIGOS, SOLICITUDES_AMIGOS as SOLICITUDES, PERSONAS_CONOCER_TODOS as PERSONAS_CONOCER, TUS_LISTAS_TODOS as TUS_LISTAS } from '../../rutas/amigos/rutas_amigos'


export function PaginaAmigosTodos() {
  return (
    <EstructuraApp paginaActiva="amigos">
      <EstructuraTresColumnas
        principal={
          <SeccionTusAmigos RESUMEN={RESUMEN} AMIGOS={AMIGOS} />
        }
        publicidad={<ColumnaPublicidad />}
        lateral={
          <aside className="grid gap-4">
            <SeccionSolicitudesAmistadLateral SOLICITUDES={SOLICITUDES} />

            <PanelLateral titulo={catalogoAmigos.secciones.personas_conocer} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.sugerencias}>
              {PERSONAS_CONOCER.map((p) => (
                <article key={p.nombre} className="flex items-center gap-2 border-b border-borde-suave py-2 last:border-b-0">
                  <AvatarUsuario tamano="sm" imagen={usuarioImg} />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-nombre-entidad text-texto">{p.nombre}</strong>
                    <span className="block truncate text-auxiliar text-texto-suave">{p.comunes}</span>
                  </div>
                  <Boton variant="secundario" size="mini">{catalogoAmigos.botones.agregar}</Boton>
                </article>
              ))}
</PanelLateral>

            <PanelLateral titulo={catalogoAmigos.secciones.tus_listas} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.listas}>
              {TUS_LISTAS.map((l) => (
                <a key={l.nombre} href={catalogoAmigos.rutas.listas} className="flex items-center gap-2.5 border-b border-borde py-2.5 text-inherit no-underline last:border-b-0">
                  <SuperficieColor as="span" variante={l.color} className="grid h-9 w-9 flex-none place-items-center rounded-9">
                    <Icono name={l.icono} className="h-4 w-4 text-white" />
                  </SuperficieColor>
                  <div className="min-w-0 flex-1">
                    <strong className="block text-nombre-entidad text-texto">{l.nombre}</strong>
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
