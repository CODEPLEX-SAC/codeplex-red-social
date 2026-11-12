import { Menu, irARuta } from '../../compartido/interfaz/menu'
import { DisparadorMenuGrupo } from './disparador_menu_grupo'
import { elementosMenuGrupo } from './logica_menu_grupo'
import { ModalCrearGrupoComunidad } from './modal_crear_grupo_comunidad'
import { ModalGestionGrupo } from './modal_gestion_grupo'
import { usarMenuGrupo } from './usar_menu_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { MenuGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const clases = catalogoGrupos.clases.menu

export function MenuGrupo({ grupo, enlace, puerto, variante = 'discreto', enDetalle = false, alTuContenido }: MenuGrupoProps) {
  const menu = usarMenuGrupo({ grupo, enlace, puerto, alTuContenido })

  function confirmar() {
    if (menu.modal === 'abandonar') puerto.abandonar(grupo.id)
    if (menu.modal === 'eliminar') puerto.eliminar(grupo.id)
    menu.cerrarModal()
    if (enDetalle) irARuta(menu.modal === 'eliminar' ? catalogoGrupos.rutas.descubrir : catalogoGrupos.rutas.mis_grupos)
  }

  return (
    <>
      <DisparadorMenuGrupo etiqueta={catalogoGrupos.menu.opciones.replace(':nombre', grupo.nombre)} variante={variante} alAbrir={menu.abrir} />
      {menu.ancla && <Menu ancla={menu.ancla} alCerrar={menu.cerrar} elementos={elementosMenuGrupo(grupo, menu.ejecutar)} />}
      {menu.aviso !== String() && (
        <p aria-live="polite" className={clases.aviso}>
          {menu.aviso}
        </p>
      )}
      {menu.modal === 'editar' && <ModalCrearGrupoComunidad imagen={String()} puerto={puerto} grupo={{ id: grupo.id, nombre: grupo.nombre, descripcion: puerto.detalle(grupo.id)?.descripcion ?? String() }} onCerrar={menu.cerrarModal} />}
      {menu.modal !== null && menu.modal !== 'editar' && <ModalGestionGrupo tipo={menu.modal} grupo={grupo} puerto={puerto} onConfirmar={confirmar} onCerrar={menu.cerrarModal} />}
    </>
  )
}
