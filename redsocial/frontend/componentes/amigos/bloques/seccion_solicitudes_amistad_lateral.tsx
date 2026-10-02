import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { AvatarImagen } from '../../compartido/interfaz/avatar_imagen'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'

export function SeccionSolicitudesAmistadLateral({ SOLICITUDES }: { SOLICITUDES: { nombre: string; descripcion: string; }[] }) {
  return (
    <section className="rounded-xl border border-borde bg-white p-4">
      <div className="mb-3.5 flex items-center justify-between">
        <h2 className="m-0 text-titulo-seccion text-texto">{catalogoAmigos.secciones.solicitudes_amistad_lateral}</h2>
        <a href="#" className="text-enlace-accion text-primario no-underline">{textosRedSocial.VER_TODAS}</a>
      </div>
      {SOLICITUDES.map((s) => (
        <article key={s.nombre} className="border-b border-borde py-3.5 last:border-b-0">
          <div className="mb-2.5 flex gap-2.5">
            <AvatarImagen src={usuarioImg} className="h-12 w-12 flex-none rounded-full bg-primario-suave" />
            <div>
              <strong className="block text-nombre-entidad text-texto">{s.nombre}</strong>
              <p className="m-0 mt-0.5 text-cuerpo leading-1.4 text-texto-suave">{s.descripcion}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Boton variant="primario" size="mini" className="flex-1">{catalogoAmigos.botones.aceptar}</Boton>
            <Boton variant="secundario" size="mini" className="flex-1">{catalogoAmigos.botones.eliminar}</Boton>
          </div>
        </article>
      ))}
    </section>
  )
}
