import { useRef, useState } from 'react'
import { imagenUsuarioPredeterminada, Icono } from '../icono'
import { AvatarImagen } from '../interfaz/avatar_imagen'
import { irARuta } from '../interfaz/menu'
import { usarSesionDemostracion } from '../sesion/usar_sesion_demostracion'
import { PanelUsuarioTopbar } from './panel_usuario_topbar'
import catalogoAcceso from '../../../catalogos/capacidades/redsocial/acceso.json'

const textos = catalogoAcceso.panel_usuario

export function MenuUsuarioTopbar() {
  const { usuario, cerrarSesion } = usarSesionDemostracion()
  const [abierto, setAbierto] = useState(false)
  const boton = useRef<HTMLButtonElement>(null)

  if (!usuario) return null

  function cerrarPanel() {
    setAbierto(false)
    boton.current?.focus()
  }

  function salir() {
    setAbierto(false)
    cerrarSesion()
    irARuta(catalogoAcceso.rutas.principal)
  }

  return (
    <div className="relative">
      <button
        ref={boton}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={abierto}
        aria-controls={abierto ? textos.id : undefined}
        aria-label={textos.abrir.replace(':nombre', usuario.usuario)}
        onClick={() => setAbierto((visible) => !visible)}
        className="flex items-center gap-xs rounded-full border-0 bg-transparent px-sm py-1 max-800:p-1"
      >
        <AvatarImagen src={imagenUsuarioPredeterminada} className="h-8 w-8 rounded-full bg-borde" />
        <strong className="text-nombre-entidad max-800:hidden">{usuario.usuario}</strong>
        <Icono name="flecha-abajo" className="flex-none text-texto-suave max-800:hidden w-3.25 h-3.25" />
      </button>
      {abierto && (
        <>
          <div className="fixed inset-0 z-19" onClick={cerrarPanel} />
          <PanelUsuarioTopbar usuario={usuario} onCerrar={cerrarPanel} onCerrarSesion={salir} />
        </>
      )}
    </div>
  )
}
