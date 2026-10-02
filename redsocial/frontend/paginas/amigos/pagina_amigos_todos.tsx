import { Icono, EstructuraApp, ColumnaPublicidad, EstructuraTresColumnas, Boton, AvatarImagen, SuperficieColor, imagenUsuarioPredeterminada as usuarioImg } from '../../componentes/compartido'
import { SeccionTusAmigos, SeccionSolicitudesAmistadLateral } from '../../componentes/amigos'
import catalogoAmigos from '../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../mensajes/capacidades/redsocial/textos.json'
import { RESUMEN_AMIGOS as RESUMEN, AMIGOS, SOLICITUDES_AMIGOS as SOLICITUDES, PERSONAS_CONOCER_TODOS as PERSONAS_CONOCER, TUS_LISTAS_TODOS as TUS_LISTAS } from '../../rutas/amigos/rutas_amigos'

const AVATAR = 'h-8 w-8 flex-none rounded-full bg-primario-suave'

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

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-titulo-seccion text-texto">{catalogoAmigos.secciones.personas_conocer}</h2>
                <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODAS}</a>
              </div>
              {PERSONAS_CONOCER.map((p) => (
                <article key={p.nombre} className="flex items-center gap-2 border-b border-t-f0eef5 py-2 last:border-b-0">
                  <AvatarImagen src={usuarioImg} className={AVATAR} />
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-nombre-entidad text-texto">{p.nombre}</strong>
                    <span className="block truncate text-auxiliar text-texto-suave">{p.comunes}</span>
                  </div>
                  <Boton variant="secundario" size="mini">{catalogoAmigos.botones.agregar}</Boton>
                </article>
              ))}
            </section>

            <section className="rounded-xl border border-borde bg-white p-4">
              <div className="mb-3.5 flex items-center justify-between">
                <h2 className="m-0 text-titulo-seccion text-texto">{catalogoAmigos.secciones.tus_listas}</h2>
                <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODAS}</a>
              </div>
              {TUS_LISTAS.map((l) => (
                <a key={l.nombre} href="#" className="flex items-center gap-2.5 border-b border-borde py-2.5 text-inherit no-underline last:border-b-0">
                  <SuperficieColor as="span" variante={l.color} className="grid h-9 w-9 flex-none place-items-center rounded-9">
                    <Icono name={l.icono} className="h-4.25 w-4.25 text-white" />
                  </SuperficieColor>
                  <div className="min-w-0 flex-1">
                    <strong className="block text-nombre-entidad text-texto">{l.nombre}</strong>
                    <span className="mt-0.5 block text-auxiliar text-texto-suave">{l.cantidad}</span>
                  </div>
                  <Icono name="flecha-derecha" className="h-3.25 w-3.25 flex-none text-t-b3b0c2" />
                </a>
              ))}
            </section>
          </aside>
        }
      />
    </EstructuraApp>
  )
}
