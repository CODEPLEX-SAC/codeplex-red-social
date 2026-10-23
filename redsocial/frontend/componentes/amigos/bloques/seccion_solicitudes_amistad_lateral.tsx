import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'
import { PanelLateral } from '../../compartido/bloques/panel_lateral'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido'
import { Boton } from '../../compartido/interfaz/boton'

export function SeccionSolicitudesAmistadLateral({ SOLICITUDES }: { SOLICITUDES: { nombre: string; descripcion: string; }[] }) {
  return (
    <PanelLateral titulo={catalogoAmigos.secciones.solicitudes_amistad_lateral} enlace={textosRedSocial.VER_TODAS} ruta={catalogoAmigos.rutas.solicitudes}>
      {SOLICITUDES.map((s) => (
        <article key={s.nombre} className="border-b border-borde py-3.5 last:border-b-0">
          <div className="mb-2.5 flex gap-2.5">
            <AvatarUsuario tamano="lg" imagen={usuarioImg} />
            <div>
              <strong className="block text-nombre-entidad text-texto">{s.nombre}</strong>
              <p className="m-0 mt-0.5 text-cuerpo leading-texto text-texto-suave">{s.descripcion}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Boton variant="primario" size="mini" className="flex-1">{catalogoAmigos.botones.aceptar}</Boton>
            <Boton variant="secundario" size="mini" className="flex-1">{catalogoAmigos.botones.eliminar}</Boton>
          </div>
        </article>
      ))}
</PanelLateral>
  )
}
