import { imagenRedSocialDe } from '../../compartido'
import { AvatarUsuario } from '../../compartido/interfaz/avatar_usuario'
import { Boton } from '../../compartido/interfaz/boton'
import { Icono } from '../../compartido/icono'
import { Menu } from '../../compartido/interfaz/menu'
import { usarMenuMiembroGrupo } from './usar_menu_miembro_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { IconName } from '@/tipos/compartido/contrato_icono'
import type { ElementoMenu } from '@/tipos/compartido/contrato_menu'
import type { FilaMiembroGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.miembros
const clases = catalogoGrupos.clases.detalle

export function FilaMiembroGrupo({ miembro, grupo, alAccion }: FilaMiembroGrupoProps) {
  const menu = usarMenuMiembroGrupo()
  const elementos: ElementoMenu[] = textos.acciones.map((accion) => ({ etiqueta: accion.etiqueta, icono: accion.icono as IconName, peligro: 'peligro' in accion, alHacerClick: () => alAccion(accion.etiqueta) }))
  const subtitulo = miembro.rol === 'administrador' ? textos.subtitulo_administrador : textos.subtitulo_miembro
  const creador = miembro.id === grupo.autorId && grupo.rol === 'administrador'

  return (
    <div className={clases.miembro_fila}>
      <AvatarUsuario tamano="lg" imagen={imagenRedSocialDe(miembro.id)} />
      <div className={clases.miembro_textos}>
        <strong className={clases.miembro_nombre}>{miembro.nombre}</strong>
        {miembro.rol === 'administrador' && <span className={clases.insignia}>{textos.insignia}</span>}
        <span className={clases.miembro_detalle}>{creador ? textos.creo.replace(':fecha', grupo.fechaCreacion) : subtitulo}</span>
      </div>
      {grupo.rol === 'administrador' && (
        <>
          <Boton type="button" size="default" aria-label={textos.opciones.replace(':nombre', miembro.nombre)} className={clases.miembro_menu} onClick={menu.abrir}>
            <Icono name="puntos" className="h-4 w-4" />
          </Boton>
          {menu.ancla && <Menu ancla={menu.ancla} alCerrar={menu.cerrar} elementos={elementos} />}
        </>
      )}
    </div>
  )
}
