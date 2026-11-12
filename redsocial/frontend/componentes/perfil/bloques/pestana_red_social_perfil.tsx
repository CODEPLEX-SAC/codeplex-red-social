import { ActividadRedSocialPerfil } from './actividad_red_social_perfil'
import { fotosDe } from './logica_red_social_perfil'
import { PanelDatosPersonalesPerfil } from './paneles_red_social_perfil'
import { PanelAmigosRedSocial } from './panel_amigos_red_social'
import { PanelFotosPerfil } from './panel_fotos_perfil'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PestanaRedSocialPerfilProps } from '@/tipos/perfil/contrato_perfil'

const clases = catalogoPerfil.clases.red_social

export function PestanaRedSocialPerfil({ perfil, amigos, publicaciones, acciones, propio, onPublicar, onIrA }: PestanaRedSocialPerfilProps) {
  return (
    <div className={clases.rejilla}>
      <div className={clases.columna}>
        <PanelDatosPersonalesPerfil perfil={perfil} propio={propio} onIrA={onIrA} />
        <PanelFotosPerfil fotos={fotosDe(publicaciones, perfil)} nombre={perfil.nombre} />
        <PanelAmigosRedSocial amigos={amigos} />
      </div>
      <ActividadRedSocialPerfil perfil={perfil} publicaciones={publicaciones} acciones={acciones} propio={propio} onPublicar={onPublicar} />
    </div>
  )
}
