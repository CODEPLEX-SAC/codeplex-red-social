import { ActividadRedSocialPerfil } from './actividad_red_social_perfil'
import { fotosDe } from './logica_red_social_perfil'
import { PanelAmigosRedSocial, PanelDatosPersonalesPerfil, PanelFotosPerfil } from './paneles_red_social_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PestanaRedSocialPerfilProps } from '@/tipos/perfil/contrato_perfil'

const clases = catalogoPerfil.clases.red_social

export function PestanaRedSocialPerfil({ perfil, amigos, publicaciones, acciones, propio, onPublicar, onVerAmigos, onIrA }: PestanaRedSocialPerfilProps) {
  return (
    <div className={clases.rejilla}>
      <div className={clases.columna}>
        <PanelDatosPersonalesPerfil perfil={perfil} propio={propio} onIrA={onIrA} />
        <PanelFotosPerfil fotos={fotosDe(publicaciones, perfil)} nombre={perfil.nombre} />
        <PanelAmigosRedSocial amigos={amigos} onVerTodos={onVerAmigos} />
      </div>
      <ActividadRedSocialPerfil perfil={perfil} publicaciones={publicaciones} acciones={acciones} propio={propio} onPublicar={onPublicar} />
    </div>
  )
}
