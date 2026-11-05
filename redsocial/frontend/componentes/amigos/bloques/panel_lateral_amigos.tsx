import { Boton } from '../../compartido/interfaz/boton'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Icono } from '../../compartido/icono'
import { SuperficieColor } from '../../compartido/interfaz/superficie_color'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoAmigos from '../../../catalogos/capacidades/redsocial/amigos.json'
import type { IconName } from '../../../tipos/compartido/contrato_icono'

export function FilaPersonaConocer({ nombre, comunes }: { nombre: string; comunes: string }) {
  return (
    <article className="flex items-center gap-2.5 border-b border-borde-suave py-2.25 last:border-b-0">
      <AvatarUsuario tamano="sm" imagen={usuarioImg} />
      <div className="min-w-0 flex-1">
        <span className="block text-nombre-fila text-texto">{nombre}</span>
        <span className="text-auxiliar text-texto-suave">{comunes}</span>
      </div>
      <Boton type="button" variant="secundario" size="mini" className="flex-none">
        {catalogoAmigos.botones.agregar}
      </Boton>
    </article>
  )
}

export function FilaListaLateral({ icono, color, nombre, miembros }: { icono: IconName; color: string; nombre: string; miembros: string }) {
  return (
    <article className="flex items-center gap-2.5 border-b border-borde-suave py-2.25 last:border-b-0">
      <SuperficieColor variante={color} className="grid h-8.5 w-8.5 flex-none place-items-center rounded-9">
        <Icono name={icono} className="h-4 w-4 text-white" />
      </SuperficieColor>
      <div className="min-w-0 flex-1">
        <span className="block text-nombre-fila text-texto">{nombre}</span>
        <span className="text-auxiliar text-texto-suave">{miembros}</span>
      </div>
    </article>
  )
}

export function FilaActividadReciente({ nombre, accion, tiempo }: { nombre: string; accion: string; tiempo: string }) {
  return (
    <article className="flex items-start gap-2.5 border-b border-borde-suave py-2.25 last:border-b-0">
      <AvatarUsuario tamano="sm" imagen={usuarioImg} />
      <div className="min-w-0 flex-1 text-subtitulo leading-texto text-texto">
        <strong className="font-titulo">{nombre}</strong> {accion}
        <span className="mt-0.5 block text-fecha-abreviada text-texto-suave">{tiempo}</span>
      </div>
    </article>
  )
}
