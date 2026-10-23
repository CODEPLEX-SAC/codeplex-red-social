import { BotonIcono } from '../../compartido/interfaz/boton_icono'
import { CampoBusqueda } from '../interfaz/campo_busqueda'
import { BotonAvisosTopbar } from './boton_avisos_topbar'
import { BotonCarritoTopbar } from './boton_carrito_topbar'
import { MenuUsuarioTopbar } from './menu_usuario_topbar'
import { SelectorEmpresaTopbar } from './selector_empresa_topbar'
import textosRedSocial from '../../../mensajes/capacidades/redsocial/textos.json'

export function BarraSuperior() {
  return (
    <header className="flex h-barra-superior items-center gap-md border-b border-borde bg-superficie px-md max-900:pl-16">
      <div className="flex min-w-0 flex-1 items-center gap-md max-800:hidden">
        <CampoBusqueda placeholder={textosRedSocial.BUSCAR_EN_CODEPLEX} aria-label={textosRedSocial.BUSCAR} className="min-w-40 max-w-75 flex-1" />

        <SelectorEmpresaTopbar />
      </div>

      <div className="ml-auto flex items-center gap-sm max-800:gap-1.5">
        <BotonIcono icono="mas" type="button" aria-label={textosRedSocial.CREAR} variant="primario" size="default" />
        <BotonIcono icono="amigos" type="button" aria-label={textosRedSocial.AMIGOS} variant="sutil" size="default" className="max-800:hidden" />
        <BotonIcono icono="mensajes" type="button" aria-label={textosRedSocial.MENSAJES} variant="sutil" size="default" />
        <BotonCarritoTopbar />
        <BotonAvisosTopbar />
        <BotonIcono icono="cuadricula" type="button" aria-label={textosRedSocial.MODULOS} variant="sutil" size="default" className="max-800:hidden" />
        <MenuUsuarioTopbar />
      </div>
    </header>
  )
}
