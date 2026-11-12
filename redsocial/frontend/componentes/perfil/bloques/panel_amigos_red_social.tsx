import { imagenUsuarioPredeterminada } from '../../compartido'
import { EnlacePerfilUsuario } from '../../compartido/interfaz/enlace_perfil_usuario'
import { MensajeVacio } from '../../compartido/interfaz/mensaje_vacio'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { PanelAmigosRedSocialProps } from '@/tipos/perfil/contrato_perfil'

const textos = catalogoPerfil.red_social

const clases = catalogoPerfil.clases.red_social

export function PanelAmigosRedSocial({ amigos }: PanelAmigosRedSocialProps) {
  const visibles = amigos.slice(0, textos.amigos_maximo)

  return (
    <section className={clases.tarjeta}>
      <div className={clases.cabecera_panel}>
        <div>
          <h2 className={clases.titulo}>{textos.amigos}</h2>
          <span className="text-auxiliar text-texto-suave">{`${amigos.length} ${amigos.length === 1 ? textos.amigo_singular : textos.amigo_plural}`}</span>
        </div>
      </div>
      {amigos.length === 0 && <MensajeVacio texto={catalogoPerfil.mensajes.sin_amigos} />}
      <ul className={clases.amigos}>
        {visibles.map((amigo) => (
          <li key={amigo.id}>
            <EnlacePerfilUsuario autorId={amigo.id} className="flex flex-col gap-1.5">
              <img src={amigo.avatar || imagenUsuarioPredeterminada} alt="" className={clases.foto_amigo} />
              <span className="max-w-full truncate text-auxiliar text-texto">{amigo.nombre}</span>
            </EnlacePerfilUsuario>
          </li>
        ))}
      </ul>
    </section>
  )
}
