import { imagenRedSocialDe } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { MiembroGrupo } from '@/tipos/grupos/contrato_gestion_grupos'

export function AvataresMiembrosGrupo({ miembros }: { miembros: readonly MiembroGrupo[] }) {
  return (
    <div role="group" aria-label={catalogoGrupos.detalle.miembros_avatares} className={catalogoGrupos.clases.detalle.avatares_miembros}>
      {miembros.slice(0, catalogoGrupos.detalle.avatares_maximo).map((miembro) => (
        <AvatarUsuario key={miembro.id} tamano="sm" imagen={imagenRedSocialDe(miembro.id)} />
      ))}
    </div>
  )
}
