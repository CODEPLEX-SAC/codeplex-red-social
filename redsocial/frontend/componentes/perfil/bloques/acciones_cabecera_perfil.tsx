import { Icono } from '../../compartido/icono'
import { Boton, clasesBoton } from '../../compartido/interfaz/boton'
import catalogoMensajeria from '../../../catalogos/capacidades/redsocial/mensajeria.json'
import catalogoPerfil from '../../../catalogos/capacidades/redsocial/perfil.json'
import type { AccionesCabeceraPerfilProps } from '@/tipos/perfil/contrato_perfil'

const botones = catalogoPerfil.botones
const clases = catalogoPerfil.clases.cabecera

export function AccionesCabeceraPerfil({ relacion, onAlternarSolicitud, onEditar }: AccionesCabeceraPerfilProps) {
  const solicitudEnviada = relacion === 'solicitud_enviada'
  const clasePrincipal = relacion === 'propio' ? clases.principal_propio : clases.principal

  return (
    <div className={clasePrincipal}>
      {relacion === 'propio' && (
        <Boton type="button" variant="primario" size="md" className={clases.boton_principal} onClick={onEditar}>
          <Icono name="editar-oficial" className="h-4 w-4" />
          {botones.editar_perfil}
        </Boton>
      )}
      {relacion === 'amigos' && (
        <span className={clases.estado_amistad}>
          <Icono name="verificado" className="h-4 w-4" />
          {botones.ya_son_amigos}
        </span>
      )}
      {(relacion === 'ninguna' || solicitudEnviada) && (
        <Boton type="button" variant={solicitudEnviada ? 'secundario' : 'primario'} size="md" aria-pressed={solicitudEnviada} onClick={onAlternarSolicitud}>
          <Icono name={solicitudEnviada ? 'marca-pequena' : 'nuevo-usuario'} className="h-4 w-4" />
          {solicitudEnviada ? botones.solicitud_enviada : botones.agregar_amigo}
        </Boton>
      )}
      {relacion !== 'propio' && (
        <a href={catalogoMensajeria.rutas.todos} className={clasesBoton({ variant: 'secundario', size: 'md' })}>
          <Icono name="mensaje" className="h-4 w-4" />
          {botones.enviar_mensaje}
        </a>
      )}
    </div>
  )
}
