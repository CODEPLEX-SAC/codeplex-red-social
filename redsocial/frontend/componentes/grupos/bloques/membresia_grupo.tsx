import { Icono } from '../../compartido/icono'
import { Boton } from '../../compartido/interfaz/boton'
import { Menu, irARuta } from '../../compartido/interfaz/menu'
import { elementosMembresia } from './logica_menu_grupo'
import { ModalGestionGrupo } from './modal_gestion_grupo'
import { usarMenuGrupo } from './usar_menu_grupo'
import catalogoGrupos from '../../../catalogos/capacidades/redsocial/grupos.json'
import type { MenuGrupoProps } from '@/tipos/grupos/contrato_gestion_grupos'

const textos = catalogoGrupos.detalle.membresia
const clases = catalogoGrupos.clases.menu

export function MembresiaGrupo({ grupo, enlace, puerto }: MenuGrupoProps) {
  const menu = usarMenuGrupo({ grupo, enlace, puerto })

  function confirmar() {
    puerto.abandonar(grupo.id)
    menu.cerrarModal()
    irARuta(catalogoGrupos.rutas.mis_grupos)
  }

  return (
    <>
      <Boton type="button" variant="secundario" size="md" aria-haspopup="menu" aria-expanded={Boolean(menu.ancla)} onClick={menu.abrir}>
        {textos.etiqueta} <Icono name="flecha-abajo" className="h-3.5 w-3.5" />
      </Boton>
      {menu.ancla && <Menu ancla={menu.ancla} alCerrar={menu.cerrar} elementos={elementosMembresia(grupo, menu.ejecutar)} />}
      {menu.aviso !== String() && (
        <p aria-live="polite" className={clases.aviso}>
          {menu.aviso}
        </p>
      )}
      {menu.modal !== null && <ModalGestionGrupo tipo={menu.modal} grupo={grupo} puerto={puerto} onConfirmar={confirmar} onCerrar={menu.cerrarModal} />}
    </>
  )
}
