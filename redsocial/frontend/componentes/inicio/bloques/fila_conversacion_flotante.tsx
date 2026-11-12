import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Insignia } from '../../compartido/interfaz/insignia'
import { imagenUsuarioPredeterminada as usuarioImg } from '../../compartido/icono'
import catalogoInicio from '../../../catalogos/capacidades/redsocial/inicio.json'
import type { FilaConversacionFlotanteProps } from '@/tipos/inicio/contrato_feed_inicio'

const clases = catalogoInicio.mensajes_flotantes.clases

export function FilaConversacionFlotante({ conversacion, alAbrir }: FilaConversacionFlotanteProps) {
  const avatar = conversacion.esGrupo ? <AvatarUsuario tamano="md" icono="grupo" tono="solido" /> : <AvatarUsuario tamano="md" imagen={usuarioImg} estado={conversacion.enLinea ? 'conectado' : undefined} />

  return (
    <button type="button" onClick={() => alAbrir(conversacion.id)} className={clases.fila}>
      <Insignia variant="superpuesta" contenido={conversacion.noLeidos > 0 ? conversacion.noLeidos : undefined} maximo={99} compacta superposicion="circular">
        {avatar}
      </Insignia>
      <span className="flex min-w-0 flex-1 flex-col">
        <strong className="truncate text-nombre-entidad text-texto">{conversacion.nombre}</strong>
        <span className="truncate text-auxiliar text-texto-suave">{conversacion.extracto}</span>
      </span>
      <span className="flex flex-none flex-col items-end gap-1">
        <span className="text-fecha-abreviada text-texto-suave">{conversacion.etiquetaTiempo}</span>
      </span>
    </button>
  )
}
